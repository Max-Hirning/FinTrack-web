import { Card } from "shared/ui"
import { Suspense } from "react";
import { TransactionsList } from "features/index";
import { getUserCookies } from "src/shared/lib/api/server";

interface IProps {
  styles?: string;
}

export async function TransactionsListWidget({styles}: IProps) {
  const {id} = await getUserCookies();

  return (
    <section className={styles || ""}>
      <article className="flex items-end justify-between mb-[18px]">
        <h2 className="text-2xl font-bold">Recent Transaction</h2>
      </article>
      <Card className="h-[350px] py-[20px] pl-[20px] pr-[10px]">
        <Suspense>
          <TransactionsList userId={id}/>
        </Suspense>
      </Card>
    </section>
  )
}
