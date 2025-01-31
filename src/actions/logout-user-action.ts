'use server'

import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export async function logout(){
  const authCookie = await cookies();

  authCookie.delete('CASHTRACKR_TOKEN');
  redirect('/auth/login');

}
