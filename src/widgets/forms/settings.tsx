import { Card } from "shared/ui"
import { SettingsForm } from "features/index"

interface IProps {
  styles?: string;
}

export function SettingsWidget({styles}: IProps) {
  return (
    <Card className={`max-sm:flex-col max-sm:items-center max-w-[500px] p-[24px] flex-row flex gap-[40px] ${styles || ""}`}>
      <SettingsForm/>
    </Card>
  )
}
