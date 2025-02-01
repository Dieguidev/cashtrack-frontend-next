'use server';

import {
  DraftBudgetSchema,
  ErrorResponseSchema,
} from '@/schemas';
import { cookies } from 'next/headers';

export type ActionStateType = {
  errors: string[];
  success: string;
};

export async function createBudget(
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

  const authCookie = await cookies();
  const token = authCookie.get('CASHTRACKR_TOKEN')?.value;

  const url = `${process.env.API_URL}/budget`;
  const req = await fetch(url, {
    method: 'POST',
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
    success: 'Presupuesto creado',
  };
}
