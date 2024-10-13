import { Card } from "shared/ui"
import { Suspense } from "react";
import { CardForm } from "features/index"
import { cardService, currencyService } from "shared/lib";
import { queryClient, QueryKeys } from "shared/constants";
import { HydrationBoundary, dehydrate } from "@tanstack/react-query";

interface IProps {
  cardId?: string;
  styles?: string;
}

export async function CardWidget({styles, cardId}: IProps) {
  if(cardId) {
    await queryClient.prefetchQuery({
      queryKey: [QueryKeys.getCard, cardId],
      queryFn: () => cardService.getCard(cardId),
    });
  }
  await queryClient.prefetchQuery({
    queryKey: [QueryKeys.getCurrencies],
    queryFn: () => currencyService.getCurrencies(),
  });

  return (
    <section className={`w-full max-w-[600px] ${styles || ""}`}>
      <h2 className="mb-[5px] text-2xl font-bold">Card form</h2>
      <Card className="p-[24px]">
        <HydrationBoundary state={dehydrate(queryClient)}>
          <Suspense>
            <CardForm cardId={cardId} />
          </Suspense>
        </HydrationBoundary>
      </Card>
    </section>
  )
}
