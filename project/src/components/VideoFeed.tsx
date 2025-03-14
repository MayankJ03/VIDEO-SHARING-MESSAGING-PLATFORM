import React, { useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Heart, MessageCircle, Share2, Volume2, VolumeX, Bookmark } from 'lucide-react';
import type { Video } from '../types';
import { cn } from '../utils/cn';

const DEMO_VIDEOS: Video[] = [
  {
    id: '1',
    url: 'https://assets.mixkit.co/videos/preview/mixkit-tree-with-yellow-flowers-1173-large.mp4',
    title: 'Nature Vibes',
    author: 'NatureExplorer',
    likes: 1234,
    comments: 88,
    shares: 45,
    description: 'Beautiful spring flowers blooming 🌸 #nature #spring #flowers',
    thumbnail: 'https://images.unsplash.com/photo-1490730141103-6cac27aaab94'
  },
  {
    id: '2',
    url: 'https://assets.mixkit.co/videos/preview/mixkit-waves-in-the-water-1164-large.mp4',
    title: 'Ocean Waves',
    author: 'WaveRider',
    likes: 2345,
    comments: 156,
    shares: 78,
    description: 'Peaceful ocean waves 🌊 #ocean #waves #peace',
    thumbnail: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e'
  },
];

const VideoCard: React.FC<{ video: Video }> = ({ video }) => {
  const [ref, inView] = useInView({
    threshold: 0.5,
    triggerOnce: false
  });

  const [isLiked, setIsLiked] = useState(false);
  const [isSaved, setIsSaved] = useState(false);
  const [isMuted, setIsMuted] = useState(true);
  const [isPlaying, setIsPlaying] = useState(false);

  const toggleLike = useCallback(() => {
    setIsLiked(prev => !prev);
  }, []);

  const toggleSave = useCallback(() => {
    setIsSaved(prev => !prev);
  }, []);

  const toggleMute = useCallback(() => {
    setIsMuted(prev => !prev);
  }, []);

  const handleVideoPress = useCallback(() => {
    setIsPlaying(prev => !prev);
  }, []);

  return (
    <motion.div
      ref={ref}
      className="relative w-full h-[100vh] snap-center bg-black"
      initial={{ opacity: 0 }}
      animate={{ opacity: inView ? 1 : 0.3 }}
      transition={{ duration: 0.5 }}
    >
      <video
        className="absolute inset-0 w-full h-full object-cover"
        src={video.url}
        loop
        playsInline
        muted={isMuted}
        autoPlay={inView}
        poster={video.thumbnail}
        onClick={handleVideoPress}
      />
      
      <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-transparent to-black/60" />

      <button
        onClick={toggleMute}
        className="absolute top-4 right-4 p-2 rounded-full bg-black/40 backdrop-blur-sm text-white"
      >
        {isMuted ? <VolumeX className="w-6 h-6" /> : <Volume2 className="w-6 h-6" />}
      </button>

      <div className="absolute bottom-0 left-0 right-0 p-4">
        <div className="flex items-end gap-4">
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-2">
              <motion.div
                whileHover={{ scale: 1.1 }}
                className="w-10 h-10 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 p-0.5"
              >
                <div className="w-full h-full rounded-full bg-black p-0.5">
                  <img
                    src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${video.author}`}
                    alt={video.author}
                    className="w-full h-full rounded-full"
                  />
                </div>
              </motion.div>
              <div>
                <h3 className="text-white font-semibold">{video.author}</h3>
                <p className="text-white/70 text-sm">Original Audio</p>
              </div>
            </div>
            <p className="text-white mb-2">{video.description}</p>
          </div>

          <div className="flex flex-col gap-4 items-center">
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={toggleLike}
              className={cn(
                "p-3 rounded-full backdrop-blur-lg transition-all duration-300",
                isLiked ? "bg-red-500" : "bg-black/40"
              )}
            >
              <Heart className={cn("w-6 h-6", isLiked ? "text-white fill-current" : "text-white")} />
              <span className="text-white text-xs mt-1 block">{isLiked ? video.likes + 1 : video.likes}</span>
            </motion.button>
            
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              className="p-3 rounded-full bg-black/40 backdrop-blur-lg"
            >
              <MessageCircle className="w-6 h-6 text-white" />
              <span className="text-white text-xs mt-1 block">{video.comments}</span>
            </motion.button>
            
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              className="p-3 rounded-full bg-black/40 backdrop-blur-lg"
            >
              <Share2 className="w-6 h-6 text-white" />
              <span className="text-white text-xs mt-1 block">{video.shares}</span>
            </motion.button>

            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={toggleSave}
              className={cn(
                "p-3 rounded-full backdrop-blur-lg transition-all duration-300",
                isSaved ? "bg-yellow-500" : "bg-black/40"
              )}
            >
              <Bookmark className={cn("w-6 h-6", isSaved ? "text-white fill-current" : "text-white")} />
            </motion.button>
          </div>
        </div>
      </div>

      <AnimatePresence>
        {!isPlaying && inView && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            className="absolute inset-0 flex items-center justify-center"
          >
            <div className="w-20 h-20 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center">
              <div className="w-16 h-16 bg-white rounded-full" />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export const VideoFeed: React.FC = () => {
  return (
    <div className="h-screen w-full overflow-y-scroll snap-y snap-mandatory">
      {DEMO_VIDEOS.map((video) => (
        <VideoCard key={video.id} video={video} />
      ))}
    </div>
  );
};