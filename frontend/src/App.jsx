import React, { useState } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import VideoPlayer from './components/VideoPlayer';
import SearchResults from './components/SearchResults';
import AIAnswerBox from './components/AIAnswerBox';
import CodeSnippetViewer from './components/CodeSnippetViewer';

const API_BASE = 'http://localhost:8000';

function App() {
  const [hasSearched, setHasSearched] = useState(false);
  const [activeTime, setActiveTime] = useState(0);
  
  // Backend Integration State
  const [videoId, setVideoId] = useState(null);
  const [videoUrl, setVideoUrl] = useState("https://www.youtube.com/watch?v=P3YxCRtAgUKM"); // Default demo
  const [isProcessing, setIsProcessing] = useState(false);
  const [searchResults, setSearchResults] = useState([]);
  const [isSearching, setIsSearching] = useState(false);

  const handleUpload = async (file) => {
    setIsProcessing(true);
    setVideoUrl(URL.createObjectURL(file)); // Show local video preview
    
    const formData = new FormData();
    formData.append('file', file);
    
    try {
      const response = await fetch(`${API_BASE}/upload-video`, {
        method: 'POST',
        body: formData,
      });
      const data = await response.json();
      setVideoId(data.video_id);
      console.log('Video ID received:', data.video_id);
      
      // Automatically navigate to the dashboard view showing the newly uploaded video
      setHasSearched(true);
    } catch (error) {
      console.error('Upload failed:', error);
    } finally {
      setIsProcessing(false);
    }
  };

  const handleSearch = async (query) => {
    if (!query.trim()) return;
    setHasSearched(true);
    
    if (!videoId) {
      console.warn("No video uploaded. Backend search requires a videoId.");
      return;
    }

    setIsSearching(true);
    try {
      const response = await fetch(`${API_BASE}/search`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ video_id: videoId, query }),
      });
      const data = await response.json();
      // Map backend results to frontend format
      const formattedResults = (data.results || []).map((r, idx) => {
         // Create dummy title from text for UI
         return {
           id: idx,
           time: parseTime(r.timestamp),
           timestamp: r.timestamp,
           title: r.text.length > 40 ? r.text.substring(0, 40) + '...' : r.text,
           fullText: r.text
         };
      });
      setSearchResults(formattedResults);
    } catch (error) {
      console.error('Search failed:', error);
    } finally {
      setIsSearching(false);
    }
  };

  // Helper to convert mm:ss to seconds
  const parseTime = (timestamp) => {
    const parts = timestamp.split(':');
    return parseInt(parts[0]) * 60 + parseInt(parts[1]);
  };

  const handleSeek = (timeInSeconds) => {
    setActiveTime(timeInSeconds);
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar onUpload={handleUpload} />
      
      {/* Show processing banner if needed */}
      {isProcessing && (
        <div className="bg-devtube-red/20 text-devtube-red border-b border-devtube-red/30 py-2 px-4 text-center text-sm font-medium animate-pulse">
          Processing video... Generating transcript and AI embeddings...
        </div>
      )}
      
      {!hasSearched ? (
        <Hero onSearch={handleSearch} />
      ) : (
        <main className="flex-1 container mx-auto px-4 py-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Left Column: Video & AI */}
            <div className="lg:col-span-2 space-y-6 flex flex-col">
              <div className="bg-devtube-card rounded-xl border border-devtube-border overflow-hidden shadow-2xl flex flex-col w-full aspect-video">
                 <VideoPlayer activeTime={activeTime} url={videoUrl} />
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                 <AIAnswerBox videoId={videoId} />
                 <CodeSnippetViewer />
              </div>
            </div>
            
            {/* Right Column: Search & Results */}
            <div className="bg-devtube-card border border-devtube-border rounded-xl p-4 md:p-6 shadow-xl flex flex-col h-full max-h-[calc(100vh-200px)] lg:max-h-full">
              <h2 className="text-xl font-semibold mb-4 text-white flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-devtube-red animate-pulse"></span>
                Concept Matches
              </h2>
              {isSearching ? (
                 <div className="flex justify-center items-center h-32">
                   <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-devtube-red"></div>
                 </div>
              ) : (
                 <SearchResults results={searchResults} onResultClick={handleSeek} />
              )}
            </div>
          </div>
        </main>
      )}
    </div>
  );
}

export default App;
