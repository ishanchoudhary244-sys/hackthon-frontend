import React, { useState } from 'react';
import { Link as LinkIcon, ArrowRight } from 'lucide-react';

const LinkInput = ({ onProcess, large = false }) => {
  const [url, setUrl] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (url.trim()) {
      onProcess(url);
    }
  };

  return (
    <form onSubmit={handleSubmit} className={`w-full flex gap-2 ${large ? 'max-w-2xl' : ''}`}>
      <div className="relative flex-1">
        <div className="absolute inset-y-0 left-3 flex items-center pointer-events-none text-gray-500">
          <LinkIcon size={18} />
        </div>
        <input
          type="text"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          placeholder="Paste tutorial link (YouTube, etc.)..."
          className={`w-full bg-gray-900 border border-devtube-border rounded-lg pl-10 pr-4 outline-none focus:border-devtube-red/50 transition-colors ${
            large ? 'py-4 text-lg' : 'py-2 text-sm'
          }`}
        />
      </div>
      <button
        type="submit"
        className={`bg-devtube-red hover:bg-red-600 text-white font-semibold rounded-lg flex items-center justify-center gap-2 transition-colors ${
          large ? 'px-8 text-lg' : 'px-4 text-sm'
        }`}
      >
        <span>Process</span>
        <ArrowRight size={large ? 20 : 16} />
      </button>
    </form>
  );
};

export default LinkInput;
