import { FooterLinks } from "../../../utils/data";
import Link from "next/link";
import {
  Facebook,
  Instagram,
  Linkedin,
  Info,
  TrendingUp,
  BookOpen,
  FileText,
  Bookmark,
  Briefcase,
  Home,
  User,
  MessageSquare,
  Newspaper,
  Podcast,
  Settings,
  PlusCircle,
  Wallet,
  CircleHelp,
  Mail,
} from "lucide-react";
import AnimatedLogo from "./AnimatedLogo";
const iconComponents = {
  Info,
  TrendingUp,
  BookOpen,
  FileText,
  Bookmark,
  Briefcase,
  Home,
  User,
  MessageSquare,
  Newspaper,
  Podcast,
  Settings,
  PlusCircle,
  Wallet,
  CircleHelp,
  Mail,
};
const Footer = () => {
  const getIconComponent = (iconName?: string) => {
    if (!iconName) return null;
    const Icon = iconComponents[iconName as keyof typeof iconComponents];
    return Icon ? <Icon size={20} /> : null;
  };

  return (
    <footer className="container xl:w-[70%] mx-auto flex flex-col gap-y-16 bg-[#050e27] p-10 z-10 rounded-lg relative my-12">
     <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-8">
      {FooterLinks.map((item) => (
        <div key={item.id} className="flex flex-col gap-4">
          <Link
            href={"#"}
            className="text-[#DAE6EA] text-[1rem] font-semibold hover:text-[#EC3B3B] transition-all duration-300 hover:-translate-y-1 flex items-center gap-1"
          >
            {getIconComponent(item.iconName)}
            {item.label}
          </Link>

          {item.subLinks && (
            <div className="flex flex-col gap-3">
              {item.subLinks.map((subItem) => (
                <Link
                  key={subItem.href}
                  href={subItem.href}
                  className="text-gray-300 text-sm hover:text-[#EC3B3B] transition-all duration-300 hover:translate-x-1 flex items-center"
                >
                  {subItem.label}
                </Link>
              ))}
            </div>
          )}
        </div>
      ))}
    </div>
      <div className="flex flex-col lg:flex-row items-center justify-center lg:justify-between gap-y-6 lg:gap-y-0">
        <div className="bg-[#050E27]">
          <AnimatedLogo />
        </div>

        <div className="flex flex-col lg:flex-row lg:justify-between justify-center items-center gap-y-6 lg:gap-y-0">
          <p className="text-gray-300 text-sm">
            © 2025 - McCoin.com. All rights reserved.
          </p>
        </div>
        <div className="flex gap-5">
          <Link target="_blank" href="https://www.facebook.com/mccoin">
            <Facebook
              size={30}
              className="text-white transition-all duration-300 hover:text-[#EC3B3B] hover:-translate-y-1"
            />
          </Link>
          <Link target="_blank" href="https://www.instagram.com/mccoin">
            <Instagram
              size={30}
              className="text-white transition-all duration-300 hover:text-[#EC3B3B] hover:-translate-y-1"
            />
          </Link>
          <Link target="_blank" href="https://linkedin.com/mccoin">
            <Linkedin
              size={30}
              className="text-white transition-all duration-300 hover:text-[#EC3B3B] hover:-translate-y-1"
            />
          </Link>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
