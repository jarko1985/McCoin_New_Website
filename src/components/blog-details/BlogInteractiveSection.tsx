"use client";

import React from 'react';
import LikeDislikeButtons from './LikeDislikeButtons';
import SocialShareButtons from './SocialShareButtons';
import CommentsSection from './CommentsSection';
import RelatedBlogs from './RelatedBlogs';

interface BlogInteractiveSectionProps {
  blogId: number;
  initialLikes: number;
  initialDislikes: number;
  currentUrl: string;
  title: string;
  category: string;
}

export default function BlogInteractiveSection({
  blogId,
  initialLikes,
  initialDislikes,
  currentUrl,
  title,
  category
}: BlogInteractiveSectionProps) {
  return (
    <>
      {/* Like/Dislike Buttons */}
      <LikeDislikeButtons
        initialLikes={initialLikes}
        initialDislikes={initialDislikes}
        onLike={() => {
          // Handle like action
          console.log('Liked blog:', blogId);
        }}
        onDislike={() => {
          // Handle dislike action
          console.log('Disliked blog:', blogId);
        }}
      />

      {/* Social Share Buttons */}
      <SocialShareButtons
        url={currentUrl}
        title={title}
        description={`Read this article about ${category.toLowerCase()} on DHS.exchange`}
      />

      {/* Comments Section */}
      <CommentsSection blogId={blogId} />

      {/* Related Blogs */}
      <RelatedBlogs currentBlogId={blogId} category={category} />
    </>
  );
}
