import React, { useState } from 'react';
import { PlaySquare, Search, Upload, Info } from 'lucide-react';
import LinkInput from './LinkInput';

const Navbar = ({ onUpload, onProcessLink }) => {
  const [showLinkInput, setShowLinkInput] = useState(false);

  return (
    <nav className="border-b border-devtube-border bg-devtube-dark/80 backdrop-blur-md sticky top-0 z-50">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        <div className="flex items-center gap-2 cursor-pointer hover:opacity-80 transition-opacity">
          <div className="bg-devtube-red p-1.5 rounded-lg text-white">
            <PlaySquare size={22} className="fill-white/20" />
          </div>
          <span className="text-xl font-bold tracking-tight text-white">
            DevTube <span className="text-devtube-red">AI</span>
          </span>
        </div>
        
        <div className="hidden md:flex items-center gap-6 text-sm font-medium text-gray-400">
          <a href="#" className="flex items-center gap-1.5 hover:text-white transition-colors">Home</a>
          <label className="flex items-center gap-1.5 hover:text-white transition-colors cursor-pointer">
            <Upload size={16} /> Upload
            <input type="file" accept="video/mp4,video/webm" className="hidden" onChange={(e) => {
              if (e.target.files && e.target.files[0] && onUpload) {
                onUpload(e.target.files[0]);
              }
            }} />
          </label>
          <button 
            onClick={() => setShowLinkInput(!showLinkInput)}
            className="flex items-center gap-1.5 hover:text-white transition-colors"
          >
            <Search size={16} /> Process Link
          </button>
          <a href="#" className="flex items-center gap-1.5 hover:text-white transition-colors">
            <Info size={16} /> About
          </a>
        </div>
        
        {showLinkInput && (
          <div className="absolute top-16 left-0 w-full bg-devtube-dark border-b border-devtube-border p-4 z-40 animate-in slide-in-from-top duration-200">
            <div className="max-w-2xl mx-auto flex items-center gap-4">
              <LinkInput onProcess={(url) => {
                onProcessLink(url);
                setShowLinkInput(false);
              }} />
              <button onClick={() => setShowLinkInput(false)} className="text-gray-500 hover:text-white text-sm">Cancel</button>
            </div>
          </div>
        )}
        
        <div className="flex items-center gap-4">
          <button className="hidden sm:block text-sm font-medium hover:text-white text-gray-300">Log in</button>
          <button className="bg-white text-devtube-dark hover:bg-gray-200 px-4 py-2 rounded-lg text-sm font-semibold transition-colors duration-200">
            Sign up
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
