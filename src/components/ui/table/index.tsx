"use client";
import { getCurrentDate } from "@/lib/utils";
import { Schedule } from "@/models/types/schedule.type";
import header from "./header";
import useFetch from "@/hooks/use-fetch";

function sort(arr: Schedule[]) {
  return arr.map((item) => ({
    ...item,
    schedule: item.schedule.sort((a, b) => Number(a._id) - Number(b._id)),
  }));
}

function TextDivider({ text, link }: { text: string; link?: string }) {
  const parts = text.split(", ");
  return (
    <td className="whitespace-nowrap p-3 md:py-4">
      {parts.map((part, index) => (
        <h5 key={index} className="text-center text-sm">
          <a href={link || ""}>{part}</a>
        </h5>
      ))}
    </td>
  );
}

export default function Table({
  month,
  year,
}: {
  month: string;
  year: string;
}) {
  const [schedule, successFetchSchedule] = useFetch<Schedule[]>(
    `/schedule/year/${year}/month/${month.toLowerCase()}`,
    "schedule"
  );

  return (
    <div className="flex flex-col">
      <div className="align-middle inline-block min-w-full">
        <div className="overflow-scroll md:overflow-hidden">
          {successFetchSchedule ? (
            <table className="table-auto overflow-scroll md:overflow-hidden w-full divide-y divide-white bg-red-200">
              <thead className="border-neutral-900">
                <tr className="divide-x divide-white">
                  {header.map((row, index) => (
                    <th
                      key={index}
                      className={`${index === 3 ? "px-20 py-4" : "p-4"} text-red-600 select-none`}>
                      {row.title}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-white">
                {schedule &&
                  sort(schedule).flatMap((row) =>
                    row.schedule.map((scheduleItem, itemIndex) => (
                      <tr
                        key={`${row._id}-${scheduleItem._id}`}
                        className={`select-none divide-x divide-white text-red-700 ${
                          scheduleItem.date === getCurrentDate()
                            ? "font-semibold"
                            : "font-normal"
                        }`}>
                        <td className="whitespace-nowrap p-3 md:py-4 text-sm text-center">
                          {itemIndex + 1}
                        </td>
                        <td className="whitespace-nowrap p-3 md:py-4 text-sm text-center">
                          {`${scheduleItem.day}, ${scheduleItem.date}`}
                        </td>
                        <TextDivider text={scheduleItem.time} />
                        <TextDivider text={scheduleItem.event} />
                      </tr>
                    ))
                  )}
              </tbody>
            </table>
          ) : (
            <div className="p-5 text-center text-red-600 bg-red-200">
              Tidak ada jadwal di bulan ini.
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
