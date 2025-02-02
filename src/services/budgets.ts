import { getTokenFromCookies } from "@/auth/token";
import { BudgetAPIResponseSchema } from "@/schemas";
import { notFound } from "next/navigation";
import { cache } from "react";

export const getBudget = cache( async (id: string) => {
  const url = `${process.env.API_URL}/budget/${id}`;
  const token = await getTokenFromCookies();
  const req = await fetch(url, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    cache: 'force-cache',
    next: { tags: [`budget-${id}`] }
  });

  const json = await req.json();

  if (!req.ok) notFound();

  const budget = BudgetAPIResponseSchema.parse(json);
  return budget;
})
