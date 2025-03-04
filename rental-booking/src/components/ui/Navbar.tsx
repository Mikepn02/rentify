import React from 'react'
import { Link } from "react-router-dom";
import { navLinks } from '../../constants';
import { Button } from './button';

const Navbar = () => {
  return (
   <div className='relative w-full shadow-xl'>
     <div className='flex justify-between items-center py-4 xl:px-60 lg:px-40 md:px-12 px-2'>
        <Link to='/' className='text-2xl font-bold text-gray-800'>
           <div className='flex items-center cursor-pointer'>
             <img src='/logo.svg' alt='logo' className='w-10 h-10 mr-2' />
             <p className='text-xl font-medium'>RentifyProperties</p>
           </div>
        </Link>

        <div className='flex space-x-4 items-center'>
            <div className='hidden md:flex space-x-4 items-center'>
                {
                    navLinks.slice(0,6).map((link, index) => (
                        <Link to={link.href} key={index} className='text-heading-1 font-bold hover:text-blue-500'>{link.title}</Link>
                    ))
                }
               <Link to={'/login'}>
               <Button className='bg-blue-600 text-white px-4 py-2 rounded-full'>
                  Sign in
                </Button></Link>
                <Link to={'/signup'}>
                <Button className='bg-transparent text-black border-2 border-black px-4 py-2 rounded-full'>
                  Sign up
                </Button></Link>
            </div>
        </div>
    </div>
   </div>
  )
}

export default Navbar