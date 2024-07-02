"use client";
import { usePathname } from "next/navigation";
import { FaGithub, FaDribbble, FaSquareXTwitter } from "react-icons/fa6";
import Link from "next/link";

export default function Footer() {
  const pathname = usePathname() || "/";
  const noNavbarRoutes = ["/login", "/register"];
  if (noNavbarRoutes.includes(pathname)) {
    return <></>;
  }
  return (
    <footer className="bg-red-200 text-red-800">
      <div className="mx-auto max-w-5xl px-4 py-6 sm:px-6 lg:px-8 select-none">
        <p className="mx-auto mt-6 text-center leading-relaxed max-w-xs md:max-w-xl md:text-sm">
          &copy; {new Date().getFullYear()}, All rights reserved.
          <br />
          Create with 🧠 by&nbsp;
          <Link
            href="https://portfolio-achmad-daniel.vercel.app"
            target="_blank"
            aria-label="author"
            className="transition hover:text-red-800/75">
            Achmad Daniel
          </Link>
          , Designed with ❤️ by&nbsp;
          <Link
            href="https://dribbble.com/ipauscream"
            target="_blank"
            aria-label="designer"
            className="transition hover:text-red-800/75">
            Muhammad Ikhsan
          </Link>
          .
        </p>
        <p className="mx-auto mt-6 max-w-md text-center md:text-sm">
          <Link className="transition hover:text-red-800/75" href="/about">
            About Us
          </Link>
          <span>&nbsp;&middot;&nbsp;</span>
          <Link
            className="transition hover:text-red-800/75"
            href="mailto:fansjkt4809@gmail.com">
            Contact
          </Link>
          <span>&nbsp;&middot;&nbsp;</span>
          <Link
            className="transition hover:text-red-800/75"
            href="https://www.buymeacoffee.com/kudanil">
            Support
          </Link>
          <span>&nbsp;&middot;&nbsp;</span>
          <Link className="transition hover:text-red-800/75" href="">
            Terms & Conditions
          </Link>
          <span>&nbsp;&middot;&nbsp;</span>
          <Link
            className="transition hover:text-red-800/75"
            href="/privacy-policy">
            Privacy Policy
          </Link>
        </p>
        <ul className="mt-6 flex justify-center gap-6 md:gap-8">
          <li>
            <Link
              href=""
              rel="noreferrer"
              target="_blank"
              className="transition hover:text-red-800/75">
              <span className="sr-only">X / Twitter</span>
              <FaSquareXTwitter />
            </Link>
          </li>
          <li>
            <Link
              href="https://github.com/achmaddaniel24/fjkt48-web"
              rel="noreferrer"
              target="_blank"
              className="transition hover:text-red-800/75">
              <span className="sr-only">Github</span>
              <FaGithub />
            </Link>
          </li>
          <li>
            <Link
              href="https://dribbble.com/ipauscream"
              rel="noreferrer"
              target="_blank"
              className="transition hover:text-red-800/75">
              <span className="sr-only">Dribble</span>
              <FaDribbble />
            </Link>
          </li>
        </ul>
      </div>
    </footer>
  );
}
