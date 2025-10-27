export type Post = {
    id: number;
    title: string;
    description: string;
    content?: string;
    author?: string;
    publishDate: string;
    category: string;
    image: string;
    slug: string;
    likes?: number;
    dislikes?: number;
    featured?: boolean;
  };

// Content formatting function to enhance readability
export function formatBlogContent(content: string): string {
  if (!content) return '';

  let formatted = content;

  // 1. Clean up extra whitespace and normalize line breaks
  formatted = formatted
    .replace(/\r\n/g, '\n')
    .replace(/\r/g, '\n')
    .replace(/\n{3,}/g, '\n\n')
    .trim();

  // 2. Format headings (H1, H2, H3, etc.)
  formatted = formatted.replace(/<h1[^>]*>(.*?)<\/h1>/gi, '<h1 class="text-4xl font-bold text-[#DAE6EA] mb-6 mt-8">$1</h1>');
  formatted = formatted.replace(/<h2[^>]*>(.*?)<\/h2>/gi, '<h2 class="text-3xl font-bold text-[#DAE6EA] mb-4 mt-6">$1</h2>');
  formatted = formatted.replace(/<h3[^>]*>(.*?)<\/h3>/gi, '<h3 class="text-2xl font-bold text-[#DAE6EA] mb-3 mt-5">$1</h3>');
  formatted = formatted.replace(/<h4[^>]*>(.*?)<\/h4>/gi, '<h4 class="text-xl font-bold text-[#DAE6EA] mb-2 mt-4">$1</h4>');
  formatted = formatted.replace(/<h5[^>]*>(.*?)<\/h5>/gi, '<h5 class="text-lg font-bold text-[#DAE6EA] mb-2 mt-3">$1</h5>');
  formatted = formatted.replace(/<h6[^>]*>(.*?)<\/h6>/gi, '<h6 class="text-base font-bold text-[#DAE6EA] mb-2 mt-3">$1</h6>');

  // 3. Format paragraphs with proper spacing and styling
  formatted = formatted.replace(/<p[^>]*>(.*?)<\/p>/gi, '<p class="text-[#DAE6EA]/90 leading-relaxed mb-4">$1</p>');

  // 4. Format unordered lists
  formatted = formatted.replace(/<ul[^>]*>([\s\S]*?)<\/ul>/gi, '<ul class="list-disc list-inside text-[#DAE6EA]/90 mb-4 space-y-2">$1</ul>');
  formatted = formatted.replace(/<li[^>]*>(.*?)<\/li>/gi, '<li class="leading-relaxed">$1</li>');

  // 5. Format ordered lists
  formatted = formatted.replace(/<ol[^>]*>([\s\S]*?)<\/ol>/gi, '<ol class="list-decimal list-inside text-[#DAE6EA]/90 mb-4 space-y-2">$1</ol>');

  // 6. Format strong/bold text
  formatted = formatted.replace(/<strong[^>]*>(.*?)<\/strong>/gi, '<strong class="font-bold text-[#EC3B3B]">$1</strong>');
  formatted = formatted.replace(/<b[^>]*>(.*?)<\/b>/gi, '<strong class="font-bold text-[#EC3B3B]">$1</strong>');

  // 7. Format italic/emphasis text
  formatted = formatted.replace(/<em[^>]*>(.*?)<\/em>/gi, '<em class="italic text-[#DAE6EA]">$1</em>');
  formatted = formatted.replace(/<i[^>]*>(.*?)<\/i>/gi, '<em class="italic text-[#DAE6EA]">$1</em>');

  // 8. Format links
  formatted = formatted.replace(/<a[^>]*href="([^"]*)"[^>]*>(.*?)<\/a>/gi, '<a href="$1" class="text-[#EC3B3B] hover:text-[#EC3B3B]/80 underline transition-colors duration-200" target="_blank" rel="noopener noreferrer">$2</a>');

  // 9. Format blockquotes
  formatted = formatted.replace(/<blockquote[^>]*>([\s\S]*?)<\/blockquote>/gi, '<blockquote class="border-l-4 border-[#EC3B3B] pl-4 py-2 my-4 bg-[#07153B]/50 text-[#DAE6EA]/80 italic">$1</blockquote>');

  // 10. Format code blocks
  formatted = formatted.replace(/<pre[^>]*>([\s\S]*?)<\/pre>/gi, '<pre class="bg-[#07153B] border border-[#DAE6EA]/20 rounded-lg p-4 my-4 overflow-x-auto"><code class="text-[#DAE6EA] text-sm">$1</code></pre>');
  formatted = formatted.replace(/<code[^>]*>(.*?)<\/code>/gi, '<code class="bg-[#07153B] border border-[#DAE6EA]/20 rounded px-2 py-1 text-[#EC3B3B] text-sm font-mono">$1</code>');

  // 11. Format images with responsive classes
  formatted = formatted.replace(/<img[^>]*src="([^"]*)"[^>]*alt="([^"]*)"[^>]*>/gi, '<img src="$1" alt="$2" class="w-full h-auto rounded-lg my-4 shadow-lg" loading="lazy" />');

  // 12. Format tables
  formatted = formatted.replace(/<table[^>]*>([\s\S]*?)<\/table>/gi, '<div class="overflow-x-auto my-4"><table class="w-full border-collapse border border-[#DAE6EA]/20">$1</table></div>');
  formatted = formatted.replace(/<th[^>]*>(.*?)<\/th>/gi, '<th class="border border-[#DAE6EA]/20 bg-[#07153B] text-[#DAE6EA] font-bold p-3 text-left">$1</th>');
  formatted = formatted.replace(/<td[^>]*>(.*?)<\/td>/gi, '<td class="border border-[#DAE6EA]/20 text-[#DAE6EA]/90 p-3">$1</td>');

  // 13. Handle plain text paragraphs (if no HTML tags are present)
  if (!formatted.includes('<p>') && !formatted.includes('<div>')) {
    // Split by double line breaks and wrap in paragraph tags
    const paragraphs = formatted.split('\n\n').filter(p => p.trim());
    formatted = paragraphs.map(p => `<p class="text-[#DAE6EA]/90 leading-relaxed mb-4">${p.trim()}</p>`).join('');
  }

  // 14. Handle bullet points in plain text
  formatted = formatted.replace(/^[\s]*[-•*]\s+(.+)$/gm, '<li class="leading-relaxed">$1</li>');
  
  // 15. Wrap consecutive list items in ul tags
  formatted = formatted.replace(/(<li class="leading-relaxed">[\s\S]*?<\/li>(\s*<li class="leading-relaxed">[\s\S]*?<\/li>)*)/g, '<ul class="list-disc list-inside text-[#DAE6EA]/90 mb-4 space-y-2">$1</ul>');

  // 16. Handle numbered lists in plain text
  formatted = formatted.replace(/^[\s]*\d+\.\s+(.+)$/gm, '<li class="leading-relaxed">$1</li>');
  
  // 17. Wrap consecutive numbered list items in ol tags
  formatted = formatted.replace(/(<li class="leading-relaxed">[\s\S]*?<\/li>(\s*<li class="leading-relaxed">[\s\S]*?<\/li>)*)/g, '<ol class="list-decimal list-inside text-[#DAE6EA]/90 mb-4 space-y-2">$1</ol>');

  // 18. Final cleanup - remove extra whitespace
  formatted = formatted.replace(/\n\s*\n/g, '\n').trim();

  return formatted;
}

