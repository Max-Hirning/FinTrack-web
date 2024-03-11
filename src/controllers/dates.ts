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