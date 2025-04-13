export function getCurrentTime(): number {
  return new Date().getTime();
}

export function getSecondsBetween(date1: number, date2: number): number {
  return (date1 - date2) / 1000;
}
