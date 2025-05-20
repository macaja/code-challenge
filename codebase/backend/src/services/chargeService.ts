import { Charge } from '../types/account';
import { MOCK_DUE_CHARGES_API } from '../mocks/dueChargesAPIMock';

export interface IChargeService {
  getChargesByAccountId(accountId: string): Promise<Charge[]>;
  
  getAllCharges(): Promise<Charge[]>;
  
  updateChargeAfterPayment(chargeId: string, newAmount: number): Promise<boolean>;
}

export class ChargeService implements IChargeService {
  public async getChargesByAccountId(accountId: string): Promise<Charge[]> {
    const allCharges = await this.getAllCharges();
    return allCharges.filter(charge => charge.accountId === accountId);
  }

  public async getAllCharges(): Promise<Charge[]> {
    return MOCK_DUE_CHARGES_API();
  }

  public async updateChargeAfterPayment(chargeId: string, newAmount: number): Promise<boolean> {
    return Promise.resolve(true);
  }
}

export const chargeService = new ChargeService();