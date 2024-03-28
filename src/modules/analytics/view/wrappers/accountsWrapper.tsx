import {Accounts} from "../accounts";
import React, {ReactElement} from "react";
import {getServerSession} from "next-auth";
import {QueryKeys} from "@/configs/queryKeys";
import {IUserSession} from "@/modules/profile";
import {authOptions} from "@/configs/authOptions";
import {analyticsAPI} from "../../controllers/api";
import {IAccountFilters} from "../../types/account";
import {getCurrentMonthRange} from "@/controllers/dates";
import {HydrationBoundary, QueryClient, dehydrate} from "@tanstack/react-query";

export async function AccountsWrapper(): Promise<ReactElement> {
  const queryClient = new QueryClient();
  const session = await getServerSession(authOptions);

  const accountsfilters: IAccountFilters = {
    currency: (session?.user as IUserSession).currency, 
    cards: {cards: (session?.user as IUserSession).cards}, 
    transactions: {cards: (session?.user as IUserSession).cards, date: getCurrentMonthRange()},
  };

  await queryClient.prefetchQuery({
    // eslint-disable-next-line @tanstack/query/exhaustive-deps
    queryKey: [QueryKeys.getInfo, JSON.stringify(accountsfilters)],
    queryFn: () => analyticsAPI.getAccountInfo(accountsfilters, (session?.user as IUserSession).jwt),
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <Accounts 
        filters={accountsfilters}
        session={session?.user as IUserSession}
      />
    </HydrationBoundary>
  );
}