import React from "react";
import { Link, useParams } from "react-router-dom";
import { dummyProperties } from "../../constants";

const PropertyDetail = () => {
  const { id } = useParams();
  const property = dummyProperties.find((p) => p._id === id);

  if (!property) {
    return (
      <h2 className="text-center text-red-500 mt-10 font-bold text-2xl">
        Property not Found!
      </h2>
    );
  }

  return (
    <div className="max-w-6xl mx-auto p-4 sm:p-6">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="md:col-span-2">
          <img
            src={property.bannerImage}
            alt="Main Image"
            className="w-full h-64 sm:h-80 object-cover rounded-lg"
          />
        </div>

        <div className="grid grid-cols-2 gap-2 col-span-1 md:col-span-2">
          {property.gallery.slice(0, 4).map((image, index) => (
            <div key={index} className="relative">
              <img
                src={image.image}
                alt={`Gallery Image ${index}`}
                className="w-full h-32 sm:h-40 object-cover rounded-lg"
              />
              {index === 3 && property.gallery.length > 4 && (
                <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center text-white text-lg sm:text-2xl font-bold rounded-lg">
                  +{property.gallery.length - 4} more
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      <div className="mt-6 text-center md:text-left">
        <h1 className="text-2xl sm:text-3xl font-bold">{property.name}</h1>
        <p className="text-green-600 font-semibold text-lg">9.0 Wonderful</p>
        <p className="text-gray-500">8 external reviews</p>

        <div className="mt-4 flex gap-6 text-gray-700">
          <p>🏡 5 bedroom</p>
          <p>🚿 2 bathroom</p>
          <p>🛏 Sleeps 1</p>
        </div>

        <div className="mt-6 p-4 border rounded-lg shadow-md">
          <p className="text-lg font-semibold">${property.price} per night</p>
          <p className="text-green-600">Free cancellation before Feb 28</p>
          <Link to={`/book/${property._id}`}>
            <button className="mt-4 bg-blue-600 text-white px-6 py-2 rounded-lg">
              Book Now
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default PropertyDetail;
