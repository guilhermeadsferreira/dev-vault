/**
 * Concatena classes e ignora valores falsy.
 * Não usa libs externas (clsx).
 */
export function cn(...classes: (string | undefined | null | false)[]): string {
  return classes.filter(Boolean).join(" ");
}
