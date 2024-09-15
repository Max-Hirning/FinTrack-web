import { Card } from "shared/ui"
import { CardForm } from "features/index"

interface IProps {
  styles?: string;
}

export function CardWidget({styles}: IProps) {
  return (
    <section className={`w-full max-w-[600px] ${styles || ""}`}>
      <h2 className="mb-[5px] text-2xl font-bold">Card form</h2>
      <Card className="p-[24px]">
        <CardForm/>
      </Card>
    </section>
  )
}