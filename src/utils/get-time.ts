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
  "Desember"
];

export const dayStringArray = [
  "Minggu",
  "Senin",
  "Selasa",
  "Rabu",
  "Kamis",
  "Jumat",
  "Sabtu"
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