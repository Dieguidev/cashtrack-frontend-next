'use server';

import { ErrorResponseSchema, LoginSchema, SuccessSchema } from "@/schemas";

export type ActionStateType = {
  errors: string[];
  success: string;
};

export async function login(prevState: ActionStateType, formData: FormData) {
  const loginData = {
    email: formData.get('email'),
    password: formData.get('password'),
  };

  const login = LoginSchema.safeParse(loginData);
  if (!login.success) {
    const errors = login.error.errors.map((error) => error.message);
    return {
      errors,
      success: prevState.success,
    };
  }

  const url = `${process.env.API_URL}/auth/login`;
  const req = await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      email: login.data.email,
      password: login.data.password,
    }),
  });

  const json = await req.json();

  if(req.status === 401) {
    ErrorResponseSchema.parse(json);
    return {
      errors: ['Email o password incorrectos'],
      success: '',
    };
  }

  if(req.status === 429) {
    return {
      errors: ['Demasiadas solicitudes. Por favor, inténtelo de nuevo más tarde.'],
      success: '',
    };
  }

  SuccessSchema.parse(json);

  return {
    errors: [],
    success: 'Login correcto',
  };
}
