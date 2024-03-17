import React from "react";
import {getServerSession} from "next-auth";
import {QueryKeys} from "@/configs/queryKeys";
import {IUserSession} from "@/modules/profile";
import {authOptions} from "@/configs/authOptions";
import {analyticsAPI} from "../../controllers/api";
import {getStartEndOfMonth} from "@/controllers/dates";
import {CardExpenseStatistics} from "../cardExpenseStatistics";
import {ICardsExpensesFilters} from "../../types/cardsExpenses";
import {HydrationBoundary, QueryClient, dehydrate} from "@tanstack/react-query";

export async function CardExpenseStatisticsWrappers() {
  const queryClient = new QueryClient();
  const session = await getServerSession(authOptions);

  const filters: ICardsExpensesFilters = {
    currency: (session?.user as IUserSession).currency,
    filters: {cards: (session?.user as IUserSession).cards, date: getStartEndOfMonth()}
  };

  await queryClient.prefetchQuery({
    // eslint-disable-next-line @tanstack/query/exhaustive-deps
    queryKey: [QueryKeys.getCardsExpenses, JSON.stringify(filters)],
    queryFn: () => analyticsAPI.getCardsExpenses(filters, (session?.user as IUserSession).jwt)
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