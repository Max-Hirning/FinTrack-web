interface IFilterStatistic {
  userId?: string;
  endDate: string;
  startDate: string;
  cardIds?: string[];
  loanIds?: string[];
  goalIds?: string[];
  budgetIds?: string[];
  frequency?: "year"|"month"|"day";
}

export type {
  IFilterStatistic,
}