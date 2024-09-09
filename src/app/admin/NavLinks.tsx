"use client";

import clsx from "clsx";
import { HomeIcon, LogOut, Menu } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import LogoutDialog from "./LogoutDialog";
import { Separator } from "@/components/ui/separator";
import Cookies from 'js-cookie';

// Define the navigation links
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

  // Only render the navigation if the token exists
  if (!token) return null;

  return (
    <div>
      <button
        className="md:hidden flex h-[48px] grow items-center gap-2 rounded-md text-black p-3 text-sm font-medium hover:bg-light-green hover:text-primary md:flex-none md:justify-start md:p-2 md:px-3"
        onClick={toggleNav}
        aria-expanded={isOpen}
        aria-controls="nav-links"
      >
        <Menu />
        Menu
      </button>
      <div
        id="nav-links"
        className={clsx(
          "grid",
          isOpen ? "grid-rows-[1fr]" : "grid-rows-[0fr]",
          "overflow-hidden transition-[grid-template-rows] duration-500 ease-in-out w-full"
        )}
      >
        <div className="flex flex-col gap-1 overflow-hidden bg-white">
          {links.map((link) => (
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
              {link.name}
            </Link>
          ))}
          <Separator className="my-2" />
          {/* Logout button */}
          <LogoutDialog />
        </div>
      </div>
    </div>
  );
}

export default NavLinks;
