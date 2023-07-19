'use client'
import Image from "next/image";
import { signIn, signOut, useSession } from 'next-auth/react'
import { AiOutlineMenu } from 'react-icons/ai'
import { useState } from "react";
import Link from "next/link";

const Header = () => {
  const [menuIsOpen, setMenuIsOpen] = useState(false)
  const {status, data} = useSession()

  const handleLoginClick = () => signIn()
  const handleLogoutClick = () => {
    setMenuIsOpen(false)
    signOut()
  }

  const handleMenuClick = () => setMenuIsOpen(!menuIsOpen)

  return(
    <div className="container mx-auto p-5 py-0 h-[93px] flex justify-between items-center">
      <Link href="/">
        <div className="relative">
          <Image 
            width={182}
            height={32}
            src="/logo.png"
            alt="logo fullstack week"
          />
        </div>
      </Link>

      {status === 'unauthenticated' && (
        <button className="text-primary text-sm font-semibold" onClick={handleLoginClick}>
          Login  
        </button>
      )}

      {status === 'authenticated' && data.user &&(
        <div className="flex items-center gap-3 border-grayLighter border border-solid rounded-full p-2 relative">
          <AiOutlineMenu 
            size={16} 
            onClick={handleMenuClick} 
            className="cursor-pointer"
          />

          <Image 
            width={35}
            height={35}
            src={data.user.image!}
            alt={data.user.name!}
            className="rounded-full shadow-md"
          />

          {menuIsOpen && (
            <div className="z-50 absolute top-12 left-0 w-full h-full bg-white rounded-lg shadow-md flex flex-col justify-center items-center">
              <button className="text-primary text-sm font-semibold" onClick={handleLogoutClick}>
                Logout
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  )
}

export default Header