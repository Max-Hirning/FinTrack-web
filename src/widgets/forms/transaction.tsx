import { Card } from "shared/ui"
import { Suspense } from "react";
import { categoryService, currencyService, userService } from "shared/lib";
import { TransactionForm } from "features/index"
import { getUserCookies } from "shared/lib/api/server";
import { makeQueryClient, QueryKeys } from "shared/constants";
import { HydrationBoundary, dehydrate } from "@tanstack/react-query";

interface IProps {
  styles?: string;
}

export async function TransactionWidget({styles}: IProps) {
  const user = await getUserCookies();
  const queryClient = makeQueryClient();

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
      <h2 className="mb-[5px] text-2xl font-bold">Transaction form</h2>
      <Card className="p-[24px] w-full">
        <HydrationBoundary state={dehydrate(queryClient)}>
          <Suspense>
            <TransactionForm userId={user.id}/>
          </Suspense>
        </HydrationBoundary>
      </Card>
    </section>
  )
}
