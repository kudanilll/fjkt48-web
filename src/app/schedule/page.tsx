"use client";
import {
  monthStringArray,
  getCurrentDay,
  getCurrentMonth,
  getCurrentYear,
} from "@/utils/get-time";
import { useState } from "react";
import { useRouter } from "next/navigation";
import ScheduleCalendar from "@/components/ui/schedule-calendar";

export default function SchedulePage() {
  const router = useRouter();
  const [date, setDate] = useState({
    month: getCurrentMonth(),
    year: String(getCurrentYear()),
  });
  const [path, setPath] = useState(
    `?date=${date.year}-${date.month.toLowerCase()}`
  );

  function handleDateChange(month: number, year: number) {
    setDate({
      month: monthStringArray[month],
      year: String(year),
    });
    setPath(`?date=${year}-${monthStringArray[month].toLowerCase()}`);
    router.push(
      `/schedule?date=${year}-${monthStringArray[month].toLowerCase()}`
    );
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }

  return (
    <div>
      <div className="mb-4 select-none">
        <h1 className="text-2xl font-semibold text-red-600 font-poppins">
          Jadwal Acara JKT48
        </h1>
        <h4 className="text-medium font-regular text-red-600 font-poppins">{`${getCurrentDay()}, ${new Date().getDate()} ${getCurrentMonth()} ${getCurrentYear()}`}</h4>
      </div>
      <div className="mb-8">
        <ScheduleCalendar
          apiEndPoint={path}
          currentDate={date}
          onDateChange={handleDateChange}
        />
      </div>
    </div>
  );
}
