import Link from "next/link";
import { BudgetCardsList } from "features/budget-cards-list";

interface IProps {
  styles?: string;
}

export function BudgetCardsListWidget({styles}: IProps) {
  return (
    <section className={styles || ""}>
      <article className="flex items-end justify-between mb-[5px]">
        <h2 className="text-2xl font-bold">My Budgets</h2>
        <Link 
          href="/accounts"
          className="text-base"
        >+ Add Budget</Link>
      </article>
      <BudgetCardsList/>
    </section>
  )
}