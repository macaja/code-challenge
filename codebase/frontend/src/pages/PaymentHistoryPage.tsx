'use client';

import { useState } from 'react';
import { Link } from 'react-router-dom';
import PaymentHistory from '../components/PaymentHistory';
import SearchBar from '../components/SearchBar';
import { usePaymentHistory } from '../hooks/usePaymentHistory';

const PaymentHistoryPage = () => {
  const { loading, error } = usePaymentHistory();
  const [, setSearchQuery] = useState<string>('');

  if (loading) return <div className="container">Loading...</div>;
  if (error) return <div className="container">Error: {error}</div>;

  return (
    <div className="container">
      <h1 className="page-title">Payment History</h1>
      <Link to="/" className="nav-link">
        Back to Accounts
      </Link>

      <div className="controls">
        <SearchBar onSearch={setSearchQuery} />
      </div>

      <PaymentHistory payments={[]} />
    </div>
  );
};

export default PaymentHistoryPage;
