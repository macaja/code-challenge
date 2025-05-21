'use client';

import { useState } from 'react';
import type { PaymentRequest } from '../types';
import { makePayment as submitPayment } from '../services/paymentsService';

export const usePayment = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const makePayment = async (paymentRequest: PaymentRequest): Promise<boolean> => {
    try {
      setLoading(true);
      await submitPayment(paymentRequest);
      setError(null);
      return true;
    } catch (err) {
      setError('Payment failed');
      console.error(err);
      return false;
    } finally {
      setLoading(false);
    }
  };

  return { makePayment, loading, error };
};
