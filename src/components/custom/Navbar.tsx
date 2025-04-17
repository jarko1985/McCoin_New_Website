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
import { TbArticle } from "react-icons/tb";
import { FaBlog } from "react-icons/fa";
import { TbDeviceAnalytics } from "react-icons/tb";
import { FaGraduationCap } from "react-icons/fa";
import { ImNewspaper } from "react-icons/im";
import { GiSattelite } from "react-icons/gi";
import { LiaHotjar } from "react-icons/lia";
import { FaPodcast } from "react-icons/fa";
import { TiUserAddOutline } from "react-icons/ti";
import { RiVerifiedBadgeLine } from "react-icons/ri";
import { PiHandDeposit } from "react-icons/pi";
import { RiExchangeLine } from "react-icons/ri";
import { PiHandWithdraw } from "react-icons/pi";
import { LuMailQuestion } from "react-icons/lu";
import { GrContact } from "react-icons/gr";
import { FaHandsHelping } from "react-icons/fa";

const Navbar = () => {
  return (
    <nav className="container mx-auto w-full bg-[#07153b] py-10">
      <div className="flex justify-around">
        <Link href="/">
          <Image src={LOGO} alt="Logo Image" />
        </Link>
        <div className="md:block hidden">
          <NavigationMenu className="bg-[#07153b]! hover:bg-[#07153b]! navigation-menu">
            <NavigationMenuList className="gap-5 bg-[#07153b]! hover:bg-[#07153b]!">
              <NavigationMenuItem className="text-white! p-0 bg-[#07153b]! hover:bg-[#07153b]! hover:font-bold cursor-pointer!">
              About
              </NavigationMenuItem>
              <NavigationMenuItem className="text-white! p-0 bg-[#07153b]! hover:bg-[#07153b]! hover:font-bold cursor-pointer!">
              Markets
              </NavigationMenuItem>
              <NavigationMenuItem className="cursor-pointer">
                <NavigationMenuTrigger className=" text-white! p-0 bg-[#07153b]! hover:bg-[#07153b]! hover:font-bold cursor-pointer!">
                 Learn
                </NavigationMenuTrigger>
                <NavigationMenuContent className="bg-[#07153b]!">
                  <ul className="flex flex-col text-white space-y-3 p-2 md:w-[400px] lg:w-[565px] leading-normal tracking-widest">
                   <li className="flex gap-x-2 hover:font-bold cursor-pointer!"> <Link className="flex gap-x-1 items-center" href="#"> <TbArticle size={25}/> Articles</Link></li>
                   <li className="flex gap-x-2 hover:font-bold cursor-pointer!"> <Link className="flex gap-x-1 items-center" href="#"> <FaBlog size={25} /> Blog</Link></li>
                   <li className="flex gap-x-2 hover:font-bold cursor-pointer!"> <Link className="flex gap-x-1 items-center" href="#"> <TbDeviceAnalytics size={25} /> Market Sentiment</Link></li>
                   <li className="flex gap-x-2 hover:font-bold cursor-pointer!"> <Link className="flex gap-x-1 items-center" href="#"> <FaGraduationCap size={25} /> Crypto 101</Link></li>
                  </ul>
                </NavigationMenuContent>
              </NavigationMenuItem>
              <NavigationMenuItem>
                <NavigationMenuTrigger className="text-white! p-0 bg-[#07153b]! hover:bg-[#07153b]! hover:font-bold cursor-pointer!">
                McCoin insider
                </NavigationMenuTrigger>
                <NavigationMenuContent className="bg-[#07153b]!">
                  <ul className="flex flex-col text-white space-y-3 p-2 md:w-[400px] lg:w-[565px] leading-normal tracking-widest">
                  <li className="flex gap-x-2 hover:font-bold cursor-pointer!"> <Link className="flex gap-x-1 items-center" href="#"> <ImNewspaper size={25}/> Top News</Link></li>
                   <li className="flex gap-x-2 hover:font-bold cursor-pointer!"> <Link className="flex gap-x-1 items-center" href="#"> <GiSattelite size={25}/>Newsroom</Link></li>
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
                  <ul className="flex flex-col text-white space-y-3 p-2 md:w-[400px] lg:w-[565px] leading-normal tracking-widest">
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
                  Support center
                </NavigationMenuTrigger>
                <NavigationMenuContent className="bg-[#07153b]!">
                  <ul className="flex flex-col text-white space-y-3 p-2 md:w-[400px] lg:w-[565px] leading-normal tracking-widest">
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
          <div className="flex flex-row items-center justify-center gap-2">
          <Link href="#" className="px-3 py-1 border border-white rounded-lg text-white hover:text-[#07153b] hover:bg-white hover:-translate-y-1 duration-300 transition-all">Sign up</Link>
          <Link href="#" className="px-3 py-1 border border-white rounded-lg text-white hover:text-[#07153b] hover:bg-white hover:-translate-y-1 duration-300 transition-all">Log in</Link>
          </div>
          
          <LangSwitcher />
          <Sheet >
            <SheetTrigger asChild>
              <Button className="md:hidden text-[#EC3B3B] bg-[#07153b] border-2 border-[#EC3B3B] hover:text-[#EC3B3B] cursor-pointer" variant="outline">
                <Menu />
              </Button>
            </SheetTrigger>
            <SheetContent className="md:hidden bg-[#07153b]">
              <SheetHeader>
                <Link href="/">
                <Image src={LOGO} alt="Logo Image" />
                </Link>
              </SheetHeader>
              <SheetTitle></SheetTitle>

              <Accordion className="p-4" type="single" collapsible>
                <AccordionItem className="text-white" value="item-1">
                  <AccordionTrigger className="justify-items-start!">About</AccordionTrigger>
                  <AccordionContent className="flex flex-col gap-y-4">
                    <Link href="/company">Mccoin Company</Link>
                    <Link href="/team">Mccoin Team</Link>
                    <Link href="/contact">Contact US</Link>
                  </AccordionContent>
                </AccordionItem>
                <AccordionItem className="text-white" value="item-2">
                  <AccordionTrigger>How to</AccordionTrigger>
                  <AccordionContent className="flex flex-col gap-y-4">
                    <Link href="/company">Create Account</Link>
                    <Link href="/team">Verify Your Account</Link>
                    <Link href="/contact">Deposit/Withdrawal</Link>
                    <Link href="/company">Transfer</Link>
                    <Link href="/contact">Manage your Wallets</Link>
                  </AccordionContent>
                </AccordionItem>
                <AccordionItem className="text-white" value="item-3">
                <AccordionTrigger>Trading</AccordionTrigger>
                <AccordionContent className="flex flex-col gap-y-4">
                  <Link href='#'>Comming Soon</Link>
                </AccordionContent>
                </AccordionItem>
                <AccordionItem className="text-white" value="item-4">
                  <AccordionTrigger>Media</AccordionTrigger>
                  <AccordionContent className="flex flex-col gap-y-4">
                    <Link href="/company">Crypto News</Link>
                    <Link href="/team">Market News</Link>
                    <Link href="/contact">Feeds</Link>
                  </AccordionContent>
                </AccordionItem>
                <AccordionItem className="text-white" value="item-5">
                <AccordionTrigger>Resources</AccordionTrigger>
                <AccordionContent>
                <Link href="/faqs">Frequently Asked Questions (FAQs)</Link>
                </AccordionContent>
                </AccordionItem>
              </Accordion>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
