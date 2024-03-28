import React, {ReactElement} from "react";
import {getServerSession} from "next-auth";
import {QueryKeys} from "@/configs/queryKeys";
import {IUserSession} from "@/modules/profile";
import {authOptions} from "@/configs/authOptions";
import {TransactionsList} from "../transactionsList";
import {transactionsAPI} from "../../controllers/api";
import {ITransactionsFilters} from "../../types/transaction";
import {HydrationBoundary, QueryClient, dehydrate} from "@tanstack/react-query";

interface IProps {
  shrinked?: boolean;
}

export async function TransactionsListWrapper({shrinked}: IProps): Promise<ReactElement> {
  const queryClient = new QueryClient();
  const session = await getServerSession(authOptions);

  const transactionsFilters: Omit<ITransactionsFilters, "date"> = {
    page: 1,
    perPage: 10,
    cards: (session?.user as IUserSession).cards,
  };

  await queryClient.prefetchQuery({
    // eslint-disable-next-line @tanstack/query/exhaustive-deps
    queryKey: [QueryKeys.getTransactions, JSON.stringify(transactionsFilters)],
    queryFn: () => transactionsAPI.getAll(transactionsFilters, (session?.user as IUserSession).jwt),
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <TransactionsList
        shrinked={shrinked}
        filters={transactionsFilters}
        session={session?.user as IUserSession}
      />
    </HydrationBoundary>
  );
}