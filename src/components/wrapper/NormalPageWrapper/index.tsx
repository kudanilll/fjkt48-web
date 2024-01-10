export default function NormalPageWrapper({children}: {children: React.ReactNode}) {
  return (
    <div className="mt-12 px-5 sm:px-16">
      {children}
    </div>
  );
}