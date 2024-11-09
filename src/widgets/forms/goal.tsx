import { Card } from "shared/ui"
import { Suspense } from "react";
import { GoalForm } from "features/index"
import { currencyService, goalService } from "shared/lib";
import { queryClient, QueryKeys } from "shared/constants";
import { HydrationBoundary, dehydrate } from "@tanstack/react-query";

interface IProps {
  styles?: string;
  goalId?: string;
}

export async function GoalWidget({styles, goalId}: IProps) {
  if(goalId) {
    await queryClient.prefetchQuery({
      queryKey: [QueryKeys.getGoal, goalId],
      queryFn: () => goalService.getGoal(goalId),
    });
  }
  await queryClient.prefetchQuery({
    queryKey: [QueryKeys.getCurrencies],
    queryFn: () => currencyService.getCurrencies(),
  });

  return (
    <section className={`w-full max-w-[600px] ${styles || ""}`}>
      <h2 className="mb-[18px] text-2xl font-bold">Goal form</h2>
      <Card className="p-[24px] w-full">
        <HydrationBoundary state={dehydrate(queryClient)}>
          <Suspense>
            <GoalForm goalId={goalId}/>
          </Suspense>
        </HydrationBoundary>
      </Card>
    </section>
  )
}
