import React, {ReactElement} from "react";
import {getServerSession} from "next-auth";
import {QueryKeys} from "@/configs/queryKeys";
import {IUserSession} from "@/modules/profile";
import {authOptions} from "@/configs/authOptions";
import {analyticsAPI} from "../../controllers/api";
import {YearlyStatistics} from "../yearlyStatistics";
import {getCurrentYearRange} from "@/controllers/dates";
import {IYearlyStatisticsFilters} from "../../types/yearlyStatistics";
import {HydrationBoundary, QueryClient, dehydrate} from "@tanstack/react-query";

export async function YearlyStatisticsWrapper(): Promise<ReactElement> {
  const queryClient = new QueryClient();
  const session = await getServerSession(authOptions);

  const yearlyFilters: IYearlyStatisticsFilters = {
    currency: (session?.user as IUserSession).currency,
    filters: {cards: (session?.user as IUserSession).cards, date: getCurrentYearRange()}
  };

  await queryClient.prefetchQuery({
    // eslint-disable-next-line @tanstack/query/exhaustive-deps
    queryKey: [QueryKeys.getYearlyStatistics, JSON.stringify(yearlyFilters)],
    queryFn: () => analyticsAPI.getYearlyStatistics(yearlyFilters, (session?.user as IUserSession).jwt),
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <YearlyStatistics
        filters={yearlyFilters}
        session={session?.user as IUserSession}
      />
    </HydrationBoundary>
  );
}