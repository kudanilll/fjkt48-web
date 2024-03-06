"use client";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { Cross as Hamburger } from "hamburger-react";
import { LuUser2 } from "react-icons/lu";
import { Avatar } from "antd";
import navigation from "./route";
import Link from "next/link";

export default function NavigationBar() {
  const pathname = usePathname() || "/";
  const [active, setActive] = useState<boolean>(false);
  return (
    <div className="sticky top-0 z-10 max-w-5xl w-full flex flex-wrap py-4 px-5 md:py-2">
      <nav className="w-full bg-slate-100 fixed top-0 left-0 right-0 z-10 border">
        <div className="justify-between px-4 mx-auto lg:max-w-7xl md:items-center md:flex">
          <div>
            <div className="flex items-center justify-between py-3 md:block">
              <div className="flex flex-wrap cursor-pointer">
                <h1 className="text-black text-2xl md:text-3xl font-fugaz">
                  FJKT
                </h1>
                <h1 className="text-red-700 text-2xl md:text-3xl font-fugaz">
                  48
                </h1>
              </div>
              <div className="flex items-center">
                <div className="md:hidden">
                  <Hamburger
                    toggled={active}
                    toggle={setActive}
                    color="#000000"
                    size={24}
                    rounded
                  />
                </div>
                <a href="/profile" className="md:hidden ml-2">
                  <Avatar size={32} icon={<LuUser2 />} />
                </a>
              </div>
            </div>
          </div>
          <div>
            <div
              className={`flex-1 justify-self-center pb-3 mt-8 md:flex md:pb-0 md:mt-2 ${
                active ? "p-12 md:p-0 block" : "hidden"
              }`}>
              <ul className="h-screen md:h-auto items-center justify-center md:flex bg-slate-100">
                {navigation.map((item, index) => (
                  <li
                    key={index}
                    className={` ${
                      pathname.includes(item.path)
                        ? "drop-shadow text-red-600 md:font-bold"
                        : "text-black md:text-black md:font-light"
                    } px-4 py-2 pb-6 text-xl text-start font-semibold hover:text-red-700 md:hover:font-bold md:hover:text-red-700 md:hover:bg-transparent`}>
                    <Link
                      key={index}
                      href={item.path}
                      onClick={() => setActive(!active)}>
                      {item.name}
                    </Link>
                  </li>
                ))}
              </ul>
              <a href="/profile" className="sm:hidden md:flex md:ml-4 md:pt-1">
                <Avatar size={40} icon={<LuUser2 />} />
              </a>
            </div>
          </div>
        </div>
      </nav>
    </div>
  );
}
