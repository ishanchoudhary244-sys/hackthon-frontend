import React, { useState } from 'react';
import { Bot, User, Send, Sparkles } from 'lucide-react';

const AIAnswerBox = ({ videoId }) => {
  const [query, setQuery] = useState('');
  const [chat, setChat] = useState([
    {
       sender: 'ai',
       text: 'Ask me anything about this video. For example: "Explain the time complexity of the algorithm shown here."'
    }
  ]);

  const handleAsk = async (e) => {
    e.preventDefault();
    if (!query.trim()) return;

    // Add user question
    const userMessage = { sender: 'user', text: query };
    setChat(prev => [...prev, userMessage]);
    setQuery('');
    
    // Safety check
    if (!videoId) {
      setChat(prev => [...prev, { 
        sender: 'ai', 
        text: 'Backend is connected, but no video has been uploaded yet! Please upload a video to test the AI context.' 
      }]);
      return;
    }

    // Call backend
    setChat(prev => [...prev, { sender: 'ai', text: 'Thinking...', isThinking: true }]);
    try {
      const res = await fetch('http://localhost:8000/ask-ai', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ video_id: videoId, question: userMessage.text })
      });
      const data = await res.json();
      
      setChat(prev => prev.map(msg => 
        msg.isThinking ? { sender: 'ai', text: data.answer } : msg
      ));
    } catch (err) {
      setChat(prev => prev.map(msg => 
        msg.isThinking ? { sender: 'ai', text: 'Sorry, I encountered an error connecting to the AI.' } : msg
      ));
    }
  };

  return (
    <div className="bg-devtube-card border border-devtube-border rounded-xl flex flex-col shadow-lg overflow-hidden h-[400px]">
      <div className="p-4 border-b border-devtube-border bg-devtube-dark/40 flex items-center gap-2">
        <Sparkles size={18} className="text-devtube-red" />
        <h3 className="font-semibold text-white">Ask AI about this video</h3>
      </div>
      
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {chat.map((msg, idx) => (
          <div key={idx} className={`flex gap-3 ${msg.sender === 'user' ? 'flex-row-reverse' : ''}`}>
            <div className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 ${msg.sender === 'user' ? 'bg-devtube-border' : 'bg-devtube-red/20 text-devtube-red'}`}>
              {msg.sender === 'user' ? <User size={16} className="text-gray-300" /> : <Bot size={16} />}
            </div>
            <div className={`px-4 py-2.5 rounded-2xl max-w-[85%] text-sm leading-relaxed ${
              msg.sender === 'user' 
                ? 'bg-devtube-border text-gray-200 rounded-tr-sm' 
                : 'bg-devtube-dark border border-devtube-border text-gray-300 rounded-tl-sm'
            }`}>
              {msg.text}
            </div>
          </div>
        ))}
      </div>
      
      <form onSubmit={handleAsk} className="p-3 border-t border-devtube-border bg-devtube-dark/20 relative">
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Ask a question..."
          className="w-full bg-devtube-dark border border-devtube-border rounded-lg py-2.5 pl-4 pr-12 text-sm text-white focus:outline-none focus:border-devtube-red focus:ring-1 focus:ring-devtube-red transition-colors placeholder-gray-600"
        />
        <button 
          type="submit"
          disabled={!query.trim()}
          className="absolute right-5 top-1/2 -translate-y-1/2 text-devtube-red hover:text-red-400 disabled:text-gray-600 disabled:hover:text-gray-600 transition-colors"
        >
          <Send size={18} />
        </button>
      </form>
    </div>
  );
};

export default AIAnswerBox;