// Utility function to safely render formatted HTML content
export function renderFormattedContent(content: string): { __html: string } {
  return { __html: formatBlogContent(content) };
}
  
  const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000';
  
  export async function getPosts(revalidate: number | false = 60): Promise<{ posts: Post[] }> {
    const opts: RequestInit & { next?: { revalidate?: number } } = {};
    if (revalidate === false) opts.cache = 'no-store';
    else opts.next = { revalidate };
    const res = await fetch(`${BASE_URL}/api/blog-posts`, opts);
    if (!res.ok) return { posts: [] };
    const data = await res.json();
    
    // Format content for all posts
    if (data.posts && Array.isArray(data.posts)) {
      data.posts = data.posts.map((post: Post) => ({
        ...post,
        content: post.content ? formatBlogContent(post.content) : post.content
      }));
    }
    
    return data;
  }
  
  export async function getPost(slug: string, revalidate: number | false = 60): Promise<Post | null> {
    const opts: RequestInit & { next?: { revalidate?: number } } = {};
    if (revalidate === false) opts.cache = 'no-store';
    else opts.next = { revalidate };
    const res = await fetch(`${BASE_URL}/api/blog-posts/${slug}`, opts);
    if (!res.ok) return null;
    const { post } = await res.json();
    
    // Format the content for better readability
    if (post && post.content) {
      post.content = formatBlogContent(post.content);
    }
    
    return post;
  }
  