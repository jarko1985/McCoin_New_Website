import Image from "next/image"
import LOGO from '../../../public/images/logo1.png';
import Link from "next/link";
import { NavigationMenu, NavigationMenuContent, NavigationMenuItem, NavigationMenuLink, NavigationMenuList, NavigationMenuTrigger } from "../ui/navigation-menu";
import { Sheet, SheetClose, SheetContent, SheetDescription, SheetFooter, SheetHeader, SheetTitle, SheetTrigger } from "../ui/sheet";
import { Button } from "../ui/button";
import { MenuData } from "../../../utils/data";
import LangSwitcher from "./LangSwitcher";
import { Menu } from "lucide-react";


const Navbar = () => {
  return (
   <nav className="container mx-auto w-full bg-[#07153b] py-10">
    <div className="flex justify-around">
            <Link href='/'>
              <Image src={LOGO} alt="Logo Image" />
            </Link>
            <div className="md:block hidden">
              <NavigationMenu>
                <NavigationMenuList className="gap-5">
                  <NavigationMenuItem >
                    <NavigationMenuTrigger className="bg-[#EC3B3B]! text-[#DAE6EA]! hover:text-[#DAE6EA]!" >About</NavigationMenuTrigger>
                    <NavigationMenuContent>
                      <ul className="grid gap-3 p-4 md:w-[400px] lg:w-[500px] lg:grid-cols-[.75fr_1fr]">
                        <li className="row-span-3">
                          <NavigationMenuLink asChild>
                            <a
                              className="flex h-full w-full select-none flex-col justify-end rounded-md bg-gradient-to-b from-muted/50 to-muted p-6 no-underline outline-none focus:shadow-md"
                              href="/"
                            >
                              <div className="mb-2 mt-4 text-lg font-medium">
                                shadcn/ui
                              </div>
                              <p className="text-sm leading-tight text-muted-foreground">
                                Beautifully designed components built with Radix UI
                                and Tailwind CSS.
                              </p>
                            </a>
                          </NavigationMenuLink>
                        </li>
                        <Link href="/">
                          Made with CI/CD
                        </Link>
    
                        <Link href="#">
                          How to install dependencies and structure your app.
                        </Link>
                        <Link href="#">
                          Styles for headings, paragraphs, lists...etc
                        </Link>
                      </ul>
                    </NavigationMenuContent>
                  </NavigationMenuItem>
                  <NavigationMenuItem>
                    <NavigationMenuTrigger className="bg-[#EC3B3B]! text-[#DAE6EA]! hover:text-[#DAE6EA]!">Trading</NavigationMenuTrigger>
                    <NavigationMenuContent>
                      <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[500px]">
                        {MenuData.group1.map((component) => (
                          <Link key={component.title} href={component.link}>
                            {component.title}
                          </Link>
                        ))}
                      </ul>
                    </NavigationMenuContent>
                  </NavigationMenuItem>
                  <NavigationMenuItem>
                    <NavigationMenuTrigger className="bg-[#EC3B3B]! text-[#DAE6EA]! hover:text-[#DAE6EA]!">Products</NavigationMenuTrigger>
                    <NavigationMenuContent>
                      <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[500px]">
                        {MenuData.group2.map((component) => (
                          <Link key={component.title} href={component.link}>
                            {component.title}
                          </Link>
                        ))}
                      </ul>
                    </NavigationMenuContent>
                  </NavigationMenuItem>
                </NavigationMenuList>
              </NavigationMenu>
            </div>
            <div className="flex items-center gap-2">
            <LangSwitcher/>
            <Sheet>
          <SheetTrigger asChild >
            <Button className='md:hidden' variant="outline">
                    <Menu color="#DAE6EA"/>
            </Button>
          </SheetTrigger>
          <SheetContent className='md:hidden'>
            <SheetHeader>
              <SheetTitle>Edit profile</SheetTitle>
              <SheetDescription>
                Make changes to your profile here. Click save when you're done.
              </SheetDescription>
            </SheetHeader>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
              </div>
            </div>
            <SheetFooter>
              <SheetClose asChild>
                <Button type="submit">Save changes</Button>
              </SheetClose>
            </SheetFooter>
          </SheetContent>
            </Sheet>  
            {/* <ThemeSwitcher/>    */}
                
            </div>
          </div>
   </nav>
  )
}

export default Navbar