'use client';

import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import PaymentModal from '../../components/PaymentModal';
import { AccountType } from '../../types';
import * as usePaymentHook from '../../hooks/usePayment';

vi.mock('../../hooks/usePayment', async () => {
  const actual = await vi.importActual('../../hooks/usePayment');
  return {
    ...actual,
    usePayment: vi.fn(),
  };
});

describe('PaymentModal', () => {
  const mockAccount = {
    id: 'acc-001',
    type: AccountType.ELECTRICITY,
    address: '123 Main St, Anytown, USA',
    meterNumber: 'E-12345',
    balance: 95.42,
  };

  const mockOnClose = vi.fn();
  const mockMakePayment = vi.fn();

  beforeEach(() => {
    vi.clearAllMocks();

    // Setup the mock implementation of usePayment
    vi.spyOn(usePaymentHook, 'usePayment').mockReturnValue({
      makePayment: mockMakePayment,
      loading: false,
      error: null,
    });
  });

  it('renders the payment form correctly', () => {
    render(<PaymentModal account={mockAccount} onClose={mockOnClose} />);

    expect(screen.getByText('Make a Payment')).toBeInTheDocument();
    expect(screen.getByText(`Balance: $${mockAccount.balance.toFixed(2)}`)).toBeInTheDocument();
    expect(screen.getByLabelText(/Card Number:/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Expiry Date:/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/CVV:/i)).toBeInTheDocument();
    expect(screen.getByText('Pay')).toBeInTheDocument();
    expect(screen.getByText('Cancel')).toBeInTheDocument();
  });

  it('calls onClose when Cancel button is clicked', () => {
    render(<PaymentModal account={mockAccount} onClose={mockOnClose} />);

    fireEvent.click(screen.getByText('Cancel'));
    expect(mockOnClose).toHaveBeenCalledTimes(1);
  });

  it('submits payment when form is filled and Pay button is clicked', async () => {
    mockMakePayment.mockResolvedValue(true);

    render(<PaymentModal account={mockAccount} onClose={mockOnClose} />);

    fireEvent.change(screen.getByLabelText(/Card Number:/i), {
      target: { value: '4111111111111111' },
    });
    fireEvent.change(screen.getByLabelText(/Expiry Date:/i), { target: { value: '12/25' } });
    fireEvent.change(screen.getByLabelText(/CVV:/i), { target: { value: '123' } });

    fireEvent.click(screen.getByText('Pay'));

    expect(mockMakePayment).toHaveBeenCalledWith({
      accountId: mockAccount.id,
      amount: mockAccount.balance,
      cardNumber: '4111111111111111',
      expiry: '12/25',
      cvv: '123',
    });

    await waitFor(() => {
      expect(screen.getByText('Payment Successful')).toBeInTheDocument();
    });
  });

  it('shows loading state when payment is processing', () => {
    vi.spyOn(usePaymentHook, 'usePayment').mockReturnValue({
      makePayment: mockMakePayment,
      loading: true,
      error: null,
    });

    render(<PaymentModal account={mockAccount} onClose={mockOnClose} />);

    expect(screen.getByText('Processing...')).toBeInTheDocument();
    expect(screen.getByText('Processing...')).toBeDisabled();
  });

  it('shows error message when payment fails', async () => {
    vi.spyOn(usePaymentHook, 'usePayment').mockReturnValue({
      makePayment: mockMakePayment.mockResolvedValue(false),
      loading: false,
      error: 'Payment failed',
    });

    render(<PaymentModal account={mockAccount} onClose={mockOnClose} />);

    fireEvent.change(screen.getByLabelText(/Card Number:/i), {
      target: { value: '4111111111111111' },
    });
    fireEvent.change(screen.getByLabelText(/Expiry Date:/i), { target: { value: '12/25' } });
    fireEvent.change(screen.getByLabelText(/CVV:/i), { target: { value: '123' } });

    fireEvent.click(screen.getByText('Pay'));

    expect(screen.getByText('Error: Payment failed')).toBeInTheDocument();
  });

  it('closes the modal when Close button is clicked after successful payment', async () => {
    mockMakePayment.mockResolvedValue(true);

    render(<PaymentModal account={mockAccount} onClose={mockOnClose} />);

    fireEvent.change(screen.getByLabelText(/Card Number:/i), {
      target: { value: '4111111111111111' },
    });
    fireEvent.change(screen.getByLabelText(/Expiry Date:/i), { target: { value: '12/25' } });
    fireEvent.change(screen.getByLabelText(/CVV:/i), { target: { value: '123' } });

    fireEvent.click(screen.getByText('Pay'));

    await waitFor(() => {
      expect(screen.getByText('Payment Successful')).toBeInTheDocument();
    });

    fireEvent.click(screen.getByText('Close'));
    expect(mockOnClose).toHaveBeenCalledTimes(1);
  });
});
