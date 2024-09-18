"use client";

import clsx from "clsx";
import { Menu } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";

const links = [
  { name: "Upload Form", href: "/forms" },
  { name: "Coordinator Form", href: "/forms/coordinator" },
  { name: "Activity Form", href: "/forms/activity" },
  { name: "Contact Us Form", href: "/forms/contact" },
  { name: "LSGD Form", href: "/forms/lsgd" },
  { name: "Educational Sub Districts Form", href: "/forms/edu-sub-dis" },
  { name: "ICDS Block Form", href: "/forms/icds" },
  { name: "Malayalam Mission Chapter Form", href: "/forms/malayalam" },
];

function NavLinks() {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false); // Start with menu closed

  const toggleNav = () => {
    setIsOpen((prev) => !prev);
  };

  return (
    <div>
      <button
        className="md:hidden flex h-[48px] items-center gap-2 rounded-md text-black p-3 text-sm font-medium hover:bg-light-green hover:text-primary"
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
          "transition-all duration-500 ease-in-out",
          isOpen ? "max-h-screen" : "max-h-0",
          "overflow-hidden md:max-h-none md:block" // Always show on md screens and above
        )}
      >
        <div className="flex flex-col gap-1 bg-white">
          {links.map((link) => (
            <Link
              key={link.name}
              href={link.href}
              className={clsx(
                "flex items-center gap-2 rounded-md text-black p-4 text-sm font-medium hover:bg-light-green hover:text-primary",
                {
                  "bg-light-green text-primary": pathname === link.href,
                }
              )}
            >
              {link.name}
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}

export default NavLinks;
