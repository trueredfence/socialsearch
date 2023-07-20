'use client'
import Link from "next/link"
import Image from "next/image"
import { useState, useEffect } from "react"
import { signIn, signOut, useSession, getProviders } from "next-auth/react";

const Nav = () => {
  const {data:session } = useSession();
  const [providers, setProviders] = useState(null);
  const [toggleDropdown, setToggleDropdown] = useState(false)


  useEffect(() => {
    (async () => {
      const res = await getProviders();
      setProviders(res);
    })();
  }, []);
  return (
    <nav className='flex-between w-full mb-16 pt-3'>
      <Link href='/' className='flex gap-2 flex-center'>
        <Image
          src='/assets/images/pfinderlogo.png'
          alt='logo'
          width={50}
          height={50}
          className='object-contain'
        />
        <p className='logo_text'>rofile Finder</p>
      </Link>
        {/*Desktop Navigation*/}
        <div className='sm:flex hidden'>
        {session?.user ? (
            <div className='flex gap-3 md:gap-5'>
            <button type='button' onClick={signOut}  className='outline_btn'>
              Sign Out
            </button>
              <Image
                src={session?.user.image}
                width={37}
                height={37}
                className='rounded-full'
                alt='profile'
              />
            </div>
        ):(
          <>          
           {providers &&
              Object.values(providers).map((provider) => (   
                <button type="button"
                key={provider.name}
                onClick={() => {
                signIn(provider.id);}}
                className="black_btn">
                <svg className="w-4 h-4 mr-2" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 18 19">
                  <path fill-rule="evenodd" d="M8.842 18.083a8.8 8.8 0 0 1-8.65-8.948 8.841 8.841 0 0 1 8.8-8.652h.153a8.464 8.464 0 0 1 5.7 2.257l-2.193 2.038A5.27 5.27 0 0 0 9.09 3.4a5.882 5.882 0 0 0-.2 11.76h.124a5.091 5.091 0 0 0 5.248-4.057L14.3 11H9V8h8.34c.066.543.095 1.09.088 1.636-.086 5.053-3.463 8.449-8.4 8.449l-.186-.002Z" clip-rule="evenodd"/>
                </svg>
                Sign in with Google
              </button>
                // <button
                //   type='button'
                //   key={provider.name}
                //   onClick={() => {
                //     signIn(provider.id);
                //   }}
                //   className='black_btn'
                // >
                //   Sign in with Google
                // </button>
              ))}
          </>
        )}
        </div>  

         {/* Mobile Navigation */}
      <div className='sm:hidden flex relative'>
        {session?.user ? (
          <div className='flex'>
            <Image
              src={session?.user.image}
              width={37}
              height={37}
              className='rounded-full'
              alt='profile'
              onClick={() => setToggleDropdown((prev)=>!prev)}
            />

            {toggleDropdown && (
              <div className='dropdown'>                
                <button
                  type='button'
                  onClick={() => {
                    setToggleDropdown(false);
                    signOut();
                  }}
                  className='mt-5 w-full black_btn'
                >
                  Sign Out
                </button>
              </div>
            )}
          </div>
        ) : (
          <>
            {providers &&
              Object.values(providers).map((provider) => (
                <button
                  type='button'
                  key={provider.name}
                  onClick={() => {
                    signIn(provider.id);
                  }}
                  className='black_btn'
                >
                  Sign in with Google
                </button>
              ))}
          </>
        )}
      </div>    
      </nav>
  )
}

export default Nav