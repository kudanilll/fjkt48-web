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
