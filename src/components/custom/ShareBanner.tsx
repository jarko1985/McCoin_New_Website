"use client";
import { useLocale } from "next-intl";
import { usePathname } from "next/navigation";
import {
  FacebookShareButton,
  WhatsappShareButton,
  LinkedinShareButton,
  TelegramShareButton,
  FacebookIcon,
  TwitterShareButton,
  XIcon,
  TelegramIcon,
  WhatsappIcon,
  LinkedinIcon,
} from "react-share";

interface ShareBannerProps {
  title?: string;
}

const ShareBanner = ({ title }: ShareBannerProps) => {
  const pathname = usePathname();
  const locale = useLocale();
  const shareUrl = `http://localhost:3000${pathname}`;

  return (
    <div className="flex gap-3 items-center p-3 justify-end">
      <FacebookShareButton
        url={shareUrl}
        title={title}
        className="Demo__some-network__share-button"
      >
        <FacebookIcon size={32} round className="hover:-translate-y-2 transition-all duration-500" />
      </FacebookShareButton>

      <TwitterShareButton
        url={shareUrl}
        title={title}
        className="Demo__some-network__share-button"
      >
        <XIcon size={32} round className="hover:-translate-y-2 transition-all duration-500" />
      </TwitterShareButton>

      <TelegramShareButton
        url={shareUrl}
        title={title}
        className="Demo__some-network__share-button"
      >
        <TelegramIcon size={32} round className="hover:-translate-y-2 transition-all duration-500" />
      </TelegramShareButton>

      <WhatsappShareButton
        url={shareUrl}
        title={title}
        separator=":: "
        className="Demo__some-network__share-button"
      >
        <WhatsappIcon size={32} round className="hover:-translate-y-2 transition-all duration-500" />
      </WhatsappShareButton>

      <LinkedinShareButton
        url={shareUrl}
        title={title}
        summary={title}
        source="YourWebsiteName"
        className="Demo__some-network__share-button"
      >
        <LinkedinIcon size={32} round className="hover:-translate-y-2 transition-all duration-500" />
      </LinkedinShareButton>
    </div>
  );
};

export default ShareBanner;
