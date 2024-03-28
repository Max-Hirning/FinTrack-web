import React, {ReactElement} from "react";
import {getServerSession} from "next-auth";
import {QueryKeys} from "@/configs/queryKeys";
import {IUserSession} from "@/modules/profile";
import {authOptions} from "@/configs/authOptions";
import {analyticsAPI} from "../../controllers/api";
import {getCurrentMonthRange} from "@/controllers/dates";
import {CardExpenseStatistics} from "../cardExpenseStatistics";
import {ICardsExpensesFilters} from "../../types/cardsExpensesStatistics";
import {HydrationBoundary, QueryClient, dehydrate} from "@tanstack/react-query";

export async function CardsExpenseStatisticsWrapper(): Promise<ReactElement> {
  const queryClient = new QueryClient();
  const session = await getServerSession(authOptions);

  const cardsExpensesFilters: ICardsExpensesFilters = {
    currency: (session?.user as IUserSession).currency,
    filters: {cards: (session?.user as IUserSession).cards, date: getCurrentMonthRange()}
  };

  await queryClient.prefetchQuery({
    // eslint-disable-next-line @tanstack/query/exhaustive-deps
    queryKey: [QueryKeys.getCardsExpenses, JSON.stringify(cardsExpensesFilters)],
    queryFn: () => analyticsAPI.getExpenses(cardsExpensesFilters, (session?.user as IUserSession).jwt),
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <CardExpenseStatistics
        filters={cardsExpensesFilters}
        session={session?.user as IUserSession}
      />
    </HydrationBoundary>
  );
}