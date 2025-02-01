
import Link from "next/link";

import { Metadata } from "next";

export const metadata: Metadata = {
  title: 'CahsTrackr - Panel de Administración',
  description: 'Panel de administración de CashTrackr',
}

export default async function AdminPage() {

  return (
    <>
      <div className='flex flex-col-reverse md:flex-row md:justify-between items-center'>
        <div className='w-full md:w-auto'>
          <h1 className="font-black text-4xl text-purple-950 my-5">Mis Presupuestos</h1>
          <p className="text-xl font-bold">Maneja y administra tus {''}
            <span className="text-amber-500">presupuestos</span>
          </p>
        </div>
        <Link
          href={'/admin/budget/new'}
          className='bg-amber-500 p-2 rounded-lg text-white font-bold w-full md:w-auto text-center'
        >
          Crear Presupuesto
        </Link>
      </div>
    </>
  );
}
