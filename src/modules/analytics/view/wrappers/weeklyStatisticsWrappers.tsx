import React from "react";
import {getServerSession} from "next-auth";
import {QueryKeys} from "@/configs/queryKeys";
import {IUserSession} from "@/modules/profile";
import {authOptions} from "@/configs/authOptions";
import {analyticsAPI} from "../../controllers/api";
import {WeeklyStatistics} from "../weeklyStatistics";
import {getCurrentWeekRange} from "@/controllers/dates";
import {IWeeklyStatisticsFilters} from "../../types/weeklyStatistics";
import {HydrationBoundary, QueryClient, dehydrate} from "@tanstack/react-query";

export async function WeeklyStatisticsWrappers() {
  const queryClient = new QueryClient();
  const session = await getServerSession(authOptions);

  const filters: IWeeklyStatisticsFilters = {
    currency: (session?.user as IUserSession).currency,
    filters: {cards: (session?.user as IUserSession).cards, date: getCurrentWeekRange()}
  };

  await queryClient.prefetchQuery({
    // eslint-disable-next-line @tanstack/query/exhaustive-deps
    queryKey: [QueryKeys.getWeeklyStatistics, JSON.stringify(filters)],
    queryFn: () => analyticsAPI.getWeeklyStatistics(filters, (session?.user as IUserSession).jwt)
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <WeeklyStatistics
        filters={filters}
        session={session?.user as IUserSession}
      />
    </HydrationBoundary>
  );
}