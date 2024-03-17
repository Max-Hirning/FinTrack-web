export function amountColor(amount: number): string {
  if(amount < 0) return "text-danger";
  if(amount > 0) return "text-success";
  return "text-secondary";
}

export function amountSymbol(amount: number): string {
  if(amount < 0) return "-";
  if(amount > 0) return "+";
  return "";
}