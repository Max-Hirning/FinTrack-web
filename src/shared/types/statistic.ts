interface IFilterStatistic {
  userId?: string;
  endDate: string;
  startDate: string;
  cardIds?: string[];
  frequency?: "year"|"month"|"day";
}

export type {
  IFilterStatistic,
}