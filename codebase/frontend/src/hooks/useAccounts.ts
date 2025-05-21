'use client';

import { useState, useEffect } from 'react';
import type { Account } from '../types';
import { fetchAccounts } from '../services/accountsService';

export const useAccounts = () => {
  const [accounts, setAccounts] = useState<Account[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const getAccounts = async () => {
      try {
        setLoading(true);
        const data = await fetchAccounts();
        setAccounts(data);
        setError(null);
      } catch (err) {
        setError('Failed to fetch accounts');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    getAccounts();
  }, []);

  return { accounts, loading, error };
};
