"use client"

import { ReactElement } from "react";
import { Bar, BarChart, CartesianGrid, XAxis } from "recharts"
import { ChartConfig, ChartContainer, ChartTooltip, ChartTooltipContent } from "shared/ui"

// const chartData = [
//   { month: "January", desktop: 186, mobile: 80 },
//   { month: "February", desktop: 305, mobile: 200 },
//   { month: "March", desktop: 237, mobile: 120 },
//   { month: "April", desktop: 73, mobile: 190 },
//   { month: "May", desktop: 209, mobile: 130 },
//   { month: "June", desktop: 214, mobile: 140 },
//   { month: "January", desktop: 186, mobile: 80 },
//   { month: "February", desktop: 305, mobile: 200 },
//   { month: "March", desktop: 237, mobile: 120 },
//   { month: "April", desktop: 73, mobile: 190 },
//   { month: "May", desktop: 209, mobile: 130 },
//   { month: "June", desktop: 214, mobile: 140 },
// ]

// const chartConfig = {
//   desktop: {
//     label: "Desktop",
//     color: "hsl(var(--chart-1))",
//   },
//   mobile: {
//     label: "Mobile",
//     color: "hsl(var(--chart-2))",
//   },
// } satisfies ChartConfig

interface IProps {
  data: any[];
  chartConfig: ChartConfig;
}

export function MyBarsChart({data, chartConfig}: IProps) {
  return (
    <div className="h-full overflow-auto">
      <ChartContainer 
        config={chartConfig}
        className="h-full min-w-max max-w-full w-full" 
      >
        <BarChart 
          data={data}
          accessibilityLayer 
        >
          <CartesianGrid vertical={false} />
          <XAxis
            dataKey="month"
            tickMargin={10}
            tickLine={false}
            axisLine={false}
            tickFormatter={(value) => value.slice(0, 3)}
          />
          <ChartTooltip
            cursor={false}
            content={<ChartTooltipContent indicator="dashed" />}
          />
          {
            Object.entries(chartConfig).map(([key, value], index) => (
              <Bar 
                radius={4} 
                key={index}
                dataKey={key}
                fill={value.color}
              />
            ))
          }
        </BarChart>
      </ChartContainer>
    </div>
  )
}
