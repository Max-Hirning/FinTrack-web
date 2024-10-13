import { Card } from "shared/ui"
import { SettingsForm } from "features/index"
import { getUserCookies } from "src/shared/lib/api/server";

interface IProps {
  styles?: string;
}

export async function SettingsWidget({styles}: IProps) {
  const user = await getUserCookies();

  return (
    <Card className={`max-sm:flex-col max-sm:items-center max-w-[500px] p-[24px] flex-row flex gap-[40px] ${styles || ""}`}>
      <SettingsForm userId={user.id}/>
    </Card>
  )
}
