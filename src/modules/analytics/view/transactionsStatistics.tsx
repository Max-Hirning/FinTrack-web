"use client";

import "chart.js/auto";
import {Bar} from "react-chartjs-2";
import React, {ReactElement} from "react";
import {Chart, ArcElement} from "chart.js";
import {IUserSession} from "@/modules/profile";
import {getMonthName, getWeekDayName} from "@/controllers/dates";
import {useGetTransactionsStatistics} from "../hooks/getTransactionsStatistics";
import {ITransactionsStatisticsResponse, ITransactionsStatisticsFilters} from "../types/transactionsStatistics";

Chart.register(ArcElement);

interface IProps {
  label: string;
  session: IUserSession;
  filters: ITransactionsStatisticsFilters;
}

export function TransactionsStatistics({filters, session, label}: IProps): ReactElement {
  const {data} = useGetTransactionsStatistics(filters, session.jwt);

  if(!data?.data || Object.keys(data.data).length === 0) return <p className="text-danger text-[24px] font-bold">No Data</p>;

  return (
    <Bar
      data={{
        labels: (data?.data) ? Object.keys(data.data).map((el: string) => {
          if(filters.frequency === "d") return getWeekDayName(el);
          if(filters.frequency === "m") return getMonthName(el);
          return "";
        }) : (filters.frequency === "d") ? ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"] : ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
        datasets: [
          {
            label: "Incomes",
            data: (data?.data) ? Object.values(data.data).map((el: ITransactionsStatisticsResponse) => el.incomes) : [0,0,0,0,0,0,0],
            backgroundColor: "#41D4A8",
            borderRadius: 5,
          },
          {
            label: "Expenses",
            data: (data?.data) ? Object.values(data.data).map((el: ITransactionsStatisticsResponse) => el.expenses) : [0,0,0,0,0,0,0],
            backgroundColor: "#FF4B4A",
            borderRadius: 5,
          },
        ],
      }}
      options={{
        responsive: true,
        maintainAspectRatio : false,
        plugins: {
          legend: {
            align: "end" as const,
            position: "top" as const,
          },
        },
      }}
      aria-label={label}
      className='w-full h-full'
    />
  );
}
