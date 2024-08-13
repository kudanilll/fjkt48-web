"use client";
import { cn } from "@/lib/utils";
import { useEffect, useRef, useState } from "react";
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
  const containerRef = useRef<HTMLDivElement>(null);
  const scrollerRef = useRef<HTMLUListElement>(null);
  const [start, setStart] = useState(false);

  useEffect(() => {
    const container = containerRef.current;
    const scroller = scrollerRef.current;

    if (container && scroller) {
      // duplicate items
      const scrollerContent = Array.from(scroller.children);
      scrollerContent.forEach((item) => {
        const duplicatedItem = item.cloneNode(true);
        if (scroller) {
          scroller.appendChild(duplicatedItem);
        }
      });

      // apply styles
      if (container) {
        container.style.setProperty(
          "--animation-direction",
          direction === "left" ? "forwards" : "reverse"
        );
        container.style.setProperty(
          "--animation-duration",
          speed === "fast" ? "20s" : speed === "normal" ? "40s" : "80s"
        );
      }
      setStart(true);
    }
  }, [direction, speed]);

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
            "flex min-w-full shrink-0 gap-4 py-4 w-max flex-nowrap",
            start && "animate-scroll",
            pauseOnHover && "hover:[animation-play-state:paused]"
          )}>
          {[
            "marsha_lenathea",
            "gabriela_abigail",
            "mutiara_azzahra",
            "shania_gracia",
            "angelina_christy",
            "grace_octaviani",
          ].map((name) => (
            <li key={name} className="max-w-full relative flex-shrink-0">
              <Image
                height={400}
                width={400}
                alt={name.replace("_", " ")}
                src={`https://wbqmdidxdtqqcwidmpfb.supabase.co/storage/v1/object/public/profiles/members/${name}.jpg`}
                className="rounded-xl w-full h-full object-cover"
              />
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
