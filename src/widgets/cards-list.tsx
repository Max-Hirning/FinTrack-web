import Link from "next/link";
import { CardsList } from "features/cards-list";

interface IProps {
  styles?: string;
}

export function CardsListWidget({styles}: IProps) {
  return (
    <section className={styles || ""}>
      <article className="flex items-end justify-between mb-[5px]">
        <h2 className="text-2xl font-bold">My Cards</h2>
        <Link 
          href="/cards"
          className="text-base"
        >+ Add Card</Link>
      </article>
      <CardsList/>
    </section>
  )
}