import Image from "next/image";
import LOGO from "../../../public/images/logo.svg";
import { FooterLinks } from "../../../utils/data";
import Link from "next/link";
import { Facebook, Instagram, Linkedin } from "lucide-react";

const Footer = () => {
  return (
    <footer className="container xl:w-[70%] mx-auto flex flex-col gap-y-16 bg-[#050e27]! p-12 z-10 rounded-lg relative my-12">
      <div className="bg-[#050e27]! flex flex-col lg:flex-row items-center justify-center lg:justify-between gap-y-6 lg:gap-y-0">
        <div className="bg-[#050E27]" style={{ backgroundColor: "#050e27" }}>
          <Image
            src={LOGO}
            alt="Description"
            width={200}
            height={200}
            className="bg-[#050e27]!"
          />
        </div>
        <div className="flex gap-5 bg-[#050e27]!">
          <Link className="bg-[#050e27]!" target="_blank" href="https://www.facebook.com/mccoin">
            <Facebook
              size={30}
              className="text-white bg-[#050e27]! transition-all duration-300 hover:text-[#EC3B3B] hover:-translate-y-1"
            />
          </Link>
          <Link className="bg-[#050e27]!" target="_blank" href="https://www.instagram.com/mccoin">
            <Instagram
              size={30}
              className="text-white bg-[#050e27]! transition-all duration-300 hover:text-[#EC3B3B] hover:-translate-y-1"
            />
          </Link>
          <Link className="bg-[#050e27]!" target="_blank" href="https://linkedin.com/mccoin" >
            <Linkedin
              size={30}
              className="bg-[#050e27]! text-white transition-all duration-300 hover:text-[#EC3B3B] hover:-translate-y-1"
            />
          </Link>
        </div>
      </div>
      <div className="flex flex-col lg:flex-row lg:justify-between justify-center items-center gap-y-6 lg:gap-y-0 bg-[#050e27]!">
        <p className="text-gray-300 text-sm bg-[#050e27]!">
          © 2025 - McCoin.com. All rights reserved.
        </p>
        <div className="bg-[#050e27]!">
          <ul className="flex flex-col sm:flex-row justify-center items-center sm:justify-between gap-3 bg-[#050e27]!">
            {FooterLinks.map((item) => {
              return (
                <li className="bg-[#050e27]! transition-all duration-300  hover:-translate-y-1" key={item.id}>
                  <Link
                    className="bg-[#050e27]! text-[#DAE6EA] text-sm hover:text-[#EC3B3B]"
                    href={item.href}
                  >
                    {item.label}
                  </Link>
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
