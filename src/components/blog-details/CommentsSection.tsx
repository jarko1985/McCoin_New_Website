"use client";

import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { MessageCircle, Send, Heart, Reply, MoreHorizontal } from 'lucide-react';

interface Comment {
  id: number;
  author: string;
  avatar: string;
  content: string;
  timestamp: string;
  likes: number;
  replies: Comment[];
  isLiked: boolean;
}

interface CommentsSectionProps {
  blogId: number;
}

export default function CommentsSection({ blogId }: CommentsSectionProps) {
  const [comments, setComments] = useState<Comment[]>([
    {
      id: 1,
      author: "Sarah Johnson",
      avatar: "/images/team/ayesha.jpg",
      content: "This is an excellent article! The insights about Bitcoin's market trends are very valuable. I've been following the crypto market for years and this analysis really helps understand the current situation.",
      timestamp: "2 hours ago",
      likes: 12,
      replies: [
        {
          id: 2,
          author: "Mike Chen",
          avatar: "/images/team/darlene.jpeg",
          content: "I agree! The technical analysis section was particularly insightful.",
          timestamp: "1 hour ago",
          likes: 3,
          replies: [],
          isLiked: false
        }
      ],
      isLiked: true
    },
    {
      id: 3,
      author: "Alex Rodriguez",
      avatar: "/images/team/jarko.jpg",
      content: "Great breakdown of the market dynamics. However, I think the article could benefit from more discussion about regulatory impacts on the crypto space.",
      timestamp: "4 hours ago",
      likes: 8,
      replies: [],
      isLiked: false
    }
  ]);

  const [newComment, setNewComment] = useState('');
  const [replyTo, setReplyTo] = useState<number | null>(null);
  const [replyContent, setReplyContent] = useState('');
  const [showReplyForm, setShowReplyForm] = useState<number | null>(null);

  const handleSubmitComment = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newComment.trim()) return;

    const comment: Comment = {
      id: Date.now(),
      author: "You",
      avatar: "/images/team/mr_taghavi.jpg",
      content: newComment,
      timestamp: "Just now",
      likes: 0,
      replies: [],
      isLiked: false
    };

    setComments(prev => [comment, ...prev]);
    setNewComment('');
  };

  const handleSubmitReply = (parentId: number, e: React.FormEvent) => {
    e.preventDefault();
    if (!replyContent.trim()) return;

    const reply: Comment = {
      id: Date.now(),
      author: "You",
      avatar: "/images/team/mr_taghavi.jpg",
      content: replyContent,
      timestamp: "Just now",
      likes: 0,
      replies: [],
      isLiked: false
    };

    setComments(prev => prev.map(comment => 
      comment.id === parentId 
        ? { ...comment, replies: [...comment.replies, reply] }
        : comment
    ));
    
    setReplyContent('');
    setShowReplyForm(null);
  };

  const handleLikeComment = (commentId: number, isReply: boolean = false, parentId?: number) => {
    setComments(prev => prev.map(comment => {
      if (isReply && parentId === comment.id) {
        return {
          ...comment,
          replies: comment.replies.map(reply =>
            reply.id === commentId
              ? { ...reply, likes: reply.isLiked ? reply.likes - 1 : reply.likes + 1, isLiked: !reply.isLiked }
              : reply
          )
        };
      } else if (!isReply && comment.id === commentId) {
        return {
          ...comment,
          likes: comment.isLiked ? comment.likes - 1 : comment.likes + 1,
          isLiked: !comment.isLiked
        };
      }
      return comment;
    }));
  };

  const formatTimestamp = (timestamp: string) => timestamp;

  return (
    <section className="py-2">
      <div className="xl:max-w-[70%] mx-auto">
       
          <div className="bg-[#07153B] border border-[#DAE6EA]/20 rounded-2xl p-8 shadow-2xl">
            <div className="flex items-center gap-3 mb-8">
              <MessageCircle className="h-6 w-6 text-[#EC3B3B]" />
              <h3 className="text-2xl font-bold text-[#DAE6EA]">Comments ({comments.length})</h3>
            </div>

            {/* Comment Form */}
            <form onSubmit={handleSubmitComment} className="mb-8">
              <div className="flex gap-4">
                <Avatar className="h-12 w-12">
                  <AvatarFallback className="bg-[#EC3B3B] text-white">
                    U
                  </AvatarFallback>
                </Avatar>
                <div className="flex-1">
                  <Textarea
                    placeholder="Share your thoughts on this article..."
                    value={newComment}
                    onChange={(e) => setNewComment(e.target.value)}
                    className="min-h-[100px] bg-[#DAE6EA]/5 border-[#DAE6EA]/20 text-[#DAE6EA] placeholder:text-[#DAE6EA]/50 focus:border-[#EC3B3B] focus:ring-[#EC3B3B] resize-none"
                  />
                  <div className="flex justify-end mt-3">
                    <Button
                      type="submit"
                      className="bg-[#EC3B3B] hover:bg-[#EC3B3B]/90 text-white border-0 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
                    >
                      <Send className="h-4 w-4 mr-2" />
                      Post Comment
                    </Button>
                  </div>
                </div>
              </div>
            </form>

            {/* Comments List */}
            <div className="space-y-6">
              {comments.map((comment) => (
                <div key={comment.id} className="fade-in-scale">
                  <div className="flex gap-4">
                    <Avatar className="h-10 w-10">
                      <AvatarFallback className="bg-[#DAE6EA] text-[#07153B]">
                        {comment.author.charAt(0)}
                      </AvatarFallback>
                    </Avatar>
                    <div className="flex-1">
                      <div className="bg-[#DAE6EA]/5 border border-[#DAE6EA]/10 rounded-xl p-4 mb-3">
                        <div className="flex items-center justify-between mb-2">
                          <h4 className="font-semibold text-[#DAE6EA]">{comment.author}</h4>
                          <span className="text-[#DAE6EA]/60 text-sm">{comment.timestamp}</span>
                        </div>
                        <p className="text-[#DAE6EA]/90 leading-relaxed">{comment.content}</p>
                      </div>

                      {/* Comment Actions */}
                      <div className="flex items-center gap-4 ml-4 mb-4">
                        <button
                          onClick={() => handleLikeComment(comment.id)}
                          className={`flex items-center gap-2 px-3 py-1 rounded-full transition-all duration-300 ${
                            comment.isLiked
                              ? 'bg-[#EC3B3B] text-white'
                              : 'bg-[#DAE6EA]/10 text-[#DAE6EA]/70 hover:bg-[#DAE6EA]/20'
                          }`}
                        >
                          <Heart className={`h-4 w-4 ${comment.isLiked ? 'fill-current' : ''}`} />
                          <span className="text-sm">{comment.likes}</span>
                        </button>
                        
                        <button
                          onClick={() => setShowReplyForm(showReplyForm === comment.id ? null : comment.id)}
                          className="flex items-center gap-2 px-3 py-1 rounded-full bg-[#DAE6EA]/10 text-[#DAE6EA]/70 hover:bg-[#DAE6EA]/20 transition-all duration-300"
                        >
                          <Reply className="h-4 w-4" />
                          <span className="text-sm">Reply</span>
                        </button>
                      </div>

                      {/* Reply Form */}
                      {showReplyForm === comment.id && (
                        <form onSubmit={(e) => handleSubmitReply(comment.id, e)} className="ml-4 mb-4">
                          <div className="flex gap-3">
                            <Avatar className="h-8 w-8">
                              <AvatarFallback className="bg-[#EC3B3B] text-white text-xs">
                                U
                              </AvatarFallback>
                            </Avatar>
                            <div className="flex-1">
                              <Textarea
                                placeholder="Write a reply..."
                                value={replyContent}
                                onChange={(e) => setReplyContent(e.target.value)}
                                className="min-h-[60px] bg-[#DAE6EA]/5 border-[#DAE6EA]/20 text-[#DAE6EA] placeholder:text-[#DAE6EA]/50 focus:border-[#EC3B3B] focus:ring-[#EC3B3B] resize-none text-sm"
                              />
                              <div className="flex justify-end gap-2 mt-2">
                                <Button
                                  type="button"
                                  variant="ghost"
                                  onClick={() => setShowReplyForm(null)}
                                  className="text-[#DAE6EA]/70 hover:text-[#DAE6EA]"
                                >
                                  Cancel
                                </Button>
                                <Button
                                  type="submit"
                                  size="sm"
                                  className="bg-[#EC3B3B] hover:bg-[#EC3B3B]/90 text-white"
                                >
                                  Reply
                                </Button>
                              </div>
                            </div>
                          </div>
                        </form>
                      )}

                      {/* Replies */}
                      {comment.replies.length > 0 && (
                        <div className="ml-4 space-y-3">
                          {comment.replies.map((reply) => (
                            <div key={reply.id} className="flex gap-3">
                              <Avatar className="h-8 w-8">
                                <AvatarFallback className="bg-[#EC3B3B] text-white text-xs">
                                  {reply.author.charAt(0)}
                                </AvatarFallback>
                              </Avatar>
                              <div className="flex-1">
                                <div className="bg-[#DAE6EA]/5 border border-[#DAE6EA]/10 rounded-lg p-3">
                                  <div className="flex items-center justify-between mb-1">
                                    <h5 className="font-medium text-[#DAE6EA] text-sm">{reply.author}</h5>
                                    <span className="text-[#DAE6EA]/60 text-xs">{reply.timestamp}</span>
                                  </div>
                                  <p className="text-[#DAE6EA]/90 text-sm leading-relaxed">{reply.content}</p>
                                </div>
                                <button
                                  onClick={() => handleLikeComment(reply.id, true, comment.id)}
                                  className={`flex items-center gap-1 px-2 py-1 rounded-full transition-all duration-300 mt-2 ${
                                    reply.isLiked
                                      ? 'bg-[#EC3B3B] text-white'
                                      : 'bg-[#DAE6EA]/10 text-[#DAE6EA]/70 hover:bg-[#DAE6EA]/20'
                                  }`}
                                >
                                  <Heart className={`h-3 w-3 ${reply.isLiked ? 'fill-current' : ''}`} />
                                  <span className="text-xs">{reply.likes}</span>
                                </button>
                              </div>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {comments.length === 0 && (
              <div className="text-center py-12">
                <MessageCircle className="h-16 w-16 text-[#DAE6EA]/30 mx-auto mb-4" />
                <p className="text-[#DAE6EA]/60 text-lg">No comments yet</p>
                <p className="text-[#DAE6EA]/40 text-sm mt-2">Be the first to share your thoughts!</p>
              </div>
            )}
          </div>
      
      </div>
    </section>
  );
}
