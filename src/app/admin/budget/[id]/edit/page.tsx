import { getTokenFromCookies } from "@/auth/token";
import { notFound } from "next/navigation";

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
    notFound();
  }


  return json;
}

export default async function EditBudgetPage({ params }: { params: { id: string } }) {
  const { id } = await params;
  await getBudget(id);

  return (
    <div>EditBudgetPage</div>
  );
}
