'use server';

import { getTokenFromCookies } from '@/auth/token';
import { ErrorResponseSchema, UpdatePasswordSchema } from '@/schemas';

type ActionStateType = {
  errors: string[];
  success: string;
};

export async function updatePassword(
  prevState: ActionStateType,
  formData: FormData
) {
  const updatePasswordInput = {
    current_password: formData.get('current_password'),
    password: formData.get('password'),
    password_confirmation: formData.get('password_confirmation'),
  };

  const updatePassword = UpdatePasswordSchema.safeParse(updatePasswordInput);
  if (!updatePassword.success) {
    return {
      errors: updatePassword.error.issues.map((issue) => issue.message),
      success: '',
    };
  }

  const token = await getTokenFromCookies();

  const url = `${process.env.API_URL}/user/update-password`;
  const req = await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({
      currentPassword: updatePassword.data.current_password,
      password: updatePassword.data.password,
      passwordConfirmation: updatePassword.data.password_confirmation,
    }),
  });

  const json = await req.json();

  if (!req.ok) {
    ErrorResponseSchema.parse(json);
    return {
      errors: ['Datos invalidos'],
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
