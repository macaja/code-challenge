'use client';

import { useState, useEffect } from 'react';
import type { Payment } from '../types';
import { fetchPaymentHistory } from '../services/paymentsService';

export const usePaymentHistory = () => {
  const [payments, setPayments] = useState<Payment[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const getPaymentHistory = async () => {
      try {
        setLoading(true);
        const data = await fetchPaymentHistory();
        setPayments(data);
        setError(null);
      } catch (err) {
        setError('Failed to fetch payment history');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    getPaymentHistory();
  }, []);

  return { payments, loading, error };
};
