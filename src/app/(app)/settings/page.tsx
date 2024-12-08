import { Card } from "shared/ui";
import { SettingsForm } from "src/features";
import { getUserCookies } from "src/shared/lib/api/server";

export default async function Page() {
  const user = await getUserCookies();

  return (
    <Card className="max-sm:flex-col max-sm:items-center max-w-[500px] p-[24px] flex-row flex gap-[40px]">
      <SettingsForm userId={user.id}/>
    </Card>
  )
}
