import Link from "next/link";
import { GoalCardsList } from "features/index";

interface IProps {
  styles?: string;
}

export function GoalCardsListWidget({styles}: IProps) {
  return (
    <section className={`${styles || ""}`}>
      <article className="flex items-end justify-between mb-[5px]">
        <h2 className="text-2xl font-bold">My Goals</h2>
        <Link 
          href="/accounts"
          className="text-base"
        >+ Add Goal</Link>
      </article>
      <GoalCardsList/>
    </section>
  )
}