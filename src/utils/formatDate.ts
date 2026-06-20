// Takes a Date object, returns a string like "June 19, 2026"
export function formatDate(date: Date): string {
    return date.toLocaleDateString('en-US', {
    month: 'long',
    day: 'numeric',
    year: 'numeric'
  });
}