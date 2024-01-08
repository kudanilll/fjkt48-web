import Image from "next/image";
import leftIcon  from "@/assets/icons/chevron-left.svg";
import rightIcon from "@/assets/icons/chevron-right.svg";
import Table from "@/components/table";
import { monthStringArray } from "@/utils/get-time";

type CalendarProps = {
  apiEndPoint: string;
  currentYear: string;
  currentMonth: string;
  onDateChange: any;
};

export default function Calendar(props: CalendarProps) {
  
  function prev() {
    var month = Number(monthStringArray.indexOf(props.currentMonth));
    var year  = Number(props.currentYear);
    if(month > 0)
      props.onDateChange(month - 1, year);
    else
      if(year > new Date().getFullYear())
        props.onDateChange(monthStringArray.length - 1, year - 1);
  }
  
  function next() {
    var month = Number(monthStringArray.indexOf(props.currentMonth));
    var year  = Number(props.currentYear);
    if(month < (monthStringArray.length - 1))
      props.onDateChange(month + 1, year);
    else
      props.onDateChange(0, year + 1);
  }
  
  return (
    <div>
      <div className="backdrop-blur-sm bg-gray-300 py-2 rounded-2xl items-center">
        <button
          className="absolute top-0 bottom-0 bg-red-600 px-4 py-1 rounded-l-2xl"
          onClick={prev}>
          <Image src={leftIcon} alt="prev" width={24} height={24}/>
        </button>
        <h5 className="text-center">{`${props.currentMonth} - ${props.currentYear}`}</h5>
        <button
          className="absolute top-0 bottom-0 right-0 bg-red-600 px-4 py-1 rounded-r-2xl"
          onClick={next}>
          <Image src={rightIcon} alt="next" width={24} height={24}/>
        </button>
      </div>
      <div className="mt-2">
        <div className="bg-gray-300 rounded">
          <Table apiEndPoint={props.apiEndPoint}/>
        </div>
      </div>
    </div>
  );
}