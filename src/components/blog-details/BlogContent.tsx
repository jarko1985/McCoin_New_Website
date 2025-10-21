"use client";

import React, { useState, useEffect } from 'react';

interface BlogContentProps {
  content: string;
}

export default function BlogContent({ content }: BlogContentProps) {
  const [readingProgress, setReadingProgress] = useState(0);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
    
    const handleScroll = () => {
      const article = document.querySelector('.blog-content');
      if (article) {
        const scrollTop = window.scrollY;
        const docHeight = document.documentElement.scrollHeight - window.innerHeight;
        const scrollPercent = (scrollTop / docHeight) * 100;
        setReadingProgress(Math.min(scrollPercent, 100));
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <section className="py-6 relative">
      {/* Reading Progress Bar */}
      <div className="fixed top-0 left-0 w-full h-1 bg-[#DAE6EA]/10 z-50">
        <div 
          className="h-full bg-gradient-to-r from-[#EC3B3B] to-[#DAE6EA] transition-all duration-300 ease-out"
          style={{ width: `${readingProgress}%` }}
        />
      </div>

      <div className="xl:max-w-[70%] mx-auto px-4">
        <div className={`bg-[#07153B] border border-[#DAE6EA]/20 rounded-2xl p-6 md:p-8 shadow-2xl transition-all duration-1000 ${
          isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
        }`}>
           <div
             className="blog-content prose prose-lg max-w-none text-[#DAE6EA] tracking-wide
                 prose-headings:text-[#DAE6EA] prose-headings:font-bold prose-headings:mb-6 prose-headings:mt-12 prose-headings:tracking-wide prose-headings:relative
                 prose-h2:text-4xl prose-h2:text-[#EC3B3B] prose-h2:border-b-2 prose-h2:border-[#EC3B3B]/40 prose-h2:pb-4 prose-h2:mb-8 prose-h2:relative prose-h2:before:content-[''] prose-h2:before:absolute prose-h2:before:left-0 prose-h2:before:top-0 prose-h2:before:w-1 prose-h2:before:h-full prose-h2:before:bg-gradient-to-b prose-h2:before:from-[#EC3B3B] prose-h2:before:to-[#DAE6EA] prose-h2:before:rounded-full prose-h2:before:-ml-4
                 prose-h3:text-3xl prose-h3:text-[#DAE6EA] prose-h3:mt-8 prose-h3:mb-6 prose-h3:relative prose-h3:before:content-['•'] prose-h3:before:text-[#EC3B3B] prose-h3:before:text-2xl prose-h3:before:absolute prose-h3:before:-left-6 prose-h3:before:top-0
                 prose-h4:text-2xl prose-h4:text-[#DAE6EA] prose-h4:mt-6 prose-h4:mb-4 prose-h4:font-semibold prose-h4:bg-gradient-to-r prose-h4:from-[#EC3B3B]/20 prose-h4:to-transparent prose-h4:pl-4 prose-h4:py-2 prose-h4:rounded-l-lg prose-h4:border-l-4 prose-h4:border-[#DAE6EA]
                 prose-p:text-[#DAE6EA] prose-p:leading-relaxed prose-p:text-lg prose-p:opacity-90 prose-p:mb-6 prose-p:tracking-wide prose-p:indent-4 prose-p:first:indent-0
                 prose-a:text-[#EC3B3B] prose-a:no-underline prose-a:font-medium hover:prose-a:text-[#DAE6EA] prose-a:transition-all prose-a:duration-300 prose-a:relative prose-a:after:content-[''] prose-a:after:absolute prose-a:after:bottom-0 prose-a:after:left-0 prose-a:after:w-0 prose-a:after:h-0.5 prose-a:after:bg-[#DAE6EA] prose-a:after:transition-all prose-a:after:duration-300 hover:prose-a:after:w-full
                 prose-strong:text-[#DAE6EA] prose-strong:font-semibold prose-strong:opacity-100 prose-strong:bg-[#EC3B3B]/20 prose-strong:px-2 prose-strong:py-1 prose-strong:rounded prose-strong:relative prose-strong:before:content-[''] prose-strong:before:absolute prose-strong:before:inset-0 prose-strong:before:bg-gradient-to-r prose-strong:before:from-[#EC3B3B]/30 prose-strong:before:to-[#DAE6EA]/30 prose-strong:before:rounded prose-strong:before:-z-10
                 prose-em:text-[#DAE6EA] prose-em:not-italic prose-em:font-medium prose-em:bg-[#DAE6EA]/20 prose-em:px-2 prose-em:py-1 prose-em:rounded
                 prose-blockquote:border-l-4 prose-blockquote:border-[#EC3B3B] prose-blockquote:bg-gradient-to-r prose-blockquote:from-[#EC3B3B]/10 prose-blockquote:to-[#DAE6EA]/5 
                 prose-blockquote:text-[#DAE6EA] prose-blockquote:italic prose-blockquote:pl-8 prose-blockquote:py-6 prose-blockquote:pr-6
                 prose-blockquote:my-8 prose-blockquote:rounded-r-xl prose-blockquote:shadow-2xl prose-blockquote:tracking-wide prose-blockquote:relative prose-blockquote:before:content-['\\201C'] prose-blockquote:before:absolute prose-blockquote:before:top-4 prose-blockquote:before:left-4 prose-blockquote:before:text-4xl prose-blockquote:before:text-[#EC3B3B] prose-blockquote:before:font-serif prose-blockquote:before:opacity-50
                 prose-code:text-[#DAE6EA] prose-code:bg-gradient-to-r prose-code:from-[#DAE6EA]/10 prose-code:to-[#DAE6EA]/5 prose-code:px-3 prose-code:py-2 prose-code:rounded-lg prose-code:text-sm prose-code:font-mono prose-code:border prose-code:border-[#DAE6EA]/20 prose-code:shadow-sm
                 prose-pre:bg-gradient-to-br prose-pre:from-[#DAE6EA]/5 prose-pre:to-[#DAE6EA]/2 prose-pre:border prose-pre:border-[#DAE6EA]/20 prose-pre:rounded-xl prose-pre:p-6 prose-pre:shadow-xl prose-pre:overflow-x-auto
                 prose-ul:text-[#DAE6EA] prose-ul:opacity-90 prose-ul:my-6 prose-ul:space-y-3 prose-ul:pl-6
                 prose-ol:text-[#DAE6EA] prose-ol:opacity-90 prose-ol:my-6 prose-ol:space-y-3 prose-ol:pl-6
                 prose-li:text-[#DAE6EA] prose-li:leading-relaxed prose-li:opacity-90 prose-li:marker:text-[#EC3B3B] prose-li:tracking-wide prose-li:relative prose-li:pl-2 prose-li:before:content-[''] prose-li:before:absolute prose-li:before:left-0 prose-li:before:top-2 prose-li:before:w-1 prose-li:before:h-1 prose-li:before:bg-[#DAE6EA] prose-li:before:rounded-full
                 prose-table:w-full prose-table:border-collapse prose-table:my-12 prose-table:shadow-2xl prose-table:rounded-xl prose-table:overflow-hidden prose-table:backdrop-blur-sm
                 prose-thead:bg-gradient-to-r prose-thead:from-[#EC3B3B] prose-thead:to-[#EC3B3B]/80 prose-thead:shadow-lg
                 prose-th:text-[#DAE6EA] prose-th:font-bold prose-th:text-left prose-th:p-6 prose-th:border-b-2 prose-th:border-[#DAE6EA] prose-th:tracking-wider prose-th:text-lg prose-th:relative prose-th:after:content-[''] prose-th:after:absolute prose-th:after:bottom-0 prose-th:after:left-0 prose-th:after:right-0 prose-th:after:h-0.5 prose-th:after:bg-gradient-to-r prose-th:after:from-[#DAE6EA] prose-th:after:to-[#EC3B3B]
                 prose-tbody:bg-gradient-to-b prose-tbody:from-[#DAE6EA]/5 prose-tbody:to-[#DAE6EA]/2
                 prose-tr:border-b prose-tr:border-[#DAE6EA]/10 hover:prose-tr:bg-[#DAE6EA]/10 prose-tr:transition-all prose-tr:duration-300 prose-tr:group
                 prose-td:text-[#DAE6EA] prose-td:p-6 prose-td:opacity-90 prose-td:tracking-wide prose-td:group-hover:opacity-100 prose-td:transition-opacity prose-td:duration-300
                 fade-in-scale
                 [&_table]:border [&_table]:border-[#DAE6EA]/20 [&_table]:rounded-xl [&_table]:my-12 [&_table]:overflow-hidden [&_table]:shadow-2xl
                 [&_thead]:bg-gradient-to-r [&_thead]:from-[#EC3B3B] [&_thead]:to-[#EC3B3B]/80 [&_thead]:shadow-lg
                 [&_th]:text-[#DAE6EA] [&_th]:font-bold [&_th]:text-left [&_th]:p-6 [&_th]:border-b-2 [&_th]:border-[#DAE6EA] [&_th]:tracking-wider [&_th]:text-lg
                 [&_tbody]:bg-gradient-to-b [&_tbody]:from-[#DAE6EA]/5 [&_tbody]:to-[#DAE6EA]/2
                 [&_tr]:border-b [&_tr]:border-[#DAE6EA]/10 [&_tr:hover]:bg-[#DAE6EA]/10 [&_tr]:transition-all [&_tr]:duration-300 [&_tr]:group
                 [&_td]:text-[#DAE6EA] [&_td]:p-6 [&_td]:opacity-90 [&_td]:align-top [&_td]:tracking-wide [&_td]:group-hover:opacity-100 [&_td]:transition-opacity [&_td]:duration-300
                 [&_ol]:list-decimal [&_ol]:list-inside [&_ol]:space-y-4
                 [&_ol_li]:relative [&_ol_li]:pl-4 [&_ol_li]:before:content-[''] [&_ol_li]:before:absolute [&_ol_li]:before:left-0 [&_ol_li]:before:top-2 [&_ol_li]:before:w-2 [&_ol_li]:before:h-2 [&_ol_li]:before:bg-[#EC3B3B] [&_ol_li]:before:rounded-full
                 [&_ul]:list-disc [&_ul]:list-inside [&_ul]:space-y-3
                 [&_ul_li]:relative [&_ul_li]:pl-4 [&_ul_li]:before:content-[''] [&_ul_li]:before:absolute [&_ul_li]:before:left-0 [&_ul_li]:before:top-2 [&_ul_li]:before:w-1.5 [&_ul_li]:before:h-1.5 [&_ul_li]:before:bg-[#DAE6EA] [&_ul_li]:before:rounded-full"
             dangerouslySetInnerHTML={{ __html: content }}
           />
        </div>
      </div>
    </section>
  );
}