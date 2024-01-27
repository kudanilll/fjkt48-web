import Image from "next/image";
import leftIcon from "@/assets/icons/arrow-left.svg";
import rightIcon from "@/assets/icons/arrow-right.svg";
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
    var year = Number(props.currentYear);
    if (month > 0) props.onDateChange(month - 1, year);
    else if (year > new Date().getFullYear())
      props.onDateChange(monthStringArray.length - 1, year - 1);
  }

  function next() {
    var month = Number(monthStringArray.indexOf(props.currentMonth));
    var year = Number(props.currentYear);
    if (month < monthStringArray.length - 1)
      props.onDateChange(month + 1, year);
    else props.onDateChange(0, year + 1);
  }

  return (
    <div>
      <div className="lg:w-3/5 w-full flex items-center justify-between mb-4">
        <div className="flex items-center pt-3 text-gray-800 cursor-pointer">
          <Image
            onClick={prev}
            src={leftIcon}
            alt="prev"
            width={24}
            height={24}
          />
        </div>
        <h5 className="text-center text-sm font-medium pt-3 px-1">{`${props.currentMonth} - ${props.currentYear}`}</h5>
        <div className="flex items-center pt-3 text-gray-800 cursor-pointer">
          <Image
            onClick={next}
            src={rightIcon}
            alt="next"
            width={24}
            height={24}
          />
        </div>
      </div>
      <div>
        <div className="bg-gray-300 rounded">
          <Table endpoint={props.apiEndPoint} />
        </div>
      </div>
    </div>
  );
}
