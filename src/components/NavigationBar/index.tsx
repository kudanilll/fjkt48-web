"use client";

import { usePathname } from "next/navigation";
import { useState } from "react";
import Link  from "next/link";
import Image from "next/image";

import { navigation } from "./navigation.json";
import menu  from "./menu.svg";
import close from "./close.svg";

export default function NavigationBar() {
  const pathname = usePathname() || "/";
  const [active, setActive] = useState(false);
  const handleClick = () => {
    setActive(!active);
  };
  return (
    <div className="sticky top-0 z-10 max-w-5xl w-full flex flex-wrap py-4 px-5">
      <nav className="w-full backdrop-filter backdrop-blur-lg bg-opacity-30 fixed top-0 left-0 right-0 z-10">
        <div className="justify-between px-4 mx-auto lg:max-w-7xl md:items-center md:flex md:px-8">
          <div>
            <div className="flex items-center justify-between py-3 md:py-5 md:block">
              <div className="flex flex-wrap">
                <h1 className="text-white text-2xl font-fugaz">FJKT</h1>
                <h1 className="text-red-700 text-2xl font-fugaz">48</h1>
              </div>
              <div className="md:hidden">
                <button
                  className="p-2 text-gray-700"
                  onClick={handleClick}>
                  {active ? (
                    <Image
                      src={close}
                      width={30}
                      height={30}
                      alt="logo"
                      className="active:animate-spin"/>
                  ) : (
                    <Image
                      src={menu}
                      width={30}
                      height={30}
                      alt="logo"
                      className="focus:border-none active:border-none active:animate-spin"/>
                  )}
                </button>
              </div>
            </div>
          </div>
          <div>
            <div className={`flex-1 justify-self-center pb-3 mt-8 md:block md:pb-0 md:mt-0 ${ active ? "p-12 md:p-0 block" : "hidden" }`}>
              <ul className="h-screen md:h-auto items-center justify-center md:flex">
                {navigation.map((item) => (
                  <li key={item.id} className={` ${ item.path === pathname ? "text-red-700 md:font-bold" : "text-white md:font-light" } md:px-4 px-4 py-2 pb-6 text-xl text-start font-semibold hover:text-red-700 md:hover:font-bold md:hover:text-red-700 md:hover:bg-transparent`}>
                    <Link key={item.id} href={item.path} onClick={handleClick}>
                      {item.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </nav>
    </div>
  );
}