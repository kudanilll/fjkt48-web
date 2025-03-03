"use client";

import { cn } from "@/lib/utils";
import TextProps from "./text.type";

export default function Text(props: TextProps) {
  const Component = props.as || "p";
  const mobileHidden = props.mobileHidden ? "hidden md:block" : "";
  const fontColor = props.fontColor ? props.fontColor : "text-gray-900";
  return (
    <Component
      className={cn(
        "font-poppins",
        mobileHidden,
        fontColor,
        props.fontFamily,
        props.className
      )}>
      {props.children}
    </Component>
  );
}
