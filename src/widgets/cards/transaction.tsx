import { Card } from "shared/ui"
import { TransactionForm } from "features/index"

interface IProps {
  styles?: string;
}

export function TransactionWidget({styles}: IProps) {
  return (
    <section className={`w-full max-w-[600px] ${styles || ""}`}>
      <h2 className="mb-[5px] text-2xl font-bold">Transaction form</h2>
      <Card className="p-[24px] w-full">
        <TransactionForm/>
      </Card>
    </section>
  )
}
