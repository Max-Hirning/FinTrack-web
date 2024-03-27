function formatDate(date: Date): string {
  const year = date.getFullYear();
  let month = (date.getMonth() + 1).toString();
  let day = date.getDate().toString();
  if(month.length === 1) {
    month = "0" + month;
  }
  if(day.length === 1) {
    day = "0" + day;
  }
  return `${year}-${month}-${day}`;
}

export function getCurrentYearRange(): [string, string] {
  const currentYear = new Date().getFullYear();
  const yearRangeStart = new Date(`${currentYear}-01-01`).toISOString().split("T")[0];
  const yearRangeEnd = new Date(`${currentYear + 1}-01-01`).toISOString().split("T")[0];
  return [yearRangeStart, yearRangeEnd];
}

export function getCurrentWeekRange(): [string, string] {
  const today = new Date();
  const dayOfWeek = today.getDay(); // 0 (Sunday) to 6 (Saturday)
  const diff = today.getDate() - dayOfWeek + (dayOfWeek === 0 ? -6 : 1); // Adjust to Monday if today is Sunday
  const startDate = new Date(today.setDate(diff));
  const endDate = new Date(today.setDate(diff + 6));
  const formattedStartDate = startDate.toISOString().split("T")[0];
  const formattedEndDate = endDate.toISOString().split("T")[0];
  return [formattedStartDate, formattedEndDate];
}

export function getCurrentMonthRange(): [string, string] {
  const today = new Date();
  const startOfMonth = new Date(today.getFullYear(), today.getMonth(), 1);
  const endOfMonth = new Date(today.getFullYear(), today.getMonth() + 1, 0);
  const startOfMonthString = formatDate(startOfMonth);
  const endOfMonthString = formatDate(endOfMonth);
  return [startOfMonthString, endOfMonthString];
}

export function getWeekDayName(dateString: string): string {
  const daysOfWeek = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  const date = new Date(dateString);
  const dayOfWeekNumber = date.getDay();
  const dayOfWeekName = daysOfWeek[dayOfWeekNumber];
  return dayOfWeekName;
}

export function getMonthName(monthNumber: number): string {
  const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
  const adjustedMonth = monthNumber - 1;
  if(adjustedMonth >= 0 && adjustedMonth < months.length) {
    return months[adjustedMonth];
  } else {
    throw new Error("Invalid month number. Month number should be between 1 and 12.");
  }
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

export function getDateRangeObject(startDate: string, endDate: string, frequency: "d" | "m", value: unknown): {[key: string]: unknown} {
  const currentDate = new Date(startDate);
  const dateObj: {[key: string]: unknown} = {};
  const getDateKey = (date: Date): string => {
    if(frequency === "d") return date.toISOString().split("T")[0];
    if(frequency === "m") return `${date.getMonth() + 1}`;
    throw new Error(`Invalid frequency: ${frequency}`);
  };
  while (currentDate <= new Date(endDate)) {
    const dateKey = getDateKey(currentDate);
    if(!dateObj[dateKey]) {
      dateObj[dateKey] = JSON.parse(JSON.stringify(value));
    }
    if(frequency === "d") {
      currentDate.setDate(currentDate.getDate() + 1);
    } else if(frequency === "m") {
      currentDate.setMonth(currentDate.getMonth() + 1);
    }
  }
  return dateObj;
}