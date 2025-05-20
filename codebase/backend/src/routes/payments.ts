import express, { Request, Response, NextFunction } from 'express';
import { PaymentRequest, PaymentServiceError, PaymentStatus } from '../types/payment';
import { paymentService } from '../services/paymentService';
import { accountService } from '../services/accountService';

const router = express.Router();

/**
 * POST /api/payments
 * Processes a payment request
 */
router.post(
  '/',
  async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const paymentRequest = req.body as PaymentRequest;
      
      // Verify the account exists
      if (paymentRequest.accountId) {
        const account = await accountService.getAccountById(paymentRequest.accountId);
        if (!account) {
          res.status(404).json({ error: `Account with ID ${paymentRequest.accountId} not found` });
          return;
        }
      }
      
      // Process the payment
      const result = await paymentService.processPayment(paymentRequest);
      
      // Return appropriate status code based on payment result
      const statusCode = result.status === PaymentStatus.COMPLETED ? 200 : 400;
      res.status(statusCode).json(result);
    } catch (error) {
      next(new PaymentServiceError(
        `Payment processing failed: ${error instanceof Error ? error.message : 'Unknown error'}`,
        500
      ));
    }
  }
);

export default router;