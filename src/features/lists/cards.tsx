import { BankCard } from "shared/ui";

export function CardsList() {
  return (
    <section className="flex gap-[25px] pb-[5px] px-[5px] overflow-auto">
      <BankCard/>
      <BankCard/>
      <BankCard/>
      <BankCard/>
      <BankCard/>
      <BankCard/>
      <BankCard/>
      <BankCard/>
      <BankCard/>
      <BankCard/>
    </section>
  )
}