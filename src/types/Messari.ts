export interface NewsItem {
    id: string;
    title: string;
    content: string;
    url: string;
    author: {
      name: string;
    };
    published_at: string;
    tags: string[];
    previewImage:string
  }