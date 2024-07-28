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
    { href: "/projects", label: "Projects" },
    { href: "/competition", label: "Competition" },
    { href: "/register", label: "Register" },
    { href: "/loginform", label: "Login" },
    { href: "/events", label: "Events & News" },
    { href: "/get-plant", label: "Get Plant" },
    { href: "/group-list", label: "Group List" },
    { href: "/participant-list", label: "Participant List" },
    { href: "/faq", label: "FAQ" },
    { href: "/result", label: "Result" },
    { href: "/about-us", label: "About Us" },
    { href: "/contact", label: "Contact" },
  ];


  const login_links = [
    { href: "/home", label: "Home" },
    { href: "/projects", label: "Projects" },
    { href: "/competition", label: "Competition" },
    // { href: "/register", label: "Register" },
    logintype==='user' ? { href: `/user-dash-home?id=${userid}`, label: "Dashboard" }
    :{ href: `/dashboard?id=${coid}&gid=${cogid}`, label: "Dashboard" },
    { href: "/events", label: "Events & News" },
    { href: "/get-plant", label: "Get Plant" },
    { href: "/group-list", label: "Group List" },
    { href: "/participant-list", label: "Participant List" },
    { href: "/faq", label: "FAQ" },
    { href: "/result", label: "Result" },
    { href: "/about-us", label: "About Us" },
    { href: "/contact", label: "Contact" },
    { href: "/logout", label: "Logout" },
  ];
  

  return (
    <header className="py-5 mb-2">
      <div className="w-full mx-auto px-5 flex flex-row md:flex-col justify-between md:justify-center items-center">
        <h1 className="text-2xl text-primary font-medium font-sans md:mb-5">
          <a href="https://www.greencleanearth.org/" target="_blank" rel="noreferrer">
            GreenCleanEarth
          </a>
        </h1>

        <ul className="hidden md:flex md:justify-center md:items-center flex-wrap">
          {token ? (login_links.map((link) => (
            <li key={link.href} className="m-0 mx-1">
              <Link href={link.href} passHref>
                <p
                  className={`text-black no-underline px-3 py-1 rounded-full transition-colors duration-300 ${
                    link.label==="Dashboard" && (pathname==="/dashboard" || pathname==="/user-dash-home") ? "bg-primary text-white"
                    : (pathname === link.href
                      ? "bg-primary text-white"
                      : "bg-light-gray text-black")
                  }`}
                >
                  {link.label}
                </p>
              </Link>
            </li>
          ))):
          (links.map((link) => (
            <li key={link.href} className="m-0 mx-1">
              <Link href={link.href} passHref>
                <p
                  className={`text-black no-underline px-3 py-1 rounded-full transition-colors duration-300 ${
                    pathname === link.href
                      ? "bg-primary text-white"
                      : "bg-light-gray text-black"
                  }`}
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
          className="cursor-pointer pr-4 z-20 text-primary md:hidden"
        >
          {/* {nav ? <FaTimes size={30} /> : <FaBars size={30} />} */}
          {nav ? <X size={30}/> : <Menu size={30}/>}
          
        </div>
      </div>

      {nav && (
        <ul className="z-10 flex flex-col justify-center items-center absolute top-0 left-0 w-full h-screen bg-white text-gray-800">
          {token ? (login_links.map((link) => (
            <li
              key={link.href}
              className="mx-4 my-2 cursor-pointer capitalize text-base"
            >
              <Link href={link.href} passHref>
                <p
                  onClick={() => setNav(!nav)}
                  className={`no-underline px-4 py-2 rounded-full transition-colors duration-300 ${
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
          (links.map((link) => (
            <li
              key={link.href}
              className="mx-4 my-2 cursor-pointer capitalize text-base"
            >
              <Link href={link.href} passHref>
                <p
                  onClick={() => setNav(!nav)}
                  className={`no-underline px-4 py-2 rounded-full transition-colors duration-300 ${
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
