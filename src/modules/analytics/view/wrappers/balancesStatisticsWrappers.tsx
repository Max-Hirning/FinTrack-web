import React from "react";
import {getServerSession} from "next-auth";
import {QueryKeys} from "@/configs/queryKeys";
import {IUserSession} from "@/modules/profile";
import {authOptions} from "@/configs/authOptions";
import {analyticsAPI} from "../../controllers/api";
import {getCurrentYearRange} from "@/controllers/dates";
import {BalancesStatistics} from "../balancesStatistics";
import {IExpensesFilters} from "../../types/expensesStatistics";
import {HydrationBoundary, QueryClient, dehydrate} from "@tanstack/react-query";

export async function BalancesStatisticsWrappers() {
  const queryClient = new QueryClient();
  const session = await getServerSession(authOptions);

  const filters: IExpensesFilters = {
    currency: (session?.user as IUserSession).currency,
    filters: {cards: (session?.user as IUserSession).cards, date: getCurrentYearRange()}
  };

  await queryClient.prefetchQuery({
    // eslint-disable-next-line @tanstack/query/exhaustive-deps
    queryKey: [QueryKeys.getBalances, JSON.stringify(filters)],
    queryFn: () => analyticsAPI.getBalancesStatistics(filters, (session?.user as IUserSession).jwt)
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <BalancesStatistics
        filters={filters}
        session={session?.user as IUserSession}
      />
    </HydrationBoundary>
  );
}