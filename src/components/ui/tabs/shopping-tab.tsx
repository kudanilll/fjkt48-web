"use client";
import { useState } from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import Tab from "./tab";
import Heading from "@/components/typography/heading";

function SlideContent({
  className,
  tabs,
  active,
}: {
  className?: string;
  tabs: Tab[];
  active: Tab;
}) {
  // Menghitung posisi index untuk efek slide
  const activeIndex = tabs.findIndex((tab) => tab.value === active.value);

  return (
    <div className="relative w-full h-full overflow-hidden">
      <div className="flex relative w-full h-full">
        {tabs.map((tab) => (
          <motion.div
            key={tab.value}
            initial={false}
            animate={{
              x: `${(tabs.findIndex((t) => t.value === tab.value) - activeIndex) * 100}%`,
            }}
            transition={{
              type: "spring",
              stiffness: 300,
              damping: 30,
            }}
            className={cn(
              "w-full h-full absolute top-0 left-0 flex-shrink-0",
              className
            )}>
            {tab.content}
          </motion.div>
        ))}
      </div>
    </div>
  );
}

export default function ShoppingTab({
  tabs: propTabs,
  containerClassName,
  activeTabClassName,
  tabClassName,
  contentClassName,
}: {
  tabs: Tab[];
  containerClassName?: string;
  activeTabClassName?: string;
  tabClassName?: string;
  contentClassName?: string;
}) {
  const [active, setActive] = useState<Tab>(propTabs[0]);
  const [hovering, setHovering] = useState(false);

  const handleTabClick = (tab: Tab) => {
    setActive(tab);
  };

  return (
    <>
      <div className="flex flex-row justify-between items-center">
        <Heading fontFamily="font-semibold">JKT48 Store</Heading>
        <div
          className={cn(
            "flex flex-row items-center justify-start relative overflow-auto sm:overflow-visible no-visible-scrollbar",
            containerClassName
          )}>
          {propTabs.map((tab) => (
            <button
              key={tab.title}
              onClick={() => handleTabClick(tab)}
              onMouseEnter={() => setHovering(true)}
              onMouseLeave={() => setHovering(false)}
              className={cn("relative px-4 py-2 rounded-full", tabClassName)}>
              {active.value === tab.value && (
                <motion.div
                  layoutId="clickedbutton"
                  transition={{ type: "spring", bounce: 0.3, duration: 0.6 }}
                  className={cn(
                    "absolute inset-0 bg-red-500 rounded-full",
                    activeTabClassName
                  )}
                />
              )}
              <span
                className={`relative block ${
                  active.value === tab.value
                    ? "text-white font-semibold"
                    : "text-red-500 font-medium"
                }`}>
                {tab.title}
              </span>
            </button>
          ))}
        </div>
      </div>
      <SlideContent
        tabs={propTabs}
        active={active}
        className={cn("mt-2", contentClassName)}
      />
    </>
  );
}
