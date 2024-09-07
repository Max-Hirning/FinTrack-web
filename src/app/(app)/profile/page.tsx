import { ProfileWidget } from "widgets/cards/profile";
import { PreferencesWidget } from "widgets/cards/preferences";

export default function Page() {
  return (
    <>
      <ProfileWidget/>
      <PreferencesWidget styles="mt-[40px]"/>
    </>
  )
}
