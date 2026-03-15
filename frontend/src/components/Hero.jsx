import React from 'react';
import { Search, Sparkles } from 'lucide-react';
import { motion } from 'framer-motion';
import SearchBar from './SearchBar';
import LinkInput from './LinkInput';

const Hero = ({ onSearch, onProcessLink }) => {
  return (
    <div className="flex-1 flex flex-col items-center justify-center px-4 relative overflow-hidden">
      {/* Background gradients */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-devtube-red/5 rounded-full blur-[120px] pointer-events-none" />
      
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="max-w-3xl w-full text-center z-10 space-y-8"
      >
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-devtube-red/10 border border-devtube-red/20 text-devtube-red text-sm font-medium mb-4">
          <Sparkles size={16} />
          <span>AI-Powered Video Analysis</span>
        </div>
        
        <h1 className="text-5xl md:text-6xl font-extrabold tracking-tight text-white m-0">
          Search Programming Knowledge <br/>
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-devtube-red to-rose-400">
            Inside Videos
          </span>
        </h1>
        
        <p className="text-lg md:text-xl text-gray-400 max-w-2xl mx-auto">
          Don't waste time scrubbing. Paste a tutorial link or upload a file to find exactly where concepts are explained.
        </p>

        <div className="pt-4 max-w-2xl mx-auto space-y-4">
           <LinkInput onProcess={onProcessLink} large={true} />
           <div className="flex items-center gap-4 text-gray-500">
             <div className="flex-1 h-px bg-gray-800"></div>
             <span className="text-xs uppercase tracking-widest font-semibold">Or Search Existing</span>
             <div className="flex-1 h-px bg-gray-800"></div>
           </div>
           <SearchBar onSearch={onSearch} large={false} />
        </div>
        
        <div className="flex flex-wrap items-center justify-center gap-2 md:gap-4 mt-8 pt-8 text-sm text-gray-500">
          <span>Popular searches:</span>
          {['"Binary Search Tree"', '"React Context API"', '"Docker Compose"', '"Time Complexity"'].map(term => (
            <button key={term} onClick={() => onSearch(term)} className="px-3 py-1 rounded-full bg-gray-800/50 hover:bg-gray-700/50 border border-gray-700 transition duration-200">
              {term}
            </button>
          ))}
        </div>
      </motion.div>
    </div>
  );
};

export default Hero;
