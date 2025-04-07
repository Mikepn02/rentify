import { Property } from "@/@types/types";
import CreatePropertyModal from "@/components/modal/CreatePropertyModal";
import { DataTable } from "@/components/table/PaginatedTable";
import useAuth from "@/hooks/useAuth";
import useProperties from "@/hooks/useProperties";
import { ColumnDef } from "@tanstack/react-table";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { Badge } from "@/components/ui/Badge";
import { StarIcon, Edit, Trash2, Eye } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";

// Utility function to format price
const formatPrice = (price: number) => {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  }).format(price);
};

// Utility function to render star rating
const StarRating = ({ rating }: { rating: number }) => {
  return (
    <div className="flex items-center space-x-1">
      <StarIcon size={16} className="fill-yellow-400 text-yellow-400" />
      <span>{rating?.toFixed(1) || "N/A"}</span>
    </div>
  );
};

// Property type badge component
const PropertyTypeBadge = ({ type }: { type: string }) => {
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
const AvailableBadge = ({ available }: { available: boolean }) => {
  return available ? (
    <Badge className="bg-green-100 text-green-800 font-medium">Available</Badge>
  ) : (
    <Badge className="bg-red-100 text-red-800 font-medium">Unavailable</Badge>
  );
};

// View Property Modal Component
const ViewPropertyModal = ({ property }: { property: Property }) => {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
          <Eye size={16} className="text-gray-600" />
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-lg">
        <DialogHeader>
          <DialogTitle>{property.title}</DialogTitle>
          <DialogDescription>{property.location}</DialogDescription>
        </DialogHeader>

        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label className="text-sm text-gray-500">Price</Label>
              <div className="text-lg font-semibold">
                {formatPrice(property.price)}
              </div>
            </div>
            <div>
              <Label className="text-sm text-gray-500">Status</Label>
              <div>
                <AvailableBadge available={property.available} />
              </div>
            </div>
          </div>

          <div className="grid grid-cols-3 gap-4">
            <div>
              <Label className="text-sm text-gray-500">Type</Label>
              <div>
                <PropertyTypeBadge type={property.type} />
              </div>
            </div>
            <div>
              <Label className="text-sm text-gray-500">Bedrooms</Label>
              <div>{property.bedrooms}</div>
            </div>
            <div>
              <Label className="text-sm text-gray-500">Bathrooms</Label>
              <div>{property.bathrooms}</div>
            </div>
          </div>

          <div>
            <Label className="text-sm text-gray-500">Area</Label>
            <div>{property.area} sq ft</div>
          </div>

          <div>
            <Label className="text-sm text-gray-500">Rating</Label>
            <div className="flex items-center space-x-2">
              <StarRating rating={property.rating} />
              <span>({property.reviewCount || 0} reviews)</span>
            </div>
          </div>

          <div>
            <Label className="text-sm text-gray-500">Amenities</Label>
            <div className="flex flex-wrap gap-2 mt-1">
              {property.amenities.map((amenity, index) => (
                <Badge key={index} variant="outline" className="bg-gray-50">
                  {amenity}
                </Badge>
              ))}
            </div>
          </div>

          <div>
            <Label className="text-sm text-gray-500">Description</Label>
            <div className="text-sm mt-1">{property.description}</div>
          </div>
        </div>

        <DialogFooter>
          <Button variant="outline">Close</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

// Edit Property Modal Component
const EditPropertyModal = ({
  property,
  onSave,
}: {
  property: Property;
  onSave: (updatedProperty: Property) => void;
}) => {
  const [formData, setFormData] = useState<Property>({ ...property });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]:
        name === "price" ||
        name === "bedrooms" ||
        name === "bathrooms" ||
        name === "area" ||
        name === "reviewCount"
          ? Number(value)
          : value,
    }));
  };

  const handleTypeChange = (value: string) => {
    setFormData((prev) => ({ ...prev, type: value }));
  };

  const handleAvailabilityChange = (checked: boolean) => {
    setFormData((prev) => ({ ...prev, available: checked }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(formData);
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
          <Edit size={16} className="text-blue-600" />
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-lg">
        <DialogHeader>
          <DialogTitle>Edit Property</DialogTitle>
          <DialogDescription>
            Make changes to the property details.
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit}>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-1 gap-4">
              <div>
                <Label htmlFor="title">Property Name</Label>
                <Input
                  id="title"
                  name="title"
                  value={formData.title}
                  onChange={handleChange}
                  className="mt-1"
                />
              </div>

              <div>
                <Label htmlFor="location">Location</Label>
                <Input
                  id="location"
                  name="location"
                  value={formData.location}
                  onChange={handleChange}
                  className="mt-1"
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="price">Price ($)</Label>
                <Input
                  id="price"
                  name="price"
                  type="number"
                  value={formData.price}
                  onChange={handleChange}
                  className="mt-1"
                />
              </div>

              <div>
                <Label htmlFor="type">Type</Label>
                <Select value={formData.type} onValueChange={handleTypeChange}>
                  <SelectTrigger className="mt-1">
                    <SelectValue placeholder="Select type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="APARTMENT">Apartment</SelectItem>
                    <SelectItem value="HOUSE">House</SelectItem>
                    <SelectItem value="CONDO">Condo</SelectItem>
                    <SelectItem value="VILLA">Villa</SelectItem>
                    <SelectItem value="STUDIO">Studio</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="grid grid-cols-3 gap-4">
              <div>
                <Label htmlFor="bedrooms">Bedrooms</Label>
                <Input
                  id="bedrooms"
                  name="bedrooms"
                  type="number"
                  value={formData.bedrooms}
                  onChange={handleChange}
                  className="mt-1"
                />
              </div>

              <div>
                <Label htmlFor="bathrooms">Bathrooms</Label>
                <Input
                  id="bathrooms"
                  name="bathrooms"
                  type="number"
                  value={formData.bathrooms}
                  onChange={handleChange}
                  className="mt-1"
                />
              </div>

              <div>
                <Label htmlFor="area">Area (sq ft)</Label>
                <Input
                  id="area"
                  name="area"
                  type="number"
                  value={formData.area || ""}
                  onChange={handleChange}
                  className="mt-1"
                />
              </div>
            </div>

            <div>
              <Label htmlFor="description">Description</Label>
              <Textarea
                id="description"
                name="description"
                value={formData.description}
                onChange={handleChange}
                className="mt-1"
                rows={3}
              />
            </div>

            <div className="flex items-center space-x-2">
              <Checkbox
                id="available"
                checked={formData.available}
                onCheckedChange={handleAvailabilityChange}
              />
              <Label htmlFor="available">Available for rent</Label>
            </div>
          </div>

          <DialogFooter>
            <Button type="submit" className="bg-blue-600 hover:bg-blue-700">
              Save Changes
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

// Delete Property Confirmation Component
const DeletePropertyDialog = ({
  property,
  onDelete,
}: {
  property: Property;
  onDelete: (id: string) => void;
}) => {
  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
          <Trash2 size={16} className="text-red-600" />
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Delete Property</AlertDialogTitle>
          <AlertDialogDescription>
            Are you sure you want to delete "{property.title}"? This action
            cannot be undone.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction
            className="bg-red-600 hover:bg-red-700"
            onClick={() => onDelete(property.id)}
          >
            Delete
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};
export const propertyColumns: ColumnDef<Property>[] = [
  {
    accessorKey: "title",
    header: "Property",
    cell: ({ row }) => (
      <div className="flex flex-col">
        <span className="font-medium text-gray-900">
          {row.getValue("title")}
        </span>
        <span className="text-xs text-gray-500">{row.original.location}</span>
      </div>
    ),
  },
  {
    accessorKey: "type",
    header: "Type",
    cell: ({ row }) => <PropertyTypeBadge type={row.getValue("type")} />,
  },
  {
    accessorKey: "price",
    header: "Price",
    cell: ({ row }) => (
      <div className="font-semibold text-gray-900">
        {formatPrice(row.getValue("price"))}
      </div>
    ),
  },
  {
    accessorKey: "details",
    header: "Details",
    cell: ({ row }) => (
      <div className="flex items-center space-x-2 text-sm text-gray-600">
        <span>{row.original.bedrooms} beds</span>
        <span>•</span>
        <span>{row.original.bathrooms} baths</span>
        <span>•</span>
        <span>{row.original.area || "N/A"} sq ft</span>
      </div>
    ),
  },
  {
    accessorKey: "rating",
    header: "Rating",
    cell: ({ row }) => (
      <div className="flex items-center space-x-1">
        <StarRating rating={row.original.rating} />
        <span className="text-xs text-gray-500">
          ({row.original.reviewCount || 0})
        </span>
      </div>
    ),
  },
  {
    accessorKey: "available",
    header: "Status",
    cell: ({ row }) => <AvailableBadge available={row.getValue("available")} />,
  },
  {
    id: "actions",
    header: "Actions",
    cell: ({ row }) => (
      <div className="flex items-center space-x-2">
        <ViewPropertyModal property={row.original} />
        {/* <EditPropertyModal 
          property={row.original} 
          onSave={handleUpdateProperty} 
        />
        <DeletePropertyDialog 
          property={row.original} 
          onDelete={handleDeleteProperty} 
        /> */}
      </div>
    ),
  },
];

export default function Properties() {
  const { properties, isLoading, updateProperty, deleteProperty } =
    useProperties();
  const { user } = useAuth();
  const navigate = useNavigate();
  const [stats, setStats] = useState({
    total: 0,
    available: 0,
    unavailable: 0,
    averagePrice: 0,
  });

  useEffect(() => {
    if (!user) return;
    if (user.role !== "HOST") {
      navigate("/dashboard");
    }
  }, [user, navigate]);

  useEffect(() => {
    if (properties && properties.length > 0) {
      const available = properties.filter((p) => p.available).length;
      const totalPrice = properties.reduce((acc, p) => acc + p.price, 0);

      setStats({
        total: properties.length,
        available,
        unavailable: properties.length - available,
        averagePrice: totalPrice / properties.length,
      });
    }
  }, [properties]);

  // const handleUpdateProperty = (updatedProperty: Property) => {
  //   // updateProperty(updatedProperty);
  //   return "Hello world";
  // };

  const handleDeleteProperty = (propertyId: string) => {
    deleteProperty(propertyId);
  };

  // Dynamic columns definition with action buttons

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-64">
        Loading properties...
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">My Properties</h1>
          <p className="text-gray-500">Manage your real estate portfolio</p>
        </div>
        <div>
          <CreatePropertyModal />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-500">
              Total Properties
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.total}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-500">
              Available
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">
              {stats.available}
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-500">
              Unavailable
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-red-600">
              {stats.unavailable}
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-500">
              Average Price
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {formatPrice(stats.averagePrice)}
            </div>
          </CardContent>
        </Card>
      </div>

      <DataTable
        data={properties ?? []}
        columns={propertyColumns}
        filterPlaceholder="Search properties by name, location..."
        addNewComponent={null}
      />
    </div>
  );
}
