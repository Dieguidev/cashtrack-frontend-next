'use client';

import { useState } from "react";
import { ValidateTokenForm } from "./ValidateTokenForm";
import { ResetPassword } from "./ResetPassword";


export const PasswordResetHandler = () => {
  const [isValidToken, setIsValidToken] = useState(false)
  return (
    <>
     {!isValidToken ? <ValidateTokenForm/>: <ResetPassword/>}
    </>
  )
}
