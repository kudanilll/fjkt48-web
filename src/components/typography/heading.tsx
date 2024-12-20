type ParagraphProps = {
  children: React.ReactNode;
  fontFamily?:
    | "font-semibold"
    | "font-regular"
    | "font-medium"
    | "font-light"
    | "font-normal"
    | "font-bold";
  marginBottom?: string;
};

export default function Heading(props: ParagraphProps) {
  const fontFamily = props.fontFamily ? props.fontFamily : "font-normal";
  const marginBottom = props.marginBottom ? props.marginBottom : "mb-2";
  return (
    <h1
<<<<<<< HEAD
      className={`text-2xl md:text-3xl font-poppins text-red-600 select-none ${fontFamily} ${marginBottom}`}>
=======
      className={`text-2xl md:text-3xl text-red-600 mb-2 select-none ${props.fontFamily ? props.fontFamily : "font-normal"}`}>
>>>>>>> development
      {props.children}
    </h1>
  );
}
