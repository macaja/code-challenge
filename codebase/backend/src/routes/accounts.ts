import express, { Request, Response, NextFunction } from 'express';
import { accountService } from '../services/accountService';
import { AccountServiceError } from '../types/account';

const router = express.Router();

/**
 * GET /api/accounts
 * Returns all accounts with their balances
 */
router.get('/', async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const accounts = await accountService.getAccountsWithBalances();
    res.json(accounts);
  } catch (error) {
    next(new AccountServiceError('Failed to fetch accounts with balances', 500));
  }
});

/**
 * GET /api/accounts/:id
 * Returns a specific account by ID with its balance
 */
router.get('/:id', async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const { id } = req.params;
    const account = await accountService.getAccountWithBalanceById(id);
    
    if (!account) {
      res.status(404).json({ error: `Account with ID ${id} not found` });
      return;
    }
    
    res.json(account);
  } catch (error) {
    next(new AccountServiceError(`Failed to fetch account: ${error instanceof Error ? error.message : 'Unknown error'}`, 500));
  }
});

export default router;