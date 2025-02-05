import { formatCurrency } from "@/utils"

type AmountProps = {
  label: string,
  amount: number
}


export const Amount = ({ amount, label }: AmountProps) => {
  return (
    <p className="text-2xl font-bold">
      {label}: {''}
      <span className="text-amber-500">{formatCurrency(amount)}</span>
    </p>
  )
}
