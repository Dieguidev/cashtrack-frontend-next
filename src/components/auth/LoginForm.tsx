'use client';


import { useActionState, useEffect, useState } from "react";
import { toast } from "react-toastify";
import { ActionStateType, login } from "@/actions/login-user-action";

export const LoginForm = () => {

  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const [state, dispatch] = useActionState(async (prevSatate: ActionStateType, form: FormData) => {
    const result = await login(prevSatate, form)

    if (result.errors.length === 0) {
      setFormData({
        email: '',
        password: '',
      })
    }
    return result
  }, {
    errors: [],
  })

  useEffect(() => {
    if (state.errors) {
      state.errors.forEach(error =>{
        toast.error(error)
      })
    }
  }, [state])


  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

return (
  <>
    <form
      className="mt-14 space-y-5"
      noValidate
      action={dispatch}
    >



      <div className="flex flex-col gap-2">
        <label
          className="font-bold text-2xl"
        >Email</label>

        <input
          id="email"
          type="email"
          placeholder="Email de Registro"
          className="w-full border border-gray-300 p-3 rounded-lg"
          name="email"
          value={formData.email}
          onChange={handleChange}
        />
      </div>

      <div className="flex flex-col gap-2">
        <label
          className="font-bold text-2xl"
        >Password</label>

        <input
          type="password"
          placeholder="Password de Registro"
          className="w-full border border-gray-300 p-3 rounded-lg"
          name="password"

          // onChange={handleChange}
        />
      </div>

      <input
        type="submit"
        value='Iniciar Sesión'
        className="bg-purple-950 hover:bg-purple-800 w-full p-3 rounded-lg text-white font-black  text-xl cursor-pointer"
      />
    </form>
  </>
)
}
