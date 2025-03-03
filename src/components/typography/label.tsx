"use client";

import { cn } from "@/lib/utils";
import TextProps from "./text.type";
import Text from "./text";

export default function Label(props: TextProps) {
  const fontFamily = props.fontFamily ? props.fontFamily : "font-medium";
  return (
    <Text
      as="label"
      className={cn(
        "text-gray-700 text-sm md:text-base tracking-wide",
        fontFamily,
        props.className
      )}>
      {props.children}
    </Text>
  );
}
