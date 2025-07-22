'use client';

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogClose,
} from '@/components/ui/dialog';
import { useState } from 'react';

export default function VideoModal({
  videoUrl,
  title,
  trigger,
}: {
  videoUrl: string;
  title: string;
  trigger: React.ReactNode;
}) {
  const [open, setOpen] = useState(false);

  // Extract YouTube video ID from URL
  const videoId = videoUrl.split('v=')[1]?.split('&')[0];

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>{trigger}</DialogTrigger>

      <DialogContent className="max-w-4xl bg-[#07153B] border border-[#DAE6EA]/20 text-[#DAE6EA]">
        <DialogHeader>
          <DialogTitle className="text-[#DAE6EA] text-xl">{title}</DialogTitle>
        </DialogHeader>

        <div className="aspect-video w-full rounded-md overflow-hidden">
          <iframe
            src={`https://www.youtube.com/embed/${videoId}?autoplay=1`}
            title={title}
            className="w-full h-full rounded-md"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          />
        </div>

        {/* <DialogClose className="absolute top-2 right-2 text-[#EC3B3B] text-lg">✕</DialogClose> */}
      </DialogContent>
    </Dialog>
  );
}
