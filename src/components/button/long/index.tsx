import React from "react";

interface ButtonProps extends React.ComponentProps<"button"> {
  children?: React.ReactNode;
  href?: string;
}

export default function LongButton(props: ButtonProps) {
  const { children, href, ...rest } = props;
  return (
    <a href={href ?? href}>
      <button
        {...rest}
        className="btn items-center w-full py-2 transition-all bg-red-500 rounded-lg hover:bg-transparent border border-red-500 group">
        <span className="w-0 h-0 rounded bg-transparent absolute top-0 left-0 ease-out duration-500 transition-all group-hover:w-full group-hover:h-full -z-1"></span>
        <span className="w-full text-white text-center transition-colors duration-300 ease-in-out group-hover:text-red-500 z-10 px-4">
          {props.children ?? props.children}
        </span>
      </button>
    </a>
  );
}
