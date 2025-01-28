'use server';

import { RegisterSchema } from '@/schemas';

export async function register(formData: FormData) {
  const registerData = {
    email: formData.get('email'),
    name: formData.get('name'),
    password: formData.get('password'),
    password_confirmation: formData.get('password_confirmation'),
  };

  const register = RegisterSchema.safeParse(registerData);

  const errors = register.error?.errors.map((error) => error.message);

  console.log(errors);

}
