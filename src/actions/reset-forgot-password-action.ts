'use server'

import { ResetPasswordSchema } from "@/schemas"

type ActionStateType ={
  errors: string[],
  success: string
}

export async function resetForgotPassword(token: string, prevState: ActionStateType, formData: FormData) {
  const resetPasswordInput = {
    password: formData.get('password'),
    password_confirmation: formData.get('password_confirmation'),
    // token: formData.get('token'),
  }

  const resetPassword = ResetPasswordSchema.safeParse(resetPasswordInput)
  if (!resetPassword.success) {
    return {
      errors: resetPassword.error.issues.map((issue) => issue.message),
      success: ''
    }
  }

  return {
    errors: [],
    success: ''
  }

}
