import { Card } from "shared/ui";
import { PreferencesForm } from "features/index";

interface IProps {
  styles?: string;
}

export function PreferencesWidget({styles}: IProps) {
  return (
    <Card className={`max-sm:flex-col max-sm:items-center max-w-[1040px] p-[24px] flex-row flex gap-[40px] ${styles || ""}`}>
      <PreferencesForm/>
    </Card>
  )
}
