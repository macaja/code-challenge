export enum AccountType {
  ELECTRICITY = 'ELECTRICITY',
  GAS = 'GAS'
}

export interface Account {
  id: string;
  type: AccountType;
  address: string;
  meterNumber?: string;
  volume?: number;
}

export interface AccountWithBalance extends Account {
  balance: number;
  dueDate?: string;
  charges: Charge[];
}

export interface Charge {
  id: string;
  accountId: string;
  date: string;
  amount: number;
}

export class AccountServiceError extends Error {
  constructor(message: string, public readonly code: number = 500) {
    super(message);
    this.name = 'AccountServiceError';
  }
}