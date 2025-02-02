import 'server-only';
import { cache } from 'react';
import { redirect } from 'next/navigation';
import { SuccessSchema } from '@/schemas';
import { getTokenFromCookies } from './token';

export const verifySession = cache(async () => {
  const token = await getTokenFromCookies();
  if (!token) {
    redirect('auth/login');
  }

  const url = `${process.env.API_URL}/user/get-user-login`;

  const req = await fetch(url, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    cache: "force-cache",
  });

  const session = await req.json();
  const result = SuccessSchema.safeParse(session);

  if (!result.success) {
    redirect('auth/login');
  }

  return {
    user: result.data.user,
    isAuth: true,
  };
});
