import { DataTable } from "@/components/table/PaginatedTable";
import useBooking from "@/hooks/useBooking";
import { ColumnDef } from "@tanstack/react-table";

type Booking = {
  id: string;
  firstName: string;
  lastName: string;
  checkInDate: string;
  checkoutDate: string;
  status: "pending" | "confirmed" | "cancelled";
};

const bookingColumns: ColumnDef<Booking>[] = [
  {
    accessorKey: "propertyId",
    header: "Property",
    cell: ({ row }) => (
      <div className="capitalize">
        {row.getValue("propertyId")}
      </div>
    ),
  },
  {
    accessorKey: "checkInDate",
    header: "Check-in",
    cell: ({ row }) => (
      <div>{new Date(row.getValue("checkInDate")).toLocaleDateString()}</div>
    ),
  },
  {
    accessorKey: "checkoutDate",
    header: "Check-out",
    cell: ({ row }) => (
      <div>{new Date(row.getValue("checkoutDate")).toLocaleDateString()}</div>
    ),
  },
  {
    accessorKey: "guests",
    header: "Guests",
    cell: ({ row }) => (
      <div className="font-bold">{row.getValue("guests")}</div>
    ),
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => <div className="capitalize">{row.getValue("status")}</div>,
  },
];

export default function Bookings() {
  const { bookings } = useBooking();

  // If no bookings are available, display a loading message
  if (!bookings) {
    return <div>Loading bookings...</div>;
  }

  return (
    <DataTable
      data={bookings}
      columns={bookingColumns}
      filterPlaceholder="Filter bookings..."
    />
  );
}
