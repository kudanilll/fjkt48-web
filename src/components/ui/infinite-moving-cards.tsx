"use client";
import { cn } from "@/lib/utils";
import React, { useEffect, useState } from "react";
import Image from "next/image";

export default function InfiniteMovingCards({
  direction = "left",
  speed = "fast",
  pauseOnHover = true,
  className,
}: {
  direction?: "left" | "right";
  speed?: "fast" | "normal" | "slow";
  pauseOnHover?: boolean;
  className?: string;
}) {
  const containerRef = React.useRef<HTMLDivElement>(null);
  const scrollerRef = React.useRef<HTMLUListElement>(null);

  useEffect(() => {
    addAnimation();
  }, []);

  const [start, setStart] = useState(false);
  function addAnimation() {
    if (containerRef.current && scrollerRef.current) {
      const scrollerContent = Array.from(scrollerRef.current.children);

      scrollerContent.forEach((item) => {
        const duplicatedItem = item.cloneNode(true);
        if (scrollerRef.current) {
          scrollerRef.current.appendChild(duplicatedItem);
        }
      });

      getDirection();
      getSpeed();
      setStart(true);
    }
  }

  function getDirection() {
    if (containerRef.current) {
      if (direction === "left") {
        containerRef.current.style.setProperty(
          "--animation-direction",
          "forwards"
        );
      } else {
        containerRef.current.style.setProperty(
          "--animation-direction",
          "reverse"
        );
      }
    }
  }

  function getSpeed() {
    if (containerRef.current) {
      if (speed === "fast") {
        containerRef.current.style.setProperty("--animation-duration", "20s");
      } else if (speed === "normal") {
        containerRef.current.style.setProperty("--animation-duration", "40s");
      } else {
        containerRef.current.style.setProperty("--animation-duration", "80s");
      }
    }
  }

  return (
    <div className="mb-12">
      <Image
        src="/assets/new-era.webp"
        alt="new era"
        width={100}
        height={100}
        className="md:hidden mx-auto"
      />
      <Image
        src="/assets/new-era.webp"
        alt="new era"
        width={200}
        height={200}
        className="hidden md:block mx-auto"
      />
      <div
        ref={containerRef}
        className={cn(
          "scroller z-20 w-full h-[400px] mt-6 overflow-hidden",
          className
        )}>
        <ul
          ref={scrollerRef}
          className={cn(
            " flex min-w-full shrink-0 gap-4 py-4 flex-nowrap",
            start && "animate-scroll ",
            pauseOnHover && "hover:[animation-play-state:paused]"
          )}>
          <li className="rounded-xl">
            <Image
              height={400}
              width={400}
              alt="Marsha Lenathea"
              src="https://wbqmdidxdtqqcwidmpfb.supabase.co/storage/v1/object/public/profiles/members/marsha_lenathea.jpg"
            />
          </li>
          <li className="rounded-xl">
            <Image
              height={400}
              width={400}
              alt="Gabriela Abigail"
              src="https://wbqmdidxdtqqcwidmpfb.supabase.co/storage/v1/object/public/profiles/members/gabriela_abigail.jpg"
            />
          </li>
          <li className="rounded-xl">
            <Image
              height={400}
              width={400}
              alt="Mutiara Azzahra"
              src="https://wbqmdidxdtqqcwidmpfb.supabase.co/storage/v1/object/public/profiles/members/mutiara_azzahra.jpg"
            />
          </li>
          <li className="rounded-xl">
            <Image
              height={400}
              width={400}
              alt="Shania Gracia"
              src="https://wbqmdidxdtqqcwidmpfb.supabase.co/storage/v1/object/public/profiles/members/shania_gracia.jpg"
            />
          </li>
          <li className="rounded-xl">
            <Image
              height={400}
              width={400}
              alt="Angelina Christy"
              src="https://wbqmdidxdtqqcwidmpfb.supabase.co/storage/v1/object/public/profiles/members/angelina_christy.jpg"
            />
          </li>
          <li className="rounded-xl">
            <Image
              height={400}
              width={400}
              alt="Grace Octaviani"
              src="https://wbqmdidxdtqqcwidmpfb.supabase.co/storage/v1/object/public/profiles/members/grace_octaviani.jpg"
            />
          </li>
        </ul>
      </div>
    </div>
  );
}
