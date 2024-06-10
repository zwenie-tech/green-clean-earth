"use client";
import Link from "next/link";
import { useState, useEffect } from "react";
import { FaBars, FaTimes } from "react-icons/fa";
import Cookies from "js-cookie";

const NavigationBar = () => {
  const [nav, setNav] = useState(false);
  const [token, setToken] = useState(null);

  useEffect(() => {
    const storedToken:any = Cookies.get('token');
    setToken(storedToken);
  }, []);

  const guestLinks = [
    { id: 1, name: "Home", link: "https://www.greencleanearth.org/" },
    { id: 2, name: "Projects", link: "https://greencleanearth.org/projects" },
    { id: 4, name: "Participant list", link: "/participant-list" },
    { id: 5, name: "Login", link: "/login" },
    // { id: 6, name: "User Register", link: "/user-register" },
    { id: 7, name: "Register", link: "/register" },
    { id: 8, name: "About Us", link: "https://greencleanearth.org/about" },
    { id: 9, name: "Contact Us", link: "https://greencleanearth.org/contact-us" },
  ];

  const userLinks = [
    { id: 1, name: "Home", link: "https://www.greencleanearth.org/" },
    { id: 2, name: "Projects", link: "https://greencleanearth.org/projects" },
    { id: 3, name: "Participant list", link: "/participant-list" },
    { id: 4, name: "About Us", link: "https://greencleanearth.org/about" },
    { id: 5, name: "Contact Us", link: "https://greencleanearth.org/contact-us" },
    { id: 6, name: "Logout", link: "/logout" },
  ];

  const links = token ? userLinks : guestLinks;

  return (
    <div className="flex justify-between items-center w-full h-16 px-4 text-white bg-green-600 mb-2 border-b-2">
      <div>
        <h1 className="text-2xl font-bold ml-2">
          <a href="https://www.greencleanearth.org/" target="_blank" rel="noreferrer">
            GreenCleanEarth
          </a>
        </h1>
      </div>

      <ul className="hidden md:flex">
        {links.map(({ id, name, link }) => (
          <li
            key={id}
            className="nav-links px-4 py-2 cursor-pointer capitalize font-medium text-white rounded hover:scale-105 hover:text-white hover:bg-green-700 duration-200"
          >
            <Link href={link}>{name}</Link>
          </li>
        ))}
      </ul>

      <div
        onClick={() => setNav(!nav)}
        className="cursor-pointer pr-4 z-20 text-white md:hidden"
      >
        {nav ? <FaTimes size={30} /> : <FaBars size={30} />}
      </div>

      {nav && (
        <ul className="z-10 flex flex-col justify-center items-center absolute top-0 left-0 w-full h-screen bg-green-600 text-white">
          {links.map(({ id, name, link }) => (
            <li
              key={id}
              className="px-4 cursor-pointer capitalize py-6 text-4xl"
            >
              <Link onClick={() => setNav(!nav)} href={link}>
                {name}
              </Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default NavigationBar;
