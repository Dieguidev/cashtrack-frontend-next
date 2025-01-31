'use server';

import { ForgotPasswordSchema } from "@/schemas";

type ActionStateType = {
  errors: string[];
  success: string;
};

export async function forgotPassword(prevState: ActionStateType, formData: FormData) {
  console.log('forgotPassword');

  const forgotPassword = ForgotPasswordSchema.safeParse({
    email: formData.get('email'),
  });

  if (!forgotPassword.success) {
    return {
      errors: forgotPassword.error.errors.map((error) => error.message),
      success: ''
    };
  }

  return {
    errors: [],
    success: 'Instrucciones enviadas a tu correo'
  }
}
