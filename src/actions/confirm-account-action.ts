'use server';

import { ErrorResponseSchema, SuccessSchema, TokenSchema } from "@/schemas";

export type ActionStateType = {
  errors: string[];
  success: string;

};

export async function confirmAccount(
  token: string,
  prevState: ActionStateType
) {

  const confirmToken = TokenSchema.safeParse(token);
  if(!confirmToken.success) {
    return {
      errors: confirmToken.error.issues.map(issue => issue.message),
      success: ''
    }
  }

  const url = `${process.env.API_URL}/auth/confirm-account`;
  const req = await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      token: confirmToken.data,
    }),
  });

  const json = await req.json();

  if(!req.ok) {
    // const {error} = ErrorResponseSchema.parse(json);
    ErrorResponseSchema.parse(json);
    return {
      errors: ['Token no válido'],
      success: '',
    };
  }

  SuccessSchema.parse(json);
  return {
    errors: [],
    success: 'Cuenta confirmada correctamente',
  };
}
