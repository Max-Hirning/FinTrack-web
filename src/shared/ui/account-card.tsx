import { ReactElement } from "react"
import { Card, CardContent, CardDescription, CardTitle } from "shared/ui"

interface IProps {
  title: string;
  description: string;
  children: ReactElement;
}

export function AccountCard({children, title, description}: IProps) {
  return (
    <Card>
      <CardContent className="p-[24px] flex gap-[10px] items-center text-nowrap">
        <div className="bg-[#FFF5D9] w-[70px] min-w-[70px] h-[70px] rounded-full">{children}</div>
        <article>
          <CardTitle className="text-sm text-gray-400">{title}</CardTitle>
          <CardDescription className="text-xl font-bold text-foreground">{description}</CardDescription>
        </article>
      </CardContent>
    </Card>
  )
}
