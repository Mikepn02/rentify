import { Property } from "@/@types/types";
import PropertyModal from "@/components/modal/CreatePropertyModal";
import { DataTable } from "@/components/table/PaginatedTable";
import useAuth from "@/hooks/useAuth";
import useProperties from "@/hooks/useProperties";
import { ColumnDef } from "@tanstack/react-table";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import ViewPropertyModal from "@/components/modal/ViewPropertyModal";
import {
  AvailableBadge,
  formatPrice,
  PropertyTypeBadge,
  StarRating,
} from "@/lib/helpers";
import ConfirmModal from "@/components/modal/ConfirmModal";
import { Trash2, Eye, Edit } from "lucide-react";
import { Button } from "@/components/ui/button";

export const propertyColumns = (
  handleDeleteProperty?: (id: string) => void,
  onPropertyUpdated?: () => void
): ColumnDef<Property>[] => [
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
    cell: ({ row }) => {
      const property = row.original;

      return (
        <div className="flex items-center space-x-2">
          <div className="w-8 flex justify-center">
            <Button variant="ghost" size="sm" className="h-8 w-8 p-0" asChild>
              <div className="w-8 flex justify-center">
                <ViewPropertyModal property={row.original} />
              </div>
            </Button>
          </div>

          <div className="w-8 flex justify-center">
            <PropertyModal
              action="update"
              property={row.original}
              onSuccess={onPropertyUpdated}
            />
          </div>

          <div className="w-8 flex justify-center">
            <ConfirmModal
              title="Delete Property"
              description={`Are you sure you want to delete "${property.title}"? This action cannot be undone.`}
              actionLabel="Delete"
              actionButtonVariant="destructive"
              onAction={() =>
                handleDeleteProperty && handleDeleteProperty(property?.id)
              }
              trigger={
                <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                  <Trash2 size={16} className="text-red-600" />
                </Button>
              }
            />
          </div>
        </div>
      );
    },
  },
];

export default function Properties() {
  const { properties, isLoading, deleteProperty } =
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
    } else {
      // Reset stats if no properties
      setStats({
        total: 0,
        available: 0,
        unavailable: 0,
        averagePrice: 0,
      });
    }
  }, [properties]);

  const handleDeleteProperty = (propertyId: string) => {
    deleteProperty(propertyId);
  };

  const handlePropertyUpdated = () => {
    fetchProperties();
  };

  // Get the columns with the handlers passed in
  const columns = propertyColumns(handleDeleteProperty, handlePropertyUpdated);

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
          <PropertyModal action="create" onSuccess={handlePropertyUpdated} />
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
        columns={columns}
        filterPlaceholder="Search properties by name, location..."
        addNewComponent={null}
      />
    </div>
  );
}
