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
  SheetDescription,
  SheetFooter,
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
              <NavigationMenuItem>
                <NavigationMenuTrigger className=" text-[#EC3B3B]! p-0 bg-[#07153b]! hover:bg-[#07153b]! hover:font-bold cursor-pointer!">
                  About
                </NavigationMenuTrigger>
                <NavigationMenuContent className="bg-[#07153b]! hover:bg-[#07153b]">
                  <ul className="flex flex-col text-white space-y-3 p-2 md:w-[400px] lg:w-[420px]">
                    <li>
                      <Link href='/company'>
                      McCoin Company
                      </Link>
                      </li>
                    <li>McCoin Team</li>
                    <li>Contact us</li>
                  </ul>
                </NavigationMenuContent>
              </NavigationMenuItem>
              <NavigationMenuItem className="cursor-pointer">
                <NavigationMenuTrigger className=" text-[#EC3B3B]! p-0 bg-[#07153b]! hover:bg-[#07153b]! hover:font-bold cursor-pointer!">
                  How to
                </NavigationMenuTrigger>
                <NavigationMenuContent className="bg-[#07153b]!">
                  <ul className="flex flex-col text-white space-y-3 p-2 md:w-[400px] lg:w-[420px]">
                    <li>Create Account</li>
                    <li>Verify Your Account</li>
                    <li>Trade</li>
                    <li>Deposit/Withdrawal</li>
                    <li>Transfer</li>
                    <li>Manage Your Wallets</li>
                  </ul>
                </NavigationMenuContent>
              </NavigationMenuItem>
              <NavigationMenuItem>
                <NavigationMenuTrigger className="text-[#EC3B3B]! p-0 bg-[#07153b]! hover:bg-[#07153b]! hover:font-bold cursor-pointer!">
                  Trading
                </NavigationMenuTrigger>
                <NavigationMenuContent className="bg-[#07153b]!">
                  <ul className="flex flex-col text-white space-y-3 p-2 md:w-[400px] lg:w-[420px]">
                    <li>Comming Soon</li>
                  </ul>
                </NavigationMenuContent>
              </NavigationMenuItem>
              <NavigationMenuItem>
                <NavigationMenuTrigger className="text-[#EC3B3B]! p-0 bg-[#07153b]! hover:bg-[#07153b]! hover:font-bold cursor-pointer!">
                  Media
                </NavigationMenuTrigger>
                <NavigationMenuContent className="bg-[#07153b]!">
                  <ul className="flex flex-col text-white space-y-3 p-2 md:w-[400px] lg:w-[420px]">
                    <li>Crypto News</li>
                    <li>Feeds</li>
                    <li>Market News</li>
                  </ul>
                </NavigationMenuContent>
              </NavigationMenuItem>
              <NavigationMenuItem>
                <NavigationMenuTrigger className="text-[#EC3B3B]! p-0 bg-[#07153b]! hover:bg-[#07153b]! hover:font-bold cursor-pointer!">
                    Resources
                </NavigationMenuTrigger>
                <NavigationMenuContent className="bg-[#07153b]!">
                  <ul className="flex flex-col text-white space-y-3 p-2 md:w-[400px] lg:w-[420px]">
                    <li><Link href='/faqs'>Frequently Asked Questions (FAQs)</Link></li>
                  </ul>
                </NavigationMenuContent>
              </NavigationMenuItem>
            </NavigationMenuList>
          </NavigationMenu>
        </div>
        <div className="flex items-center gap-2">
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
