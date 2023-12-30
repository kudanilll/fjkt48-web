import { getDataFromStorage, getScheduleData } from "@/lib/firebase/service";

export async function getDataFromAPI(endpoint: string) {
  const res = await fetch(`${process.env.BASE_URL}${endpoint}`, {
    cache: "no-store",
    method: "GET"
  });
  if(!res.ok) {
    throw new Error(`Failed to fetch ${endpoint}`);
  }
  return res.json();
}

export async function getNewsFromStorage(filename: string) {
  const content = await getDataFromStorage(`news/${filename}.md`);
  return content;
}

export async function getSchedule(month: string, year: string) {
  var result = [];
  for(let day = 1; day < 31; day++) {
    const data = getScheduleData(month, year, day);
    if(data == null)
      continue;
    result.push(data);
  }
  return result;
}