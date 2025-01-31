
import { cache } from "react";
import { cookies } from "next/headers"
import { redirect } from "next/navigation";
import { SuccessSchema } from "@/schemas";

export const verifySession =cache( async()=>{
  const authCookie = await cookies();
  const token = authCookie.get('CASHTRACKR_TOKEN')?.value;
  if(!token) {
    redirect('auth/login');
  }

  const url = `${process.env.API_URL}/user/get-user-login`;

  const req = await fetch(url, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    }
  })

  const session = await req.json();
  const result = SuccessSchema.safeParse(session);

  if(!result.success) {
    redirect('auth/login');
  }

  return {
    user: result.data.user,
    isAuth: true
  }

})
