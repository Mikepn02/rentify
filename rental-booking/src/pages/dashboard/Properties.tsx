import CreatePropertyModal from "@/components/modal/CreatePropertyModal";
import { DataTable } from "@/components/table/PaginatedTable";
import { ColumnDef } from "@tanstack/react-table";

type Property = {
  id: string;
  name: string;
  location: string;
  price: number;
};

export const propertyData: Property[] = [
  { id: "p1", name: "Luxury Villa", location: "New York", price: 500 },
  { id: "p2", name: "Beach House", location: "California", price: 700 },
];
// export const columns: ColumnDef<Payment>[]
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
];

export default function Properties() {
  return <DataTable data={propertyData} columns={propertyColumns} filterPlaceholder="Filter properties..." addNewComponent={<CreatePropertyModal />} />;
}
