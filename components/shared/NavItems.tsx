'use client'
import { headerLinks } from "@/constants"
import Link from "next/link";
import { usePathname } from "next/navigation";

const NavItems = () => {
    const pathname = usePathname()
  return (
    <ul className="md:flex-between flex w-full flex-col items-start md:flex-row gap-5 " >
        {headerLinks.map((link) => {
            const isActive = pathname === link.route;
           return(
            <li key = {link.route} className={`${isActive && "text-dark-green"} hover:bg-dark-green transition-colors duration-150 flex-center p-medium-16 whitespace-nowrap `} >
                <Link href = {link.route}>{link.label}</Link>
            </li>
           )
            } )}

    </ul>
  )
}

export default NavItems