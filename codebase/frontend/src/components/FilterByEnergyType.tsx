'use client';

import { AccountType } from '../types';

interface FilterByEnergyTypeProps {
  // eslint-disable-next-line no-unused-vars
  onFilterChange: (energyType: AccountType | undefined) => void;
}

const FilterByEnergyType = ({ onFilterChange }: FilterByEnergyTypeProps) => {
  return (
    <div className="filter">
      <select
        onChange={(e) =>
          onFilterChange(e.target.value ? (e.target.value as AccountType) : undefined)
        }
      >
        <option value="">All Energy Types</option>
        <option value={AccountType.ELECTRICITY}>{AccountType.ELECTRICITY}</option>
        <option value={AccountType.GAS}>{AccountType.GAS}</option>
      </select>
    </div>
  );
};

export default FilterByEnergyType;
