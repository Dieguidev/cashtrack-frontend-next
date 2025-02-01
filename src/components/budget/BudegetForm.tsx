
type BudgetFormProps = {
  formData?: {
    amount: string
    name: string
  }
  handleChange?: (e: React.ChangeEvent<HTMLInputElement>) => void
}

export const BudegetForm = ({ formData, handleChange }: BudgetFormProps) => {
  return (
    <>
      <div className="space-y-3">
        <label htmlFor="name" className="text-sm uppercase font-bold">
          Nombre Presupuesto
        </label>
        <input
          id="name"
          className="w-full p-3  border border-gray-100 bg-slate-100"
          type="text"
          placeholder="Nombre del Presupuesto"
          name="name"
          value={formData?.name}
          onChange={handleChange}
        />
      </div>
      <div className="space-y-3">
        <label htmlFor="amount" className="text-sm uppercase font-bold">
          Cantidad Presupuesto
        </label>
        <input
          type="number"
          id="amount"
          className="w-full p-3  border border-gray-100 bg-slate-100"
          placeholder="Cantidad Presupuesto"
          name="amount"
          value={formData?.amount}
          onChange={handleChange}
        />
      </div>
    </>
  )
}
