export const monthStringArray = [
  "Januari",
  "Februari",
  "Maret",
  "April",
  "Mei",
  "Juni",
  "Juli",
  "Agustus",
  "September",
  "Oktober",
  "November",
  "Desember",
];

export const dayStringArray = [
  "Minggu",
  "Senin",
  "Selasa",
  "Rabu",
  "Kamis",
  "Jumat",
  "Sabtu",
];

export function getCurrentDate() {
  // return `${getCurrentDay()}, ${new Date().getDate()} ${getCurrentMonth()} ${getCurrentYear()}`;
  return `${new Date().getDate()} ${getCurrentMonth()} ${getCurrentYear()}`;
}

export function getCurrentDay() {
  return dayStringArray[new Date().getDay()];
}

export function getCurrentMonth() {
  return monthStringArray[new Date().getMonth()];
}

export function getCurrentYear() {
  return new Date().getFullYear();
}

export function sortArrayByDate(array: any[]) {
  array.sort(function (a, b) {
    return Number(new Date(b.date)) - Number(new Date(a.date));
  });
  return array;
}

export async function getDataFromAPI(endpoint: string) {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}${endpoint}`, {
    cache: "no-store",
    method: "GET",
  });
  if (!res.ok) {
    throw new Error(`Failed to fetch ${endpoint}`);
  }
  return res.json();
}

export async function getNewsFromStorage(filename: string) {
  // const content = await getDataFromStorage(`news/content/${filename}.md`);
  // return content;
}
