"use client";
import { usePathname } from "next/navigation";
import Link from "next/link";

export default function Footer() {
  const pathname = usePathname() || "/";
  const noNavbarRoutes = ["/login", "/register"];
  if (noNavbarRoutes.includes(pathname)) {
    return <></>;
  }
  return (
    <div className="bg-zinc-800 mt-auto p-2 select-none">
      <div className="w-full mx-auto max-w-screen-xl p-4 md:p-2 flex flex-col items-center justify-between">
        <span className="text-neutral-300 text-center md:text-sm">
          &copy;{new Date().getFullYear()}{" "}
          <Link
            href={`${process.env.AUTHOR_ABOUT_URL}`}
            target="_blank"
            aria-label="author"
            className="hover:underline">
            Achmad Daniel Syahputra
          </Link>
          ,{" "}
          <Link
            href="https://dribbble.com/ipauscream"
            target="_blank"
            aria-label="designer"
            className="hover:underline">
            Muhammad Ikhsan Fauzi
          </Link>
        </span>
        <ul className="flex flex-row items-center mt-2 md:mt-3 text-sm md:text-xs font-medium text-neutral-300 sm:mt-0">
          <li>
            <Link
              href={`${process.env.AUTHOR_ABOUT_URL}`}
              target="_blank"
              className="hover:underline px-2">
              About
            </Link>
            <Link
              href={`${process.env.AUTHOR_SUPPORT_URL}`}
              target="_blank"
              className="hover:underline px-2">
              Support
            </Link>
            <Link href="/privacy-policy" className="hover:underline px-2">
              Privacy Policy
            </Link>
          </li>
        </ul>
      </div>
    </div>
  );
}
