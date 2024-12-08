import { ReactElement } from "react"
import { Card, CardContent, CardDescription, CardTitle } from "shared/ui"

interface IProps {
  title: string;
  description: string;
  children: ReactElement;
  circleBackgroundColor: string;
}

export function AccountCard({children, title, description, circleBackgroundColor}: IProps) {
  return (
    <Card>
      <CardContent className="p-[24px] min-w-[300px] h-[118px] flex gap-[10px] items-center text-nowrap">
        <div className={`w-[70px] min-w-[70px] h-[70px] rounded-full items-center justify-center flex ${circleBackgroundColor}`}>{children}</div>
        <article>
          <CardTitle className="text-sm text-gray-400">{title}</CardTitle>
          <CardDescription className="text-xl font-bold text-foreground">{description}</CardDescription>
        </article>
      </CardContent>
    </Card>
  )
}
