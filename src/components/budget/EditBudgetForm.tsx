'use client'
import { Budget } from "@/schemas"
import { BudegetForm } from "./BudegetForm"
import { useActionState, useEffect } from "react"
import { editBudget } from "@/actions/edit-budget-action"
import { useRouter } from "next/navigation"
import { toast } from "react-toastify"

type EditBudgetFormProps = {
  budget: Budget
}
export const EditBudgetForm = ({ budget }: EditBudgetFormProps) => {

  const router = useRouter()

  // const [formData, setFormData] = useState({
  //   amount: '',
  //   name: '',
  // });
 const edithBudgetWithId = editBudget.bind(null, budget.id)
  const [state, dispatch] = useActionState(edithBudgetWithId, {
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
      router.push('/admin')
    }
  }, [state, router])

  // const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
  //   setFormData({ ...formData, [e.target.name]: e.target.value });
  // };

  return (


    <form
      action={dispatch}
      className="mt-10 space-y-3"
      noValidate
    >
      <BudegetForm budget={budget} />
      <input
        type="submit"
        className="bg-amber-500 w-full p-3 text-white uppercase font-bold hover:bg-amber-600 cursor-pointer transition-colors"
        value='Guardar Cambios'
      />
    </form>
  )
}
