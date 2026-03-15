import React, { useState } from 'react';
import { Search } from 'lucide-react';

const SearchBar = ({ onSearch, large = false }) => {
  const [query, setQuery] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (query.trim()) {
      onSearch(query);
    }
  };

  return (
    <form onSubmit={handleSubmit} className={`w-full ${large ? 'max-w-2xl' : ''}`}>
      <div className="relative">
        <div className="absolute inset-y-0 left-3 flex items-center pointer-events-none text-gray-500">
          <Search size={18} />
        </div>
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search for concepts inside the video..."
          className={`w-full bg-gray-900 border border-devtube-border rounded-lg pl-10 pr-4 outline-none focus:border-devtube-red/50 transition-colors ${
            large ? 'py-4 text-lg' : 'py-2 text-sm'
          }`}
        />
      </div>
    </form>
  );
};

export default SearchBar;
