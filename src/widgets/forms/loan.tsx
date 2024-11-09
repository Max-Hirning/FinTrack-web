import { Card } from "shared/ui"
import { Suspense } from "react";
import { LoanForm } from "features/index"
import { currencyService, loanService } from "shared/lib";
import { queryClient, QueryKeys } from "shared/constants";
import { HydrationBoundary, dehydrate } from "@tanstack/react-query";

interface IProps {
  styles?: string;
  loanId?: string;
}

export async function LoanWidget({styles, loanId}: IProps) {
  if(loanId) {
    await queryClient.prefetchQuery({
      queryKey: [QueryKeys.getLoan, loanId],
      queryFn: () => loanService.getLoan(loanId),
    });
  }
  await queryClient.prefetchQuery({
    queryKey: [QueryKeys.getCurrencies],
    queryFn: () => currencyService.getCurrencies(),
  });

  return (
    <section className={`w-full max-w-[600px] ${styles || ""}`}>
      <h2 className="mb-[18px] text-2xl font-bold">Loan form</h2>
      <Card className="p-[24px] w-full">
        <HydrationBoundary state={dehydrate(queryClient)}>
          <Suspense>
            <LoanForm loanId={loanId}/>
          </Suspense>
        </HydrationBoundary>
      </Card>
    </section>
  )
}
