'use client'

import { useRouter } from 'next/navigation'
import React from 'react'

export const AddExpenseButton = () => {

  const router = useRouter()
  return (
    <button
      type='button'
      className='bg-amber-500 px-10 py-2 rounded-lg text-white font-bold cursor-pointer'
      onClick={()=> router.push('?addExpense=true&showModal=true')}
    >Agregar Gastoo</button>
  )
}
