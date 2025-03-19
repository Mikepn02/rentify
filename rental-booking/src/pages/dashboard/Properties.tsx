import CreatePropertyModal from "@/components/modal/CreatePropertyModal";
import { DataTable } from "@/components/table/PaginatedTable";
import { ColumnDef } from "@tanstack/react-table";

type Property = {
  id: string;
  name: string;
  location: string;
  price: number;
  rating?: number;
  reviewCount?: number;
  type: string;
  bedrooms: number;
  bathrooms: number;
  area?: number;
  description: string;
  amenities: string[];
  images?: string[];
  available: boolean;
};

export const propertyData: Property[] = [
  { id: "p1", name: "Luxury Villa", location: "New York", price: 500, type: "Villa", bedrooms: 4, bathrooms: 3, description: "A luxury villa in New York", amenities: ["Pool", "Garage"], available: true },
  { id: "p2", name: "Beach House", location: "California", price: 700, type: "House", bedrooms: 3, bathrooms: 2, description: "A beachfront house in California", amenities: ["Beach Access", "Garden"], available: true },
];

export const propertyColumns: ColumnDef<Property>[] = [
  {
    accessorKey: "name",
    header: "Property Name",
    cell: ({ row }) => <div className="capitalize">{row.getValue("name")}</div>,
  },
  {
    accessorKey: "location",
    header: "Location",
    cell: ({ row }) => <div>{row.getValue("location")}</div>,
  },
  {
    accessorKey: "price",
    header: "Price ($)",
    cell: ({ row }) => <div className="font-bold">{row.getValue("price")}</div>,
  },
  {
    accessorKey: "rating",
    header: "Rating",
    cell: ({ row }) => <div>{row.getValue("rating") ?? "N/A"}</div>,
  },
  {
    accessorKey: "reviewCount",
    header: "Review Count",
    cell: ({ row }) => <div>{row.getValue("reviewCount") ?? 0}</div>,
  },
  {
    accessorKey: "type",
    header: "Type",
    cell: ({ row }) => <div>{row.getValue("type")}</div>,
  },
  {
    accessorKey: "bedrooms",
    header: "Bedrooms",
    cell: ({ row }) => <div>{row.getValue("bedrooms")}</div>,
  },
  {
    accessorKey: "bathrooms",
    header: "Bathrooms",
    cell: ({ row }) => <div>{row.getValue("bathrooms")}</div>,
  },
  {
    accessorKey: "area",
    header: "Area (sq ft)",
    cell: ({ row }) => <div>{row.getValue("area") ?? "N/A"}</div>,
  },
  {
    accessorKey: "description",
    header: "Description",
    cell: ({ row }) => <div>{row.getValue("description")}</div>,
  },
  {
    accessorKey: "amenities",
    header: "Amenities",
    cell: ({ row }) => {
      const amenities = row.getValue("amenities") as string[];
      return <div>{amenities.join(", ")}</div>;
    },
  },
  {
    accessorKey: "available",
    header: "Available",
    cell: ({ row }) => <div>{row.getValue("available") ? "Yes" : "No"}</div>,
  },
];

export default function Properties() {
  return <DataTable data={propertyData} columns={propertyColumns} filterPlaceholder="Filter properties..." addNewComponent={<CreatePropertyModal />} />;
}
