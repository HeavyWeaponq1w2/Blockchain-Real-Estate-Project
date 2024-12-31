import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function modifyString(input: string): string {
  let result = input.replace(/([A-Z])/g, " $1");
  result = result.replace(/([_])/g, " ");
  return result.charAt(0).toUpperCase() + result.slice(1);
}
