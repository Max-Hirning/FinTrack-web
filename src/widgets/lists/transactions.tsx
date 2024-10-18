import { Card } from "shared/ui"
import { Suspense } from "react";
import { transactionService } from "shared/lib";
import { TransactionsList } from "features/index";
import { queryClient, QueryKeys } from "shared/constants";
import { getUserCookies } from "src/shared/lib/api/server";
import { dehydrate, HydrationBoundary } from "@tanstack/react-query";

interface IProps {
  styles?: string;
}

export async function TransactionsListWidget({styles}: IProps) {
  const user = await getUserCookies();

  const query = {
    loanIds: [],
    goalIds: [],
    cardIds: [],
    budgetIds: [],
    currencies: [],
    userIds: [user.id],
    transactionIds: [],
  };

  await queryClient.prefetchQuery({
    queryKey: [QueryKeys.getTransactions, query],
    queryFn: () => transactionService.getTransactions(query),
  });

  return (
    <section className={styles || ""}>
      <article className="flex items-end justify-between mb-[5px]">
        <h2 className="text-2xl font-bold">Recent Transaction</h2>
      </article>
      <Card className="h-[235px] min-w-[350px] max-w-[350px] py-[20px] pl-[20px] pr-[10px]">
        <HydrationBoundary state={dehydrate(queryClient)}>
          <Suspense>
            <TransactionsList userId={user.id}/>
          </Suspense>
        </HydrationBoundary>
      </Card>
    </section>
  )
}
