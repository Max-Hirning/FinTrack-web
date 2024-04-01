import React, {ReactElement} from "react";
import {getServerSession} from "next-auth";
import {QueryKeys} from "@/configs/queryKeys";
import {IUserSession} from "@/modules/profile";
import {authOptions} from "@/configs/authOptions";
import {analyticsAPI} from "../../controllers/api";
import {AccountStatistics} from "../accountStatistics";
import {getCurrentMonthRange} from "@/controllers/dates";
import {IAccountStatisticsFilters} from "../../types/accountStatistics";
import {HydrationBoundary, QueryClient, dehydrate} from "@tanstack/react-query";

export async function AccountStatisticsWrapper(): Promise<ReactElement> {
  const queryClient = new QueryClient();
  const session = await getServerSession(authOptions);

  const accountsfilters: IAccountStatisticsFilters = {
    date: getCurrentMonthRange(),
    cards: (session?.user as IUserSession).cards,
    currency: (session?.user as IUserSession).currency, 
  };

  await queryClient.prefetchQuery({
    // eslint-disable-next-line @tanstack/query/exhaustive-deps
    queryKey: [QueryKeys.getAccountStatistics, JSON.stringify(accountsfilters)],
    queryFn: () => analyticsAPI.getAccountInfo(accountsfilters, (session?.user as IUserSession).jwt),
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <AccountStatistics 
        filters={accountsfilters}
        session={session?.user as IUserSession}
      />
    </HydrationBoundary>
  );
}