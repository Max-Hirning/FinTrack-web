"use client";

import "chart.js/auto";
import React, {useMemo} from "react";
import {Doughnut} from "react-chartjs-2";
import {Chart, ArcElement} from "chart.js";
import {hexToRgba} from "@/controllers/colors";
import {IUserSession} from "@/modules/profile";
import {useGetTransactions} from "@/modules/transactions";
import {IFilters, ITransactionResponse} from "@/modules/transactions/types/transaction";

Chart.register(ArcElement);

interface IRes { 
  color: string;
  label: string;
  ammount: number;
}
interface IProps {
  filters: IFilters;
  session: IUserSession;
}

const chartData: number[] = [];
const chartColor: string[] = [];
const chartLabels: string[] = [];
const chartBorderColor: string[] = [];

export function PieChart({filters, session}: IProps) {
  const {data} = useGetTransactions(filters, session.jwt);

  useMemo(() => {
    chartData.length = 0;
    chartColor.length = 0;
    chartLabels.length = 0;
    chartBorderColor.length = 0;
    Object.values((data?.data?.data || []).reduce((res: {[key: string]: IRes}, el: ITransactionResponse) => {
      if(el.ammount < 0) {
        if(res[el.card.id]) {
          res[el.card.id].ammount += el.ammount;
        } else {
          res[el.card.id] = {
            ammount: el.ammount,
            color: el.card.color,
            label: el.card.title,
          };
        }
      }
      return res;
    }, {})).map((el: IRes) => {
      chartData.push(el.ammount);
      chartLabels.push(el.label);
      chartColor.push(hexToRgba(el.color, 0.2));
      chartBorderColor.push(hexToRgba(el.color, 1));
    });
  }, [JSON.stringify(data?.data?.data)]);

  return (
    <Doughnut
      data={{
        datasets: [
          {
            borderWidth: 1,
            data: chartData,
            label: "expenses",
            backgroundColor: chartColor,
            borderColor: chartBorderColor,
          },
        ],
        labels: chartLabels,
      }}
      options={{
        plugins: {
          legend: {
            display: false
          }
        }
      }}
      className='w-full h-full'
    />
  );
}