export function getRelativeTime(date: Date): string {
  const now = new Date();
  const seconds = Math.floor((now.getTime() - date.getTime()) / 1000);

  const units: [number, Intl.RelativeTimeFormatUnit][] = [
    [60, "second"], // أقل من دقيقة
    [60, "minute"], // أقل من ساعة
    [24, "hour"], // أقل من يوم
    [30, "day"], // أقل من شهر
    [12, "month"], // أقل من سنة
    [Number.POSITIVE_INFINITY, "year"], // الباقي
  ];

  let unitIndex = 0;
  let diff = seconds;

  while (unitIndex < units.length - 1 && diff >= units[unitIndex][0]) {
    diff = Math.floor(diff / units[unitIndex][0]);
    unitIndex++;
  }

  const formatter = new Intl.RelativeTimeFormat("en", { numeric: "auto" });
  return formatter.format(-diff, units[unitIndex][1]);
}
