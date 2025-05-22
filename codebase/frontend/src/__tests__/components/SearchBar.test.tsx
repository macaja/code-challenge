import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import SearchBar from '../../components/SearchBar';

describe('SearchBar', () => {
  it('renders the search input', () => {
    const mockOnSearch = vi.fn();
    render(<SearchBar onSearch={mockOnSearch} />);

    expect(screen.getByPlaceholderText('Search by address...')).toBeInTheDocument();
  });

  it('calls onSearch when input value changes', () => {
    const mockOnSearch = vi.fn();
    render(<SearchBar onSearch={mockOnSearch} />);

    const searchInput = screen.getByPlaceholderText('Search by address...');

    fireEvent.change(searchInput, { target: { value: 'Main St' } });
    expect(mockOnSearch).toHaveBeenCalledWith('Main St');

    fireEvent.change(searchInput, { target: { value: 'Oak Ave' } });
    expect(mockOnSearch).toHaveBeenCalledWith('Oak Ave');

    fireEvent.change(searchInput, { target: { value: '' } });
    expect(mockOnSearch).toHaveBeenCalledWith('');
  });
});
