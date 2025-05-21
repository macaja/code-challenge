import type { Account } from '../types';
import AccountCard from './AccountCard';

interface AccountsListProps {
  accounts: Account[];
}

const AccountsList = ({ accounts }: AccountsListProps) => {
  return (
    <div className="cards-container">
      {accounts.length === 0 ? (
        <div>No accounts found</div>
      ) : (
        accounts.map((account) => <AccountCard key={account.id} account={account} />)
      )}
    </div>
  );
};

export default AccountsList;
