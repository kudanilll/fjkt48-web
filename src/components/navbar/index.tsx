"use client";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { Cross as Hamburger } from "hamburger-react";
import { LuUser2 } from "react-icons/lu";
import { Avatar } from "antd";
import navigation from "./route";
import Image from "next/image";
import Link from "next/link";

export default function NavigationBar() {
  const pathname = usePathname() || "/";
  const [active, setActive] = useState<boolean>(false);
  return (
    <div className="sticky top-0 z-10 max-w-5xl w-full flex flex-wrap py-4 px-5 md:py-2">
      <div className="w-full bg-red-100 fixed top-0 left-0 right-0 z-10 md:px-12">
        <div
          className={`${active ? "flex-1 md:flex" : "flex"} justify-between px-4 md:max-w-7xl md:items-center`}>
          <div>
            <div className="flex justify-between py-3 md:block">
              <a className="hidden md:flex cursor-pointer" href="/">
                <Image
                  width={32}
                  height={32}
                  src="/jkt48.svg"
                  alt="jkt48 logo"
                />
              </a>
              <div className="md:hidden">
                <Hamburger
                  toggled={active}
                  toggle={setActive}
                  color="#000000"
                  size={24}
                  rounded
                />
              </div>
            </div>
          </div>
          <div>
            <div
              className={`flex-1 md:justify-self-center md:flex md:pb-0 md:mt-2 ${
                active ? "p-12 md:p-0 block" : "hidden"
              }`}>
              <ul className="h-screen md:h-auto md:flex">
                {navigation.map((item, index) => (
                  <li
                    key={index}
                    className={`${
                      pathname.includes(item.path)
                        ? "drop-shadow text-red-600 font-bold"
                        : "text-red-600 font-regular"
                    } md:px-3 py-2 pb-6 text-xl md:text-xs text-start font-poppins hover:text-red-700 hover:underline`}>
                    <Link
                      key={index}
                      href={item.path}
                      onClick={() => setActive(!active)}>
                      {item.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>
          <a
            href="/profile"
            className={`items-center md:ml-4 ${active ? "hidden md:flex" : "flex"}`}>
            <Avatar size={32} icon={<LuUser2 />} />
          </a>
        </div>
      </div>
    </div>
  );
}
