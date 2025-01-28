import { z } from 'zod';

export const RegisterSchema = z.object({
  email: z.string()
          .min(1,{ message: 'Email no puede estar vacío' })
          .email({ message: 'Email no válido' }),
  name: z.string()
          .min(1,{ message: 'Nombre no puede estar vacío' }),
  password: z.string()
          .min(8,{ message: 'Password debe tener al menos 8 caracteres' }),
  password_confirmation: z.string(),
}).refine(data=>data.password === data.password_confirmation, {
  message: ' Los passwords no son iguales',
  path: ['password_confirmation']
})
