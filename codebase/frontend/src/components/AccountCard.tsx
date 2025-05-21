'use client';

import { useState } from 'react';
import type { Account } from '../types';
import PaymentModal from './PaymentModal';
import { getBalanceColor } from '../utils';

interface AccountCardProps {
  account: Account;
}

const AccountCard = ({ account }: AccountCardProps) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <div className="card">
      <h2>Account {account.id}</h2>
      <p>Type: {account.type}</p>
      <p>Address: {account.address}</p>
      {account.meterNumber && <p>Meter Number: {account.meterNumber}</p>}
      {account.volume !== undefined && <p>Volume: {account.volume}</p>}
      <p style={{ color: getBalanceColor(account.balance) }}>
        Balance: ${account.balance.toFixed(2)}
      </p>

      <div className="card-actions">
        <button className="btn" onClick={() => setIsModalOpen(true)}>
          Make a Payment
        </button>
      </div>

      {isModalOpen && <PaymentModal account={account} onClose={() => setIsModalOpen(false)} />}
    </div>
  );
};

export default AccountCard;
