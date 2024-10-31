import { Card } from "shared/ui"
import { Suspense } from "react";
import { TransactionForm } from "features/index"
import { getUserCookies } from "shared/lib/api/server";
import { queryClient, QueryKeys } from "shared/constants";
import { HydrationBoundary, dehydrate } from "@tanstack/react-query";
import { categoryService, transactionService, userService } from "shared/lib";

interface IProps {
  styles?: string;
  transactionId?: string;
}

export async function TransactionWidget({styles, transactionId}: IProps) {
  const user = await getUserCookies();

  if(transactionId) {
    await queryClient.prefetchQuery({
      queryKey: [QueryKeys.getTransaction, transactionId],
      queryFn: () => transactionService.getTransaction(transactionId),
    });
  }
  await queryClient.prefetchQuery({
    queryKey: [QueryKeys.getUser, user.id],
    queryFn: () => userService.getUser(user.id),
  });
  await queryClient.prefetchQuery({
    queryKey: [QueryKeys.getCategories, [user.id]],
    queryFn: () => categoryService.getCategories([user.id]),
  });

  return (
    <section className={`w-full max-w-[600px] ${styles || ""}`}>
      <h2 className="mb-[18px] text-2xl font-bold">Transaction form</h2>
      <Card className="p-[24px] w-full">
        <HydrationBoundary state={dehydrate(queryClient)}>
          <Suspense>
            <TransactionForm transactionId={transactionId} userId={user.id}/>
          </Suspense>
        </HydrationBoundary>
      </Card>
    </section>
  )
}
