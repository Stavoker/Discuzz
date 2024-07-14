'use client'

import Link from 'next/link';
import Image from 'next/image';
import React from 'react';

import { SignedIn, SignedOut, SignInButton, UserButton } from '@clerk/nextjs';
import MobileNav from './MobileNav';


const Navbar = () => {
  return (
    <nav className='flex flex-between fixed z-50 w-full bg-dark-1 
    px-6 py-4 lg:px-10'>

      <Link href="/" className='flex items-center gap-1'>
        <div className='flex items-center gap-[10px]'>
          <Image src="/icons/kayf-logo.png"
            width={60}
            height={60}
            alt='Yoom Logo'
            className='max-sm:size-10' />

          <p className='text-[26px] font-extrabold text-white 
          max-sm:hidden mt-4'>KAYF</p>
          </div>
      </Link>


      <div className='flex-between gap-5'>

        <SignedIn>
          <UserButton />
        </SignedIn>


        <MobileNav />

      </div>

    </nav>
  )
}

export default Navbar
