import { LoanCard } from "shared/ui";

export function LoanCardsList() {
  // if(isLoading) {
  //   return (
  //     <section className="flex justify-center items-center h-[260px] gap-[25px] pb-[5px] px-[5px] overflow-auto">
  //       <LoaderCircle className="animate-spin" />
  //     </section>
  //   )
  // }

  // if((cards?.data || []).length === 0) {
  //   return (
  //     <section className="flex justify-center items-center h-[260px] gap-[25px] pb-[5px] px-[5px] overflow-auto">
  //       <p className="text-destructive font-bold text-lg">No Data</p>
  //     </section>
  //   )
  // }

  return (
    <section className="flex gap-[25px] h-[260px] pb-[5px] px-[5px] overflow-auto">
      <LoanCard/>
      <LoanCard/>
      <LoanCard/>
      <LoanCard/>
      <LoanCard/>
      <LoanCard/>
      <LoanCard/>
      <LoanCard/>
      <LoanCard/>
      <LoanCard/>
    </section>
  )
}