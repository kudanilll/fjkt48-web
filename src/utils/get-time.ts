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

export function getCurrentMonth() {
  return monthStringArray[new Date().getMonth()];
}

export function getCurrentYear() {
  return new Date().getFullYear();
}