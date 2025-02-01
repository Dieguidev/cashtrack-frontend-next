'use server';

import { getTokenFromCookies } from '@/auth/token';
import { Budget, DraftBudgetSchema, ErrorResponseSchema } from '@/schemas';
import { revalidatePath, revalidateTag } from 'next/cache';

export type ActionStateType = {
  errors: string[];
  success: string;
};

export async function editBudget(
  budegtId: Budget['id'],
  prevState: ActionStateType,
  formData: FormData
) {
  const budget = DraftBudgetSchema.safeParse({
    name: formData.get('name'),
    amount: formData.get('amount'),
  });
  if (!budget.success) {
    return {
      errors: budget.error.issues.map((issue) => issue.message),
      success: '',
    };
  }

  const token = await getTokenFromCookies();

  const url = `${process.env.API_URL}/budget/${budegtId}`;
  const req = await fetch(url, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({
      name: budget.data.name,
      amount: budget.data.amount,
    }),
  });

  const json = await req.json();

  if (!req.ok) {
    // const {error} = ErrorResponseSchema.parse(json);
    ErrorResponseSchema.parse(json);
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
  revalidatePath('/admin');

  // Revalida todas las páginas o componentes que están etiquetados con 'all-budgets'.
  // Esto es importante para asegurarse de que cualquier cambio en los presupuestos
  // se refleje en todas las partes de la aplicación que dependen de estos datos.
  // Es útil en aplicaciones donde los datos se comparten entre múltiples componentes
  // o páginas y necesitas que todos ellos se actualicen cuando los datos cambian.
  revalidateTag('all-budgets');

  return {
    errors: [],
    success: 'Presupuesto actualizado correctamente',
  };
}
