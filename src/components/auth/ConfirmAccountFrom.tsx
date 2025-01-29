'use client';

import { PinInput, PinInputField } from "@chakra-ui/pin-input";

export const ConfirmAccountFrom = () => {
  return (
    <div className="flex justify-center gap-5 my-10">
      <PinInput>
        <PinInputField className="h-10 w-10 border-gray-300 shadow rounded-lg text-center placeholder-white"/>
        <PinInputField className="h-10 w-10 border-gray-300 shadow rounded-lg text-center placeholder-white"/>
        <PinInputField className="h-10 w-10 border-gray-300 shadow rounded-lg text-center placeholder-white"/>
        <PinInputField className="h-10 w-10 border-gray-300 shadow rounded-lg text-center placeholder-white"/>
        <PinInputField className="h-10 w-10 border-gray-300 shadow rounded-lg text-center placeholder-white"/>
        <PinInputField className="h-10 w-10 border-gray-300 shadow rounded-lg text-center placeholder-white"/>
      </PinInput>
    </div>
  )
}
