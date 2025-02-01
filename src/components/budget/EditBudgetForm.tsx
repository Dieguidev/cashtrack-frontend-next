'use client'
import { Budget } from "@/schemas"
import { BudegetForm } from "./BudegetForm"

type EditBudgetFormProps = {
  budget: Budget
}
export const EditBudgetForm = ({budget}: EditBudgetFormProps) => {
  return (
    <form
      // action={()=>{}}
      className="mt-10 space-y-3"
      noValidate
    >
      <BudegetForm  budget={budget}/>
      <input
        type="submit"
        className="bg-amber-500 w-full p-3 text-white uppercase font-bold hover:bg-amber-600 cursor-pointer transition-colors"
        value='Guardar Cambios'
      />
    </form>
  )
}
