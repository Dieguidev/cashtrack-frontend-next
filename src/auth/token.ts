import { cookies } from 'next/headers';

export async function getTokenFromCookies() {
  const authCookie = await cookies();
  const token = authCookie.get('CASHTRACKR_TOKEN')?.value;
  return token;
}
