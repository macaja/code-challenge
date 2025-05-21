import type { Account } from '../types';

export const fetchAccounts = async (): Promise<Account[]> => {
  try {
    const response = await fetch('http://localhost:3001/api/accounts');

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    console.error('Error fetching accounts:', error);
    throw error;
  }
};

export const fetchAccountById = async (id: string): Promise<Account> => {
  try {
    const response = await fetch(`http://localhost:3001/api/accounts/${id}`);

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    console.error(`Error fetching account ${id}:`, error);
    throw error;
  }
};
