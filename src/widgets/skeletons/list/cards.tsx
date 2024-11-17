import { Skeleton } from "shared/ui";

interface IProps {
  styles?: string;
}

export function CardsListSkeleton({styles}: IProps) {
  return (
    <section className={`flex gap-[25px] h-[260px] pb-[5px] px-[5px] overflow-auto ${styles || ""}`}>
      <Skeleton className="min-w-[350px] max-w-[350px] h-[235px]"/>
      <Skeleton className="min-w-[350px] max-w-[350px] h-[235px]"/>
      <Skeleton className="min-w-[350px] max-w-[350px] h-[235px]"/>
      <Skeleton className="min-w-[350px] max-w-[350px] h-[235px]"/>
      <Skeleton className="min-w-[350px] max-w-[350px] h-[235px]"/>
    </section>
  )
}