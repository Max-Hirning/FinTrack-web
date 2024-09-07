import { SettingsForm } from "features/forms/settings"
import { Card } from "shared/ui"

export default function Page() {
  return (
    <>
      <Card className="max-sm:flex-col max-sm:items-center max-w-[500px] p-[24px] flex-row flex gap-[40px] bg-red">
        <SettingsForm/>
      </Card>
    </>
  )
}
