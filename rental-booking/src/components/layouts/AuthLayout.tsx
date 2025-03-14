import React, { useEffect, useState } from "react";
import Testimonials from "../ui/Testmonials";
import { testimonials } from "@/constants";

const AuthLayout = ({ children }: { children: React.ReactNode }) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [imageLoaded, setImageLoaded] = useState<boolean[]>(new Array(testimonials.length).fill(false));
  const [isTransitioning, setIsTransitioning] = useState(false);

  useEffect(() => {
    const imagePromises = testimonials.map((testimonial) => {
      return new Promise((resolve) => {
        if (testimonial.image) {
          const img = new Image();
          img.src = testimonial.image;
          img.onload = () => resolve(true);
          img.onerror = () => resolve(false);
        } else {
          resolve(false);
        }
      });
    });

    Promise.all(imagePromises).then((loadedStatuses) => {
      setImageLoaded(loadedStatuses.map(status => Boolean(status)));
    });
  }, []);

  useEffect(() => {
    const slideInterval = setInterval(() => {
      if(!isTransitioning){
        handleNext();
      }
    }, 3000);
    
    return () => clearInterval(slideInterval);
  }, [isTransitioning]);

  const handleNext = () => {
    if (!isTransitioning) {
      setIsTransitioning(true);
      setActiveIndex((prev) => (prev === testimonials.length - 1 ? 0 : prev + 1));
      setTimeout(() => setIsTransitioning(false), 500);
    }
  };

  const handlePrev = () => {
    if (!isTransitioning) {
      setIsTransitioning(true);
      setActiveIndex((prev) => (prev === 0 ? testimonials.length - 1 : prev - 1));
      setTimeout(() => setIsTransitioning(false), 500);
    }
  };

  return (
    <div className="flex min-h-screen">
      <div className="flex flex-1 flex-col justify-center px-4 py-12 sm:px-6 lg:px-20 xl:px-24 w-1/2">
        {children}
      </div>
      <div className="relative hidden lg:block w-1/2">
        {imageLoaded[activeIndex] && (
          <img
            className="absolute inset-0 h-full w-full object-cover transition-opacity duration-500"
            src={testimonials[activeIndex].image}
            alt="Property"
          />
        )}
        <div className="absolute bottom-2 right-10 w-[80%]">
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