import { clsx, type ClassValue } from "clsx"
import { differenceInMonths, differenceInYears } from "date-fns"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function getAgeInYearsAndMonths(start: string, from?: string): string {
  const end = from ? new Date(from).toLocaleDateString() : new Date().toLocaleDateString()

  if (!end) return "<1m"

  const m = differenceInMonths(end, start);
  const y = differenceInYears(end, start);

  if (m < 1) return "<1m"

  return `${y > 0 ? `${y}y` : ''} ${m - y * 12 > 0 ? `${m - y * 12}m` : ''}`
}

export function getAgeInMonths(date: string): string {
  const today = new Date().toLocaleDateString()

  if (!date) return ""

  const m = differenceInMonths(today, date);


  return m < 1 ? "<1m" : `${differenceInMonths(today, date).toString()}m`;
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