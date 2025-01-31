
import { cookies } from "next/headers"
import { redirect } from "next/navigation";

export const verifySession = async()=>{
  const authCookie = await cookies();
  const token = authCookie.get('CASHTRACKR_TOKEN')?.value;
  if(!token) {
    redirect('auth/login');
  }


}
