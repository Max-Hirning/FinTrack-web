import React from "react";
import {getServerSession} from "next-auth";
import {QueryKeys} from "@/configs/queryKeys";
import {IUserSession} from "@/modules/profile";
import {authOptions} from "@/configs/authOptions";
import {analyticsAPI} from "../../controllers/api";
import {getStartEndOfMonth} from "@/controllers/dates";
import {CardExpenseStatistics} from "../CardExpenseStatistics";
import {ICardsExpensesFilters} from "../../types/cardsExpenses";
import {HydrationBoundary, QueryClient, dehydrate} from "@tanstack/react-query";

export async function CardExpenseStatisticsWrappers() {
  const queryClient = new QueryClient();
  const session = await getServerSession(authOptions);
  // const filters: ITransactionsFilters = {cards: (session?.user as IUserSession).cards, dates: getStartEndOfMonth()};
  const filters: ICardsExpensesFilters = {
    currency: (session?.user as IUserSession).currency,
    filters: {cards: (session?.user as IUserSession).cards, dates: getStartEndOfMonth()}
  };

  // const a = await analyticsAPI.getCardsExpenses(filters, (session?.user as IUserSession).jwt);

  await queryClient.prefetchQuery({
    // eslint-disable-next-line @tanstack/query/exhaustive-deps
    queryKey: [QueryKeys.getCardsExpenses, JSON.stringify(filters)],
    queryFn: () => analyticsAPI.getCardsExpenses(filters, (session?.user as IUserSession).jwt)
    // queryKey: [QueryKeys.getTransactions, JSON.stringify({cards: (session?.user as IUserSession).cards, dates: getStartEndOfMonth()})],
    // queryFn: () => transactionsAPI.getAll(filters, (session?.user as IUserSession).jwt)
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <CardExpenseStatistics
        filters={filters}
        session={session?.user as IUserSession}
      />
    </HydrationBoundary>
  );
}