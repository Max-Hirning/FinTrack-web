import { Skeleton } from "shared/ui";

interface IProps {
  styles?: string;
}

export function AccountsCardsListSkeleton({styles}: IProps) {
  return (
    <section className={`flex gap-[25px] pb-[5px] overflow-auto max-w-fit ${styles || ""}`}>
      <Skeleton className="min-w-[300px] max-w-[300px] h-[118px]"/>
      <Skeleton className="min-w-[300px] max-w-[300px] h-[118px]"/>
      <Skeleton className="min-w-[300px] max-w-[300px] h-[118px]"/>
      <Skeleton className="min-w-[300px] max-w-[300px] h-[118px]"/>
      <Skeleton className="min-w-[300px] max-w-[300px] h-[118px]"/>
    </section>
  )
}