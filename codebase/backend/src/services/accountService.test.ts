import { describe, it, expect, beforeEach, vi, afterEach } from 'vitest';
import { AccountService } from './accountService';
import { chargeService } from '../services/chargeService';
import { AccountType } from '../types/account';
import { MOCK_ENERGY_ACCOUNTS_API } from '../mocks/energyAccountsAPIMock';

vi.mock('../services/chargeService', () => ({
  chargeService: {
    getChargesByAccountId: vi.fn(),
    getAllCharges: vi.fn(),
    updateChargeAfterPayment: vi.fn()
  }
}));

vi.mock('../mocks/energyAccountsAPIMock', () => ({
  MOCK_ENERGY_ACCOUNTS_API: vi.fn()
}));

describe('AccountService', () => {
  let accountService: AccountService;
  
  beforeEach(() => {
    vi.resetAllMocks();
    
    accountService = new AccountService();
    
    vi.mocked(MOCK_ENERGY_ACCOUNTS_API).mockResolvedValue([
      {
        id: "A-0001",
        type: AccountType.ELECTRICITY,
        address: "1 Greville Ct, Thomastown, 3076, Victoria",
        meterNumber: "1234567890",
      },
      {
        id: "A-0002",
        type: AccountType.GAS,
        address: "74 Taltarni Rd, Yawong Hills, 3478, Victoria",
        volume: 3034
      }
    ]);
    
    vi.mocked(chargeService.getAllCharges).mockResolvedValue([
      { id: "D-0001", accountId: "A-0001", date: "2025-04-01", amount: 10 },
      { id: "D-0002", accountId: "A-0001", date: "2025-04-08", amount: 20 },
      { id: "D-0003", accountId: "A-0002", date: "2025-03-25", amount: -15 }
    ]);
    
    vi.mocked(chargeService.getChargesByAccountId).mockImplementation((accountId) => {
      if (accountId === "A-0001") {
        return Promise.resolve([
          { id: "D-0001", accountId: "A-0001", date: "2025-04-01", amount: 10 },
          { id: "D-0002", accountId: "A-0001", date: "2025-04-08", amount: 20 }
        ]);
      }
      return Promise.resolve([]);
    });
  });
  
  afterEach(() => {
    vi.clearAllMocks();
  });
  
  describe('getAccounts', () => {
    it('should return all accounts', async () => {
      const result = await accountService.getAccounts();
      
      expect(result).toHaveLength(2);
      expect(result[0].id).toBe("A-0001");
      expect(result[1].id).toBe("A-0002");
    });
  });
  
  describe('getAccountsWithBalances', () => {
    it('should return accounts with calculated balances', async () => {
      const result = await accountService.getAccountsWithBalances();
      
      expect(result).toHaveLength(2);
      
      expect(result[0].id).toBe("A-0001");
      expect(result[0].balance).toBe(30);
      expect(result[0].dueDate).toBe("2025-04-01");
      expect(result[0].charges).toHaveLength(2);
      
      expect(result[1].id).toBe("A-0002");
      expect(result[1].balance).toBe(-15);
      expect(result[1].dueDate).toBeUndefined();
      expect(result[1].charges).toHaveLength(1);
    });
  });
  
  describe('getAccountWithBalanceById', () => {
    it('should return an account with its balance when found', async () => {
      const result = await accountService.getAccountWithBalanceById("A-0001");
      
      expect(result).not.toBeNull();
      expect(result?.id).toBe("A-0001");
      expect(result?.balance).toBe(30);
      expect(result?.dueDate).toBe("2025-04-01");
      expect(result?.charges).toHaveLength(2);
    });
    
    it('should return null when account is not found', async () => {
      const result = await accountService.getAccountWithBalanceById("non-existent-id");
      
      expect(result).toBeNull();
    });
  });
});