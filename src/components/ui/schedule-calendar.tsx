"use client";

import { MdArrowBack, MdArrowForward } from "react-icons/md";
import { monthStringArray } from "@/lib/utils";
import Table from "@/components/ui/table";

type ScheduleCalendarProps = {
  apiEndPoint: string;
  currentDate: { month: string; year: string };
  onDateChange: (newDate: { month: string; year: string }) => void;
};

const MIN_YEAR = 2024;
const MAX_YEAR = 2025;

function changeDate(
  direction: "prev" | "next",
  currentMonth: string,
  currentYear: string
) {
  const currentMonthIndex = monthStringArray.indexOf(currentMonth);
  const year = Number(currentYear);

  if (direction === "prev") {
    if (year === MIN_YEAR && currentMonthIndex === 0) {
      // Blok navigasi ke tahun sebelum 2024
      return { month: "januari", year: "2024" };
    }
    if (currentMonthIndex > 0) {
      return {
        month: monthStringArray[currentMonthIndex - 1],
        year: String(year),
      };
    }
    return {
      month: "desember",
      year: String(year - 1),
    };
  }

  if (direction === "next") {
    if (
      year === MAX_YEAR &&
      currentMonthIndex === monthStringArray.length - 1
    ) {
      // Blok navigasi ke tahun setelah 2025
      return { month: "desember", year: "2025" };
    }
    if (currentMonthIndex < monthStringArray.length - 1) {
      return {
        month: monthStringArray[currentMonthIndex + 1],
        year: String(year),
      };
    }
    return {
      month: "januari",
      year: String(year + 1),
    };
  }

  return { month: currentMonth, year: currentYear }; // Default return
}

export default function ScheduleCalendar(props: ScheduleCalendarProps) {
  const { currentDate, onDateChange } = props;

  function handlePrev() {
    const newDate = changeDate("prev", currentDate.month, currentDate.year);
    onDateChange(newDate);
  }

  function handleNext() {
    const newDate = changeDate("next", currentDate.month, currentDate.year);
    onDateChange(newDate);
  }

  return (
    <div>
      <div className="lg:w-3/5 w-full flex items-center justify-between mb-4 m-auto">
        <button
          onClick={handlePrev}
          disabled={
            currentDate.year === "2024" && currentDate.month === "januari"
          }
          className={`p-2 text-red-600 cursor-pointer hover:bg-red-600 hover:rounded-full hover:text-white duration-300 ${
            currentDate.year === "2024" && currentDate.month === "januari"
              ? "opacity-50 cursor-not-allowed"
              : ""
          }`}>
          <MdArrowBack size={24} />
        </button>
        <h5 className="text-center text-sm font-semibold pt-3 px-1 text-red-600">
          {`${currentDate.month.toUpperCase()} - ${currentDate.year}`}
        </h5>
        <button
          onClick={handleNext}
          disabled={
            currentDate.year === "2025" && currentDate.month === "desember"
          }
          className={`p-2 text-red-600 cursor-pointer hover:bg-red-600 hover:rounded-full hover:text-white duration-300 ${
            currentDate.year === "2025" && currentDate.month === "desember"
              ? "opacity-50 cursor-not-allowed"
              : ""
          }`}>
          <MdArrowForward size={24} />
        </button>
      </div>
      <div className="bg-gray-300 rounded mt-2 md:mt-4">
        <Table year={currentDate.year} month={currentDate.month} />
      </div>
    </div>
  );
}
