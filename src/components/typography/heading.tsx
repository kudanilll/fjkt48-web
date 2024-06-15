type ParagraphProps = {
  children: React.ReactNode;
  fontFamily?:
    | "font-semibold"
    | "font-regular"
    | "font-medium"
    | "font-light"
    | "font-normal"
    | "font-bold";
};

export default function Heading(props: ParagraphProps) {
  return (
    <h1
      className={`text-2xl md:text-3xl font-poppins text-red-600 mb-2 select-none ${props.fontFamily ? props.fontFamily : "font-normal"}`}>
      {props.children}
    </h1>
  );
}
