"use client";

import clsx from "clsx";
import { HomeIcon, LogOut, Menu } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import LogoutDialog from "./LogoutDialog";
import { Separator } from "@/components/ui/separator";
import Cookies from 'js-cookie';

// 1. Manage Uploads
// 2. Manage Users
// 3. Manage Coordinators
// 4. Manage Group
// 5. Manage Activity
// 6. Manage Challenges
// 7. Manage Contact us form
// 8. Manage LSGD
// 9. Manage School Division
const links = [
  { name: "Manage Uploads", href: "/admin" },
  { name: "Manage Users", href: "/admin/users" },
  { name: "Manage Coordinators", href: "/admin/coordinators" },
  { name: "Manage Group", href: "/admin/group" },
  { name: "Manage Activity", href: "/admin/activity" },
  { name: "Manage Challenges", href: "/admin/challenges" },
  { name: "Manage Contact us form", href: "/admin/contact-us-form" },
  { name: "Manage Corporations", href: "/admin/corporation" },
  { name: "Manage LSGD", href: "/admin/lsgd" },
  { name: "Manage School Division", href: "/admin/school-division" },
  { name: "Manage News and Events", href: "/admin/news-and-events" },
];

function NavLinks() {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(true);
  const token = Cookies.get("adtoken");

  const toggleNav = () => {
    setIsOpen((prev) => !prev);
  };
  return (
    <div className="">
    {token ? (
      <><button
        className="md:hidden flex h-[48px] grow items-center gap-2 rounded-md text-black p-3 text-sm font-medium hover:bg-light-green hover:text-primary md:flex-none md:justify-start md:p-2 md:px-3"
        onClick={toggleNav}
      >
        <Menu />
        Menu
      </button><div
        className={clsx(
          "grid",
          isOpen ? "grid-rows-[1fr]" : "grid-rows-[0fr]",
          "overflow-hidden transition-[grid-template-rows] duration-500 ease-in-out w-full"
        )}
      >
          <div className="flex flex-col gap-1 overflow-hidden bg-white">
            {links.map((link) => {
              return (
                <Link
                  key={link.name}
                  href={link.href}
                  className={clsx(
                    "grow-0 flex items-center gap-2 rounded-md text-black p-4 text-sm font-medium hover:bg-light-green hover:text-primary md:flex-none md:justify-start md:p-2 md:px-3",
                    {
                      "bg-light-green text-primary": pathname === link.href,
                    }
                  )}
                >
                  <p className="">{link.name}</p>
                </Link>
              );
            })}
            <Separator className="my-2" />
            {/* logout */}
            <LogoutDialog />
          </div>

        </div></>):''}
    </div>
  );
}

export default NavLinks;
