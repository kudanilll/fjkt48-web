import leftIcon  from "@/assets/icons/chevron-left.svg";
import rightIcon from "@/assets/icons/chevron-right.svg";
import Image from "next/image";

type PaginationProps = {
  total: number;
  current: number;
  onPageChange: any;
};

export default function Pagination(props: PaginationProps) {
  
  function prev() {
    if(props.current > 1)
      props.onPageChange(props.current - 1);
  }
  
  function next() {
    if(props.current < props.total)
      props.onPageChange(props.current + 1);
  }
  
  return (
    <div className="flex items-center justify-center py-10 lg:px-0 sm:px-6 px-4">
      <div className="lg:w-3/5 w-full flex items-center justify-between">
        <div className="flex items-center pt-3 text-gray-800 cursor-pointer">
          <button onClick={prev}>
            <Image src={leftIcon} alt="prev" width={24} height={24}/>
          </button>
          <p className="text-sm ml-1 font-medium leading-none">Sebelumnya</p>
        </div>
        <div className="sm:flex hidden">
          <p className="text-sm font-light pt-3 px-1">Halaman </p>
          <p className="text-sm font-medium pt-3 px-1">{props.current}</p>
          <p className="text-sm font-light pt-3 px-1"> dari </p>
          <p className="text-sm font-medium pt-3 px-1">{props.total}</p>
        </div>
        <div className="flex items-center pt-3 text-gray-800 cursor-pointer">
          <p className="text-sm font-medium leading-none mr-1">Selanjutnya</p>
          <button onClick={next}>
            <Image src={rightIcon} alt="next" width={24} height={24}/>
          </button>
        </div>
      </div>
    </div>
  );
}