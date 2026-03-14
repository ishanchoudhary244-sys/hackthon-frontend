import React, { useEffect, useRef, useState } from 'react';
import ReactPlayer from 'react-player';
import { Maximize2, Settings, Volume2 } from 'lucide-react';

const VideoPlayer = ({ url, activeTime }) => {
  const playerRef = useRef(null);
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    try {
      if (activeTime > 0 && isReady && playerRef.current && typeof playerRef.current.seekTo === 'function') {
        playerRef.current.seekTo(activeTime, 'seconds');
      }
    } catch (e) {
      console.error("Failed to seek:", e);
    }
  }, [activeTime, isReady]);

  return (
    <div className="flex-1 flex flex-col h-full bg-black relative group">
      <div className="flex-1 relative w-full h-full min-h-[300px] sm:min-h-[400px]">
        <ReactPlayer
          ref={playerRef}
          url={url}
          width="100%"
          height="100%"
          playing={activeTime > 0} // Auto-play when seeking
          onReady={() => setIsReady(true)}
          controls={true}
          config={{
            youtube: {
              playerVars: { showinfo: 0, modestbranding: 1 }
            },
            file: {
              forceVideo: true,
              attributes: {
                controlsList: 'nodownload'
              }
            }
          }}
          className="absolute top-0 left-0"
        />
      </div>
      
      {/* Custom decorative gradient overlay - Optional because ReactPlayer has controls */}
      <div className="absolute top-0 left-0 w-full h-24 bg-gradient-to-b from-black/60 to-transparent pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity"></div>
      
      <div className="absolute top-4 left-4 right-4 flex justify-between items-start pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity">
        <h3 className="text-white font-semibold flex items-center gap-2 drop-shadow-md">
          <span className="bg-devtube-red px-2 py-0.5 rounded text-xs">AI Analyzed</span>
          How to implement Binary Search in JavaScript
        </h3>
        <div className="flex gap-2">
          <button className="p-2 bg-black/40 hover:bg-black/60 backdrop-blur rounded-full text-white pointer-events-auto transition-colors">
            <Volume2 size={16} />
          </button>
          <button className="p-2 bg-black/40 hover:bg-black/60 backdrop-blur rounded-full text-white pointer-events-auto transition-colors">
            <Settings size={16} />
          </button>
          <button className="p-2 bg-black/40 hover:bg-black/60 backdrop-blur rounded-full text-white pointer-events-auto transition-colors">
            <Maximize2 size={16} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default VideoPlayer;
