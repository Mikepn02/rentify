import { TestimonialSlider } from "@/@types/types";
import React from "react";

interface TestimonailProps {
  testimonials: TestimonialSlider[];
  activeIndex: number;
  handleNext: () => void;
  handlePrev: () => void;
}

const Testimonials = ({
  testimonials,
  activeIndex,
  handleNext,
  handlePrev,
}: TestimonailProps) => {
  return (
    <div className="w-full flex flex-col items-center space-y-6">
      <div className="flex flex-col w-full items-center">
        <div className="w-full bg-white rounded-xl flex flex-col items-center space-y-3 p-6">
          <p className="text-gray-primary/75 text-lg italic w-full">
            {testimonials[activeIndex].testimonial}
          </p>
          <div className="flex flex-row items-center justify-between w-full">
            <div>
              <h2 className="text-xl font-semibold italic">
                {testimonials[activeIndex].name}
              </h2>
              <p className="text-gray-primary/75 italic">
                {testimonials[activeIndex].role}
              </p>
            </div>
            <div className="flex space-x-4">
              <button
                disabled={activeIndex === 0}
                type="button"
                onClick={handlePrev}
                className={`h-12 w-12 rounded-full border-2 transition duration-300 flex items-center justify-center ${
                  activeIndex > 0
                    ? "border-primary-light hover:bg-primary-light hover:text-white text-primary-light"
                    : "border-[#7B7B7B] text-[#7B7B7B]"
                }`}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="w-6 h-6"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18"
                  />
                </svg>
              </button>

              <button
                disabled={activeIndex >= testimonials.length - 1}
                onClick={handleNext}
                className={`h-12 w-12 rounded-full border-2 transition duration-300 flex items-center justify-center ${
                  activeIndex < testimonials.length - 1
                    ? "border-primary-light hover:bg-primary-light hover:text-white text-primary-light"
                    : "border-[#7B7B7B] text-[#7B7B7B]"
                }`}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="w-6 h-6"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3"
                  />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Testimonials;