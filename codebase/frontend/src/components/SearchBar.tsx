'use client';

interface SearchBarProps {
  // eslint-disable-next-line no-unused-vars
  onSearch: (query: string) => void;
}

const SearchBar = ({ onSearch }: SearchBarProps) => {
  return (
    <div className="search-bar">
      <input
        type="text"
        placeholder="Search by address..."
        onChange={(e) => onSearch(e.target.value)}
      />
    </div>
  );
};

export default SearchBar;
