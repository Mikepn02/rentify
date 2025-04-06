import { Property } from "@/@types/types";
import CreatePropertyModal from "@/components/modal/CreatePropertyModal";
import { DataTable } from "@/components/table/PaginatedTable";
import useProperties from "@/hooks/useProperties";
import { ColumnDef } from "@tanstack/react-table";



export const propertyColumns: ColumnDef<Property>[] = [
  {
    accessorKey: "title",
    header: "Property Name",
    cell: ({ row }) => <div className="capitalize">{row.getValue("title")}</div>,
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
  const { properties } = useProperties();
  console.log(properties);
  return <DataTable data={properties ?? []} columns={propertyColumns} filterPlaceholder="Filter properties..." addNewComponent={<CreatePropertyModal />} />;
}
