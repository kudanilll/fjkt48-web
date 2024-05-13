export default function NormalPageWrapper({
  children,
  marginTop,
}: {
  children: React.ReactNode;
  marginTop?: number;
}) {
  const top = marginTop ? `mt-${marginTop}` : "mt-16";
  return <div className={`px-5 sm:px-16 ${top}`}>{children}</div>;
}
