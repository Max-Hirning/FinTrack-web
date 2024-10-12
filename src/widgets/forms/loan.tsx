import { Card } from "shared/ui"
import { Suspense } from "react";
import { LoanForm } from "features/index"
import { currencyService } from "shared/lib";
import { queryClient, QueryKeys } from "shared/constants";
import { HydrationBoundary, dehydrate } from "@tanstack/react-query";

interface IProps {
  styles?: string;
}

export async function LoanWidget({styles}: IProps) {
  await queryClient.prefetchQuery({
    queryKey: [QueryKeys.getCurrencies],
    queryFn: () => currencyService.getCurrencies(),
  });

  return (
    <section className={`w-full max-w-[600px] ${styles || ""}`}>
      <h2 className="mb-[5px] text-2xl font-bold">Loan form</h2>
      <Card className="p-[24px] w-full">
        <HydrationBoundary state={dehydrate(queryClient)}>
          <Suspense>
            <LoanForm/>
          </Suspense>
        </HydrationBoundary>
      </Card>
    </section>
  )
}
