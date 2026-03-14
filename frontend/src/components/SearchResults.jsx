import React from 'react';
import { Clock, PlayCircle } from 'lucide-react';
import { motion } from 'framer-motion';

const SearchResults = ({ results, onResultClick }) => {
  return (
    <div className="flex flex-col gap-3 overflow-y-auto pr-2">
      {results.map((result, idx) => (
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: idx * 0.1, duration: 0.3 }}
          key={result.id}
          onClick={() => onResultClick(result.time)}
          className="group cursor-pointer bg-devtube-dark/40 hover:bg-devtube-border/50 border border-devtube-border rounded-lg p-4 transition-all duration-200"
        >
          <div className="flex items-start gap-4">
            <div className="bg-devtube-red/10 text-devtube-red px-2 py-1 rounded font-mono text-xs font-semibold mt-0.5 whitespace-nowrap group-hover:bg-devtube-red group-hover:text-white transition-colors">
              {result.timestamp}
            </div>
            
            <div className="flex-1">
              <h3 className="text-gray-200 group-hover:text-white font-medium text-sm md:text-base transition-colors leading-tight">
                {result.title}
              </h3>
              <p className="text-gray-500 text-xs mt-1.5 flex items-center gap-1 group-hover:text-gray-400 transition-colors">
                <PlayCircle size={12} />
                Click to jump
              </p>
            </div>
          </div>
        </motion.div>
      ))}
      
      {results.length === 0 && (
        <div className="flex flex-col items-center justify-center py-12 text-gray-500">
          <Clock size={40} className="mb-4 opacity-50" />
          <p>No concepts found in this video.</p>
        </div>
      )}
    </div>
  );
};

export default SearchResults;
