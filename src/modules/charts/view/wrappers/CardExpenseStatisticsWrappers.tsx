import React from "react";
import {PieChart} from "../pieChart";
import {getServerSession} from "next-auth";
import {QueryKeys} from "@/configs/queryKeys";
import {IUserSession} from "@/modules/profile";
import {IFilters} from "@/modules/transactions";
import {authOptions} from "@/configs/authOptions";
import {transactionsAPI} from "@/modules/transactions";
import {getStartEndOfMonth} from "@/controllers/dates";
import {HydrationBoundary, QueryClient, dehydrate} from "@tanstack/react-query";

export async function CardExpenseStatisticsWrappers() {
  const queryClient = new QueryClient();
  const session = await getServerSession(authOptions);
  const filters: IFilters = {cards: (session?.user as IUserSession).cards, dates: getStartEndOfMonth()};

  await queryClient.prefetchQuery({
    // eslint-disable-next-line @tanstack/query/exhaustive-deps
    queryKey: [QueryKeys.getTransactions, JSON.stringify({cards: (session?.user as IUserSession).cards, dates: getStartEndOfMonth()})],
    queryFn: () => transactionsAPI.getAll(filters, (session?.user as IUserSession).jwt)
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <PieChart
        filters={filters}
        session={session?.user as IUserSession}
      />
    </HydrationBoundary>
  );
}