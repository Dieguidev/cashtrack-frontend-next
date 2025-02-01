import { getTokenFromCookies } from "@/auth/token";

const getBudget = async (id: string) => {
  const url = `${process.env.API_URL}/budget/${id}`;
  const token = await getTokenFromCookies();
  const req = await fetch(url, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
  });

  const json = await req.json();
  if (!req.ok) {

  }
  return json;
}

export default async function EditBudgetPage({ params }: { params: { id: string } }) {
  const { id } = await params;
  getBudget(id);

  return (
    <div>EditBudgetPage</div>
  );
}
