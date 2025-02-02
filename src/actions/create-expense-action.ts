'use server';

import { getTokenFromCookies } from '@/auth/token';
import { Budget, DraftExpenseSchema, ErrorResponseSchema } from '@/schemas';

export type ActionStateType = {
  errors: string[];
  success: string;
};

export async function createExpense(
  budgetId: Budget['id'],
  prevState: ActionStateType,
  formData: FormData
) {
  const expense = DraftExpenseSchema.safeParse({
    name: formData.get('name'),
    amount: formData.get('amount'),
  });
  if (!expense.success) {
    return {
      errors: expense.error.issues.map((issue) => issue.message),
      success: '',
    };
  }

  const token = await getTokenFromCookies();

  const url = `${process.env.API_URL}/expense/budget/${budgetId}`;
  const req = await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({
      name: expense.data.name,
      amount: expense.data.amount,
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

  // revalidateTag('all-budgets');

  return {
    errors: [],
    success: 'Gasto creado',
  };
}
