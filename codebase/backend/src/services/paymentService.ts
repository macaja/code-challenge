import { PaymentRequest, PaymentResponse, PaymentStatus } from '../types/payment';
import { chargeService } from './chargeService';

export interface IPaymentService {
  processPayment(request: PaymentRequest): Promise<PaymentResponse>;
}

export class PaymentService implements IPaymentService {
  public async processPayment(request: PaymentRequest): Promise<PaymentResponse> {
    const { amount, accountId } = request;
    
    if (amount <= 0) {
      return {
        status: PaymentStatus.FAILED,
        message: 'Payment amount must be greater than zero',
      };
    }
    
    if (!this.isValidCreditCard(request.cardNumber)) {
      return {
        status: PaymentStatus.FAILED,
        message: 'Invalid credit card number',
      };
    }
    
    await new Promise(resolve => setTimeout(resolve, 800));
    
    if (accountId) {
      await this.applyPaymentToCharges(accountId, amount);
    }
    
    return {
      status: PaymentStatus.COMPLETED,
      message: 'Payment processed successfully',
      accountId,
      transactionId: this.generateTransactionId(),
      timestamp: new Date().toISOString(),
    };
  }
  
  private async applyPaymentToCharges(accountId: string, paymentAmount: number): Promise<void> {
    const charges = await chargeService.getChargesByAccountId(accountId);
    
    const sortedCharges = [...charges].sort((a, b) => 
      new Date(a.date).getTime() - new Date(b.date).getTime()
    );
    
    const positiveCharges = sortedCharges.filter(charge => charge.amount > 0);
    
    let remainingAmount = paymentAmount;
    for (const charge of positiveCharges) {
      if (remainingAmount <= 0) break;
      
      if (remainingAmount >= charge.amount) {
        await chargeService.updateChargeAfterPayment(charge.id, 0);
        remainingAmount -= charge.amount;
      } else {
        const newAmount = charge.amount - remainingAmount;
        await chargeService.updateChargeAfterPayment(charge.id, newAmount);
        remainingAmount = 0;
      }
    }
  }
  
  private generateTransactionId(): string {
    return `tx-${Date.now()}-${Math.random().toString(36).substring(2, 10)}`;
  }
  
  private isValidCreditCard(cardNumber: string): boolean {
    return cardNumber.length >= 13 && cardNumber.length <= 19 && /^\d+$/.test(cardNumber);
  }
}

export const paymentService = new PaymentService();