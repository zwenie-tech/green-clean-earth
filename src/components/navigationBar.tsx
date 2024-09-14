"use client";
import Link from "next/link";
import { useState, useEffect } from "react";
import { FaBars, FaTimes } from "react-icons/fa";
import Cookies from "js-cookie";
import { usePathname } from "next/navigation";
import { Menu, X } from "lucide-react";

const NavigationBar = () => {
  const [nav, setNav] = useState(false);
  const [token, setToken] = useState(null);
  const [logintype, setLogintype] = useState(null);
  const pathname = usePathname();

  useEffect(() => {
    const storedToken : any = Cookies.get("token");
    const logintype : any = Cookies.get("login_type");
    setLogintype(logintype);
    setToken(storedToken);
  }, []);

  if(logintype==="user"){
    var userid : any = Cookies.get("userId");
  }else{
    var coid : any = Cookies.get("coid");
    var cogid : any = Cookies.get("cogid");

  }
  const links = [
    { href: "/home", label: "Home" },
    { href: "/project", label: "Projects" },
    { href: "/competition", label: "Competition" },
    { href: "/register", label: "Register" },
    { href: "/loginform", label: "Login" },
    { href: "/events", label: "Events & News" },
    { href: "/get-plant", label: "Get Plant" },
    { href: "/group-list", label: "Group List" },
    { href: "/participant-list", label: "Participant List" },
    { href: "/activityList", label: "Activity List" },
    { href: "/faq", label: "FAQ" },
    { href: "/scoreboard", label: "Scoreboard" },
    { href: "/about-us", label: "About Us" },
    { href: "/contact", label: "Contact" },
  ];


  const login_links = [
    { href: "/home", label: "Home" },
    { href: "/project", label: "Projects" },
    { href: "/competition", label: "Competition" },
    // { href: "/register", label: "Register" },
    logintype==='user' ? { href: `/user-dash-home?id=${userid}`, label: "Dashboard" }
    :{ href: `/dashboard?id=${coid}&gid=${cogid}`, label: "Dashboard" },
    { href: "/events", label: "Events & News" },
    { href: "/get-plant", label: "Get Plant" },
    { href: "/group-list", label: "Group List" },
    { href: "/participant-list", label: "Participant List" },
    { href: "/activityList", label: "Activity List" },
    { href: "/faq", label: "FAQ" },
    { href: "/scoreboard", label: "Scoreboard" },
    { href: "/about-us", label: "About Us" },
    { href: "/contact", label: "Contact" },
    { href: "/logout", label: "Logout" },
  ];
  

  return (
    <header className="bg-primary py-5">
      <div className="w-full mx-auto px-5 flex flex-row md:flex-col justify-between md:justify-center items-center">
        <h1 className="text-2xl text-primary text-white font-medium font-sans md:mb-5">
          <a href="/" target="_blank" rel="noreferrer">
            <span className="text-[#a0d034]">Green</span>
            <span className="text-[#ffffff]">Clean</span>
            <span className="text-[#fc4203]">Earth</span>
            <span>.org</span>
          </a>
        </h1>

        <ul className="hidden md:flex md:justify-center md:items-center flex-wrap">
          {/* when logged in */}
          {token ? (login_links.map((link) => (
            <li key={link.href} className="m-1">
              <Link href={link.href} passHref>
                <p
                  className={`text-white border-2 border-transparent no-underline px-3 py-1 rounded-full transition-colors duration-300 ${
                    link.label==="Dashboard" && (pathname==="/dashboard" || pathname==="/user-dash-home") ? "bg-primary text-white"
                    : (pathname === link.href
                      ? " border-white"
                      : "")
                  }
                  
                  hover:border-light-green/40`}
                >
                  {link.label}
                </p>
              </Link>
            </li>
          ))):
          // when logged out
          (links.map((link) => (
            <li key={link.href} className="m-1">
              <Link href={link.href} passHref>
                <p
                  className={`text-white border-2 border-transparent no-underline px-3 py-1 rounded-full transition-colors duration-300 ${
                    pathname === link.href
                      ? " border-white"
                      : ""
                  }
                  hover:border-light-green/40`}
                >
                  {link.label}
                </p>
              </Link>
            </li>
          )))
          }
        </ul>

        <div
          onClick={() => setNav(!nav)}
          className="cursor-pointer pr-4 z-20 text-white md:hidden"
        >
          {/* {nav ? <FaTimes size={30} /> : <FaBars size={30} />} */}
          {nav ? <X size={30} className="text-primary"/> : <Menu size={30}/>}
          
        </div>
      </div>

      {nav && (
        // <ul className="z-10 flex flex-col items-center w-full h-fit  bg-white text-gray-800">
        <ul className="z-10 grid grid-cols-2 gap-4 p-4 pt-20 pb-10 w-full h-fit absolute top-0 bg-light-gray text-gray-800 shadow-2xl">
          
          {/* logged in */}
          {token ? (login_links.map((link) => (
            <li
              key={link.href}
              className="cursor-pointer capitalize text-base bg-white rounded-md border"
            >
              <Link href={link.href} passHref>
                <p
                  onClick={() => setNav(!nav)}
                  className={`no-underline h-full w-full p-2 rounded-md transition-colors duration-300 ${
                    pathname === link.href
                      ? "bg-primary text-white"
                      : "hover:bg-primary/60"
                  }`}
                >
                  {link.label}
                </p>
              </Link>
            </li>
          ))):
          // logged out
          (links.map((link) => (
            <li
              key={link.href}
              className="cursor-pointer capitalize text-base bg-white rounded-md border"
            >
              <Link href={link.href} passHref>
                <p
                  onClick={() => setNav(!nav)}
                  className={`no-underline h-full w-full p-2 rounded-md transition-colors duration-300 ${
                    pathname === link.href
                      ? "bg-primary text-white"
                      : "hover:bg-primary/60"
                  }`}
                >
                  {link.label}
                </p>
              </Link>
            </li>
          )))
          }
        </ul>
      )}
    </header>
  );
};

export default NavigationBar;
