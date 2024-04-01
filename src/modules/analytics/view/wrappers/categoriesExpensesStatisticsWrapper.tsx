import React, {ReactElement} from "react";
import {getServerSession} from "next-auth";
import {QueryKeys} from "@/configs/queryKeys";
import {IUserSession} from "@/modules/profile";
import {authOptions} from "@/configs/authOptions";
import {analyticsAPI} from "../../controllers/api";
import {getCurrentMonthRange} from "@/controllers/dates";
import {CategoriesExpensesStatistics} from "../categoriesExpensesStatistics";
import {HydrationBoundary, QueryClient, dehydrate} from "@tanstack/react-query";
import {ICategoriesExpensesStatisticsFilters} from "../../types/categoriesExpensesStatistics";

export async function CategoriesExpensesStatisticsWrapper(): Promise<ReactElement> {
  const queryClient = new QueryClient();
  const session = await getServerSession(authOptions);

  const filters: ICategoriesExpensesStatisticsFilters = {
    date: getCurrentMonthRange(),
    cards: (session?.user as IUserSession).cards,
    currency: (session?.user as IUserSession).currency,
  };

  await queryClient.prefetchQuery({
    // eslint-disable-next-line @tanstack/query/exhaustive-deps
    queryKey: [QueryKeys.getCategoriesExpensesStatistics, JSON.stringify(filters)],
    queryFn: () => analyticsAPI.getCategoriesExpenses(filters, (session?.user as IUserSession).jwt),
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <CategoriesExpensesStatistics
        filters={filters}
        session={session?.user as IUserSession}
      />
    </HydrationBoundary>
  );
}