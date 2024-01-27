"use client";
import {
  monthStringArray,
  getCurrentDay,
  getCurrentMonth,
  getCurrentYear,
} from "@/utils/get-time";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Calendar from "@/components/calendar";

export default function SchedulePage() {
  const router = useRouter();
  const [month, setMonth] = useState(getCurrentMonth());
  const [year, setYear] = useState(getCurrentYear());
  const [path, setPath] = useState(`?date=${year}-${month.toLowerCase()}`);

  function handleDateChange(month: number, year: number) {
    setMonth(monthStringArray[month]);
    setYear(year);
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
      <div className="mb-4">
        <h1 className="text-2xl font-semibold">Jadwal Acara JKT48</h1>
        <h4 className="text-medium font-regular">{`${getCurrentDay()}, ${new Date().getDate()} ${getCurrentMonth()} ${getCurrentYear()}`}</h4>
      </div>
      <div className="mb-8">
        <Calendar
          apiEndPoint={path}
          currentMonth={month}
          currentYear={year}
          onDateChange={handleDateChange}
        />
      </div>
    </div>
  );
}
