"use client";

import "chart.js/auto";
import React from "react";
import {Line} from "react-chartjs-2";
import {Chart, ArcElement} from "chart.js";
import {IUserSession} from "@/modules/profile";
import {useGetBalances} from "../hooks/getBalances";
import {IExpensesFilters} from "../types/expensesStatistics";
import {IBalanceStatisticsResponse} from "../types/balanceStatistics";

Chart.register(ArcElement);

interface IProps {
  session: IUserSession;
  filters: IExpensesFilters;
}

export function BalancesStatistics({filters, session}: IProps) {
  const {data} = useGetBalances(filters, session.jwt);

  if(!data?.data || Object.keys(data.data).length === 0) return <p className="text-danger text-[24px] font-bold">No Data</p>;

  return (
    <Line 
      data={{
        datasets: [
          {
            label: "Balance",
            borderColor: "#1814F3",
            data: Object.values(data.data).map((el: IBalanceStatisticsResponse) => el.balance),
          }
        ],
        labels: Object.keys(data.data),
      }}
      options={{
        plugins: {
          legend: {
            display: false
          }
        },
        elements: {
          line: {
            tension : 0.3 // smooth lines
          },
          point:{
            radius: 0
          }
        },
      }}
      className='w-full h-full'
      aria-label="Balance history(current year)"
    />
  );
}
