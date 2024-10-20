interface IStatisticResponse {
  date: string;
  incomes: number;
  expenses: number;
}
interface IAccountStatisticResponse {
  loans: number;
  budget: number;
  incomes: number;
  expenses: number;
  cashflow: number;
}
interface IStatisticCaregoriesResponse {
  fill: string;
  title: string;
  value: number;
}

export type {
  IStatisticResponse,
  IAccountStatisticResponse,
  IStatisticCaregoriesResponse,
}