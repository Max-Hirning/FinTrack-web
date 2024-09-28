import Link from "next/link";
import { LoanCardsList } from "features/index";

interface IProps {
  styles?: string;
}

export function LoanCardsListWidget({styles}: IProps) {
  return (
    <section className={styles || ""}>
      <article className="flex items-end justify-between mb-[5px]">
        <h2 className="text-2xl font-bold">My Loans</h2>
        <Link 
          href="/accounts"
          className="text-base"
        >+ Add Loan</Link>
      </article>
      <LoanCardsList/>
    </section>
  )
}