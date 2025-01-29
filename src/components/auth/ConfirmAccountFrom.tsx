'use client';

import { PinInput, PinInputField } from "@chakra-ui/pin-input";
import { useState } from "react";

export const ConfirmAccountFrom = () => {

  const [token, setToken] = useState('')

  const handleChange = (token: string) => {
    setToken(token)
  }

  const handleComplete = (token: string) => {

  }

  return (
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
  )
}
