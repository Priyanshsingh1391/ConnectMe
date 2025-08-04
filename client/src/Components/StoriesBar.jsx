import React, { useEffect, useState } from 'react';
import { dummyStoriesData } from '../assets/assets';
import { Plus } from 'lucide-react';
import moment from 'moment';
import StoryModel from './StoryModel';
import StoryViewer from './StoryViewer';

const StoriesBar = () => {
  const [stories, setStories] = useState([]);
   const [showModal, setShowModal] = useState(false);
    const [viewStory, setViewStory] = useState(null);

  const fetchStories = () => {
    setStories(dummyStoriesData);
  };

  useEffect(() => {
    fetchStories();
  }, []);

  return (
    <div className="w-screen sm:w-[calc(100vw-240px)] lg:max-w-2xl no-scrollbar overflow-x-auto px-4">
      <div className="flex gap-4 pb-5">
        {/* Add Story Card */}
        <div onClick ={()=>setShowModal(true)}className="rounded-lg shadow-sm min-w-[120px] max-h-[160px] aspect-[3/4] cursor-pointer hover:shadow-lg transition-all duration-200 border-2 border-dashed border-indigo-300">
          <div className="h-full flex flex-col items-center justify-center p-4">
            <div className="w-10 h-10 bg-indigo-500 rounded-full flex items-center justify-center mb-3">
              <Plus className="w-5 h-5 text-white" />
            </div>
            <p className="text-sm font-medium text-slate-700 text-center">Create Story</p>
          </div>
        </div>

        {/* Story Cards */}
        {stories.map((story, index) => (
          <div onClick={()=> setViewStory(story)}
            key={index}
            className="relative rounded-lg shadow min-w-[120px] max-w-[120px] max-h-[160px] cursor-pointer hover:shadow-lg transition-all duration-200 bg-gradient-to-b from-indigo-500 to-purple-800 active:scale-95 overflow-hidden"
          >
            {/* Media */}
            {story.media_type !== 'text' && (
              <div className="absolute inset-0 z-[1] rounded-lg bg-black overflow-hidden">
                {story.media_type === 'image' ? (
                  <img
                    src={story.media_url}
                    className="h-full w-full object-cover hover:scale-110 transition duration-500 opacity-70 hover:opacity-80"
                    alt=""
                  />
                ) : (
                  <video
                    src={story.media_url}
                    className="h-full w-full object-cover hover:scale-110 transition duration-500 opacity-70 hover:opacity-80"
                  />
                )}
              </div>
            )}

            {/* Profile Picture */}
            <img
              src={story.user.profile_picture}
              alt="profile"
              className="absolute w-8 h-8 top-3 left-3 z-10 rounded-full ring ring-gray-100 shadow"
            />

            {/* Content */}
            <p className="absolute top-[72px] left-3 text-white/60 text-sm truncate max-w-[96px]">
              {story.content}
            </p>

            {/* Created At */}
            <p className="text-white absolute bottom-1 right-2 z-10 text-xs">
              {moment(story.createdAt).fromNow()}
            </p>
          </div>
        ))}
      </div>

      {/*Add story Modal */}

      {
        showModal && <StoryModel setShowModal={setShowModal} fetchStories={fetchStories}/>
      }
      {/* View Story Modal*/}
      {
         viewStory && <StoryViewer viewStory={viewStory} setViewStory={setViewStory}/>
      }
    </div>
  );
};

export default StoriesBar;
