"use client";

// import { useSession, signIn } from "next-auth/react";
import { usePathname } from "next/navigation";
import { Dispatch, SetStateAction, useState } from "react";
import { Cross as Hamburger } from "hamburger-react";
import { Avatar, Flex } from "@radix-ui/themes";
// import { MdDarkMode, MdLightMode } from "react-icons/md";
import { LuUser } from "react-icons/lu";
// import { Session } from "next-auth";
import { Text } from "@/components/typography";
import NormalButton from "@/components/ui/button/normal-button";
import Image from "next/image";
import Link from "next/link";
import navigation from "./route";
import "./navbar.css";
import { cn } from "@/lib/utils";

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
      } md:block absolute top-16 left-0 w-full md:h-auto h-[2000px] bg-red-100 md:relative md:top-auto md:left-auto md:w-auto md:bg-transparent`}>
      <div className={`md:flex md:pb-0 ${active ? "p-4 md:p-0" : ""}`}>
        <ul className="flex flex-col md:flex-row h-screen md:h-auto md:flex md:items-center">
          {navigation.map((item, index) => (
            <li key={index} className="mx-4 my-1.5 md:mx-0 md:my-0">
              <Link
                href={item.path}
                aria-label={item.name}
                onClick={() => setActive(false)}
                className="block md:inline-block md:hover:bg-red-200/40 md:hover:rounded-full transition-all duration-300 ease-out">
                <div className="md:px-4 py-2 md:pb-2">
                  <Text
                    as="span"
                    fontColor="text-red-500"
                    fontFamily="font-semibold">
                    {item.name}
                  </Text>
                </div>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

// function Profile({ session }: { session: Session | null }) {
function Profile() {
  return (
    <Flex direction="row" className="content-center items-center gap-4">
      <Text aria-label="login" className="relative group" mobileHidden>
        <Text as="span" fontColor="text-red-600">
          Masuk
        </Text>
        <Text
          as="span"
          className="absolute -bottom-0 left-0 w-0 transition-all duration-300 h-0.5 bg-red-600 group-hover:w-full">
          {" "}
        </Text>
      </Text>
      <NormalButton label="register" href="/register">
        Daftar
      </NormalButton>
    </Flex>
  );
  // return session ? (
  //   <Flex direction="row" className="gap-2">
  //     {/* <Avatar fallback={<MdDarkMode />} /> */}
  //     <Link aria-label="profile" href="/profile" className="items-center flex">
  //       <Avatar src={`${session?.user?.image}`} fallback={<LuUser />} />
  //     </Link>
  //   </Flex>
  // ) : (
  //   <Flex direction="row" className="content-center items-center gap-4">
  //     <Text
  //       aria-label="login"
  //       color="red"
  //       className="hover:underline"
  //       onClick={() => signIn()}>
  //       Masuk
  //     </Text>
  //     <NormalButton label="register" href="/register">
  //       Daftar
  //     </NormalButton>
  //   </Flex>
  // );
}

export default function NavigationBar() {
  // const { data: session } = useSession();
  const pathname = usePathname() || "/";
  const [active, setActive] = useState<boolean>(false);

  const noNavbarRoutes = ["/login", "/register", "/otp-verification"];
  if (noNavbarRoutes.includes(pathname)) return <></>;

  return (
    <nav className="sticky top-0 z-50 w-full bg-red-100 md:bg-transparent">
      <div
        className={cn(
          "fixed top-0 left-0 right-0 z-10 mx-auto w-full px-4 py-2",
          "bg-red-100"
          // TODO:
          // pathname === "/member" ? "bg-red-100 md:bg-transparent" : "bg-red-100"
        )}>
        <Flex justify="between" className="items-center">
          <Navbar active={active} setActive={setActive} />
          <Menu active={active} pathname={pathname} setActive={setActive} />
          {/* <Profile session={session} /> */}
          <Profile />
        </Flex>
      </div>
    </nav>
  );
}
