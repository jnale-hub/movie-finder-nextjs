import { useState } from 'react';
import { FaSearch } from 'react-icons/fa';

interface SearchBarProps {
  onSearch: (query: string) => void;
  placeholder?: string;
}

export default function SearchBar({ onSearch, placeholder = 'Search for movies...' }: SearchBarProps) {
  const [query, setQuery] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      onSearch(query);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="w-full">
      <div className="flex gap-2">
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder={placeholder}
          className="flex-1 py-2 px-2 border rounded focus:outline-none focus:ring-2 focus:ring-amber-400text-neutral-800"
        />
        <button
          type="submit"
          className="md:px-6 px-3 py-1 bg-amber-400 text-neutral-950 rounded-full hover:bg-amber-500 transition-colors font-bold"
        >
          <span className="hidden md:block">Search</span>
          <FaSearch className="md:hidden block size-4" />
        </button>
      </div>
    </form>
  );
}
