import React from 'react'
import Link from 'next/link'
import Image from 'next/image'

const Nav = () => {
  return (
    <div className="flex-between w-full mb-16 pt-3">
      {/* Logo on the left */}
      <div className="flex-col gap-2 items-center justify-center">
        <Image
          src="/awura2.png"
          width={65}
          height={65}
          className="object-contain"
          alt="profile"
        />
       
      </div>

      {/* Sign In and Sign Up buttons on the right */}
      <div className="flex-col">
        <Link
          href="/signin"
          className=" font-bold"
        >
          Sign In
        </Link>
        
        <Link
          href="/signup"
          className="text-right font-bold"
        >
          Sign Up
        </Link>
      </div>
    </div>
  )
}

export default Nav;
