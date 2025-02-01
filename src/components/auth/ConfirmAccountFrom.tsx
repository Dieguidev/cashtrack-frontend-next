'use client';

import { startTransition, useActionState, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { PinInput, PinInputField } from "@chakra-ui/pin-input";
import { toast } from "react-toastify";
import { confirmAccount } from "@/actions/confirm-account-action";

export const ConfirmAccountFrom = () => {

  const router = useRouter();

  const [isComplete, setIsComplete] = useState(false)
  const [token, setToken] = useState('')

  const confirmAccountWithToken = confirmAccount.bind(null, token)
  const [state, dispatch] = useActionState(confirmAccountWithToken, {
    errors: [],
    success: ''
  })

  useEffect(() => {
    // ⚠️ IMPORTANTE: Cuando se utilice useActionState, cualquier llamada a su dispatch  en el cliente
      // debe envolverarse en startTransition para asegurar que React maneje la actualización
      // dentro del contexto adecuado. Esto evita errores relacionados con la ejecución
      // asíncrona fuera de un contexto de acción en Next.js.
        if (isComplete) {
          startTransition(() => {
            dispatch();
          });
        }
  }, [isComplete])

  useEffect(() => {
    if (state.errors) {
      state.errors.forEach(error => {
        toast.error(error)
      })
    }
    if (state.success) {
      toast.success(state.success, {
        onClose: () => {
          router.push('/auth/login')
        }
      })
    }
  }, [state.errors, state.success, router])


  const handleChange = (token: string) => {
    setIsComplete(false)
    setToken(token)
  }

  const handleComplete = () => {
    setIsComplete(true)
  }

  return (
    <>
      <div className="flex justify-center gap-5 my-10">


        <PinInput
          value={token}
          onChange={handleChange}
          onComplete={handleComplete}
        >
          <PinInputField className="h-10 w-10 border-gray-300 shadow rounded-lg text-center placeholder-white" />
          <PinInputField className="h-10 w-10 border-gray-300 shadow rounded-lg text-center placeholder-white" />
          <PinInputField className="h-10 w-10 border-gray-300 shadow rounded-lg text-center placeholder-white" />
          <PinInputField className="h-10 w-10 border-gray-300 shadow rounded-lg text-center placeholder-white" />
          <PinInputField className="h-10 w-10 border-gray-300 shadow rounded-lg text-center placeholder-white" />
          <PinInputField className="h-10 w-10 border-gray-300 shadow rounded-lg text-center placeholder-white" />
        </PinInput>
      </div>
    </>
  )
}
