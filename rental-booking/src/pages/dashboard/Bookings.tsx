import { DataTable } from "@/components/table/PaginatedTable";
import { ColumnDef } from "@tanstack/react-table";

type Booking = {
  id: string;
  customer: string;
  checkIn: string;
  checkOut: string;
  status: "pending" | "confirmed" | "cancelled";
};

const bookingData: Booking[] = [
  { id: "b1", customer: "Alice Johnson", checkIn: "2024-03-10", checkOut: "2024-03-15", status: "confirmed" },
  { id: "b2", customer: "Bob Smith", checkIn: "2024-04-01", checkOut: "2024-04-05", status: "pending" },
];

const bookingColumns: ColumnDef<Booking>[] = [
  {
    accessorKey: "customer",
    header: "Customer",
    cell: ({ row }) => <div className="capitalize">{row.getValue("customer")}</div>,
  },
  {
    accessorKey: "checkIn",
    header: "Check-in",
    cell: ({ row }) => <div>{row.getValue("checkIn")}</div>,
  },
  {
    accessorKey: "checkOut",
    header: "Check-out",
    cell: ({ row }) => <div>{row.getValue("checkOut")}</div>,
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => <div className="capitalize">{row.getValue("status")}</div>,
  },
];

export default function Bookings() {
  return <DataTable data={bookingData} columns={bookingColumns} filterPlaceholder="Filter bookings..." />;
}
