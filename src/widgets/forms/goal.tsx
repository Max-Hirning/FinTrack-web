import { Card } from "shared/ui"
import { Suspense } from "react";
import { GoalForm } from "features/index"
import { currencyService } from "shared/lib";
import { makeQueryClient, QueryKeys } from "shared/constants";
import { HydrationBoundary, dehydrate } from "@tanstack/react-query";

interface IProps {
  styles?: string;
}

export async function GoalWidget({styles}: IProps) {
  const queryClient = makeQueryClient();

  await queryClient.prefetchQuery({
    queryKey: [QueryKeys.getCurrencies],
    queryFn: () => currencyService.getCurrencies(),
  });

  return (
    <section className={`w-full max-w-[600px] ${styles || ""}`}>
      <h2 className="mb-[5px] text-2xl font-bold">Goal form</h2>
      <Card className="p-[24px] w-full">
        <HydrationBoundary state={dehydrate(queryClient)}>
          <Suspense>
            <GoalForm/>
          </Suspense>
        </HydrationBoundary>
      </Card>
    </section>
  )
}
