import { verifySession } from '@/auth/dal';
import { getTokenFromCookies } from '@/auth/token';

export async function GET(
  request: Request,
  { params }: { params: { budgetId: string; expenseId: string } }
) {
  await verifySession();

  const { budgetId, expenseId } = await params;

  const token = await getTokenFromCookies();

  const url = `${process.env.API_URL}/expense/${expenseId}/budget/${budgetId}`;
  const req = await fetch(url, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
  });

  const json = await req.json();

  if (!req.ok) {
    return Response.json({ error: 'No se pudo obtener el gasto' });
  }

  return Response.json(json);
}
