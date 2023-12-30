"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import PageWrapper from "@/app/page-wrapper";
import Calendar from "@/components/calendar";
//import { getSchedule } from "@/utils/get-data";
import { bubbleshort } from "@/utils/bubbleshort";
import { monthStringArray, getCurrentMonth, getCurrentYear } from "@/utils/get-time";

export default function SchedulePage() {
  const router = useRouter();
  const [month, setMonth] = useState(getCurrentMonth());
  const [year, setYear] = useState(getCurrentYear());
  const [scheduleData, setScheduleData] = useState([]);
  const [distance, setDistance] = useState([]);
  
  const handleDateChange = (month: number, year: number) => {
    setMonth(monthStringArray[month]);
    setYear(year);
    router.push(`/schedule?date=${month+1}-${year}`);
    window.scrollTo({
      top: 0,
      behavior: "smooth"
    });
  };
  
  useEffect(() => {
    fetch("/api/v1/schedule", {
      cache: "no-store",
      method: "GET"
    }).then((response) => response.json())
      .then((data) => setDistance(bubbleshort(data)));
  }, []);
  
  return (
    <PageWrapper>
      <div className="mb-4">
        <h1 className="text-2xl font-poppins font-semibold">Jadwal</h1>
      </div>
      <div className="mb-8">
        <Calendar
          currentMonth={month}
          currentYear={year}
          onDateChange={handleDateChange}/>
      </div>
    </PageWrapper>
  );
}