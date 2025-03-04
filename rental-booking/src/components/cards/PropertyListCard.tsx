import React from "react";
import { Property } from "../../@types/types";

interface PropertyListCardProps {
  property: Property;
}

const PropertyListCard = ({ property }: PropertyListCardProps) => {
  return (
    <div className="w-full flex flex-col md:flex-row border-2 rounded-lg p-4 gap-4 shadow-md">
      <div className="w-full sm:w-1/3 relative">
        <img
          src={property.bannerImage}
          alt="property"
          className="w-full h-40 sm:h-48 md:h-56 object-cover rounded-lg"
        />
        <div className="absolute top-2 right-2 bg-white p-2 rounded-full shadow-md">
          <img src={"/icons/heart_icon.svg"} width={20} height={20} />
        </div>
      </div>

      {/* Details Section */}
      <div className="flex flex-col space-y-2 w-full sm:w-2/3">
        {/* Location */}
        <p className="text-sm text-gray-500">
          {property.address.city}, {property.address.neighborhood}
        </p>

        {/* Name */}
        <h2 className="text-lg font-semibold text-gray-800">{property.name}</h2>

        {/* Price */}
        <p className="text-md font-bold text-green-600">${property.price.toLocaleString()} / month</p>

        {/* Status Badge */}
        <span className={`px-3 py-1 text-xs font-semibold rounded-full ${property.status === "For Rent" ? "bg-blue-100 text-blue-600" : "bg-green-100 text-green-600"}`}>
          {property.status}
        </span>

        {/* Features */}
        <div className="flex space-x-4 text-sm text-gray-600">
          <span>🛏️ {property.features.bedrooms} Beds</span>
          <span>🛁 {property.features.bathrooms} Baths</span>
          <span>🚗 {property.features.parking} Parking</span>
        </div>

        {/* Overview (shortened) */}
        <p className="text-sm text-gray-500 line-clamp-2">
          {property.overview.length > 100 ? property.overview.substring(0, 100) + "..." : property.overview}
        </p>

        {/* Like Count */}
        <p className="text-xs text-gray-400">❤️ {property.likedBy?.length || 0} people like this</p>
      </div>
    </div>
  );
};

export default PropertyListCard;
