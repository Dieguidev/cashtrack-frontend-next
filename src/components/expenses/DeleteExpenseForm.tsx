import { useParams, useSearchParams } from "next/navigation";
import { DialogTitle } from "@headlessui/react";
import { deleteExpense } from "@/actions/delete-expense-action";
import { startTransition, useActionState, useEffect } from "react";
import { toast } from "react-toastify";

type DeleteExpenseForm = {
  closeModal: () => void
}

export const DeleteExpenseForm = ({ closeModal }: DeleteExpenseForm) => {
  const { id: budgetId } = useParams<{ id: string }>()
  const searchParams = useSearchParams()
  const expenseId = searchParams.get('deleteExpenseId')!

  const deleteExpenseWithIdAndBudgetId = deleteExpense.bind(null, { budgetId, expenseId })
  const [state, dispatch] = useActionState(deleteExpenseWithIdAndBudgetId, {
    errors: [],
    success: '',
  })

  useEffect(() => {
    if (state.errors) {
      state.errors.forEach(error => {
        toast.error(error)
      })
    }
    if (state.success) {
      toast.success(state.success)
      closeModal();
    }
  }, [state, closeModal])


  //* Esta funcion se encarga de eliminar el gasto,usando correctamente el hook useActionState en eventos del cliente
  const handleClick = () => {
    startTransition(() => {
      dispatch();
    });
  };

  return (
    <>
      <DialogTitle
        as="h3"
        className="font-black text-4xl text-purple-950 my-5"
      >
        Eliminar Gasto
      </DialogTitle>
      <p className="text-xl font-bold">Confirma para eliminar, {''}
        <span className="text-amber-500">el gasto</span>
      </p>
      <p className='text-gray-600 text-sm'>(Un gasto eliminado no se puede recuperar)</p>
      <div className="grid grid-cols-2 gap-5 mt-10">
        <button
          className="bg-amber-500 w-full p-3 text-white uppercase font-bold hover:bg-amber-600 cursor-pointer transition-colors"
          onClick={closeModal}
          type="button"
        >Cancelar</button>
        <button
          type='submit'

          className="bg-red-500 w-full p-3 text-white uppercase font-bold hover:bg-red-600 cursor-pointer transition-colors"
          onClick={handleClick}
        >Eliminar</button>
      </div>
    </>
  )
}
