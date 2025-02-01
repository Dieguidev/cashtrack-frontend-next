'use server';

import { ErrorResponseSchema, ResetPasswordSchema } from '@/schemas';

type ActionStateType = {
  errors: string[];
  success: string;
};

export async function resetForgotPassword(
  token: string,
  prevState: ActionStateType,
  formData: FormData
) {
  const resetPasswordInput = {
    password: formData.get('password'),
    password_confirmation: formData.get('password_confirmation'),
    // token: formData.get('token'),
  };

  const resetPassword = ResetPasswordSchema.safeParse(resetPasswordInput);
  if (!resetPassword.success) {
    return {
      errors: resetPassword.error.issues.map((issue) => issue.message),
      success: '',
    };
  }

  const url = `${process.env.API_URL}/auth/update-forgot-password/${token}`;
  const req = await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      password: resetPassword.data.password,
      passwordConfirmation: resetPassword.data.password_confirmation,
    }),
  });

  const json = await req.json();

  if (!req.ok) {
    ErrorResponseSchema.parse(json);
    return {
      errors: ['token no válido'],
      success: '',
    };
  }

  if (req.status === 429) {
    return {
      errors: [
        'Demasiadas solicitudes. Por favor, inténtelo de nuevo más tarde.',
      ],
      success: '',
    };
  }
  return {
    errors: [],
    success: 'El password se modifico correctamente',
  };
}
