import React, {ReactElement} from "react";
import {getServerSession} from "next-auth";
import {QueryKeys} from "@/configs/queryKeys";
import {IUserSession} from "@/modules/profile";
import {authOptions} from "@/configs/authOptions";
import {analyticsAPI} from "../../controllers/api";
import {getCurrentMonthRange} from "@/controllers/dates";
import {CardsExpensesStatistics} from "../cardsExpensesStatistics";
import {HydrationBoundary, QueryClient, dehydrate} from "@tanstack/react-query";
import {ICardsExpensesStatisticsFilters} from "../../types/cardsExpensesStatistics";

export async function CardsExpensesStatisticsWrapper(): Promise<ReactElement> {
  const queryClient = new QueryClient();
  const session = await getServerSession(authOptions);

  const cardsExpensesFilters: ICardsExpensesStatisticsFilters = {
    date: getCurrentMonthRange(),
    cards: (session?.user as IUserSession).cards, 
    currency: (session?.user as IUserSession).currency,
  };

  await queryClient.prefetchQuery({
    // eslint-disable-next-line @tanstack/query/exhaustive-deps
    queryKey: [QueryKeys.getCardsExpensesStatistics, JSON.stringify(cardsExpensesFilters)],
    queryFn: () => analyticsAPI.getCardsExpenses(cardsExpensesFilters, (session?.user as IUserSession).jwt),
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <CardsExpensesStatistics
        filters={cardsExpensesFilters}
        session={session?.user as IUserSession}
      />
    </HydrationBoundary>
  );
}