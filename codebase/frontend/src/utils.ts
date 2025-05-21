import type { Account, AccountType } from './types';

export function filterAccounts(
  accounts: Account[],
  energyTypeFilter?: AccountType,
  searchQuery?: string,
): Account[] {
  return accounts
    .filter((account) => (energyTypeFilter ? account.type === energyTypeFilter : true))
    .filter((account) =>
      searchQuery ? account.address.toLowerCase().includes(searchQuery.toLowerCase()) : true,
    );
}

export function getBalanceColor(balance: number): string {
  if (balance > 0) return 'green';
  if (balance < 0) return 'red';
  return 'grey';
}
