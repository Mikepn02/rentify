import React from "react";
import { Property } from "../../@types/types";
import PropertyListCard from "../../components/cards/PropertyListCard";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import markerIcon2x from "leaflet/dist/images/marker-icon-2x.png";
import markerIcon from "leaflet/dist/images/marker-icon.png";
import markerShadow from "leaflet/dist/images/marker-shadow.png";
import { Link } from "react-router-dom";
import Search from "@/components/ui/Search";
import Filters from "@/components/ui/filters";
import { Button } from "@/components/ui/button";

interface PropertyListProps {
  properties: Property[];
}

// Custom Marker Icon Fix
const customIcon = L.icon({
  iconUrl: markerIcon,
  iconRetinaUrl: markerIcon2x,
  shadowUrl: markerShadow,
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [0, -41],
});

const PropertyList = ({ properties }: PropertyListProps) => {
  const position: [number, number] = [-1.9536, 30.0605];

  return (
    <div className="w-full flex flex-col">
      <Search />
      <div className="p-5 border-b-[1px] border-gray-200">
        <Filters />
      </div>
      <div className="w-full flex flex-col md:flex-row h-screen gap-4 p-5">
        <div className="w-full md:w-1/2 flex flex-col gap-4 overflow-y-auto scrollbar-hide">
          <h2 className="text-sm text-heading-1 font-semibold">
            {properties.length} properties
          </h2>
          <div className="w-full flex flex-row justify-between py-4 bg-blue-950 text-white p-5 rounded-xl">
            <div className="flex justify-center items-center gap-4">
              <img
                src="https://a.travel-assets.com/egds/marks/onekey__standard__always_light.svg"
                alt="travel assets"
                width={50}
                height={50}
              />
              <h1 className="text-xl font-bold">
                Members Always get our best prices when signed in
              </h1>
            </div>
            <Button className="bg-blue-600">Sign in</Button>
          </div>
          {properties.map((property) => (
            <Link to={`/property/${property._id}`} key={property._id}>
              <PropertyListCard property={property} />
            </Link>
          ))}
        </div>

        <div className="w-full md:w-1/2 h-full">
          <div className="rounded-xl overflow-hidden shadow-lg border-2 h-full">
            <MapContainer
              center={position}
              zoom={13}
              style={{ height: "100%", width: "100%" }}
            >
              <TileLayer
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
              />
              <Marker position={position} icon={customIcon}>
                <Popup>Hello! This is Rwanda .</Popup>
              </Marker>
            </MapContainer>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PropertyList;
