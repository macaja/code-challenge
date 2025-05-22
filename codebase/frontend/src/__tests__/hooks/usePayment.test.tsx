import { describe, it, expect, vi, beforeEach } from 'vitest';
import { renderHook, act } from '@testing-library/react';
import { usePayment } from '../../hooks/usePayment';
import * as paymentsService from '../../services/paymentsService';

vi.mock('../../services/paymentsService', () => ({
  makePayment: vi.fn(),
}));

describe('usePayment', () => {
  const mockPaymentRequest = {
    accountId: 'acc-001',
    amount: 95.42,
    cardNumber: '4111111111111111',
    expiry: '12/25',
    cvv: '123',
  };

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('makes a payment and returns success', async () => {
    vi.mocked(paymentsService.makePayment).mockResolvedValue(undefined);

    const { result } = renderHook(() => usePayment());

    expect(result.current.loading).toBe(false);
    expect(result.current.error).toBeNull();

    let success;
    await act(async () => {
      success = await result.current.makePayment(mockPaymentRequest);
    });

    expect(success).toBe(true);
    expect(paymentsService.makePayment).toHaveBeenCalledTimes(1);
    expect(paymentsService.makePayment).toHaveBeenCalledWith(mockPaymentRequest);
    expect(result.current.loading).toBe(false);
    expect(result.current.error).toBeNull();
  });

  it('handles errors when making a payment', async () => {
    const errorMessage = 'Payment failed';
    vi.mocked(paymentsService.makePayment).mockRejectedValue(new Error(errorMessage));

    const { result } = renderHook(() => usePayment());

    let success;
    await act(async () => {
      success = await result.current.makePayment(mockPaymentRequest);
    });

    expect(success).toBe(false);
    expect(paymentsService.makePayment).toHaveBeenCalledTimes(1);
    expect(paymentsService.makePayment).toHaveBeenCalledWith(mockPaymentRequest);
    expect(result.current.loading).toBe(false);
    expect(result.current.error).toBe('Payment failed');
  });

  it('sets loading state while making a payment', async () => {
    vi.mocked(paymentsService.makePayment).mockImplementation(() => {
      return new Promise((resolve) => {
        setTimeout(() => resolve(undefined), 100);
      });
    });

    const { result } = renderHook(() => usePayment());

    let paymentPromise: unknown;
    act(() => {
      paymentPromise = result.current.makePayment(mockPaymentRequest);
    });

    expect(result.current.loading).toBe(true);

    await act(async () => {
      await paymentPromise;
    });

    expect(result.current.loading).toBe(false);
  });
});
