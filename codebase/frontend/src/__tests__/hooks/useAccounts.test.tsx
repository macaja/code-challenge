import { describe, it, expect, vi, beforeEach } from 'vitest';
import { renderHook, waitFor } from '@testing-library/react';
import { useAccounts } from '../../hooks/useAccounts';
import * as accountsService from '../../services/accountsService';
import { AccountType } from '../../types';

vi.mock('../../services/accountsService', () => ({
  fetchAccounts: vi.fn(),
}));

describe('useAccounts', () => {
  const mockAccounts = [
    {
      id: 'acc-001',
      type: AccountType.ELECTRICITY,
      address: '123 Main St, Anytown, USA',
      meterNumber: 'E-12345',
      balance: 95.42,
    },
    {
      id: 'acc-002',
      type: AccountType.GAS,
      address: '456 Oak Ave, Somewhere, USA',
      meterNumber: 'G-67890',
      volume: 125,
      balance: 130.75,
    },
  ];

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('fetches accounts and returns them', async () => {
    vi.mocked(accountsService.fetchAccounts).mockResolvedValue(mockAccounts);

    const { result } = renderHook(() => useAccounts());

    expect(result.current.loading).toBe(true);
    expect(result.current.accounts).toEqual([]);
    expect(result.current.error).toBeNull();

    await waitFor(() => {
      expect(result.current.loading).toBe(false);
    });

    expect(result.current.accounts).toEqual(mockAccounts);
    expect(result.current.error).toBeNull();
    expect(accountsService.fetchAccounts).toHaveBeenCalledTimes(1);
  });

  it('handles errors when fetching accounts', async () => {
    const errorMessage = 'Failed to fetch accounts';
    vi.mocked(accountsService.fetchAccounts).mockRejectedValue(new Error(errorMessage));

    const { result } = renderHook(() => useAccounts());

    expect(result.current.loading).toBe(true);
    expect(result.current.accounts).toEqual([]);
    expect(result.current.error).toBeNull();

    await waitFor(() => {
      expect(result.current.loading).toBe(false);
    });

    expect(result.current.accounts).toEqual([]);
    expect(result.current.error).toBe('Failed to fetch accounts');
    expect(accountsService.fetchAccounts).toHaveBeenCalledTimes(1);
  });
});
