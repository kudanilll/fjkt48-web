import leftIcon from "@/assets/icons/arrow-left.svg";
import rightIcon from "@/assets/icons/arrow-right.svg";
import Image from "next/image";

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
      <div className="lg:w-3/5 w-full flex items-center justify-between">
        <div className="flex items-center pt-3 text-gray-800 cursor-pointer">
          <Image
            onClick={prev}
            src={leftIcon}
            alt="prev"
            width={24}
            height={24}
          />
          <p onClick={prev} className="text-sm ml-1 font-medium leading-none">
            Sebelumnya
          </p>
        </div>
        <div className="sm:flex hidden">
          <p className="text-sm font-light pt-3 px-1">Halaman </p>
          <p className="text-sm font-medium pt-3 px-1">{props.current}</p>
          <p className="text-sm font-light pt-3 px-1"> dari </p>
          <p className="text-sm font-medium pt-3 px-1">{props.total}</p>
        </div>
        <div className="flex items-center pt-3 text-gray-800 cursor-pointer">
          <p
            onClick={next}
            className="text-sm font-medium text-center whitespace-nowrap mr-1">
            Selanjutnya
          </p>
          <Image
            onClick={next}
            src={rightIcon}
            alt="next"
            width={24}
            height={24}
          />
        </div>
      </div>
    </div>
  );
}
