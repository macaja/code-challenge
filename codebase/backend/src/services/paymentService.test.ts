import { describe, it, expect, beforeEach, vi, afterEach } from 'vitest';
import { PaymentService } from '../services/paymentService';
import { PaymentStatus } from '../types/payment';
import { chargeService } from '../services/chargeService';

vi.mock('../services/chargeService', () => ({
  chargeService: {
    getChargesByAccountId: vi.fn(),
    updateChargeAfterPayment: vi.fn()
  }
}));

describe('PaymentService', () => {
  let paymentService: PaymentService;
  
  beforeEach(() => {
    vi.resetAllMocks();
    
    paymentService = new PaymentService();
    
    vi.mocked(chargeService.getChargesByAccountId).mockResolvedValue([
      { id: "D-0001", accountId: "A-0001", date: "2025-04-01", amount: 10 },
      { id: "D-0002", accountId: "A-0001", date: "2025-04-08", amount: 20 },
      { id: "D-0003", accountId: "A-0001", date: "2025-03-25", amount: -15 }
    ]);
    
    vi.mocked(chargeService.updateChargeAfterPayment).mockResolvedValue(true);
  });
  
  afterEach(() => {
    vi.clearAllMocks();
  });
  
  describe('processPayment', () => {
    it('should process a valid payment successfully', async () => {
      const paymentRequest = {
        accountId: 'A-0001',
        amount: 100,
        cardNumber: '4111111111111111',
        expiry: '12/25',
        cvv: '123'
      };
      
      const result = await paymentService.processPayment(paymentRequest);
      
      expect(result.status).toBe(PaymentStatus.COMPLETED);
      expect(result.message).toBe('Payment processed successfully');
      expect(result.accountId).toBe('A-0001');
      expect(result.transactionId).toBeDefined();
      expect(result.timestamp).toBeDefined();
      
      expect(chargeService.getChargesByAccountId).toHaveBeenCalledWith('A-0001');
      expect(chargeService.updateChargeAfterPayment).toHaveBeenCalledTimes(2);
    });
    
    it('should fail for invalid payment amount', async () => {
      const paymentRequest = {
        accountId: 'A-0001',
        amount: 0,
        cardNumber: '4111111111111111',
        expiry: '12/25',
        cvv: '123'
      };
      
      const result = await paymentService.processPayment(paymentRequest);
      
      expect(result.status).toBe(PaymentStatus.FAILED);
      expect(result.message).toBe('Payment amount must be greater than zero');
      expect(chargeService.getChargesByAccountId).not.toHaveBeenCalled();
    });
    
    it('should fail for invalid card number', async () => {
      const paymentRequest = {
        accountId: 'A-0001',
        amount: 100,
        cardNumber: 'invalid',
        expiry: '12/25',
        cvv: '123'
      };
      
      const result = await paymentService.processPayment(paymentRequest);
      
      expect(result.status).toBe(PaymentStatus.FAILED);
      expect(result.message).toBe('Invalid credit card number');
      expect(chargeService.getChargesByAccountId).not.toHaveBeenCalled();
    });
    
    it('should apply payment to charges in order of date', async () => {
      const paymentRequest = {
        accountId: 'A-0001',
        amount: 15,
        cardNumber: '4111111111111111',
        expiry: '12/25',
        cvv: '123'
      };
      
      await paymentService.processPayment(paymentRequest);
      
      expect(chargeService.updateChargeAfterPayment).toHaveBeenCalledTimes(2);
      expect(chargeService.updateChargeAfterPayment).toHaveBeenNthCalledWith(1, 'D-0001', 0);
      expect(chargeService.updateChargeAfterPayment).toHaveBeenNthCalledWith(2, 'D-0002', 15);
    });
  });
});