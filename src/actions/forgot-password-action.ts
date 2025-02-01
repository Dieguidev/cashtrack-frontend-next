'use server';

import { ErrorResponseSchema, ForgotPasswordSchema} from "@/schemas";

type ActionStateType = {
  errors: string[];
  success: string;
};

export async function forgotPassword(prevState: ActionStateType, formData: FormData) {
  const forgotPassword = ForgotPasswordSchema.safeParse({
    email: formData.get('email'),
  });

  if (!forgotPassword.success) {
    return {
      errors: forgotPassword.error.errors.map((error) => error.message),
      success: ''
    };
  }

  const url = `${process.env.API_URL}/auth/forgot-password`;
    const req = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email: forgotPassword.data.email,
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
        errors: ['Usuario no encontrado'],
        success: '',
      };
    }

    // SuccessSchema.parse(json);

  return {
    errors: [],
    success: 'Instrucciones enviadas a tu correo'
  }
}
