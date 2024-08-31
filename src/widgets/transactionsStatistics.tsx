import { Card } from "shared/ui";
import { MyMultipleBarsChart as BarsChart } from "features/charts/bars/multiple";

interface IProps {
  styles?: string;
}

export function TransactionsStatisticsWidget({styles}: IProps) {
  return (
    <section className={styles || ""}>
      <article className="flex items-end justify-between mb-[5px]">
        <h2 className="text-2xl font-bold">Expense/Income Statistics</h2>
      </article>
      <Card className="h-[350px] p-[20px]">
        <BarsChart/>
      </Card>
    </section>
  )
}