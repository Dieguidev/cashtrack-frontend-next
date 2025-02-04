import { verifySession } from "@/auth/dal"

export async function GET() {

  await verifySession()
  return Response.json('hola mundo')
}
