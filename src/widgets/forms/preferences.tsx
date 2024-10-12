import { Card } from "shared/ui";
import { Suspense } from "react";
import { PreferencesForm } from "features/index";
import { getUserCookies } from "shared/lib/api/server";
import { currencyService, userService } from "shared/lib";
import { queryClient, QueryKeys } from "shared/constants";
import { HydrationBoundary, dehydrate } from "@tanstack/react-query";

interface IProps {
  styles?: string;
}

export async function PreferencesWidget({styles}: IProps) {
  const user = await getUserCookies();

  await queryClient.prefetchQuery({
    queryKey: [QueryKeys.getUser, user.id],
    queryFn: () => userService.getUser(user.id),
  });
  await queryClient.prefetchQuery({
    queryKey: [QueryKeys.getCurrencies],
    queryFn: () => currencyService.getCurrencies(),
  });

  return (
    <Card className={`max-sm:flex-col max-sm:items-center max-w-[1040px] p-[24px] flex-row flex gap-[40px] ${styles || ""}`}>
      <HydrationBoundary state={dehydrate(queryClient)}>
        <Suspense>
          <PreferencesForm userId={user.id}/>
        </Suspense>
      </HydrationBoundary>
    </Card>
  )
}
