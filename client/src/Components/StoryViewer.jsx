import { BadgeCheck, X } from 'lucide-react';
import React, { useEffect, useState } from 'react';

const StoryViewer = ({ viewStory, setViewStory }) => {
  const [progress, setProgress] = useState(0);

  const handleClose = () => {
    setViewStory(null);
  };

  useEffect(() => {
    if (!viewStory) return;

    setProgress(0);
    const duration = 5000; // 5 seconds
    const interval = 50;
    let elapsed = 0;

    const timer = setInterval(() => {
      elapsed += interval;
      setProgress((elapsed / duration) * 100);

      if (elapsed >= duration) {
        clearInterval(timer);
        handleClose();
      }
    }, interval);

    return () => clearInterval(timer);
  }, [viewStory]);

  if (!viewStory) return null;

  return (
    <div
      className="fixed inset-0 h-screen z-50 flex items-center justify-center"
      style={{
        backgroundColor:
          viewStory.media_type === 'text'
            ? viewStory.background_color
            : '#000000',
      }}
    >
      {/* Progress Bar */}
      <div className="absolute top-0 left-0 w-full h-1 bg-gray-700">
        <div
          className="h-full bg-white transition-all duration-100 linear"
          style={{ width: `${progress}%` }}
        />
      </div>

      {/* User info */}
      <div className="absolute top-4 left-4 flex items-center space-x-3 p-2 px-4 sm:p-4 sm:px-8 backdrop-blur-2xl rounded bg-black/50">
        <img
          src={viewStory.user?.profile_picture}
          className="size-7 sm:size-8 rounded-full object-cover border border-white"
          alt="profile"
        />
        <div className="text-white font-medium flex items-center gap-1.5">
          <span>{viewStory.user?.full_name}</span>
          <BadgeCheck size={18} />
        </div>
      </div>

      {/* Close button */}
      <button
        onClick={handleClose}
        className="absolute top-4 right-4 text-white text-3xl font-bold focus:outline-none"
      >
        <X className="w-8 h-8 hover:scale-110 transition cursor-pointer" />
      </button>

      {/* Story Content */}
      <div className="max-w- max-h-full flex items-center justify-center">
        {viewStory.media_type === 'text' ? (
          <p className="text-white text-2xl font-semibold px-6 text-center">
            {viewStory.content}
          </p>
        ) : viewStory.media_type === 'image' ? (
          <img
            src={viewStory.media_url}
            alt="story"
            className="max-h-full max-w-full object-contain"
          />
        ) : viewStory.media_type === 'video' ? (
          <video
            src={viewStory.media_url}
            className="max-h-full max-w-full object-contain"
            autoPlay
            muted
          />
        ) : null}
      </div>
    </div>
  );
};

export default StoryViewer;
