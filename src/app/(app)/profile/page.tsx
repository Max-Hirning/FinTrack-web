import { Suspense } from "react";
import { Card, Skeleton } from "shared/ui";
import { getUserCookies } from "src/shared/lib/api/server";
import { PreferencesForm, ProfileForm } from "features/index";

export default async function Page() {
  const user = await getUserCookies();

  return (
    <>
      <Suspense fallback={<Skeleton className="max-w-[1040px] h-[300px]"/>}>
        <Card className="max-sm:flex-col max-sm:items-center max-w-[1040px] p-[24px] flex-row flex gap-[40px] h-[300px]">
          <ProfileForm userId={user.id}/>
        </Card>
      </Suspense>
      <Suspense fallback={<Skeleton className="max-w-[1040px] h-[330px]"/>}>
        <Card className="max-sm:flex-col max-sm:items-center max-w-[1040px] p-[24px] flex-row flex gap-[40px] h-[330px] mt-[40px]">
          <PreferencesForm userId={user.id}/>
        </Card>
      </Suspense>
    </>
  )
}
