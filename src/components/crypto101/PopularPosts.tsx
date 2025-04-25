// components/PopularPosts.tsx
'use client';

import Link from "next/link";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { Card, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { PopularPostsData } from "../../../utils/data";

export default function PopularPosts  ()  {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);



  return (
    <section className="py-12 px-4 sm:px-6 lg:px-8" style={{ backgroundColor: '#07153B' }}>
      <div className="max-w-7xl mx-auto">
      <h2 className="text-3xl font-bold text-white mb-8 pl-6 relative">
        <span className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-8 bg-white rounded-sm"></span>
        Popular Posts
      </h2>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {PopularPostsData.map((post) => (
            <Link href={`/posts/${post.id}`} key={post.id} className="group relative">
              <motion.div
                className="h-full"
                whileHover={{ 
                  y: -10,
                }}
                transition={{ 
                  type: "spring",
                  stiffness: 300,
                  damping: 10
                }}
              >
                <Card className="h-full bg-[#07153B] hover:rounded-lg border border-[#DAE6EA]/20 overflow-hidden shadow-lg group-hover:shadow-xl transition-all duration-300 p-0">
                  {/* Full-width image at top - no padding */}
                  <div className={`h-40 w-full ${post.bg} bg-cover bg-center relative overflow-hidden`}>
                    {/* Client-side only particles to prevent hydration errors */}
                    {isClient && (
                      <div className="absolute inset-0 overflow-hidden">
                        {[...Array(6)].map((_, i) => (
                          <motion.span
                            key={i}
                            className="absolute text-white opacity-0 group-hover:opacity-100"
                            initial={{ 
                              x: Math.random() * 100,
                              y: Math.random() * 100,
                              rotate: Math.random() * 360
                            }}
                            animate={{
                              x: Math.random() * 100,
                              y: Math.random() * 100,
                              rotate: Math.random() * 360,
                              transition: {
                                duration: 3 + Math.random() * 5,
                                repeat: Infinity,
                                repeatType: "reverse"
                              }
                            }}
                            style={{
                              fontSize: `${Math.random() * 16 + 8}px`,
                              left: `${Math.random() * 100}%`,
                              top: `${Math.random() * 100}%`,
                            }}
                          >
                            {['₿', 'Ξ', '⛓'][i % 3]}
                          </motion.span>
                        ))}
                      </div>
                    )}
                  </div>
                  
                  {/* Card content - now with proper padding */}
                  <CardContent className="p-4">
                    <span className="text-xs font-semibold text-[#EC3B3B] mb-1 block">
                      {post.category}
                    </span>
                    <CardTitle className="text-[#DAE6EA] group-hover:text-white transition-colors duration-300 text-lg">
                      {post.title}
                    </CardTitle>
                    <CardDescription className="text-[#DAE6EA]/80 group-hover:text-[#DAE6EA] transition-colors duration-300 mt-1">
                      {post.description}
                    </CardDescription>
                    <div className="text-xs text-[#DAE6EA]/60 mt-3">
                      {post.date}
                    </div>
                  </CardContent>
                  
                  {/* Hover border effect */}
                  <div className="absolute inset-0 border border-transparent group-hover:border-white transition-all duration-500 pointer-events-none" />
                </Card>
              </motion.div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};