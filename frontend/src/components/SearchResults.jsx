import React from 'react';
import { Clock } from 'lucide-react';

const SearchResults = ({ results, onResultClick }) => {
  if (results.length === 0) {
    return (
      <div className="flex-1 flex flex-col items-center justify-center text-gray-500 space-y-2">
        <p>No matches found yet.</p>
        <p className="text-xs">Try searching for a specific concept or keyword.</p>
      </div>
    );
  }

  return (
    <div className="flex-1 overflow-y-auto pr-2 space-y-3 custom-scrollbar">
      {results.map((result) => (
        <button
          key={result.id}
          onClick={() => onResultClick(result.time)}
          className="w-full text-left bg-gray-800/30 hover:bg-gray-800/60 border border-devtube-border hover:border-devtube-red/30 p-3 rounded-lg transition-all group"
        >
          <div className="flex items-center gap-2 text-devtube-red text-xs font-mono mb-1">
            <Clock size={12} />
            {result.timestamp}
          </div>
          <p className="text-sm text-gray-200 line-clamp-2 leading-relaxed group-hover:text-white">
            {result.title}
          </p>
        </button>
      ))}
    </div>
  );
};

export default SearchResults;
