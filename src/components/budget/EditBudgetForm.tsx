'use client'
import { BudegetForm } from "./BudegetForm"


export const EditBudgetForm = () => {
  return (
    <form
      // action={()=>{}}
      className="mt-10 space-y-3"
      noValidate
    >
      <BudegetForm  />
      <input
        type="submit"
        className="bg-amber-500 w-full p-3 text-white uppercase font-bold hover:bg-amber-600 cursor-pointer transition-colors"
        value='Guardar Cambios'
      />
    </form>
  )
}
