import { SignedIn, SignedOut, UserButton } from "@clerk/nextjs";
import Image from "next/image";
import Link from "next/link";
import { Button } from "../ui/button";
import NavItems from "./NavItems";
import MobileNav from "./MobileNav";
import Logo from "./Logo";
import { ShoppingCart } from "lucide-react";
import {  currentUser } from "@clerk/nextjs"
import { getUser } from "@/lib/actions/user.actions"
const Header = async() => {
  const user= await currentUser()
  const userInfo = await getUser(user?.id)
  const cart = userInfo?.cart?.length || 0
  return (
    <header className="w-full py-3">
      <div className="container flex-between">
        <Link className="w-36" href="/">
          <Logo />
        </Link>

        <SignedIn>
          <nav className="hidden  md:flex gap-10 items-center ">
            <NavItems />
          </nav>
        </SignedIn>

        <div className="flex items-center w-32 justify-end gap-3 pt-2">
          <SignedIn>
            <Link href="/cart">
              <div className=" relative flex gap-4 items-center border-2 border-primary rounded-full  p-2 mx-5 ">
                <ShoppingCart className="w-6 h-6 object-contain " />
                <p className=" absolute right-[-10px] top-[-10px] bg-primary rounded-full text-white py-1 px-2">{cart}</p>
              </div>
            </Link>
            <UserButton afterSignOutUrl="/" />
            <MobileNav />
          </SignedIn>

          <SignedOut>
            <Button size="lg" className="rounded-full" asChild>
              <Link href="/sign-in">Log in</Link>
            </Button>
          </SignedOut>
        </div>
      </div>
    </header>
  );
};

export default Header;
