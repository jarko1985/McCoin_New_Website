import Image from "next/image";
import LOGO from "../../../public/images/logo1.png";
import Link from "next/link";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "../ui/navigation-menu";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "../ui/sheet";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Button } from "../ui/button";
import LangSwitcher from "./LangSwitcher";
import { Menu } from "lucide-react";
import { NAV_DATA } from "../../../utils/data";
import { TbArticle, TbDeviceAnalytics } from "react-icons/tb";
import { FaBlog, FaGraduationCap, FaHandsHelping, FaPodcast } from "react-icons/fa";
import { ImNewspaper } from "react-icons/im";
import { GiSattelite } from "react-icons/gi";
import { LiaHotjar } from "react-icons/lia";
import { TiUserAddOutline } from "react-icons/ti";
import { RiExchangeLine, RiVerifiedBadgeLine } from "react-icons/ri";
import { PiHandDeposit, PiHandWithdraw } from "react-icons/pi";
import { LuMailQuestion } from "react-icons/lu";
import { GrContact } from "react-icons/gr";
import AnimatedLogo from "./AnimatedLogo";

const Navbar = () => {
  return (
    <nav className="mx-auto container w-full bg-[#07153b] py-10">
      <div className="flex justify-between px-5 lg:justify-around">
        <Link href="/">
         <AnimatedLogo/>
        </Link>
        <div className="lg:block hidden">
          <NavigationMenu className="bg-[#07153b]! hover:bg-[#07153b]! navigation-menu">
            <NavigationMenuList className="gap-5 bg-[#07153b]! hover:bg-[#07153b]!">
            <NavigationMenuItem className="text-white! p-0 bg-[#07153b]! hover:bg-[#07153b]! hover:font-bold cursor-pointer!">
              <Link href='/about'>
              About
              </Link>
              </NavigationMenuItem>
              <NavigationMenuItem className="text-white! p-0 bg-[#07153b]! hover:bg-[#07153b]! hover:font-bold cursor-pointer!">
              Markets
              </NavigationMenuItem>
              <NavigationMenuItem className="cursor-pointer">
                <NavigationMenuTrigger className=" text-white! p-0 bg-[#07153b]! hover:bg-[#07153b]! hover:font-bold cursor-pointer!">
                 Learn
                </NavigationMenuTrigger>
                <NavigationMenuContent className="bg-[#07153b]!">
                  <ul className="flex flex-col text-white space-y-3 p-2 md:w-[400px] lg:w-[450px] leading-normal tracking-widest">
                   <li className="flex gap-x-2 hover:font-bold cursor-pointer!"> <Link className="flex gap-x-1 items-center" href="/articles"> <TbArticle size={25}/> Articles</Link></li>
                   <li className="flex gap-x-2 hover:font-bold cursor-pointer!"> <Link className="flex gap-x-1 items-center" href="#"> <FaBlog size={25} /> Blog</Link></li>
                   <li className="flex gap-x-2 hover:font-bold cursor-pointer!"> <Link className="flex gap-x-1 items-center" href="#"> <TbDeviceAnalytics size={25} /> Market Sentiment</Link></li>
                   <li className="flex gap-x-2 hover:font-bold cursor-pointer!"> <Link className="flex gap-x-1 items-center" href="/crypto101"> <FaGraduationCap size={25} /> Crypto 101</Link></li>
                  </ul>
                </NavigationMenuContent>
              </NavigationMenuItem>
              <NavigationMenuItem>
                <NavigationMenuTrigger className="text-white! p-0 bg-[#07153b]! hover:bg-[#07153b]! hover:font-bold cursor-pointer!">
                 insider
                </NavigationMenuTrigger>
                <NavigationMenuContent className="bg-[#07153b]!">
                  <ul className="flex flex-col text-white space-y-3 p-2 md:w-[400px] lg:w-[450px] leading-normal tracking-widest">
                  <li className="flex gap-x-2 hover:font-bold cursor-pointer!"> <Link className="flex gap-x-1 items-center" href="#"> <ImNewspaper size={25}/> Top News</Link></li>
                   <li className="flex gap-x-2 hover:font-bold cursor-pointer!"> <Link className="flex gap-x-1 items-center" href="/news-room"> <GiSattelite size={25}/>Newsroom</Link></li>
                   <li className="flex gap-x-2 hover:font-bold cursor-pointer!"> <Link className="flex gap-x-1 items-center" href="#"> <LiaHotjar size={25}/>Hot Topics</Link></li>
                   <li className="flex gap-x-2 hover:font-bold cursor-pointer!"> <Link className="flex gap-x-1 items-center" href="#"> <FaPodcast size={25} />Podcasts</Link></li>
                  </ul>
                </NavigationMenuContent>
              </NavigationMenuItem>
              <NavigationMenuItem>
                <NavigationMenuTrigger className="text-white! p-0 bg-[#07153b]! hover:bg-[#07153b]! hover:font-bold cursor-pointer!">
                 How to
                </NavigationMenuTrigger>
                <NavigationMenuContent className="bg-[#07153b]!">
                  <ul className="flex flex-col text-white space-y-3 p-2 md:w-[400px] lg:w-[450px] leading-normal tracking-widest">
                  <li className="flex gap-x-2 hover:font-bold cursor-pointer!"> <Link className="flex gap-x-1 items-center" href="#"><TiUserAddOutline size={25}/> Create an Account</Link></li>
                   <li className="flex gap-x-2 hover:font-bold cursor-pointer!"> <Link className="flex gap-x-1 items-center" href="#"> <RiVerifiedBadgeLine size={25}/>Verify Your Identity (KYC)</Link></li>
                   <li className="flex gap-x-2 hover:font-bold cursor-pointer!"> <Link className="flex gap-x-1 items-center" href="#"> <PiHandDeposit size={25}/>Deposit Funds</Link></li>
                   <li className="flex gap-x-2 hover:font-bold cursor-pointer!"> <Link className="flex gap-x-1 items-center" href="#"> <RiExchangeLine size={25} />Trade Cryptocurrency</Link></li>
                   <li className="flex gap-x-2 hover:font-bold cursor-pointer!"> <Link className="flex gap-x-1 items-center" href="#"> <PiHandWithdraw size={25} />Withdraw Funds</Link></li>
                  </ul>
                </NavigationMenuContent>
              </NavigationMenuItem>
              <NavigationMenuItem>
                <NavigationMenuTrigger className="text-white! p-0 bg-[#07153b]! hover:bg-[#07153b]! hover:font-bold cursor-pointer!">
                  Support
                </NavigationMenuTrigger>
                <NavigationMenuContent className="bg-[#07153b]!">
                  <ul className="flex flex-col text-white space-y-3 p-2 md:w-[400px] lg:w-[450px] leading-normal tracking-widest">
                    <li className="flex gap-x-2 hover:font-bold cursor-pointer!"> <Link className="flex gap-x-1 items-center" href="#"> <LuMailQuestion size={25} />Frequently Asked Questions (FAQs)</Link></li>
                    <li className="flex gap-x-2 hover:font-bold cursor-pointer!"> <Link className="flex gap-x-1 items-center" href="#"> <GrContact size={25} />Contact Us</Link></li>
                    <li className="flex gap-x-2 hover:font-bold cursor-pointer!"> <Link className="flex gap-x-1 items-center" href="#"> <FaHandsHelping size={25} />Help Topics</Link></li>
                  </ul>
                </NavigationMenuContent>
              </NavigationMenuItem>
            </NavigationMenuList>
          </NavigationMenu>
        </div>
        <div className="flex items-center gap-2">
          <div className="hidden lg:flex lg:flex-row items-center justify-center gap-2">
            <Link
            target="_blank"
              href="https://app.cryptomarketplace.com/register"
              className="px-3 py-1 border border-white rounded-lg text-white hover:text-[#07153b] hover:bg-white hover:-translate-y-1 duration-300 transition-all"
            >
              Sign up
            </Link>
            <Link
              href="#"
              className="px-3 py-1 border border-white rounded-lg text-white hover:text-[#07153b] hover:bg-white hover:-translate-y-1 duration-300 transition-all"
            >
              Log in
            </Link>
          </div>

          <LangSwitcher />
          <Sheet>
            <SheetTrigger asChild>
              <Button
                className="lg:hidden text-[#EC3B3B] bg-[#07153b] border-2 border-[#EC3B3B] hover:text-[#EC3B3B] cursor-pointer"
                variant="outline"
              >
                <Menu />
              </Button>
            </SheetTrigger>

            <SheetContent className="lg:hidden bg-[#07153b] text-white overflow-y-auto">
              <SheetHeader>
                <Link href="/" className="block py-4">
                  <Image src={LOGO} alt="Logo Image" width={120} height={40} />
                </Link>
              </SheetHeader>
              <div className="flex flex-row items-center justify-start gap-x-2 pl-3">
            <Link
              href="#"
              className="px-3 py-1 border border-white rounded-lg text-white hover:text-[#07153b] hover:bg-white hover:-translate-y-1 duration-300 transition-all"
            >
              Sign up
            </Link>
            <Link
              href="#"
              className="px-3 py-1 border border-white rounded-lg text-white hover:text-[#07153b] hover:bg-white hover:-translate-y-1 duration-300 transition-all"
            >
              Log in
            </Link>
          </div>
              <Accordion className="px-4" type="single" collapsible>
                {NAV_DATA.map((item, index) =>
                  item.children ? (
                    <AccordionItem
                      key={index}
                      value={`item-${index}`}
                      className="text-white"
                    >
                      <SheetTitle></SheetTitle>

                      <AccordionTrigger>{item.title}</AccordionTrigger>
                      <AccordionContent className="flex flex-col gap-y-3 pl-2">
                        {item.children.map((child, idx) => (
                          <Link
                            key={idx}
                            href={child.href}
                            className="flex items-center gap-x-2 hover:underline"
                          >
                            <child.icon className="w-4 h-4" />
                            {child.title}
                          </Link>
                        ))}
                      </AccordionContent>
                    </AccordionItem>
                  ) : (
                    <div key={index} className="py-2">
                      <Link href={item.href} className="hover:underline">
                        {item.title}
                      </Link>
                    </div>
                  )
                )}
              </Accordion>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
