import React from 'react';
import { Code2, Terminal } from 'lucide-react';

const CodeSnippetViewer = ({ snippet }) => {
  return (
    <div className="bg-devtube-card border border-devtube-border rounded-xl p-6 flex flex-col h-full">
      <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
        <Code2 size={20} className="text-devtube-red" />
        Code Preview
      </h3>
      
      <div className="flex-1 bg-black/50 rounded-lg p-4 font-mono text-sm text-gray-300 overflow-auto border border-white/5">
        <div className="flex items-center gap-2 text-xs text-gray-500 mb-3 pb-2 border-b border-white/5">
          <Terminal size={14} />
          <span>code_snippet.py</span>
        </div>
        <pre className="whitespace-pre-wrap">
          {snippet || "No code snippet detected in this part of the video."}
        </pre>
      </div>
    </div>
  );
};

export default CodeSnippetViewer;
