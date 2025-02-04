import { Expense } from "@/schemas"

type ExpenseFormProps = {
  formData?: {
    amount: string
    name: string
  }
  handleChange?: (e: React.ChangeEvent<HTMLInputElement>) => void
  expense?: Expense
}

export const ExpenseForm = ({ formData, handleChange, expense }: ExpenseFormProps) => {
  return (
    <>
      <div className="mb-5">
        <label htmlFor="name" className="text-sm uppercase font-bold">
          Nombre Gasto
        </label>
        <input
          id="name"
          className="w-full p-3  border border-gray-100  bg-white"
          type="text"
          placeholder="Nombre del Gasto"
          name="name"
          defaultValue={expense?.name}
          value={formData?.name}
          onChange={handleChange}
        />
      </div>

      <div className="mb-5">
        <label htmlFor="amount" className="text-sm uppercase font-bold">
          Cantidad Gasto
        </label>
        <input
          id="amount"
          className="w-full p-3  border border-gray-100 bg-white"
          type="number"
          placeholder="Cantidad Gasto"
          name="amount"
          defaultValue={expense?.amount}
          value={formData?.amount}
          onChange={handleChange}
        />
      </div>
    </>
  )

}
