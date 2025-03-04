import React from "react";

const KnowMore = () => {
  return (
    <div className="w-full md:pb-24  flex flex-col md:flex-row space-x-0 md:space-y-0 space-y-12 justify-between">
      <div className="relative">
        <div className="relative h-96 md:w-80">
          <img
            src="/images/about-1.png"
            alt="about-image"
            className="w-full object-cover"
          />
        </div>
        <div className="absolute md:top-40 bottom-0 md:left-32 right-0 h-72 xl:w-72 md:w-64 w-60">
          <img
            src="/images/about-2.png"
            alt="about-image"
            className="w-full object-cover"
          />
        </div>
      </div>

      <div className="flex flex-col space-y-6 md:w-1/2">
        <div className="flex space-x-3">
          <div className="relative">
            <div className="bg-[#D3DEE8] h-6 w-6" />
            <div className="bg-primary-light top-1 left-1 h-6 w-6 absolute" />
          </div>
          <h2 className="text-xl">Know more about us</h2>
        </div>
        <h3 className="text-gray-primary text-2xl font-medium">
          Are you looking for Best Property Near You? Contact us
        </h3>
        <div className="flex flex-col space-y-4 text-gray-primary/75">
          <p>
            It is a long established fact that a reader will be distracted by
            the readable content of a page when looking at its layout. The point
            of using Lorem Ipsum. It is a long established fact that a reader
            will be distracted by the readable content of a page when looking
            layout.
          </p>
          <p>
            There are many variations of passages of Lorem Ipsum available, but
            the majority have suffered alteration in some form, by injected
            humour, or randomised words which don&apos;t look even slightly
            believable.
          </p>
        </div>

        <div className="bg-primary-light text-white px-4 py-2 flex items-center">
            <img src="/icons/phone-ring_icon.svg" width={30}  height={40} />
            
            <div className="flex flex-col space-y-1">
                <p className="text-base">Call us now</p>
                <p className="font-medium text-lg">+00 123 456 789</p>
            </div>
        </div>
      </div>
    </div>
  );
};

export default KnowMore;
