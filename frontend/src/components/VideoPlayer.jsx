import React, { useEffect, useRef } from 'react';
import ReactPlayer from 'react-player';

const VideoPlayer = ({ url, activeTime }) => {
  const playerRef = useRef(null);

  useEffect(() => {
    if (playerRef.current && activeTime > 0) {
      playerRef.current.seekTo(activeTime, 'seconds');
    }
  }, [activeTime]);

  return (
    <div className="w-full h-full bg-black flex items-center justify-center">
      <ReactPlayer
        ref={playerRef}
        url={url}
        controls
        width="100%"
        height="100%"
        playing={false}
      />
    </div>
  );
};

export default VideoPlayer;
