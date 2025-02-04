import { verifySession } from '@/auth/dal';
import { getTokenFromCookies } from '@/auth/token';

export async function GET(
  request: Request,
  { params }: { params: { budgetId: string; expenseId: string } }
) {
  await verifySession();

  const token = getTokenFromCookies();

  const url = `${process.env.API_URL}/expense/${params.expenseId}/budget/${params.budgetId}`;
  const req = await fetch(url, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
  });

  const json = await req.json();

  if(!req.ok){
    return Response.json(json.errors, { status: req.status });
  }

  return Response.json(json);
}
