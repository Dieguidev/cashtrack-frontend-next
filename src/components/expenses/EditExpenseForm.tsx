import { DialogTitle } from "@headlessui/react";
import { ExpenseForm } from "./ExpenseForm";
import { useEffect, useState } from "react";
import { useParams, useSearchParams } from 'next/navigation';
import { Expense } from '../../schemas/index';
import { set } from "zod";

type EditExpenseFormProps = {
  closeModal: () => void
}

export const EditExpenseForm = ({ closeModal }: EditExpenseFormProps) => {
  const [expense, setExpense] = useState<Expense>()
  const {id} = useParams()
  const searchParams = useSearchParams()
  const expenseId= searchParams.get('editExpenseId');



  useEffect(() => {
    const url = `${process.env.NEXT_PUBLIC_API_URL}/budget/${id}/expenses/${expenseId}`;
    fetch(url)
      .then(res => res.json())
      .then(data => {
        setExpense(data)
      })
  }, [id, expenseId])


  return (
    <>
      <DialogTitle
        as="h3"
        className="font-black text-4xl text-purple-950 my-5"
      >
        Editar Gasto
      </DialogTitle>
      <p className="text-xl font-bold">Edita los detalles de un {''}
        <span className="text-amber-500">gasto</span>
      </p>
      <form
        className="bg-gray-100 shadow-lg rounded-lg p-10 mt-10 border"
        noValidate
      >
        <ExpenseForm expense={expense}/>

        <input
          type="submit"
          className="bg-amber-500 w-full p-3 text-white uppercase font-bold hover:bg-amber-600 cursor-pointer transition-colors"
          value='Guardar Cambios'
        />
      </form>
    </>
  )
}
