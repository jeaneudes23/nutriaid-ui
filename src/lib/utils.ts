import { clsx, type ClassValue } from "clsx"
import { differenceInMonths, differenceInYears } from "date-fns"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function getAgeInMonths(date: string): string {
  const today = new Date().toLocaleDateString()

  if (!date || date == "") return ""

  const years = differenceInYears(today, date);
  const months = differenceInMonths(today, date) - years * 12;

  return `${years} years and ${months} months`
}

export function parseDate(value: string): string {
  return new Date(value).toISOString().split('T')[0]
}