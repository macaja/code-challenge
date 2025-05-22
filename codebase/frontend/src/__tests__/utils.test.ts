import { describe, it, expect } from 'vitest';
import { filterAccounts } from '../utils';
import { AccountType } from '../types';

describe('filterAccounts', () => {
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
    {
      id: 'acc-003',
      type: AccountType.ELECTRICITY,
      address: '789 Pine Rd, Elsewhere, USA',
      meterNumber: 'E-54321',
      balance: 158.3,
    },
  ];

  it('returns all accounts when no filters are applied', () => {
    const result = filterAccounts(mockAccounts);
    expect(result).toEqual(mockAccounts);
  });

  it('filters accounts by energy type', () => {
    const electricityAccounts = filterAccounts(mockAccounts, AccountType.ELECTRICITY);
    expect(electricityAccounts).toHaveLength(2);
    expect(electricityAccounts[0].id).toBe('acc-001');
    expect(electricityAccounts[1].id).toBe('acc-003');

    const gasAccounts = filterAccounts(mockAccounts, AccountType.GAS);
    expect(gasAccounts).toHaveLength(1);
    expect(gasAccounts[0].id).toBe('acc-002');
  });

  it('filters accounts by search query', () => {
    const mainStAccounts = filterAccounts(mockAccounts, undefined, 'Main');
    expect(mainStAccounts).toHaveLength(1);
    expect(mainStAccounts[0].id).toBe('acc-001');

    const somewhereAccounts = filterAccounts(mockAccounts, undefined, 'Somewhere');
    expect(somewhereAccounts).toHaveLength(1);
    expect(somewhereAccounts[0].id).toBe('acc-002');

    const usaAccounts = filterAccounts(mockAccounts, undefined, 'USA');
    expect(usaAccounts).toHaveLength(3);
  });

  it('combines energy type and search query filters', () => {
    const electricityMainAccounts = filterAccounts(mockAccounts, AccountType.ELECTRICITY, 'Main');
    expect(electricityMainAccounts).toHaveLength(1);
    expect(electricityMainAccounts[0].id).toBe('acc-001');

    const gasOakAccounts = filterAccounts(mockAccounts, AccountType.GAS, 'Oak');
    expect(gasOakAccounts).toHaveLength(1);
    expect(gasOakAccounts[0].id).toBe('acc-002');

    const electricityNowhereAccounts = filterAccounts(
      mockAccounts,
      AccountType.ELECTRICITY,
      'Nowhere',
    );
    expect(electricityNowhereAccounts).toHaveLength(0);
  });

  it('handles case-insensitive search', () => {
    const mainStAccounts = filterAccounts(mockAccounts, undefined, 'main');
    expect(mainStAccounts).toHaveLength(1);
    expect(mainStAccounts[0].id).toBe('acc-001');

    const somewhereAccounts = filterAccounts(mockAccounts, undefined, 'SOMEWHERE');
    expect(somewhereAccounts).toHaveLength(1);
    expect(somewhereAccounts[0].id).toBe('acc-002');
  });

  it('returns empty array when no accounts match the filters', () => {
    const noMatches = filterAccounts(mockAccounts, undefined, 'XYZ123');
    expect(noMatches).toHaveLength(0);
  });
});
