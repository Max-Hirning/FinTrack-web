import { Card } from "shared/ui"
import { Suspense } from "react";
import { BudgetForm } from "features/index"
import { getUserCookies } from "src/shared/lib/api/server";
import { queryClient, QueryKeys } from "shared/constants";
import { HydrationBoundary, dehydrate } from "@tanstack/react-query";
import { categoryService, currencyService, userService } from "shared/lib";

interface IProps {
  styles?: string;
}

export async function BudgetWidget({styles}: IProps) {
  const user = await getUserCookies();

  await queryClient.prefetchQuery({
    queryKey: [QueryKeys.getCurrencies],
    queryFn: () => currencyService.getCurrencies(),
  });
  await queryClient.prefetchQuery({
    queryKey: [QueryKeys.getCategories, [user.id]],
    queryFn: () => categoryService.getCategories([user.id]),
  });
  await queryClient.prefetchQuery({
    queryKey: [QueryKeys.getUser, user.id],
    queryFn: () => userService.getUser(user.id),
  });

  return (
    <section className={`w-full max-w-[600px] ${styles || ""}`}>
      <h2 className="mb-[5px] text-2xl font-bold">Budget form</h2>
      <Card className="p-[24px] w-full">
        <HydrationBoundary state={dehydrate(queryClient)}>
          <Suspense>
            <BudgetForm userId={user.id}/>
          </Suspense>
        </HydrationBoundary>
      </Card>
    </section>
  )
}
