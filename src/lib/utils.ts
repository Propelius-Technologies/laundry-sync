type ClassValue = string | false | null | undefined;

/** Join conditional class names. Deliberately tiny - no runtime dependency. */
export function cn(...classes: ClassValue[]): string {
  return classes.filter(Boolean).join(" ");
}
