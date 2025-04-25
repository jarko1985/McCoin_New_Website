"use client";

import Link from "next/link";
import Image from "next/image";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Play, MessageSquare, Calendar } from "lucide-react";

export default function VideoPosts() {
  const videos = [
    {
      id: 1,
      title: "Bitcoin Fundamentals",
      description: "Understanding the pioneer cryptocurrency",
      duration: "12:45",
      category: "Beginner",
      thumbnail: "/images/video_cover1.avif"
    },
    {
      id: 2,
      title: "Smart Contracts Explained",
      description: "How they're revolutionizing agreements",
      duration: "18:30",
      category: "Intermediate",
      thumbnail: "/images/video_cover2.avif"
    },
    {
      id: 3, 
      title: "DeFi Deep Dive",
      description: "Decentralized finance ecosystem",
      duration: "22:15",
      category: "Advanced",
      thumbnail: "/images/video_cover3.avif"
    }
  ];

  const getCategoryColor = (category: string) => {
    switch (category) {
      case "Beginner":
        return "#EC3B3B";
      case "Intermediate":
        return "#DAE6EA";
      case "Advanced":
        return "#FFFFFF";
      default:
        return "#DAE6EA";
    }
  };

  const [meta, setMeta] = useState<{ date: string; comments: number }[]>([]);

  useEffect(() => {
    const generateMeta = videos.map(() => ({
      date: new Date(Date.now() - Math.random() * 10000000000).toLocaleDateString(),
      comments: Math.floor(Math.random() * 100)
    }));
    setMeta(generateMeta);
  }, []);

  return (
    <section className="py-12 px-4 sm:px-6 lg:px-8" style={{ backgroundColor: "#07153B" }}>
      <div className="max-w-7xl mx-auto">
        <h2 className="text-3xl font-bold text-center mb-8 text-[#DAE6EA]">Featured Videos</h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {videos.map((video, index) => (
            <Link href={`/videos/${video.id}`} key={video.id} className="group relative">
              <motion.div
                className="h-full"
                whileHover={{ y: -5 }}
                transition={{ type: "spring", stiffness: 400, damping: 15 }}
              >
                <Card className="h-full bg-[#07153B] border border-[#DAE6EA]/20 overflow-hidden shadow-lg group-hover:shadow-xl transition-all duration-300 pt-0">
                  <div className="relative h-48 w-full bg-gradient-to-br from-[#07153B] to-[#0a1f4d] overflow-hidden">
                    <Image
                      src={video.thumbnail}
                      alt={video.title}
                      fill
                      className="object-cover brightness-75 group-hover:brightness-100 transition-all duration-500"
                    />

                    <motion.div
                      className="absolute inset-0 flex items-center justify-center"
                      initial={{ opacity: 0.8 }}
                      whileHover={{ opacity: 1, transition: { duration: 0.3 } }}
                    >
                      <div className="relative z-10">
                        <motion.div
                          className="bg-[#EC3B3B]/90 rounded-full p-4 backdrop-blur-sm"
                          initial={{ scale: 1 }}
                          whileHover={{
                            scale: 1.1,
                            transition: {
                              type: "spring",
                              stiffness: 500,
                              damping: 15
                            }
                          }}
                        >
                          <Play className="h-6 w-6 text-white fill-current" />
                        </motion.div>
                      </div>

                      {[1, 2, 3].map((i) => (
                        <motion.div
                          key={i}
                          className="absolute inset-0 rounded-full border-2 border-[#EC3B3B]"
                          animate={{
                            scale: [1, 1.5 + i * 0.2],
                            opacity: [0.6, 0],
                            transition: {
                              duration: 2 + i,
                              repeat: Infinity,
                              ease: "easeOut"
                            }
                          }}
                        />
                      ))}
                    </motion.div>

                    <div className="absolute bottom-2 right-2 bg-black/70 px-2 py-1 rounded text-xs text-[#DAE6EA]">
                      {video.duration}
                    </div>
                  </div>

                  <CardContent className="p-4">
                    <span
                      className="text-xs font-semibold mb-2 inline-block px-2 py-1 rounded-full"
                      style={{
                        backgroundColor: `${getCategoryColor(video.category)}30`,
                        color: getCategoryColor(video.category)
                      }}
                    >
                      {video.category}
                    </span>
                    <h3 className="text-xl font-bold text-[#DAE6EA] group-hover:text-white transition-colors duration-300">
                      {video.title}
                    </h3>
                    <p className="text-[#DAE6EA]/80 mt-2 group-hover:text-[#DAE6EA] transition-colors duration-300">
                      {video.description}
                    </p>
                    {meta[index] && (
                      <div className="flex items-center gap-4 text-[#DAE6EA]/70 text-xs mt-4">
                        <span className="inline-flex items-center gap-1">
                          <Calendar className="w-4 h-4" /> {meta[index].date}
                        </span>
                        <span className="inline-flex items-center gap-1">
                          <MessageSquare className="w-4 h-4" /> {meta[index].comments} comments
                        </span>
                      </div>
                    )}
                  </CardContent>

                  <CardFooter className="px-4 pb-4">
                    <motion.div
                      className="h-0.5 bg-[#EC3B3B]"
                      initial={{ width: 0 }}
                      whileHover={{ width: "100%", transition: { duration: 0.6, ease: "easeOut" } }}
                    />
                  </CardFooter>
                </Card>
              </motion.div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}