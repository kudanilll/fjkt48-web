import { MdArrowBack, MdArrowForward } from "react-icons/md";
import { monthStringArray } from "@/utils/get-time";
import Table from "@/components/table";

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
      <div className="lg:w-3/5 w-full flex items-center justify-between mb-4 m-auto">
        <div
          onClick={prev}
          className="flex items-center pt-3 text-red-600 cursor-pointer">
          <MdArrowBack size={24} />
        </div>
        <h5 className="text-center text-sm font-semibold pt-3 px-1 text-red-600">{`${props.currentMonth} - ${props.currentYear}`}</h5>
        <div
          onClick={next}
          className="flex items-center pt-3 text-red-600 cursor-pointer">
          <MdArrowForward size={24} />
        </div>
      </div>
      <div>
        <div className="bg-gray-300 rounded mt-2 md:mt-4">
          <Table endpoint={props.apiEndPoint} />
        </div>
      </div>
    </div>
  );
}
