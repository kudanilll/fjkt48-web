"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import PageWrapper from "@/app/page-wrapper";
import Calendar from "@/components/calendar";
import { monthStringArray, getCurrentDay, getCurrentMonth, getCurrentYear } from "@/utils/get-time";

export default function SchedulePage() {
  const router = useRouter();
  const [month, setMonth] = useState(getCurrentMonth());
  const [year, setYear] = useState(getCurrentYear());
  const [path, setPath] = useState(`?date=${year}-${month.toLowerCase()}`);
  
  const handleDateChange = (month: number, year: number) => {
    setMonth(monthStringArray[month]);
    setYear(year);
    setPath(`?date=${year}-${monthStringArray[month].toLowerCase()}`);
    router.push(`/schedule?date=${year}-${monthStringArray[month].toLowerCase()}`);
    window.scrollTo({
      top: 0,
      behavior: "smooth"
    });
  };
  
  return (
    <PageWrapper>
      <div className="mb-4">
        <h1 className="text-2xl font-poppins font-semibold">Jadwal Acara JKT48</h1>
        <h4 className="text-medium font-poppins font-regular">{`${getCurrentDay()}, ${new Date().getDate()} ${getCurrentMonth()} ${getCurrentYear()}`}</h4>
      </div>
      <div className="mb-8">
        <Calendar
          apiEndPoint={path}
          currentMonth={month}
          currentYear={year}
          onDateChange={handleDateChange}/>
      </div>
    </PageWrapper>
  );
}