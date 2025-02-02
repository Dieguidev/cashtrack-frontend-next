'use server';

import { getTokenFromCookies } from '@/auth/token';
import { Budget, ConfirmPasswordSchema, ErrorResponseSchema } from '@/schemas';
import { revalidateTag } from 'next/cache';

export type ActionStateType = {
  errors: string[];
  success: string;
};

export async function deleteBudget(
  budegtId: Budget['id'],
  prevState: ActionStateType,
  formData: FormData
) {
  const currentPassword = ConfirmPasswordSchema.safeParse({
    password: formData.get('password'),
  });
  if (!currentPassword.success) {
    return {
      errors: currentPassword.error.issues.map((issue) => issue.message),
      success: '',
    };
  }

  const token = await getTokenFromCookies();

  const url = `${process.env.API_URL}/user/check-password`;
  const req = await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({
      password: currentPassword.data.password,
    }),
  });

  const json = await req.json();

  if (!req.ok) {
    // const {error} = ErrorResponseSchema.parse(json);
    ErrorResponseSchema.parse(json);
    return {
      errors: ['Clave erronea'],
      success: '',
    };
  }

  const urldelete = `${process.env.API_URL}/budget/${budegtId}`;
  const reqdelete = await fetch(urldelete, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    }
  });

  const jsondelete = await reqdelete.json();

  if (!reqdelete.ok) {
    // const {error} = ErrorResponseSchema.parse(json);
    ErrorResponseSchema.parse(jsondelete);
    return {
      errors: ['Datos incorrectos'],
      success: '',
    };
  }

  // SuccessSchema.parse(json);

  // Revalida la página en la ruta '/admin'.
  // Esto es importante para asegurarse de que cualquier cambio realizado en los datos
  // se refleje en la página '/admin' la próxima vez que se solicite.
  // Es útil en aplicaciones donde los datos pueden cambiar frecuentemente y necesitas
  // que la página muestre la información más reciente.
  // revalidatePath('/admin');

  // Revalida todas las páginas o componentes que están etiquetados con 'all-budgets'.
  // Esto es importante para asegurarse de que cualquier cambio en los presupuestos
  // se refleje en todas las partes de la aplicación que dependen de estos datos.
  // Es útil en aplicaciones donde los datos se comparten entre múltiples componentes
  // o páginas y necesitas que todos ellos se actualicen cuando los datos cambian.
  revalidateTag('all-budgets');


  return {
    errors: [],
    success: 'Presupuesto eliminado correctamente',
  };
}
