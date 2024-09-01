'use client'

import Link from 'next/link';
import Image from 'next/image';
import React from 'react';

import { SignedIn, SignedOut, SignInButton, UserButton } from '@clerk/nextjs';
import MobileNav from './MobileNav.jsx';
import TokenCounter from '../TokenCounter.jsx';


const Navbar = () => {
  return (
    <nav className='flex flex-between fixed z-50 w-full bg-dark-2 
    px-6 py-4 lg:px-10'>

      <Link href="/" className='flex items-center gap-1'>
        <div className='flex items-center gap-[10px]'>

          {/* <Image src="/icons/kayf-logo.png"
            width={56}
            height={56}
            alt='Yoom Logo'
            className='max-sm:size-10' />
         */}

          <p className='text-[28px] font-extrabold text-white
          max-sm:hidden mt-3'>Discuzz</p>
        </div>
      </Link>


      <div className='flex-between gap-5'>
        <TokenCounter />

        <SignedIn>
          <UserButton />
        </SignedIn>


        <MobileNav />

      </div>

    </nav>
  )
}

export default Navbar
