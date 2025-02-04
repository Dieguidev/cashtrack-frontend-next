import { DialogTitle } from "@headlessui/react";
import { ExpenseForm } from "./ExpenseForm";
import { useRouter } from "next/navigation";
import { useActionState, useEffect, useState } from "react";
import { Budget } from "@/schemas";
import { ActionStateType } from "@/actions/confirm-account-action";
import { createExpense } from "@/actions/create-expense-action";
import { toast } from "react-toastify";

type AddExpenseFormProps = {
  budgetId: Budget['id']
}

export const AddExpenseForm = ({budgetId}: AddExpenseFormProps) => {

  const router = useRouter()

  const [formData, setFormData] = useState({
    amount: '',
    name: '',
  });

  const createExpenseWithBudgetId = createExpense.bind(null, budgetId);
  const [state, dispatch] = useActionState(async (prevState: ActionStateType, form: FormData) => {
    const result = await createExpenseWithBudgetId(prevState, form);

    if (result.success) {
      setFormData({
        amount: '',
        name: '',
      });
    }

    return result;
  }, {
    errors: [],
    success: '',
  });

  useEffect(() => {
    if (state.errors) {
      state.errors.forEach(error => {
        toast.error(error)
      })
    }
    if (state.success) {
      toast.success(state.success)
      router.push(`/admin/budget/${budgetId}`)
    }
  }, [state, router, budgetId])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };


  return (
    <>
      <DialogTitle
        as="h3"
        className="font-black text-4xl text-purple-950 my-5"
      >
        Agregar Gasto
      </DialogTitle>

      <p className="text-xl font-bold">Llena el formulario y crea un {''}
        <span className="text-amber-500">gasto</span>
      </p>
      <form
        action={dispatch}
        className="bg-gray-100 shadow-lg rounded-lg p-10 mt-10 border"
        noValidate
      >
        <ExpenseForm formData={formData} handleChange={handleChange}/>
        <input
          type="submit"
          className="bg-amber-500 w-full p-3 text-white uppercase font-bold hover:bg-amber-600 cursor-pointer transition-colors"
          value='Registrar Gasto'
        />
      </form>
    </>
  )
}
