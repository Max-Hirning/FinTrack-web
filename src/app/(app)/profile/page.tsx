import { HydrationBoundary, dehydrate } from "@tanstack/react-query";
import { Suspense } from "react";
import { queryClient, QueryKeys } from "src/shared/constants";
import { userService } from "src/shared/lib";
import { getUserCookies } from "src/shared/lib/api/server";
import { ProfileWidget, PreferencesWidget } from "widgets/index";

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
          <ProfileWidget userId={user.id}/>
        </Suspense>
      </HydrationBoundary>
      <PreferencesWidget styles="mt-[40px]"/>
    </>
  )
}
