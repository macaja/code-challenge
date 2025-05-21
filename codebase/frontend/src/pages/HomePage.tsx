'use client';

import { useState } from 'react';
import { Link } from 'react-router-dom';
import AccountsList from '../components/AccountsList';
import FilterByEnergyType from '../components/FilterByEnergyType';
import SearchBar from '../components/SearchBar';
import { useAccounts } from '../hooks/useAccounts';
import { filterAccounts } from '../utils';
import type { AccountType } from '../types';

const HomePage = () => {
  const { accounts, loading, error } = useAccounts();
  const [energyTypeFilter, setEnergyTypeFilter] = useState<AccountType | undefined>(undefined);
  const [searchQuery, setSearchQuery] = useState<string>('');

  if (loading) return <div className="container">Loading...</div>;
  if (error) return <div className="container">Error: {error}</div>;

  return (
    <div className="container">
      <h1 className="page-title">Energy Accounts</h1>
      <Link to="/payment-history" className="nav-link">
        View Payment History
      </Link>

      <div className="controls">
        <SearchBar onSearch={setSearchQuery} />
        <FilterByEnergyType onFilterChange={setEnergyTypeFilter} />
      </div>

      <AccountsList accounts={filterAccounts(accounts, energyTypeFilter, searchQuery)} />
    </div>
  );
};

export default HomePage;
