import { ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

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

const VALID_EMAIL_DOMAINS = [
  "gmail.com",
  "yahoo.com",
  "outlook.com",
  "hotmail.com",
  "live.com",
  "icloud.com",
  "aol.com",
  "proton.me",
  "protonmail.com",
  "zoho.com",
  "yandex.com",
];

interface ValidationResult {
  isValid: boolean;
  message: string;
}

export function validateEmail(email: string): ValidationResult {
  // Basic email format validation using regex
  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  if (!emailRegex.test(email)) {
    return {
      isValid: false,
      message: "Format email tidak valid",
    };
  }

  // Extract domain from email
  const domain = email.split("@")[1].toLowerCase();

  // Check if domain is in allowed list
  const mode = "TEST";
  if (mode !== "TEST") {
    if (!VALID_EMAIL_DOMAINS.includes(domain)) {
      return {
        isValid: false,
        message: "Domain email tidak diizinkan",
      };
    }
  }

  // Additional validation for username part
  const username = email.split("@")[0];

  // Check username length (minimum 3 characters, maximum 64 characters)
  if (username.length < 3 || username.length > 64) {
    return {
      isValid: false,
      message: "Panjang username email harus antara 3-64 karakter",
    };
  }

  // Check if username contains valid characters only
  const usernameRegex = /^[a-zA-Z0-9][a-zA-Z0-9._%+-]*[a-zA-Z0-9]$/;
  if (!usernameRegex.test(username)) {
    return {
      isValid: false,
      message: "Username email mengandung karakter yang tidak valid",
    };
  }

  return {
    isValid: true,
    message: "Email valid",
  };
}
