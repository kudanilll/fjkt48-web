import { MdArrowBack, MdArrowForward } from "react-icons/md";
import { monthStringArray } from "@/utils/get-time";
import Table from "@/components/ui/table";

type ScheduleCalendarProps = {
  apiEndPoint: string;
  currentDate: { month: string; year: string };
  onDateChange: any;
};

export default function ScheduleCalendar(props: ScheduleCalendarProps) {
  function prev() {
    const month: number = Number(
      monthStringArray.indexOf(props.currentDate.month)
    );
    const year: number = Number(props.currentDate.year);
    if (month > 0) props.onDateChange(month - 1, year);
    else if (year > new Date().getFullYear())
      props.onDateChange(monthStringArray.length - 1, year - 1);
  }

  function next() {
    const month: number = Number(
      monthStringArray.indexOf(props.currentDate.month)
    );
    const year: number = Number(props.currentDate.year);
    if (month < monthStringArray.length - 1)
      props.onDateChange(month + 1, year);
    else props.onDateChange(0, year + 1);
  }

  return (
    <div>
      <div className="lg:w-3/5 w-full flex items-center justify-between mb-4 m-auto">
        <div onClick={prev} className="flex items-center pt-3">
          <div className="p-2 text-red-600 cursor-pointer hover:bg-red-600 hover:rounded-full hover:text-white duration-300">
            <MdArrowBack size={24} />
          </div>
        </div>
        <h5 className="text-center text-sm font-semibold pt-3 px-1 text-red-600 select-none">{`${props.currentDate.month} - ${props.currentDate.year}`}</h5>
        <div onClick={next} className="flex items-center pt-3">
          <div className="p-2 text-red-600 cursor-pointer hover:bg-red-600 hover:rounded-full hover:text-white duration-300">
            <MdArrowForward size={24} />
          </div>
        </div>
      </div>
      <div className="bg-gray-300 rounded mt-2 md:mt-4">
        <Table endpoint={props.apiEndPoint} />
      </div>
    </div>
  );
}
