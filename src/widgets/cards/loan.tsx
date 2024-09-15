import { Card } from "shared/ui"
import { LoanForm } from "features/index"

interface IProps {
  styles?: string;
}

export function LoanWidget({styles}: IProps) {
  return (
    <section className={`w-full max-w-[600px] ${styles || ""}`}>
      <h2 className="mb-[5px] text-2xl font-bold">Loan form</h2>
      <Card className="p-[24px] w-full">
        <LoanForm/>
      </Card>
    </section>
  )
}
