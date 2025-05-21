export enum AccountType {
  ELECTRICITY = 'ELECTRICITY',
  GAS = 'GAS',
}

export interface Account {
  id: string;
  type: AccountType;
  address: string;
  meterNumber?: string;
  volume?: number;
  balance: number;
}

export interface Payment {
  id: string;
  accountId: string;
  accountName: string;
  accountAddress: string;
  amount: number;
  date: string;
}

export interface PaymentRequest {
  accountId: string;
  amount: number;
  cardNumber: string;
  expiry: string;
  cvv: string;
}
