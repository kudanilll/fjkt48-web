"use client";

import { useEffect, useRef, useState } from "react";
import {
  motion,
  useAnimationFrame,
  useMotionValue,
  useScroll,
  useSpring,
  useTransform,
  useVelocity,
} from "framer-motion";
import { cn } from "@/lib/utils";
import Image from "next/image";

type VelocityScrollProps = {
  images: string[];
  default_velocity?: number;
  className?: string;
};

type ParallaxProps = {
  children: React.ReactNode;
  baseVelocity: number;
  className?: string;
};

function wrap(min: number, max: number, v: number) {
  const rangeSize = max - min;
  return ((((v - min) % rangeSize) + rangeSize) % rangeSize) + min;
}

export function InfiniteMovingImages({
  images,
  default_velocity = 2,
  className,
}: VelocityScrollProps) {
  function ParallaxImages({
    children,
    baseVelocity = 100,
    className,
  }: ParallaxProps) {
    const baseX = useMotionValue(0);
    const { scrollY } = useScroll();
    const scrollVelocity = useVelocity(scrollY);
    const smoothVelocity = useSpring(scrollVelocity, {
      damping: 50,
      stiffness: 400,
    });

    const velocityFactor = useTransform(smoothVelocity, [0, 1000], [0, 5], {
      clamp: false,
    });

    const [repetitions, setRepetitions] = useState(1);
    const containerRef = useRef<HTMLDivElement>(null);
    const contentRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
      const calculateRepetitions = () => {
        if (containerRef.current && contentRef.current) {
          const containerWidth = containerRef.current.offsetWidth;
          const contentWidth = images.length * 200; // Lebar satu gambar (200px) dikali jumlah gambar
          const newRepetitions = Math.ceil(containerWidth / contentWidth) + 2;
          setRepetitions(newRepetitions);
        }
      };

      calculateRepetitions();

      window.addEventListener("resize", calculateRepetitions);
      return () => window.removeEventListener("resize", calculateRepetitions);
    }, []);

    const x = useTransform(baseX, (v) => `${wrap(-100 / repetitions, 0, v)}%`);

    const directionFactor = useRef<number>(1);
    useAnimationFrame((t, delta) => {
      let moveBy = directionFactor.current * baseVelocity * (delta / 1000);

      // Tetap bergerak meskipun tidak ada scroll
      if (velocityFactor.get() === 0) {
        moveBy = directionFactor.current * baseVelocity * (delta / 1000);
      } else if (velocityFactor.get() < 0) {
        directionFactor.current = -1;
      } else if (velocityFactor.get() > 0) {
        directionFactor.current = 1;
      }

      moveBy += directionFactor.current * moveBy * velocityFactor.get();

      baseX.set(baseX.get() + moveBy);
    });

    return (
      <div
        className="w-full overflow-hidden whitespace-nowrap"
        ref={containerRef}>
        <motion.div
          className={cn("inline-block will-change-transform", className)}
          style={{ x }}
          ref={contentRef}>
          {Array.from({ length: repetitions }).map((_, i) => (
            <div key={i} className="inline-flex gap-4 pl-4">
              {children}
            </div>
          ))}
        </motion.div>
      </div>
    );
  }

  return (
    <section className="relative w-full">
      <ParallaxImages baseVelocity={default_velocity} className={className}>
        {images.map((src, index) => (
          <div
            key={index}
            className="relative flex-shrink-0 w-[172px] h-[229px] md:w-[256px] md:h-[341px] aspect-[3/4]">
            <Image
              src={`${process.env.NEXT_PUBLIC_SUPABASE_URL}/storage/v1/object/public/profiles/members/${src}.jpg`}
              alt={src.replace("_", " ")}
              width={500}
              height={500}
              className="rounded-xl w-full h-full object-cover"
            />
          </div>
        ))}
      </ParallaxImages>
    </section>
  );
}

const images = [
  "marsha_lenathea",
  "gabriela_abigail",
  "mutiara_azzahra",
  "shania_gracia",
  "angelina_christy",
  "grace_octaviani",
];

export default function InfiniteMovingCards() {
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
      <InfiniteMovingImages
        images={images}
        default_velocity={2}
        className="py-8"
      />
    </div>
  );
}
