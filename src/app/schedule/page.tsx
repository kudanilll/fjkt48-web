"use client";

import { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { getCurrentMonth, getCurrentYear, getCurrentDay } from "@/lib/utils";
import ScheduleCalendar from "@/components/ui/schedule-calendar";

const MIN_YEAR = 2024;
const MAX_YEAR = 2025;

export default function SchedulePage() {
  const router = useRouter();
  const searchParams = useSearchParams();

  // Mendapatkan tanggal dari URL atau menggunakan tanggal saat ini sebagai default
  const initialDate =
    searchParams.get("date") ||
    `${getCurrentYear()}-${getCurrentMonth().toLowerCase()}`;
  const [date, setDate] = useState({
    month: initialDate.split("-")[1],
    year: initialDate.split("-")[0],
  });

  // Mengatur tanggal saat URL berubah
  useEffect(() => {
    const { month, year } = date;

    // Redirect jika tahun di luar batas
    if (Number(year) < MIN_YEAR) {
      setDate({ month: "januari", year: "2024" });
      router.push("/schedule?date=2024-januari");
    } else if (Number(year) > MAX_YEAR) {
      setDate({ month: "desember", year: "2025" });
      router.push("/schedule?date=2025-desember");
    }
  }, [date, router]);

  function handleDateChange(newDate: { month: string; year: string }) {
    setDate(newDate);
    const newPath = `/schedule?date=${newDate.year}-${newDate.month.toLowerCase()}`;
    router.push(newPath);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  return (
    <div className="select-none">
      <div className="mb-4">
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
