import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"
import Image from "next/image"
import { Separator } from "../ui/separator"
import NavItems from "./NavItems"
import { Menu } from "lucide-react"
const MobileNav = () => {
return (
 <nav className = "md:hidden bg-white" >
   <Sheet>
   <SheetTrigger className="align-middle" >
      <Menu />
   </SheetTrigger>
   <SheetContent className = "flex flex-col gap-6 bg-white md:hidden " >
      <Separator  className="border border-gray-50" />
          <NavItems />
   </SheetContent>
  </Sheet>
  
 </nav>
)
}

export default MobileNav