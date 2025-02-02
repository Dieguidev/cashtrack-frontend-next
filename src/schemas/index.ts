import { z } from 'zod';

export const RegisterSchema = z
  .object({
    email: z
      .string()
      .min(1, { message: 'Email no puede estar vacío' })
      .email({ message: 'Email no válido' }),
    name: z.string().min(1, { message: 'Nombre no puede estar vacío' }),
    password: z
      .string()
      .min(8, { message: 'Password debe tener al menos 8 caracteres' }),
    password_confirmation: z.string(),
  })
  .refine((data) => data.password === data.password_confirmation, {
    message: ' Los passwords no son iguales',
    path: ['password_confirmation'],
  });

export const SuccessSchema = z.object({
  user: z.object({
    id: z.string(),
    name: z.string(),
    email: z.string(),
    confirmed: z.boolean(),
    budgets: z.array(z.unknown()),
  }),
});

export const LoginResponseSchema = SuccessSchema.merge(
  z.object({
    token: z.string(),
  })
);

export const ErrorResponseSchema = z.object({
  error: z.string(),
});

export const TokenSchema = z
  .string({ message: 'Token no válido' })
  .min(6, { message: 'Token no válido' })
  .max(6, { message: 'Token no válido' });

export const ForgotPasswordSchema = z.object({
  email: z
    .string()
    .min(1, { message: 'El Email es Obligatorio' })
    .email({ message: 'Email no válido' }),
});

export const LoginSchema = z.object({
  email: z
    .string()
    .min(1, { message: 'El Email es Obligatorio' })
    .email({ message: 'Email no válido' }),
  password: z.string().min(1, { message: 'El Password no puede ir vacio' }),
});

export type User = z.infer<typeof SuccessSchema>['user'];


export const ResetPasswordSchema = z.object({
  password: z.string()
          .min(8, {message: 'El Password debe ser de al menos 8 caracteres'}),
  password_confirmation: z.string()
}).refine((data) => data.password === data.password_confirmation, {
  message: "Los Passwords no son iguales",
  path: ["password_confirmation"]
});


export const DraftBudgetSchema = z.object({
  name: z.string()
          .min(1, {message: 'El Nombre del presupuesto es obligatorio'}),
  amount: z.coerce.
          number({message: 'Cantidad no válida'})
          .min(1, {message: 'Cantidad no válida'}),
})


export const BudgetAPIResponseSchema = z.object({
  id: z.string(),
  name: z.string(),
  amount: z.number(),
  userId: z.string(),
  createdAt: z.string(),
  updatedAt: z.string(),
  expenses: z.array(z.unknown()),
})

export const BudgetsAPIResponseSchema = z.array(BudgetAPIResponseSchema);

export const ConfirmPasswordSchema = z.object({
  password: z.string()
          .min(8, {message: 'El Password debe ser de al menos 8 caracteres'})
})

export type Budget = z.infer<typeof BudgetAPIResponseSchema>;
