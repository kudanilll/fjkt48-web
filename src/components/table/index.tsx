import { header } from "./header.json";

export type TableProps = {
  id: string;
  event: string;
  slug: string;
  time: string;
  category: string;
  day: string;
};

function TableHeader() {
  return (
    <thead className="border-neutral-900">
      <tr className="divide-x divide-gray-200">
        {header.map((column, index) => (
          <th key={index} className="p-4">{column.title}</th>
        ))}
      </tr>
    </thead>
  );
}

function TableBody(data: TableProps[]) {
  return (
    <tbody className="divide-y divide-gray-200">
      {data.map((column, index) => (
        <tr key={column.id} className="divide-x divide-gray-200">
          <td className="whitespace-nowrap p-2 text-center text-sm">{index}</td>
          <td className="whitespace-nowrap p-2 text-center text-sm">{`${column.time} (${column.day})`}</td>
          <td className="whitespace-nowrap p-2 text-center text-sm">{column.event}</td>
        </tr>
      ))}
    </tbody>
  );
}

export default function Table(props: any) {
  return (
    <div className="flex flex-col">
      <div className="overflow-x-auto align-middle inline-block min-w-full">
        <div className="shadow overflow-hidden">
          <table className="table-auto min-w-full divide-y divide-gray-200">
            <TableHeader/>
            <TableBody/>
          </table>
        </div>
      </div>
    </div>
  );
}