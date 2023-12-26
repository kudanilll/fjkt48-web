export default function Pagination() {
  return (
    <div className="backdrop-blur-lg bg-neutral-900 py-2 rounded-2xl items-center">
      <button
        className="absolute top-0 bottom-0 font-poppins text-sm bg-red-700 px-4 py-1 rounded-l-2xl">
        {"<"}
      </button>
      <p className="text-center">1/10</p>
      <button
        className="absolute top-0 bottom-0 right-0 font-poppins text-sm bg-red-700 px-4 py-1 rounded-r-2xl">
        {">"}
      </button>
    </div>
  );
}