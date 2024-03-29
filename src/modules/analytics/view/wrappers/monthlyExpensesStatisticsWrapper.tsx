import React, {ReactElement} from "react";
import {getServerSession} from "next-auth";
import {QueryKeys} from "@/configs/queryKeys";
import {IUserSession} from "@/modules/profile";
import {authOptions} from "@/configs/authOptions";
import {analyticsAPI} from "../../controllers/api";
import {getSixPrevMonthsRange} from "@/controllers/dates";
import {MonthlyExpensesStatistics} from "../monthlyExpensesStatistics";
import {HydrationBoundary, QueryClient, dehydrate} from "@tanstack/react-query";
import {IMonthlyExpensesStatisticsFilters} from "../../types/monthlyExpensesStatistics";

export async function MonthlyExpensesStatisticsWrapper(): Promise<ReactElement> {
  const queryClient = new QueryClient();
  const session = await getServerSession(authOptions);

  const monthlyFilters: IMonthlyExpensesStatisticsFilters = {
    currency: (session?.user as IUserSession).currency,
    filters: {cards: (session?.user as IUserSession).cards, onlyExpenses: true, date: getSixPrevMonthsRange()}
  };

  await queryClient.prefetchQuery({
    // eslint-disable-next-line @tanstack/query/exhaustive-deps
    queryKey: [QueryKeys.getMonthlyExpenses, JSON.stringify(monthlyFilters)],
    queryFn: () => analyticsAPI.getExpenses(monthlyFilters, (session?.user as IUserSession).jwt),
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <MonthlyExpensesStatistics
        filters={monthlyFilters}
        session={session?.user as IUserSession}
      />
    </HydrationBoundary>
  );
}