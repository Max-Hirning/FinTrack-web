import { Suspense } from "react";
import { Card, Skeleton } from "shared/ui"
import { TransactionForm } from "features/index"
import { getUserCookies } from "shared/lib/api/server";

interface IProps {
  styles?: string;
  transactionId?: string;
}

export async function TransactionWidget({styles, transactionId}: IProps) {
  const user = await getUserCookies();

  return (
    <section className={`w-full max-w-[600px] ${styles || ""}`}>
      <h2 className="mb-[18px] text-2xl font-bold">Transaction form</h2>
      <Suspense fallback={<Skeleton className="w-full min-h-[500px]"/>}>
        <Card className="p-[24px] w-full min-h-[500px]">
          <TransactionForm transactionId={transactionId} userId={user.id}/>
        </Card>
      </Suspense>
    </section>
  )
}
