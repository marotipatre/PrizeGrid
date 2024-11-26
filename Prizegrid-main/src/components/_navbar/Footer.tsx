import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

export default function Footer() {
  return (
    <section className="text-gray-700 bg-white body-font absolute w-full overflow-x-hidden">
      <div className="container flex flex-col items-center px-8 py-8 mx-auto max-w-7xl sm:flex-row">
            <Link href="/" className="flex items-center mb-5 font-medium text-gray-900 lg:w-auto lg:items-center lg:justify-center md:mb-0">
              <span className="mx-auto text-xl font-black leading-none text-gray-900 select-none">
                <Image src={'https://res.cloudinary.com/dm6aa7jlg/image/upload/v1724954674/Twitter_profile_gigster_n5zlmx.png'} alt='' height={60} width={60} />
                {/* <span className="text-indigo-600">.</span> */}
              </span>
            </Link>
        
        <span className="inline-flex justify-center mt-4 space-x-5 sm:ml-auto sm:mt-0 sm:justify-start">

          <a href="https://x.com/apt_gigster" target='_blank' className="text-gray-400 hover:text-gray-500">
            <span className="sr-only">X</span>
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 128 128"><path d="M75.916 54.2L122.542 0h-11.05L71.008 47.06L38.672 0H1.376l48.898 71.164L1.376 128h11.05L55.18 78.303L89.328 128h37.296L75.913 54.2ZM60.782 71.79l-4.955-7.086l-39.42-56.386h16.972L65.19 53.824l4.954 7.086l41.353 59.15h-16.97L60.782 71.793Z"/></svg>
          </a>
        </span>
      </div>
    </section>
  )
}
