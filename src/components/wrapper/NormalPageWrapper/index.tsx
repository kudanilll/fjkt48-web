export default function NormalPageWrapper({
  children,
}: {
  children: React.ReactNode;
}) {
  return <div className="mt-16 px-5 sm:px-16">{children}</div>;
}
