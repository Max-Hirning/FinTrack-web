import React from "react";
import {Accounts} from "../accounts1";
import {getServerSession} from "next-auth";
import {QueryKeys} from "@/configs/queryKeys";
import {IUserSession} from "@/modules/profile";
import {authOptions} from "@/configs/authOptions";
import {analyticsAPI} from "../../controllers/api";
import {IAccountFilters} from "../../types/account";
import {getStartEndOfMonth} from "@/controllers/dates";
import {HydrationBoundary, QueryClient, dehydrate} from "@tanstack/react-query";

export async function AccountsWrappers() {
  const queryClient = new QueryClient();
  const session = await getServerSession(authOptions);

  const filters: IAccountFilters = {
    currency: (session?.user as IUserSession).currency, 
    cards: {cards: (session?.user as IUserSession).cards}, 
    transactions: {cards: (session?.user as IUserSession).cards, date: getStartEndOfMonth()},
  };

  await queryClient.prefetchQuery({
    // eslint-disable-next-line @tanstack/query/exhaustive-deps
    queryKey: [QueryKeys.getInfo, JSON.stringify(filters)],
    queryFn: () => analyticsAPI.getAccountInfo(filters, (session?.user as IUserSession).jwt)
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <Accounts
        filters={filters}
        session={session?.user as IUserSession}
      />
    </HydrationBoundary>
  );
}