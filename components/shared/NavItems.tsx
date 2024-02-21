'use client'
import { headerLinks } from "@/constants"
import Link from "next/link";
import { usePathname } from "next/navigation";

const NavItems = () => {
    const pathname = usePathname()
  return (
    <ul className="lg:flex-between flex w-full flex-col items-start  md:flex-wrap md:flex-row gap-5 " >
        {headerLinks.map((link) => {
            const isActive = pathname === link.route;
           return(
            <li key = {link.route} className={`${isActive && "text-dark-green"} hover:bg-dark-green hover:text-white p-2 rounded-xl   flex-center p-medium-16 whitespace-nowrap  transition-all duration-200`} >
                <Link href = {link.route}>{link.label}</Link>
            </li>
           )
            } )}

    </ul>
  )
}

export default NavItems