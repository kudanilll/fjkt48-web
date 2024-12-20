import { MdArrowBack, MdArrowForward } from "react-icons/md";
import { monthStringArray } from "@/lib/utils";
import Table from "@/components/ui/table";

type ScheduleCalendarProps = {
  apiEndPoint: string;
  currentDate: { month: string; year: string };
  onDateChange: (newDate: { month: string; year: string }) => void;
};

function changeDate(
  direction: "prev" | "next",
  currentMonth: string,
  currentYear: string
) {
  const currentMonthIndex = monthStringArray.indexOf(currentMonth);
  const year = Number(currentYear);

  if (direction === "prev") {
    // if (year === 2024) {
    //   return;
    // }
    if (currentMonthIndex > 0) {
      return {
        month: monthStringArray[currentMonthIndex - 1],
        year: String(year),
      };
    }
    return {
      month: monthStringArray[monthStringArray.length - 1],
      year: String(year - 1),
    };
  }

  if (currentMonthIndex < monthStringArray.length - 1) {
    return {
      month: monthStringArray[currentMonthIndex + 1],
      year: String(year),
    };
  }
  return { month: monthStringArray[0], year: String(year + 1) };
}

export default function ScheduleCalendar(props: ScheduleCalendarProps) {
  function handlePrev() {
    const newDate = changeDate(
      "prev",
      props.currentDate.month,
      props.currentDate.year
    );
    if (newDate) {
      props.onDateChange(newDate);
    }
  }

  function handleNext() {
    const newDate = changeDate(
      "next",
      props.currentDate.month,
      props.currentDate.year
    );
    if (newDate) {
      props.onDateChange(newDate);
    }
  }

  return (
    <div>
      <div className="lg:w-3/5 w-full flex items-center justify-between mb-4 m-auto">
        <div onClick={handlePrev} className="flex items-center pt-3">
          <div className="p-2 text-red-600 cursor-pointer hover:bg-red-600 hover:rounded-full hover:text-white duration-300">
            <MdArrowBack size={24} />
          </div>
        </div>
        <h5 className="text-center text-sm font-semibold pt-3 px-1 text-red-600 select-none">
          {`${props.currentDate.month} - ${props.currentDate.year}`}
        </h5>
        <div onClick={handleNext} className="flex items-center pt-3">
          <div className="p-2 text-red-600 cursor-pointer hover:bg-red-600 hover:rounded-full hover:text-white duration-300">
            <MdArrowForward size={24} />
          </div>
        </div>
      </div>
      <div className="bg-gray-300 rounded mt-2 md:mt-4">
        <Table year={props.currentDate.year} month={props.currentDate.month} />
      </div>
    </div>
  );
}
