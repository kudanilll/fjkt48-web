import { MdArrowBack, MdArrowForward } from "react-icons/md";

type PaginationProps = {
  total: number;
  current: number;
  onPageChange: any;
};

export default function Pagination(props: PaginationProps) {
  function prev() {
    if (props.current > 1) props.onPageChange(props.current - 1);
  }

  function next() {
    if (props.current < props.total) props.onPageChange(props.current + 1);
  }

  return (
    <div className="flex items-center justify-center py-4 lg:px-0 sm:px-6 px-4">
      <div className="lg:w-3/5 w-full flex items-center justify-between select-none">
        <div
          onClick={prev}
          className="flex items-center pt-3 md:px-4 md:py-2 text-gray-800 cursor-pointer md:hover:bg-red-400 md:hover:rounded-full md:hover:text-white duration-300">
          <MdArrowBack size={24} />
          <p className="text-sm ml-2 font-medium leading-none">Sebelumnya</p>
        </div>
        <div className="sm:flex hidden">
          <p className="text-sm font-light pt-3 px-1 md:py-2">Halaman </p>
          <p className="text-sm font-medium pt-3 px-1 md:py-2">
            {props.current}
          </p>
          <p className="text-sm font-light pt-3 px-1 md:py-2"> dari </p>
          <p className="text-sm font-medium pt-3 px-1 md:py-2">{props.total}</p>
        </div>
        <div
          onClick={next}
          className="flex items-center pt-3 md:px-4 md:py-2 text-gray-800 cursor-pointer md:hover:bg-red-400 md:hover:rounded-full md:hover:text-white duration-300">
          <p className="text-sm font-medium text-center whitespace-nowrap mr-2">
            Selanjutnya
          </p>
          <MdArrowForward size={24} />
        </div>
      </div>
    </div>
  );
}
