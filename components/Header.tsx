import Link from 'next/link'
import { useState, useEffect } from 'react'

const Header = () => {
  const [show, handleShow] = useState(false)

  // background color change on scroll
  useEffect(() => {
    window.addEventListener('scroll', () => {
      if (window.scrollY > 100) {
        handleShow(true)
      } else handleShow(false) // if not 100px down
    })
    return () => {
      window.removeEventListener('scroll', () => {})
    }
  }, [])

  return (
    <header
      className={`fixed left-0 top-0 flex w-full border-b border-black ${
        show && 'bg-white'
      }`}
    >
      <nav className="mx-auto flex w-full max-w-7xl justify-between p-5">
        <div className="flex items-center space-x-5">
          <Link href="/">
            <img
              className="w-44 cursor-pointer object-contain"
              src="/logo.png"
              alt=""
            />
          </Link>
          <div className="hidden cursor-pointer items-center space-x-5 md:inline-flex">
            <h3 className="transition duration-100 active:scale-90">About</h3>
            <h3 className="transition duration-100 active:scale-90">Contact</h3>
            <h3 className="transition duration-100 active:scale-90">Follow</h3>
          </div>
        </div>

        <div className="hidden cursor-pointer items-center space-x-5 sm:flex">
          <h3 className="transition duration-100 active:scale-90">Sign In</h3>
          <h3
            className={`rounded-full px-5 py-2 text-sm text-white transition duration-300 active:scale-90 ${
              show ? 'bg-green-600' : 'bg-black'
            }`}
          >
            Get Started
          </h3>
        </div>
      </nav>
    </header>
  )
}

export default Header
