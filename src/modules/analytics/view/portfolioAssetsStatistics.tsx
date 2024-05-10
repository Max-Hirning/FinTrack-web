"use client";

import "chart.js/auto";
import {Doughnut} from "react-chartjs-2";
import React, {ReactElement} from "react";
import {Chart, ArcElement} from "chart.js";
import {IUserSession} from "@/modules/profile";
import {IAsset} from "@/modules/cards/types/portfolio";
import {useGetPortfolioAssetsStatistics} from "../hooks/getPortfolioAssetsStatistics";
import {IPortfolioAssetsStatisticsFilters, IPortfolioAssetsStatisticsResponse} from "../types/assetsStatistics";

Chart.register(ArcElement);

interface IProps {
  session: IUserSession;
  filters: Partial<IPortfolioAssetsStatisticsFilters>;
}

export function PortfolioAssetsStatistics({filters, session}: IProps): ReactElement {
  const {data} = useGetPortfolioAssetsStatistics(filters, session.jwt);

  if(!data || !data.data || Object.keys(data.data.data).length === 0 || !data.data.total) {
    return <p className="text-danger text-[24px] font-bold">No Data</p>;
  }

  return (
    <Doughnut
      data={{
        datasets: [
          {
            borderWidth: 1,
            label: "expenses",
            data: Object.values(data.data.data).map((el: IAsset) => Math.round(100 * (el.amount * el.avgBuyPrice) / (data.data as IPortfolioAssetsStatisticsResponse).total)),
          },
        ],
        labels: Object.values(data.data.data).map((el: IAsset) => el.asset),
      }}
      options={{
        responsive: true,
        maintainAspectRatio : false,
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
