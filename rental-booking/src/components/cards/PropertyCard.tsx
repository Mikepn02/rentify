
import React, { useState } from "react";
import {  Property} from "../../@types/types";
import { Link } from "react-router-dom";
import { Badge } from "../ui/Badge";
import { Calendar, MapPin } from 'lucide-react';



interface PropertyCardProps {
    property: Property;
  }

  const PropertyCard = ({ property }: PropertyCardProps) => {
    const [imageLoaded, setImageLoaded] = useState(false);
  
    return (
      <Link to={`/property/${property.id}`} className="property-card group block">
        <div className="relative aspect-[4/3] overflow-hidden rounded-xl">
          <div className={`absolute inset-0 ${imageLoaded ? '' : 'image-loading'}`} />
          <img
            src={property.images[0]}
            alt={property.title}
            className={`w-full h-full object-cover transition-transform duration-500 group-hover:scale-105 ${
              imageLoaded ? 'opacity-100' : 'opacity-0'
            }`}
            onLoad={() => setImageLoaded(true)}
          />
          <Badge className="absolute top-3 right-3 bg-white/90 text-foreground backdrop-blur-sm hover:bg-white/90">
            ${property.price}/night
          </Badge>
        </div>
        <div className="pt-4 pb-2 px-1">
          <div className="flex items-start justify-between">
            <div>
              <h3 className="font-medium text-base line-clamp-1">{property.title}</h3>
              <div className="flex items-center mt-1 text-muted-foreground text-sm">
                <MapPin className="w-3.5 h-3.5 mr-1" />
                <span>{property.location}</span>
              </div>
            </div>
            <div className="flex items-center mt-1">
              <div className="text-sm font-medium flex items-center">
                <span className="text-yellow-500 mr-1">★</span>
                {property.rating}
              </div>
            </div>
          </div>
          
          <div className="flex items-center justify-between mt-3 text-xs text-muted-foreground">
            <div className="flex items-center gap-2">
              <span>{property.type}</span>
              <span>•</span>
              <span>{property.bedrooms} beds</span>
              <span>•</span>
              <span>{property.bathrooms} baths</span>
            </div>
            
            <div className="flex items-center text-primary">
              <Calendar className="w-3.5 h-3.5 mr-1" />
              <span>Available</span>
            </div>
          </div>
        </div>
      </Link>
    );
  };
  

export default PropertyCard;