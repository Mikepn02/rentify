import React, { useState } from 'react';
import Testimonials from '../ui/Testmonials';
import { testimonials } from '@/constants';

const AuthLayout = ({ children }: { children: React.ReactNode }) => {
  const [activeIndex, setActiveIndex] = useState(0);

  const handleNext = () => {
    if (activeIndex < testimonials.length - 1) {
      setActiveIndex(activeIndex + 1);
    }
  };

  const handlePrev = () => {
    if (activeIndex > 0) {
      setActiveIndex(activeIndex - 1);
    }
  };

  return (
    <div className='flex min-h-screen'>
      <div className='flex flex-1 flex-col justify-center px-4 py-12 sm:px-6 lg:px-20 xl:px-24 w-1/2'>
        {children}
      </div>
      <div className='relative hidden lg:block w-1/2'>
        <img
          className='absolute inset-0 h-full w-full object-cover'
          src={testimonials[activeIndex].image}
          alt='Property'
        />
        <div className='absolute bottom-2 right-10 w-[80%]'>
          <Testimonials
            testimonials={testimonials}
            activeIndex={activeIndex}
            handleNext={handleNext}
            handlePrev={handlePrev}
          />
        </div>
      </div>
    </div>
  );
};

export default AuthLayout;