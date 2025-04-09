import { Badge } from "@/components/ui/Badge";
import { StarIcon } from "lucide-react";

export const formatPrice = (price: number) => {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  }).format(price);
};

export const StarRating = ({ rating }: { rating: number }) => {
  return (
    <div className="flex items-center space-x-1">
      <StarIcon size={16} className="fill-yellow-400 text-yellow-400" />
      <span>{rating?.toFixed(1) || "N/A"}</span>
    </div>
  );
};

export const PropertyTypeBadge = ({ type }: { type: string }) => {
  const colorMap: Record<string, string> = {
    APARTMENT: "bg-blue-100 text-blue-800",
    HOUSE: "bg-green-100 text-green-800",
    CONDO: "bg-purple-100 text-purple-800",
    VILLA: "bg-amber-100 text-amber-800",
    STUDIO: "bg-rose-100 text-rose-800",
  };

  return (
    <Badge
      className={`font-medium ${colorMap[type] || "bg-gray-100 text-gray-800"}`}
    >
      {type}
    </Badge>
  );
};

// Available badge component
export const AvailableBadge = ({ available }: { available: boolean }) => {
  return available ? (
    <Badge className="bg-green-100 text-green-800 font-medium">Available</Badge>
  ) : (
    <Badge className="bg-red-100 text-red-800 font-medium">Unavailable</Badge>
  );
};