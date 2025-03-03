type TextProps = {
  children: React.ReactNode;
  as?:
    | "h1"
    | "h2"
    | "h3"
    | "h4"
    | "h5"
    | "h6"
    | "p"
    | "span"
    | "label"
    | "small";
  className?: string;
  fontFamily?:
    | "font-semibold"
    | "font-regular"
    | "font-medium"
    | "font-light"
    | "font-normal"
    | "font-bold";
  fontColor?: string;
  mobileHidden?: boolean;
};

export default TextProps;
