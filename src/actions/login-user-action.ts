'use server';

import { ErrorResponseSchema, LoginSchema, SuccessSchema } from "@/schemas";
import { cookies } from "next/headers";

export type ActionStateType = {
  errors: string[];

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

    };
  }

  if(req.status === 429) {
    return {
      errors: ['Demasiadas solicitudes. Por favor, inténtelo de nuevo más tarde.'],

    };
  }

  const authCookie = await cookies();

  authCookie.set({
    name: "CASHTRACKR_TOKEN",
    value: json.token,
    httpOnly: true,
    path: "/",
});

  return {
    errors: [],

  };
}
