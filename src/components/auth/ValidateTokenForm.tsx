'use client';
import { Dispatch, SetStateAction, startTransition, useActionState, useEffect, useState } from "react";
import { toast } from "react-toastify";
import { PinInput, PinInputField } from "@chakra-ui/pin-input";
import { validateToken } from "@/actions/validate-token-action";

type ValidateTokenFormProps = {
  setIsValidToken: Dispatch<SetStateAction<boolean>>
  token: string
  setToken: Dispatch<SetStateAction<string>>
};

export const ValidateTokenForm = ({setIsValidToken, token, setToken}: ValidateTokenFormProps) => {

  const [isComplete, setIsComplete] = useState(false)


  const validatetWithToken = validateToken.bind(null, token)
  const [state, dispatch] = useActionState(validatetWithToken, {
    errors: [],
    success: ''
  })


  useEffect(() => {
    // ⚠️ IMPORTANTE: Cuando se utilice useActionState, cualquier llamada a su dispatch
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
      toast.success(state.success)
          setIsValidToken(true)
    }
  }, [state, setIsValidToken])

  const handleChange = (token: string) => {
    setIsComplete(false)
    setToken(token)
  }

  const handleComplete = () => {
    setIsComplete(true)
  }

  return (
    <div className="flex justify-center gap-5 my-10">
      <PinInput
        value={token}
        onChange={handleChange}
        onComplete={handleComplete}
      >
        <PinInputField className="h-10 w-10 text-center border border-gray-300 shadow rounded-lg placeholder-white" />
        <PinInputField className="h-10 w-10 text-center border border-gray-300 shadow rounded-lg placeholder-white" />
        <PinInputField className="h-10 w-10 text-center border border-gray-300 shadow rounded-lg placeholder-white" />
        <PinInputField className="h-10 w-10 text-center border border-gray-300 shadow rounded-lg placeholder-white" />
        <PinInputField className="h-10 w-10 text-center border border-gray-300 shadow rounded-lg placeholder-white" />
        <PinInputField className="h-10 w-10 text-center border border-gray-300 shadow rounded-lg placeholder-white" />
      </PinInput>
    </div>
  )
}
