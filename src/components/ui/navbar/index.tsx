"use client";
import { useSession, signIn } from "next-auth/react";
import { usePathname } from "next/navigation";
import { Dispatch, SetStateAction, useState } from "react";
import { Cross as Hamburger } from "hamburger-react";
import { Avatar, Flex, Text } from "@radix-ui/themes";
// import { MdDarkMode, MdLightMode } from "react-icons/md";
import { LuUser2 } from "react-icons/lu";
import { Session } from "next-auth";
import NormalButton from "@/components/ui/button/normal-button";
import navigation from "./route";
import Image from "next/image";
import Link from "next/link";
import "./navbar.css";

function Navbar({
  active,
  setActive,
}: {
  active: boolean;
  setActive: Dispatch<SetStateAction<boolean>>;
}) {
  return (
    <div>
      <div className={`${active ? "flex-1 md:flex" : "flex"}`}>
        <Link href="/" className="hidden md:flex md:cursor-pointer">
          <Image
            width={32}
            height={32}
            src="/assets/jkt48.svg"
            alt="jkt48 logo"
          />
        </Link>
      </div>
      <div className="md:hidden">
        <Hamburger
          label="menu"
          toggled={active}
          toggle={setActive}
          color="#000000"
          size={24}
          rounded
        />
      </div>
    </div>
  );
}

function Menu({
  active,
  pathname,
  setActive,
}: {
  active: boolean;
  pathname: string;
  setActive: Dispatch<SetStateAction<boolean>>;
}) {
  return (
    <div
      className={`${
        active ? "block" : "hidden"
      } md:block absolute top-16 left-0 w-full bg-red-100 md:relative md:top-auto md:left-auto md:w-auto md:bg-transparent`}>
      <div className={`md:flex md:pb-0 ${active ? "p-4 md:p-0" : ""}`}>
        <ul className="flex flex-col md:flex-row h-screen md:h-auto md:flex md:items-center">
          {navigation.map((item, index) => (
            <li key={index} className="mx-4 my-1.5 md:mx-0 md:my-0">
              <Link
                href={item.path}
                aria-label={item.name}
                onClick={() => setActive(false)}
                className="block md:inline-block md:hover:bg-red-200 md:hover:rounded-lg duration-150">
                <span
                  className={`block md:inline-block ${
                    pathname.includes(item.path)
                      ? "text-red-600 font-extrabold active-item"
                      : "text-red-500 font-semibold"
                  } md:px-3 py-2 text-xl md:text-base md:pb-2 md:hover:text-red-600 duration-100`}>
                  {item.name}
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

function Profile({ session }: { session: Session | null }) {
  return session ? (
    <Flex direction="row" className="gap-2">
      {/* <Avatar fallback={<MdDarkMode />} /> */}
      <Link aria-label="profile" href="/profile" className="items-center flex">
        <Avatar src={`${session?.user?.image}`} fallback={<LuUser2 />} />
      </Link>
    </Flex>
  ) : (
    <Flex direction="row" className="content-center items-center gap-4">
      <Text
        aria-label="login"
        color="red"
        className="hover:underline select-none"
        onClick={() => signIn()}>
        Masuk
      </Text>
      <NormalButton label="register" href="/register">
        Daftar
      </NormalButton>
    </Flex>
  );
}

export default function NavigationBar() {
  const { data: session } = useSession();
  const pathname = usePathname() || "/";
  const [active, setActive] = useState<boolean>(false);

  const noNavbarRoutes = ["/login", "/register", "/otp-verification"];
  if (noNavbarRoutes.includes(pathname)) return <></>;

  return (
    <nav className="sticky top-0 z-50 w-full bg-red-100 md:bg-transparent">
      <div className="fixed top-0 left-0 right-0 z-10 mx-auto w-full px-4 py-2 bg-red-100">
        <Flex justify="between" className="items-center">
          <Navbar active={active} setActive={setActive} />
          <Menu active={active} pathname={pathname} setActive={setActive} />
          <Profile session={session} />
        </Flex>
      </div>
    </nav>
  );
}
