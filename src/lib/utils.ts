import { clsx, type ClassValue } from "clsx"
import { differenceInMonths, differenceInYears } from "date-fns"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function getAgeInMonths(date: string): string {
  const today = new Date().toLocaleDateString()

  if (!date) return ""

  return differenceInMonths(today, date).toString();
}

export function parseDate(value: string | Date): string {
  return new Date(value).toISOString().split('T')[0]
}

export function getDateRanges(): { minDate: string, maxDate: string } {
  const today = new Date();
  const maxDate = today.toISOString().split("T")[0];
  today.setFullYear(today.getFullYear() - 5);
  const minDate = today.toISOString().split("T")[0];
  return { minDate, maxDate }
}