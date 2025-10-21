export interface BlogPost {
  id: number;
  title: string;
  description: string;
  content: string;
  author: string;
  publishDate: string;
  category: string;
  image: string;
  slug: string;
  likes: number;
  dislikes: number;
}

export interface Comment {
  id: number;
  author: string;
  avatar: string;
  content: string;
  timestamp: string;
  likes: number;
  replies: Comment[];
  isLiked: boolean;
}

export interface RelatedBlog {
  id: number;
  title: string;
  description: string;
  date: string;
  category: string;
  image: string;
  slug: string;
}
