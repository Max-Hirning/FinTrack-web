import { HydrationBoundary, dehydrate } from "@tanstack/react-query";
import { Suspense } from "react";
import { queryClient, QueryKeys } from "shared/constants";
import { userService } from "shared/lib";
import { getUserCookies } from "src/shared/lib/api/server";
import { Card } from "shared/ui";
import { PreferencesWidget } from "widgets/index";
import { ProfileForm } from "features/index";

export default async function Page() {
  const user = await getUserCookies();

  await queryClient.prefetchQuery({
    queryKey: [QueryKeys.getUser, user.id],
    queryFn: () => userService.getUser(user.id),
  });

  return (
    <>
      <HydrationBoundary state={dehydrate(queryClient)}>
        <Suspense>
          <Card className="max-sm:flex-col max-sm:items-center max-w-[1040px] p-[24px] flex-row flex gap-[40px]">
            <ProfileForm userId={user.id}/>
          </Card>
        </Suspense>
      </HydrationBoundary>
      <PreferencesWidget styles="mt-[40px]"/>
    </>
  )
}
