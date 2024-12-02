import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';
import { format, formatDistance } from 'date-fns';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatDate(dateStr: string) {
  const date = new Date(dateStr);
  return format(date, "MMM d, h:mm a");
}

export function formatDuration(startStr: string, endStr: string) {
  const start = new Date(startStr);
  const end = new Date(endStr);
  return formatDistance(start, end);
}