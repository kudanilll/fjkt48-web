import Link from "next/link";

type ScheduleProps = {
  title: string;
  date: string;
  slug: string;
};

export default function ScheduleCard(props: ScheduleProps) {
  return (
    <Link href={props.slug ? props.slug : "/"}>
      <div className="rounded-xl flex bg-gray-300 w-full mb-2">
        <div className="p-4">
          <h4 className="font-semibold text-left">{props.title}</h4>
          <small className="text-default-500">{props.date}</small>
        </div>
      </div>
    </Link>
  );
}
