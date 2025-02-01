'use server';

import { getTokenFromCookies } from '@/auth/token';
import { Budget, DraftBudgetSchema, ErrorResponseSchema } from '@/schemas';

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

  return {
    errors: [],
    success: 'Presupuesto actualizado correctamente',
  };
}
