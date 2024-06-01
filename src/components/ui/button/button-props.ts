import React from "react";

export default interface ButtonProps extends React.ComponentProps<"button"> {
  children?: React.ReactNode;
  href?: string;
}
