import type { Payment, PaymentRequest } from '../types';

export const makePayment = async (paymentRequest: PaymentRequest): Promise<void> => {
  try {
    const response = await fetch('http://localhost:3001/api/payments', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(paymentRequest),
    });

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    console.error('Error making payment:', error);
    throw error;
  }
};

export const fetchPaymentHistory = async (): Promise<Payment[]> => {
  try {
    const response = await fetch('http://localhost:3001/api/payments');

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    console.error('Error fetching payment history:', error);
    throw error;
  }
};
