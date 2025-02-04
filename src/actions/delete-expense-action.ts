'use server';

import { getTokenFromCookies } from '@/auth/token';
import { Budget, ErrorResponseSchema, Expense } from '@/schemas';
import { revalidateTag } from 'next/cache';

type DeleteExpense = {
  budgetId: Budget['id'];
  expenseId: Expense['id'];
};

export type ActionStateType = {
  errors: string[];
  success: string;
};

export async function deleteExpense({ budgetId, expenseId }: DeleteExpense) {
  // prevState: ActionStateType,
  // formData: FormData
  // const currentPassword = ConfirmPasswordSchema.safeParse({
  //   password: formData.get('password'),
  // });
  // if (!currentPassword.success) {
  //   return {
  //     errors: currentPassword.error.issues.map((issue) => issue.message),
  //     success: '',
  //   };
  // }

  const token = await getTokenFromCookies();

  // const url = `${process.env.API_URL}/user/check-password`;
  // const req = await fetch(url, {
  //   method: 'POST',
  //   headers: {
  //     'Content-Type': 'application/json',
  //     Authorization: `Bearer ${token}`,
  //   },
  //   body: JSON.stringify({
  //     password: currentPassword.data.password,
  //   }),
  // });

  // const json = await req.json();

  // if (!req.ok) {
  //   // const {error} = ErrorResponseSchema.parse(json);
  //   ErrorResponseSchema.parse(json);
  //   return {
  //     errors: ['Clave erronea'],
  //     success: '',
  //   };
  // }

  const urldelete = `${process.env.API_URL}/expense/${expenseId}/budget/${budgetId}`;
  const reqdelete = await fetch(urldelete, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
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

  revalidateTag(`budget-${budgetId}`);

  return {
    errors: [],
    success: 'Presupuesto eliminado correctamente',
  };
}
