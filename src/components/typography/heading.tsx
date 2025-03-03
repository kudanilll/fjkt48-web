"use client";

import { cn } from "@/lib/utils";
import TextProps from "./text.type";
import Text from "./text";

export default function Heading(props: TextProps) {
  const as = props.as || "h1";
  const fontFamily = props.fontFamily ? props.fontFamily : "font-semibold";
  const baseStyles = "text-red-600 font-poppins leading-tight";
  const sizeStyles = {
    h1: "text-4xl md:text-5xl lg:text-6xl",
    h2: "text-3xl md:text-4xl lg:text-5xl",
    h3: "text-2xl md:text-3xl lg:text-4xl",
    h4: "text-xl md:text-2xl lg:text-3xl",
    h5: "text-lg md:text-xl lg:text-2xl",
    h6: "text-base md:text-lg lg:text-xl",

    // dont use this!!
    p: "",
    span: "",
    label: "",
    small: "",
  };
  return (
    <Text
      as={as}
      className={cn(baseStyles, sizeStyles[as], fontFamily, props.className)}>
      {props.children}
    </Text>
  );
}
