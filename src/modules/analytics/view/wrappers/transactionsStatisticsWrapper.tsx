import React, {ReactElement} from "react";
import {getServerSession} from "next-auth";
import {QueryKeys} from "@/configs/queryKeys";
import {IUserSession} from "@/modules/profile";
import {authOptions} from "@/configs/authOptions";
import {analyticsAPI} from "../../controllers/api/finance";
import {TransactionsStatistics} from "../transactionsStatistics";
import {HydrationBoundary, QueryClient, dehydrate} from "@tanstack/react-query";
import {ITransactionsStatisticsFilters} from "../../types/transactionsStatistics";

interface IProps {
  label: string;
  frequency: "d"|"m";
  range: [string, string];
}

export async function TransactionsStatisticsWrapper({range, frequency, label}: IProps): Promise<ReactElement> {
  const queryClient = new QueryClient();
  const session = await getServerSession(authOptions);

  const filters: ITransactionsStatisticsFilters = {
    frequency,
    date: range,
    cards: (session?.user as IUserSession).cards,
    currency: (session?.user as IUserSession).currency,
  };

  await queryClient.prefetchQuery({
    // eslint-disable-next-line @tanstack/query/exhaustive-deps
    queryKey: [QueryKeys.getTransactionsStatistics, JSON.stringify(filters)],
    queryFn: () => analyticsAPI.getTransactionsStatistics(filters, (session?.user as IUserSession).jwt),
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <TransactionsStatistics
        label={label}
        filters={filters}
        session={session?.user as IUserSession}
      />
    </HydrationBoundary>
  );
}