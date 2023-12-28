type PaginationProps = {
  total: number;
  current: number;
  onPageChange: any;
};

export default function Pagination(props: PaginationProps) {
  const prev = () => {
    if(props.current > 1)
      props.onPageChange(props.current - 1)
  };
  const next = () => {
    if(props.current < props.total)
      props.onPageChange(props.current + 1)
  };
  return (
    <div className="backdrop-blur-lg bg-gray-300 py-2 rounded-2xl items-center">
      <button
        className="absolute top-0 bottom-0 font-poppins text-sm bg-red-600 px-4 py-1 rounded-l-2xl text-white"
        onClick={prev}>
        {"<"}
      </button>
      <h5 className="text-center">{`${props.current}/${props.total}`}</h5>
      <button
        className="absolute top-0 bottom-0 right-0 font-poppins text-sm bg-red-600 px-4 py-1 rounded-r-2xl text-white"
        onClick={next}>
        {">"}
      </button>
    </div>
  );
}