import { Card } from "shared/ui"
import { Transaction } from "shared/ui"

interface IProps {
  styles?: string;
}

export function TransactionsListWidget({styles}: IProps) {
  return (
    <section className={styles || ""}>
      <article className="flex items-end justify-between mb-[5px]">
        <h2 className="text-2xl font-bold">Recent Transaction</h2>
      </article>
      <Card className="h-[235px] max-w-[350px] py-[20px] pl-[20px] pr-[10px]">
        <section className="flex flex-col gap-[10px] h-[-webkit-fill-available] pr-[10px] overflow-auto">
          <Transaction/>
          <Transaction/>
          <Transaction/>
          <Transaction/>
          <Transaction/>
          <Transaction/>
        </section>
      </Card>
    </section>
  )
}
