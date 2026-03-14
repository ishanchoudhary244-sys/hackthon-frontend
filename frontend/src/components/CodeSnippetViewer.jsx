import React, { useState } from 'react';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism';
import { Code2, Copy, Check } from 'lucide-react';

const CodeSnippetViewer = () => {
  const [copied, setCopied] = useState(false);

  const codeString = `function binarySearch(arr, target) {
  let left = 0;
  let right = arr.length - 1;

  while (left <= right) {
    const mid = Math.floor((left + right) / 2);
    
    if (arr[mid] === target) return mid;
    
    if (arr[mid] < target) {
      left = mid + 1;
    } else {
      right = mid - 1;
    }
  }
  
  return -1;
}`;

  const copyToClipboard = () => {
    navigator.clipboard.writeText(codeString);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="bg-[#1e1e1e] border border-devtube-border rounded-xl flex flex-col shadow-lg overflow-hidden h-[400px]">
      <div className="p-3 border-b border-devtube-border bg-[#2d2d2d] flex items-center justify-between">
        <div className="flex items-center gap-2 text-gray-300">
          <Code2 size={18} />
          <h3 className="font-medium text-sm">Extracted Code Snippet</h3>
        </div>
        
        <button 
          onClick={copyToClipboard}
          className="flex items-center gap-1.5 text-xs text-gray-400 hover:text-white transition-colors py-1 px-2 rounded hover:bg-white/10"
        >
          {copied ? <Check size={14} className="text-green-400" /> : <Copy size={14} />}
          {copied ? 'Copied!' : 'Copy'}
        </button>
      </div>
      
      <div className="flex-1 overflow-auto bg-[#1e1e1e] code-scrollbar">
        <SyntaxHighlighter 
          language="javascript" 
          style={vscDarkPlus}
          customStyle={{
            margin: 0,
            padding: '1rem',
            background: 'transparent',
            fontSize: '13px'
          }}
          showLineNumbers={true}
        >
          {codeString}
        </SyntaxHighlighter>
      </div>
    </div>
  );
};

export default CodeSnippetViewer;
