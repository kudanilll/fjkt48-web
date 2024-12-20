"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { getCurrentMonth, getCurrentYear, getCurrentDay } from "@/lib/utils";
import ScheduleCalendar from "@/components/ui/schedule-calendar";

export default function SchedulePage() {
  const router = useRouter();
  const [date, setDate] = useState({
    month: getCurrentMonth(),
    year: String(getCurrentYear()),
  });

  function handleDateChange(newDate: { month: string; year: string }) {
    // if (Number(newDate.year) === 2024) {
    //   return;
    // }
    setDate(newDate);
    const newPath = `/schedule?date=${newDate.year}-${newDate.month.toLowerCase()}`;
    router.push(newPath);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  useEffect(() => {
    const queryPath = `/schedule?date=${date.year}-${date.month.toLowerCase()}`;
    router.prefetch(queryPath);
  }, [date, router]);

  return (
    <div>
      <div className="mb-4 select-none">
        <h1 className="text-2xl font-semibold text-red-600">
          Jadwal Acara JKT48
        </h1>
        <h4 className="text-medium font-regular text-red-600">{`${getCurrentDay()}, ${new Date().getDate()} ${getCurrentMonth()} ${getCurrentYear()}`}</h4>
      </div>
      <div className="mb-8">
        <ScheduleCalendar
          apiEndPoint={`/schedule/year/${date.year}/month/${date.month.toLowerCase()}`}
          currentDate={date}
          onDateChange={handleDateChange}
        />
      </div>
    </div>
  );
}
