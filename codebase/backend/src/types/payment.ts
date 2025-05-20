export enum PaymentStatus {
  PENDING = 'pending',
  COMPLETED = 'completed',
  FAILED = 'failed'
}

export interface PaymentRequest {
  accountId: string;
  amount: number;
  cardNumber: string;
  expiry: string;
  cvv: string;
}

export interface PaymentResponse {
  status: PaymentStatus;
  message: string;
  accountId?: string;
  transactionId?: string;
  timestamp?: string;
}

export class PaymentServiceError extends Error {
  constructor(message: string, public readonly code: number = 500) {
    super(message);
    this.name = 'PaymentServiceError';
  }
}