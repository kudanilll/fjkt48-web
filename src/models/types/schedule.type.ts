export type ScheduleData = {
  _id: number;
  category: "jkt48" | "trainee" | "event";
  day: string;
  date: string;
  event: string;
  time: string;
};

export type Schedule = {
  _id: string;
  schedule: ScheduleData[];
};
