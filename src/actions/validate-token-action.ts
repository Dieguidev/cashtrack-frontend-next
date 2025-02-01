'use server';

import { ErrorResponseSchema, TokenSchema } from "@/schemas";

export type ActionStateType = {
  errors: string[];
  success: string;
};

export async function validateToken(token: string) {
  const resetPasswordToken = TokenSchema.safeParse(token);
  if (!resetPasswordToken.success) {
    return {
      errors: resetPasswordToken.error.issues.map((issue) => issue.message),
      success: '',
    };
  }

  const url = `${process.env.API_URL}/auth/validate-reset-password-token`;
  const req = await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      token: resetPasswordToken.data,
    }),
  });

  const json = await req.json();

    if (req.status === 429) {
      return {
        errors: ['Demasiadas solicitudes. Por favor, inténtelo de nuevo más tarde.'],
        success: '',
      };
    }

    if(!req.ok) {
      // const {error} = ErrorResponseSchema.parse(json);
      ErrorResponseSchema.parse(json);
      return {
        errors: ['Token no válido'],
        success: '',
      };
    }

    // SuccessSchema.parse(json);
    return {
      errors: [],
      success: 'Token válido, asigna un nuevo password',
    };
}
