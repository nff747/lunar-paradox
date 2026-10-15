import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";

/**
 * Standard shadcn/ui class combiner merging conditional classes with Tailwind CSS conflict resolution.
 */
export function cn(...inputs) {
  return twMerge(clsx(inputs));
}
