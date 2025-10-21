"use client";

import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { ThumbsUp, ThumbsDown } from 'lucide-react';

interface LikeDislikeButtonsProps {
  initialLikes?: number;
  initialDislikes?: number;
  onLike?: () => void;
  onDislike?: () => void;
}

export default function LikeDislikeButtons({ 
  initialLikes = 0, 
  initialDislikes = 0,
  onLike,
  onDislike 
}: LikeDislikeButtonsProps) {
  const [likes, setLikes] = useState(initialLikes);
  const [dislikes, setDislikes] = useState(initialDislikes);
  const [userAction, setUserAction] = useState<'like' | 'dislike' | null>(null);

  const handleLike = () => {
    if (userAction === 'like') {
      // Remove like
      setLikes(prev => prev - 1);
      setUserAction(null);
    } else if (userAction === 'dislike') {
      // Switch from dislike to like
      setDislikes(prev => prev - 1);
      setLikes(prev => prev + 1);
      setUserAction('like');
    } else {
      // Add new like
      setLikes(prev => prev + 1);
      setUserAction('like');
    }
    onLike?.();
  };

  const handleDislike = () => {
    if (userAction === 'dislike') {
      // Remove dislike
      setDislikes(prev => prev - 1);
      setUserAction(null);
    } else if (userAction === 'like') {
      // Switch from like to dislike
      setLikes(prev => prev - 1);
      setDislikes(prev => prev + 1);
      setUserAction('dislike');
    } else {
      // Add new dislike
      setDislikes(prev => prev + 1);
      setUserAction('dislike');
    }
    onDislike?.();
  };

  return (
    <section className="py-2">
      <div className="xl:max-w-[70%] mx-auto">
        <div className="">
          <div className="bg-[#07153B] border border-[#DAE6EA]/20 rounded-2xl p-6 shadow-xl">
            <div className="flex items-center justify-center gap-8">
              <Button
                onClick={handleLike}
                variant="ghost"
                className={`flex items-center gap-3 px-6 py-4 rounded-xl transition-all duration-300 transform hover:scale-105 ${
                  userAction === 'like'
                    ? 'bg-[#EC3B3B] text-white hover:bg-[#EC3B3B]/90 glow-effect'
                    : 'bg-transparent text-[#DAE6EA] hover:bg-[#EC3B3B] hover:text-white border border-[#DAE6EA]/20'
                }`}
              >
                <ThumbsUp className={`h-5 w-5 ${userAction === 'like' ? 'animate-bounce' : ''}`} />
                <span className="font-medium">{likes}</span>
              </Button>

              <div className="w-px h-12 bg-[#DAE6EA]/20" />

              <Button
                onClick={handleDislike}
                variant="ghost"
                className={`flex items-center gap-3 px-6 py-4 rounded-xl transition-all duration-300 transform hover:scale-105 ${
                  userAction === 'dislike'
                    ? 'bg-[#DAE6EA] text-[#07153B] hover:bg-[#DAE6EA]/90 glow-effect'
                    : 'bg-transparent text-[#DAE6EA] hover:bg-[#DAE6EA] hover:text-[#07153B] border border-[#DAE6EA]/20'
                }`}
              >
                <ThumbsDown className={`h-5 w-5 ${userAction === 'dislike' ? 'animate-bounce' : ''}`} />
                <span className="font-medium">{dislikes}</span>
              </Button>
            </div>
            
            <div className="text-center mt-4">
              <p className="text-[#DAE6EA]/60 text-sm">
                {userAction === 'like' && 'Thanks for liking this article!'}
                {userAction === 'dislike' && 'Thanks for your feedback!'}
                {!userAction && 'Share your opinion about this article'}
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
