import Table, { TableProps } from "@/components/table";
import { monthStringArray } from "@/utils/get-time";

type CalendarProps = {
  currentYear: string;
  currentMonth: string;
  onDateChange: any;
  data: TableProps[];
};

export default function Calendar(props: CalendarProps) {
  const prev = () => {
    var month = Number(monthStringArray.indexOf(props.currentMonth));
    var year  = Number(props.currentYear);
    if(month > 0)
      props.onDateChange(month - 1, year);
    else
      props.onDateChange(monthStringArray.length - 1, year - 1);
  };
  const next = () => {
    var month = Number(monthStringArray.indexOf(props.currentMonth));
    var year  = Number(props.currentYear);
    if(month < (monthStringArray.length - 1))
      props.onDateChange(month + 1, year);
    else
      props.onDateChange(0, year + 1);
  };
  return (
    <div>
      <div className="backdrop-blur-lg bg-gray-300 py-2 rounded-2xl items-center">
        <button
          className="absolute top-0 bottom-0 font-poppins text-sm bg-red-600 px-4 py-1 rounded-l-2xl text-white"
          onClick={prev}>
          {"<"}
        </button>
        <h5 className="text-center">{`${props.currentMonth} - ${props.currentYear}`}</h5>
        <button
          className="absolute top-0 bottom-0 right-0 font-poppins text-sm bg-red-600 px-4 py-1 rounded-r-2xl text-white"
          onClick={next}>
          {">"}
        </button>
      </div>
      <div className="mt-2">
        <div className="backdrop-blur-lg bg-gray-300 rounded">
          {(props.data == null) ? (
            <h3 className="text-sm text-center p-4">Tidak ada jadwal pada bulan ini.</h3>
          ) : (
            <Table/>
          )}
        </div>
      </div>
    </div>
  );
}