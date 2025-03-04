import React, { useRef, useState, useEffect } from "react";
import { Property } from "../../@types/types";
import { Link } from "react-router-dom";
import PropertyCard from "../cards/PropertyCard";

interface PropertiesProp {
  properties: Property[];
}

const FeaturedProperties = ({ properties }: PropertiesProp) => {
  const sliderRef = useRef<HTMLDivElement>(null);
  const [isMoved, setIsMoved] = useState(false);
  const [showButtons, setShowButtons] = useState(false);

  useEffect(() => {
    if (sliderRef.current) {
      setShowButtons(sliderRef.current.scrollWidth > sliderRef.current.clientWidth);
    }
  }, [properties]);

  const handleClick = (direction: string) => {
    setIsMoved(true);
    if (sliderRef.current) {
      const { scrollLeft, clientWidth } = sliderRef.current;
      const scrollTo = direction === "left" ? scrollLeft - clientWidth : scrollLeft + clientWidth;
      sliderRef.current.scrollTo({ left: scrollTo, behavior: "smooth" });
    }
  };

  return (
    <div className="bg-[#F8F8FB] py-10 flex flex-col justify-between space-y-12 overflow-hidden">
      <div className="flex flex-col md:flex-row w-full justify-between items-center px-6 md:px-12 lg:px-40 xl:px-60">
        <div className="flex flex-col space-y-4 text-center md:text-left">
          <h2 className="text-heading-1 font-semibold">Our Featured Properties</h2>
          <p className="text-gray-primary/75 max-w-xl">
            There are many variations of passages of Lorem Ipsum available but the this in majority have suffered alteration in some
          </p>
        </div>

        <Link to="/properties" className="mt-4 md:mt-0">
          <button className="py-4 text-sm text-white px-6 bg-primary-light">See More Properties</button>
        </Link>
      </div>

      <div ref={sliderRef} className="grid gap-x-8 auto-cols-auto grid-flow-col w-full scrollbar-hide overflow-x-scroll px-6 md:px-12 lg:px-40 xl:px-60">
        {properties.map((property, idx) => (
          <PropertyCard key={idx} property={property} />
        ))}
      </div>

      <div className="flex w-full items-center justify-between px-6 md:px-12 lg:px-40 xl:px-60">
        <p className="text-base text-gray-primary/50 max-w-xl">
          If you not find property there are many variations of passages of Lorem Ipsum available but the majority have suffered
          <Link to="/contact" className="text-primary-light cursor-pointer pl-1">Contact Us</Link>
        </p>
        {showButtons && (
          <div className="flex space-x-3">
            <button
              type="button"
              onClick={() => handleClick("left")}
              className={`h-12 w-12 rounded-full border-2 border-primary-light hover:bg-primary-light hover:text-white transition duration-300 flex items-center justify-center text-primary-light ${!isMoved && "hidden"}`}
            >
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18" />
              </svg>
            </button>

            <button
              onClick={() => handleClick("right")}
              className="h-12 w-12 rounded-full border-2 border-primary-light hover:bg-primary-light hover:text-white transition duration-300 flex items-center justify-center text-primary-light"
            >
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
              </svg>
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default FeaturedProperties;
