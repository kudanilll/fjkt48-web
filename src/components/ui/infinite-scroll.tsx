"use client";
import { useEffect, useRef } from "react";
import Image from "next/image";

export default function InfiniteScroll() {
  const parentRef = useRef<HTMLDivElement>(null);
  const speed = 2;

  useEffect(() => {
    const parent = parentRef.current;
    let currentTranslateX = 0;

    if (parent) {
      const images = Array.from(parent.children) as HTMLElement[];
      let totalWidth = 0;

      images.forEach((child) => {
        totalWidth += child.offsetWidth;
      });

      parent.style.width = `${totalWidth}px`;

      const animate = () => {
        if (parent) {
          currentTranslateX -= speed;
          if (Math.abs(currentTranslateX) >= images[0].offsetWidth + 16) {
            currentTranslateX = 0;
            parent.appendChild(parent.firstElementChild as HTMLElement);
          }
          parent.style.transform = `translateX(${currentTranslateX}px)`;
        }
        requestAnimationFrame(animate);
      };

      animate();
    }
  }, []);

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
      <div className="overflow-hidden w-full h-[400px] mt-6">
        <div ref={parentRef} className="flex gap-4">
          <Image
            height={400}
            width={400}
            alt="Marsha Lenathea"
            src="https://wbqmdidxdtqqcwidmpfb.supabase.co/storage/v1/object/public/profiles/members/marsha_lenathea.jpg"
            className="rounded-xl"
          />
          <Image
            height={400}
            width={400}
            alt="Gabriela Abigail"
            src="https://wbqmdidxdtqqcwidmpfb.supabase.co/storage/v1/object/public/profiles/members/gabriela_abigail.jpg"
            className="rounded-xl"
          />
          <Image
            height={400}
            width={400}
            alt="Mutiara Azzahra"
            src="https://wbqmdidxdtqqcwidmpfb.supabase.co/storage/v1/object/public/profiles/members/mutiara_azzahra.jpg"
            className="rounded-xl"
          />
          <Image
            height={400}
            width={400}
            alt="Shania Gracia"
            src="https://wbqmdidxdtqqcwidmpfb.supabase.co/storage/v1/object/public/profiles/members/shania_gracia.jpg"
            className="rounded-xl"
          />
          <Image
            height={400}
            width={400}
            alt="Angelina Christy"
            src="https://wbqmdidxdtqqcwidmpfb.supabase.co/storage/v1/object/public/profiles/members/angelina_christy.jpg"
            className="rounded-xl"
          />
          <Image
            height={400}
            width={400}
            alt="Grace Octaviani"
            src="https://wbqmdidxdtqqcwidmpfb.supabase.co/storage/v1/object/public/profiles/members/grace_octaviani.jpg"
            className="rounded-xl"
          />
        </div>
      </div>
    </div>
  );
}
