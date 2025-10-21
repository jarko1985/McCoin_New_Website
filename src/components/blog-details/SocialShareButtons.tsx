"use client";

import React from 'react';
import {
    FacebookShareButton,
    TwitterShareButton,
    LinkedinShareButton,
    WhatsappShareButton,
    TelegramShareButton,
    EmailShareButton,
    FacebookIcon,
    TwitterIcon,
    LinkedinIcon,
    WhatsappIcon,
    TelegramIcon,
    EmailIcon
} from 'react-share';
import { Button } from '@/components/ui/button';
import { Share2, Copy, Check } from 'lucide-react';
import { useState } from 'react';

interface SocialShareButtonsProps {
    url: string;
    title: string;
    description: string;
}

export default function SocialShareButtons({ url, title, description }: SocialShareButtonsProps) {
    const [copied, setCopied] = useState(false);

    const handleCopyLink = async () => {
        try {
            await navigator.clipboard.writeText(url);
            setCopied(true);
            setTimeout(() => setCopied(false), 2000);
        } catch (err) {
            console.error('Failed to copy link:', err);
        }
    };

    const shareButtons = [
        {
            component: FacebookShareButton,
            icon: FacebookIcon,
            color: 'hover:bg-blue-600',
            label: 'Facebook'
        },
        {
            component: TwitterShareButton,
            icon: TwitterIcon,
            color: 'hover:bg-sky-500',
            label: 'Twitter'
        },
        {
            component: LinkedinShareButton,
            icon: LinkedinIcon,
            color: 'hover:bg-blue-700',
            label: 'LinkedIn'
        },
        {
            component: WhatsappShareButton,
            icon: WhatsappIcon,
            color: 'hover:bg-green-600',
            label: 'WhatsApp'
        },
        {
            component: TelegramShareButton,
            icon: TelegramIcon,
            color: 'hover:bg-blue-500',
            label: 'Telegram'
        },
        {
            component: EmailShareButton,
            icon: EmailIcon,
            color: 'hover:bg-gray-600',
            label: 'Email'
        }
    ];

    return (
        <section className="py-2">
            <div className="xl:max-w-[70%] mx-auto">

                <div className="bg-[#07153B] border border-[#DAE6EA]/20 rounded-2xl p-8 shadow-xl">
                    <div className="text-center mb-8">
                        <h3 className="text-2xl font-bold text-[#DAE6EA] mb-2 flex items-center justify-center gap-2">
                            <Share2 className="h-6 w-6 text-[#EC3B3B] mr-2" />
                            Share this Article
                        </h3>
                        <p className="text-[#DAE6EA]/70">Help others discover this valuable content</p>
                    </div>

                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 mb-8">
                        {shareButtons.map(({ component: ShareComponent, icon: Icon, color, label }, index) => (
                            <ShareComponent
                                key={label}
                                url={url}
                                title={title}
                                summary={description}
                                className={`group flex flex-col items-center gap-3 p-4 rounded-xl bg-[#DAE6EA]/5 border border-[#DAE6EA]/10 hover:border-[#DAE6EA]/30 transition-all duration-300 transform hover:scale-105 ${color} fade-in-scale`}
                                style={{ animationDelay: `${index * 0.1}s` }}
                            >
                                <div className="w-12 h-12 rounded-full bg-[#DAE6EA]/10 flex items-center justify-center group-hover:bg-[#DAE6EA]/20 transition-colors duration-300">
                                    <Icon size={24} round />
                                </div>
                                <span className="text-[#DAE6EA] text-sm font-medium">{label}</span>
                            </ShareComponent>
                        ))}
                    </div>

                    <div className="border-t border-[#DAE6EA]/10 pt-6">
                        <div className="flex items-center gap-4">
                            <div className="flex-1">
                                <input
                                    type="text"
                                    value={url}
                                    readOnly
                                    className="w-full px-4 py-3 bg-[#DAE6EA]/5 border border-[#DAE6EA]/10 rounded-xl text-[#DAE6EA]/90 focus:border-[#EC3B3B] focus:ring-[#EC3B3B] transition-all duration-300"
                                />
                            </div>
                            <Button
                                onClick={handleCopyLink}
                                className={`px-6 py-3 rounded-xl transition-all duration-300 transform hover:scale-105 ${copied
                                        ? 'bg-[#EC3B3B] text-white'
                                        : 'bg-[#EC3B3B] text-white hover:bg-[#EC3B3B]/90'
                                    }`}
                            >
                                {copied ? (
                                    <>
                                        <Check className="h-4 w-4 mr-2" />
                                        Copied!
                                    </>
                                ) : (
                                    <>
                                        <Copy className="h-4 w-4 mr-2" />
                                        Copy Link
                                    </>
                                )}
                            </Button>
                        </div>
                    </div>
                </div>

            </div>
        </section>
    );
}
