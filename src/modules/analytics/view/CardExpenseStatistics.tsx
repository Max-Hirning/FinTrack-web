"use client";

import "chart.js/auto";
import React from "react";
import {Chart, ArcElement} from "chart.js";
import {IUserSession} from "@/modules/profile";
import {ICardsExpensesFilters} from "../types/cardsExpenses";
import {useGetCardsExpenses} from "../hooks/getCardsExpenses";

Chart.register(ArcElement);

interface IProps {
  session: IUserSession;
  filters: ICardsExpensesFilters;
}

export function CardExpenseStatistics({filters, session}: IProps) {
  const {data} = useGetCardsExpenses(filters, session.jwt);
  console.log(data);
  return (
    // <Doughnut
    //   data={{
    //     datasets: [
    //       {
    //         borderWidth: 1,
    //         data: chartData,
    //         label: "expenses",
    //         backgroundColor: chartColor,
    //         borderColor: chartBorderColor,
    //       },
    //     ],
    //     labels: chartLabels,
    //   }}
    //   options={{
    //     plugins: {
    //       legend: {
    //         display: false
    //       }
    //     }
    //   }}
    //   className='w-full h-full'
    // />
    <p>sdds</p>
  );
}
