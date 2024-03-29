
"use client";
import "chart.js/auto";
import {Doughnut} from "react-chartjs-2";
import React, {ReactElement} from "react";
import {Chart, ArcElement} from "chart.js";
import {IUserSession} from "@/modules/profile";
import {hexToRgba} from "@/controllers/colors";
import {useGetExpenses} from "../hooks/getExpenses";
import {IExpensesFilters} from "../types/expensesStatistics";
import {ICardsExpensesResponse} from "../types/cardsExpensesStatistics";

Chart.register(ArcElement);

interface IProps {
  session: IUserSession;
  filters: IExpensesFilters;
}

export function ExpenseStatistics({filters, session}: IProps): ReactElement {
  const {data} = useGetExpenses(filters, session.jwt);

  if(!data?.data || data?.data?.length === 0) return <p className="text-danger text-[24px] font-bold">No Data</p>;

  return (
    <Doughnut
      data={{
        datasets: [
          {
            borderWidth: 1,
            label: "expenses",
            data: data.data.map((el: ICardsExpensesResponse) => el.amount),
            borderColor: data.data.map((el: ICardsExpensesResponse) => el.color),
            backgroundColor: data.data.map((el: ICardsExpensesResponse) => hexToRgba(el.color, 0.25)),
          },
        ],
        labels: data.data.map((el: ICardsExpensesResponse) => el.label),
      }}
      options={{
        plugins: {
          legend: {
            display: false
          }
        }
      }}
      className='w-full h-full'
      aria-label="Expenses statistics(current month)"
    />
  );
}
