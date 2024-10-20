"use client"

import * as React from "react"
import { Label, Pie, PieChart } from "recharts"
import { IStatisticCaregoriesResponse } from "shared/types"
import { ChartConfig, ChartContainer, ChartTooltip, ChartTooltipContent } from "shared/ui"

interface IProps {
  chartConfig: ChartConfig;
  chartData: IStatisticCaregoriesResponse[];
}

export function MyPieChart({chartData, chartConfig}: IProps) {
  const totalVisitors = +React.useMemo(() => {
    return chartData.reduce((acc, curr) => acc + curr.value, 0)
  }, [chartData]).toFixed(2)

  return (
    <ChartContainer
      config={chartConfig}
      className="aspect-square h-full w-full"
    >
      <PieChart>
        <ChartTooltip
          cursor={false}
          content={<ChartTooltipContent hideLabel />}
        />
        <Pie
          nameKey="title"
          dataKey="value"
          strokeWidth={5}
          data={chartData}
          innerRadius={60}
        >
          <Label
            content={({ viewBox }) => {
              if (viewBox && "cx" in viewBox && "cy" in viewBox) {
                return (
                  <text
                    x={viewBox.cx}
                    y={viewBox.cy}
                    textAnchor="middle"
                    dominantBaseline="middle"
                  >
                    <tspan
                      x={viewBox.cx}
                      y={viewBox.cy}
                      className="fill-foreground text-lg font-bold"
                    >
                      {totalVisitors.toLocaleString()}
                    </tspan>
                    <tspan
                      x={viewBox.cx}
                      y={(viewBox.cy || 0) + 24}
                      className="fill-muted-foreground"
                    >
                      Total
                    </tspan>
                  </text>
                )
              }
            }}
          />
        </Pie>
      </PieChart>
    </ChartContainer>
  )
}