'use client'; // Ensure this is at the top of the file

import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation'; // Updated hook for App Router

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname(); // Get the current path using the new hook

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  // Function to check if a link is active
  const isActive = (path) => {
    return pathname === path; // Check if the current route matches the link's path
  };

  return (
    <nav className='bg-customBlueLogo pb-4 text-sm text-customRed md:text-base'>
      <div className='container mx-auto flex items-center justify-between'>
        {/* Hamburger Menu Button (Mobile) */}
        <div className='ml-auto mr-6 md:hidden'>
          <button
            onClick={toggleMenu}
            className='text-customRed focus:outline-none'
          >
            <svg
              className='h-6 w-6'
              fill='none'
              stroke='currentColor'
              viewBox='0 0 24 24'
              xmlns='http://www.w3.org/2000/svg'
            >
              <path
                strokeLinecap='round'
                strokeLinejoin='round'
                strokeWidth='2'
                d='M4 6h16M4 12h16M4 18h16'
              ></path>
            </svg>
          </button>
        </div>

        {/* Desktop Menu */}
        <div className='ml-auto hidden space-x-6 md:flex'>
          <Link
            href='/'
            className={`hover:underline ${isActive('/') ? 'underline' : ''}`}
          >
            Home
          </Link>
          <Link
            href='/about'
            className={`hover:underline ${isActive('/about') ? 'underline' : ''}`}
          >
            About
          </Link>
          <Link
            href='/blogs'
            className={`hover:underline ${isActive('/blogs') ? 'underline' : ''}`}
          >
            Blogs
          </Link>
          <Link
            href='/consulting'
            className={`hover:underline ${isActive('/consulting') ? 'underline' : ''}`}
          >
            Consulting
          </Link>
        </div>
      </div>

      {/* Mobile Dropdown Menu */}
      {isOpen && (
        <div className='bg-customBlueLogo text-customRed md:hidden'>
          <ul className='mb-1 mt-2 flex flex-col space-y-3 text-right'>
            <li>
              <Link
                href='/'
                className={`mr-7 block hover:underline ${
                  isActive('/') ? 'underline' : ''
                }`}
              >
                Home
              </Link>
            </li>
            <li>
              <Link
                href='/about'
                className={`mr-7 block hover:underline ${
                  isActive('/about') ? 'underline' : ''
                }`}
              >
                About
              </Link>
            </li>
            <li>
              <Link
                href='/blogs'
                className={`mr-7 block hover:underline ${
                  isActive('/blogs') ? 'underline' : ''
                }`}
              >
                Blogs
              </Link>
            </li>
            <li>
              <Link
                href='/consulting'
                className={`mr-7 block hover:underline ${
                  isActive('/consulting') ? 'underline' : ''
                }`}
              >
                Consulting
              </Link>
            </li>
          </ul>
        </div>
      )}
    </nav>
  );
}
