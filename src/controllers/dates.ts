function formatDate(date: Date) {
  const year = date.getFullYear();
  let month = (date.getMonth() + 1).toString();
  let day = date.getDate().toString();
  if (month.length === 1) {
    month = "0" + month;
  }
  if (day.length === 1) {
    day = "0" + day;
  }
  return `${year}-${month}-${day}`;
}

export function getStartEndOfMonth(): [string, string] {
  const today = new Date();
  const startOfMonth = new Date(today.getFullYear(), today.getMonth(), 1);
  const endOfMonth = new Date(today.getFullYear(), today.getMonth() + 1, 0);
  const startOfMonthString = formatDate(startOfMonth);
  const endOfMonthString = formatDate(endOfMonth);
  return [startOfMonthString, endOfMonthString];
}

export function getCurrentWeekRange(): [string, string] {
  const today = new Date("'2024-03-11'");
  const dayOfWeek = today.getDay(); // 0 (Sunday) to 6 (Saturday)
  const diff = today.getDate() - dayOfWeek + (dayOfWeek === 0 ? -6 : 1); // Adjust to Monday if today is Sunday
  const startDate = new Date(today.setDate(diff));
  const endDate = new Date(today.setDate(diff + 6));
  const formattedStartDate = startDate.toISOString().split("T")[0];
  const formattedEndDate = endDate.toISOString().split("T")[0];
  return [formattedStartDate, formattedEndDate];
}

export function getWeekDayName(dateString: string): string {
  const daysOfWeek = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  const date = new Date(dateString);
  const dayOfWeekNumber = date.getDay();
  const dayOfWeekName = daysOfWeek[dayOfWeekNumber];
  return dayOfWeekName;
}

export function convertISODateToCustomFormat(isoDate: string): string {
  const options: Intl.DateTimeFormatOptions = {
    day: "2-digit", 
    month: "short", 
    year: "numeric",
  };
  const date = new Date(isoDate);
  const formattedDate = date.toLocaleDateString("en-GB", options);
  return formattedDate;
}

export function getDateRangeObject(startDate: string, endDate: string, value: unknown): {[key: string]: unknown} {
  const dateObj: {[key: string]: unknown} = {};
  const currentDate = new Date(startDate);
  while (currentDate <= new Date(endDate)) {
    const formattedDate = currentDate.toISOString().split("T")[0];
    dateObj[formattedDate] = JSON.parse(JSON.stringify(value));
    currentDate.setDate(currentDate.getDate() + 1);
  }
  return dateObj;
}