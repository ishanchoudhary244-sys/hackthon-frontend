import React, { useState } from 'react';
import { MessageSquareText, Send } from 'lucide-react';

const AIAnswerBox = ({ videoId }) => {
  const [question, setQuestion] = useState('');
  const [answer, setAnswer] = useState('');
  const [loading, setLoading] = useState(false);

  const handleAsk = async (e) => {
    e.preventDefault();
    if (!question.trim()) return;

    setLoading(true);
    try {
      const response = await fetch('http://localhost:8000/ask-ai', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ video_id: videoId, question }),
      });
      const data = await response.json();
      setAnswer(data.answer);
    } catch (error) {
      console.error('AI Request failed:', error);
      setAnswer('Sorry, I encountered an error while processing your request.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-devtube-card border border-devtube-border rounded-xl p-6 flex flex-col h-full">
      <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
        <MessageSquareText size={20} className="text-devtube-red" />
        Ask AI specific questions
      </h3>
      
      <div className="flex-1 overflow-y-auto mb-4 min-h-[100px] text-gray-300 text-sm leading-relaxed">
        {loading ? (
          <div className="flex items-center gap-2 text-devtube-red animate-pulse">
            <span className="w-1.5 h-1.5 rounded-full bg-current"></span>
            AI is thinking...
          </div>
        ) : answer ? (
          <div className="animate-in fade-in slide-in-from-bottom-2 duration-300">
            {answer}
          </div>
        ) : (
          <p className="text-gray-500 italic">I can explain specific parts of the video for you.</p>
        )}
      </div>

      <form onSubmit={handleAsk} className="relative mt-auto">
        <input
          type="text"
          value={question}
          onChange={(e) => setQuestion(e.target.value)}
          placeholder="e.g. How does the minimax logic work?"
          className="w-full bg-gray-900 border border-devtube-border rounded-lg pl-4 pr-12 py-3 text-sm outline-none focus:border-devtube-red/50 transition-colors"
        />
        <button
          type="submit"
          disabled={loading}
          className="absolute right-2 top-1/2 -translate-y-1/2 text-devtube-red hover:text-white transition-colors disabled:opacity-50"
        >
          <Send size={20} />
        </button>
      </form>
    </div>
  );
};

export default AIAnswerBox;
