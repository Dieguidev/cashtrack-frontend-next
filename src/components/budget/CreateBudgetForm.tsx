"use client"

import { ActionStateType } from "@/actions/confirm-account-action";
import { createBudget } from "@/actions/create-budget-action";
import { useRouter } from "next/navigation";
import { useActionState, useEffect, useState } from "react";
import { toast } from "react-toastify";
import { BudegetForm } from "./BudegetForm";

export const CreateBudgetForm = () => {

  const router = useRouter()

  const [formData, setFormData] = useState({
    amount: '',
    name: '',
  });

  const [state, dispatch] = useActionState(async (prevState: ActionStateType, form: FormData) => {
    const result = await createBudget(prevState, form);

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
      toast.success(state.success, {
        onClose: () => {
          router.push('/admin')
        },
        onClick: () => {
          router.push('/admin')
        }
      })
    }
  }, [state, router])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <form
      action={dispatch}
      className="mt-10 space-y-3"
      noValidate
    >
      <BudegetForm formData={formData} handleChange={handleChange} />
      <input
        type="submit"
        className="bg-amber-500 w-full p-3 text-white uppercase font-bold hover:bg-amber-600 cursor-pointer transition-colors"
        value='Crear Presupuesto'
      />
    </form>
  )
}
