'use client'

import { signIn, signOut, useSession } from 'next-auth/react'
import Image from 'next'

export default function Home() {
  const {data} = useSession()

  return (
    <div>
      <div className='flex flex-col'>
        <button onClick={() => signIn()}>Login</button>
        <button onClick={() => signOut()}>Logout</button>
      </div>
      <h1>Olá {data?.user?.name}</h1>
      <img src={data?.user?.image ?? ''} alt={`Imagem de perfil do ${data?.user?.name}`} />
    </div>
  )
}
