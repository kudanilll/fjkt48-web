import { useState, useEffect } from "react";
import { getCurrentDate } from "@/utils/get-time";
import header from "./header";

type TableProps = {
  id: string;
  event: string;
  date: string;
  time: string;
  slug: string;
  category: string;
  day: string;
};

// Function for sort data from newest -> oldest
function sort(arr: TableProps[]) {
  for (var i = 0; i < arr.length; i++) {
    for (var j = 0; j < arr.length - i - 1; j++) {
      if (Number(arr[j].id) > Number(arr[j + 1].id)) {
        var temp = arr[j];
        arr[j] = arr[j + 1];
        arr[j + 1] = temp;
      }
    }
  }
  return arr;
}

// Function for create a new line if the text of the data has a comma (,)
function TextDivider(props: { text: string; link?: string }) {
  const parts = props.text.split(", ");
  return (
    <td className="whitespace-nowrap p-3 md:py-4 font-poppins">
      {parts.map((part, index) => (
        <h5 key={index} className="text-center text-sm">
          <a href={props.link ? props.link : ""}>{part}</a>
        </h5>
      ))}
    </td>
  );
}

export default function Table(props: { endpoint: string }) {
  const [columnTable, setColumnTable] = useState<any[]>([]);

  useEffect(() => {
    fetch(`/api/v1/schedule${props.endpoint}`, {
      cache: "no-store",
      method: "GET",
    })
      .then((response) => response.json())
      .then((data) => setColumnTable(sort(data.content)));
  }, [props.endpoint]);

  return (
    <div className="flex flex-col">
      <div className="align-middle inline-block min-w-full">
        <div className="overflow-scroll md:overflow-hidden">
          {columnTable.length > 0 ? (
            <table className="table-auto overflow-scroll md:overflow-hidden w-full divide-y divide-white bg-red-200">
              {/* Table Header */}
              <thead className="border-neutral-900">
                <tr className="divide-x divide-white">
                  {header.map((row, index) => (
                    <th
                      key={index}
                      className={`${index === 3 ? "px-20 py-4" : "p-4"} text-red-600 font-poppins`}>
                      {row.title}
                    </th>
                  ))}
                </tr>
              </thead>
              {/* Table Body */}
              <tbody className="divide-y divide-white">
                {columnTable.map((row, index) => (
                  <tr
                    key={row.id}
                    className={`divide-x divide-white ${row.date === getCurrentDate() ? "text-red-700" : "text-black"}`}>
                    <td className="whitespace-nowrap p-3 md:py-4 text-sm text-center font-poppins">
                      {index + 1}
                    </td>
                    <td className="whitespace-nowrap p-3 md:py-4 text-sm text-center font-poppins">{`${row.day}, ${row.date}`}</td>
                    <TextDivider text={row.time} />
                    <TextDivider text={row.event} link={row.slug} />
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <table className="table-auto overflow-scroll md:overflow-hidden w-full divide-y divide-white bg-red-200">
              <h3 className="p-5 text-center text-sm text-red-600 font-poppins font-semibold">
                Tidak ada jadwal di bulan ini.
              </h3>
            </table>
          )}
        </div>
      </div>
    </div>
  );
}
