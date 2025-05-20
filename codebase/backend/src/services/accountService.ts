import { Account, AccountWithBalance, Charge } from '../types/account';
import { MOCK_ENERGY_ACCOUNTS_API } from '../mocks/energyAccountsAPIMock';
import { chargeService } from './chargeService';

export interface IAccountService {
  getAccounts(): Promise<Account[]>;
  
  getAccountById(id: string): Promise<Account | null>;
  
  getAccountsWithBalances(): Promise<AccountWithBalance[]>;
  
  getAccountWithBalanceById(id: string): Promise<AccountWithBalance | null>;
}

export class AccountService implements IAccountService {
  public async getAccounts(): Promise<Account[]> {
    return MOCK_ENERGY_ACCOUNTS_API();
  }

  public async getAccountById(id: string): Promise<Account | null> {
    const accounts = await this.getAccounts();
    return accounts.find(account => account.id === id) || null;
  }

  public async getAccountsWithBalances(): Promise<AccountWithBalance[]> {
    const accounts = await this.getAccounts();
    const allCharges = await chargeService.getAllCharges();
    
    return Promise.all(
      accounts.map(account => {
        const accountCharges = allCharges.filter(charge => charge.accountId === account.id);
        return this.calculateAccountBalance(account, accountCharges);
      })
    );
  }

  public async getAccountWithBalanceById(id: string): Promise<AccountWithBalance | null> {
    const account = await this.getAccountById(id);
    if (!account) {
      return null;
    }
    
    const charges = await chargeService.getChargesByAccountId(id);
    return this.calculateAccountBalance(account, charges);
  }

  private calculateAccountBalance(account: Account, charges: Charge[]): AccountWithBalance {
    const balance = charges.reduce((total, charge) => total + charge.amount, 0);
    
    const sortedCharges = [...charges].sort((a, b) => 
      new Date(a.date).getTime() - new Date(b.date).getTime()
    );
    
    const positiveCharges = sortedCharges.filter(charge => charge.amount > 0);
    const dueDate = positiveCharges.length > 0 ? positiveCharges[0].date : undefined;
    
    return {
      ...account,
      balance,
      dueDate,
      charges: sortedCharges
    };
  }
}

export const accountService = new AccountService();