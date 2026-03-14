import React, { useState } from 'react';
import { Search, ArrowRight } from 'lucide-react';

const SearchBar = ({ onSearch, large = false }) => {
  const [query, setQuery] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (query.trim()) {
      onSearch(query);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="relative w-full group">
      <div className={`absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none transition-colors ${large ? 'text-gray-400 group-focus-within:text-devtube-red' : 'text-gray-400'}`}>
        <Search size={large ? 24 : 18} />
      </div>
      
      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        className={`w-full bg-devtube-card border border-devtube-border text-white rounded-full ${large ? 'py-4 pl-12 pr-16 text-lg' : 'py-2 pl-10 pr-4 text-sm'} focus:outline-none focus:ring-2 focus:ring-devtube-red/50 focus:border-devtube-red transition-all shadow-lg placeholder-gray-500`}
        placeholder="E.g., Explain Binary Search implementation..."
      />
      
      {large && (
        <button 
          type="submit" 
          className="absolute inset-y-2 right-2 px-4 bg-devtube-red hover:bg-red-500 text-white rounded-full font-medium transition-colors flex items-center justify-center"
        >
          <ArrowRight size={20} />
        </button>
      )}
    </form>
  );
};

export default SearchBar;
