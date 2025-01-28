'use server';

import { ErrorResponseSchema, RegisterSchema, SuccessSchema } from '@/schemas';

type ActionStateType = {
  errors: string[];
  success: string;
};

export async function register(prevState: ActionStateType, formData: FormData) {
  const registerData = {
    email: formData.get('email'),
    name: formData.get('name'),
    password: formData.get('password'),
    password_confirmation: formData.get('password_confirmation'),
  };

  const register = RegisterSchema.safeParse(registerData);
  if (!register.success) {
    const errors = register.error.errors.map((error) => error.message);
    return {
      errors,
      success: prevState.success,
    };
  }

  const url = `${process.env.API_URL}/auth/register`;
  const req = await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      email: register.data.email,
      name: register.data.name,
      password: register.data.password,
      passwordConfirmation: register.data.password,
    }),
  });

  const json = await req.json();

  if(req.status === 409) {
    // const {error} = ErrorResponseSchema.parse(json);
    ErrorResponseSchema.parse(json);
    return {
      errors: ['El email ya está en uso'],
      success: '',
    };
  }

  SuccessSchema.parse(json);

  return {
    errors: [],
    success: 'cuenta creada correctamente',
  };
}
