type ParagraphProps = {
  children: React.ReactNode;
  mobileHidden?: boolean;
  marginBottom?: string;
};

export default function Paragraph(props: ParagraphProps) {
  const mb = props.marginBottom ? props.marginBottom : "mb-6 md:mb-2";
  return (
    <p
      className={`text-md text-default-500 ${props.mobileHidden ? "hidden md:block mb-6" : mb}`}>
      {props.children}
    </p>
  );
}
