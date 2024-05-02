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
  const yearRangeEnd = new Date(`${currentYear}-12-31`).toISOString().split("T")[0];
  return [yearRangeStart, yearRangeEnd];
}

export function getCurrentWeekRange(): [string, string] {
  const today = new Date();
  const dayOfWeek = today.getDay(); // 0 (Sunday) to 6 (Saturday)
  const diff = today.getDate() - dayOfWeek + (dayOfWeek === 0 ? -6 : 1); // Adjust to Monday if today is Sunday
  const startDate = new Date(today.setDate(diff));
  const endDate = new Date(startDate);
  endDate.setDate(startDate.getDate() + 6);
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

export function getSixPrevMonthsRange(): [string, string] {
  const today = new Date();
  const currentMonth = today.getMonth();
  const currentYear = today.getFullYear();
  let startMonth = currentMonth - 5;
  let startYear = currentYear;
  if(startMonth < 0) {
    startMonth += 12;
    startYear -= 1;
  }
  const startDate = new Date(startYear, startMonth, 2).toISOString().split("T")[0];
  const endDate = new Date(currentYear, currentMonth + 1, 0).toISOString().split("T")[0];
  return [startDate, endDate];
}

export function getWeekDayName(dateString: string): string {
  const daysOfWeek = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  const date = new Date(dateString);
  const dayOfWeekNumber = date.getDay();
  const dayOfWeekName = daysOfWeek[dayOfWeekNumber];
  return dayOfWeekName;
}

export function getMonthName(dateString: string): string {
  const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
  const adjustedMonth = new Date(dateString).getMonth();
  if(adjustedMonth >= 0 && adjustedMonth < months.length) {
    return months[adjustedMonth];
  } else {
    throw new Error("Invalid arg. Must be date string");
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
  const startDateObj = new Date(startDate);
  const endDateObj = new Date(endDate);
  const dateObj: {[key: string]: unknown} = {};
  const formatDate = (date: Date): string => {
    const year = date.getFullYear();
    const month = date.getMonth() + 1;
    const day = date.getDate();
    return `${year}-${month < 10 ? `0${month}` : month}-${day < 10 ? `0${day}` : day}`;
  };
  const currentDate = new Date(startDateObj);
  while (currentDate <= endDateObj) {
    dateObj[formatDate(new Date(currentDate))] = JSON.parse(JSON.stringify(value));
    if(frequency === "m") {
      currentDate.setMonth(currentDate.getMonth() + 1);
    } else if(frequency === "d") {
      currentDate.setDate(currentDate.getDate() + 1);
    }
  }
  return dateObj;
}

