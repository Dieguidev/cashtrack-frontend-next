'use server';

import { getTokenFromCookies } from '@/auth/token';
import { ErrorResponseSchema, UpdateUserSchema } from '@/schemas';
import { revalidateTag } from 'next/cache';

type ActionStateType = {
  errors: string[];
  success: string;
};

export async function updateUser(
  prevState: ActionStateType,
  formData: FormData
) {
  const updateUserInput = {
    email: formData.get('email'),
    name: formData.get('name'),
  };

  const updateUser = UpdateUserSchema.safeParse(updateUserInput);
  if (!updateUser.success) {
    return {
      errors: updateUser.error.issues.map((issue) => issue.message),
      success: '',
    };
  }

  const token = await getTokenFromCookies();

  const url = `${process.env.API_URL}/user/update-user`;
  const req = await fetch(url, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({
      email: updateUser.data.email,
      name: updateUser.data.name,
    }),
  });

  const json = await req.json();

  if (req.status === 409) {
    return {
      errors: ['Email no disponible. Por favor, intenta con otro email.'],
      success: '',
    };
  }

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

  revalidateTag('user');
  return {
    errors: [],
    success: 'El usuario se modifico correctamente',
  };
}
