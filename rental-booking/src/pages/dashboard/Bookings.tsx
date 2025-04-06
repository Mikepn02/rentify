import { useState } from "react";
import { DataTable } from "@/components/table/PaginatedTable";
import useBooking from "@/hooks/useBooking";
import { ColumnDef } from "@tanstack/react-table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { CalendarIcon, Filter, PlusCircle, Search } from "lucide-react";
import { Input } from "@/components/ui/input";

type Booking = {
  id: string;
  propertyId: string;
  propertyName: string;
  checkInDate: string;
  checkoutDate: string;
  guests: number;
  status: "pending" | "confirmed" | "cancelled";
  totalAmount: number;
};

const BookingStatusBadge = ({ status }: { status: string }) => {
  const statusStyles = {
    pending: "bg-yellow-100 text-yellow-800 border-yellow-200",
    confirmed: "bg-green-100 text-green-800 border-green-200",
    cancelled: "bg-red-100 text-red-800 border-red-200",
  };

  const style = statusStyles[status as keyof typeof statusStyles] || "bg-gray-100 text-gray-800";

  return (
    <Badge className={`px-2 py-1 text-xs font-medium capitalize ${style}`}>
      {status}
    </Badge>
  );
};

const bookingColumns: ColumnDef<Booking>[] = [
  {
    accessorKey: "propertyName",
    header: "Property",
    cell: ({ row }) => (
      <div className="font-medium text-gray-900">
        {row.getValue("propertyName")}
        <div className="text-xs text-gray-500">ID: {row.original.propertyId}</div>
      </div>
    ),
  },
  {
    accessorKey: "checkInDate",
    header: "Check-in",
    cell: ({ row }) => {
      const date = new Date(row.getValue("checkInDate"));
      return (
        <div className="flex items-center space-x-1">
          <CalendarIcon size={14} className="text-gray-400" />
          <span>{date.toLocaleDateString(undefined, { 
            month: 'short', 
            day: 'numeric', 
            year: 'numeric' 
          })}</span>
        </div>
      );
    },
  },
  {
    accessorKey: "checkoutDate",
    header: "Check-out",
    cell: ({ row }) => {
      const date = new Date(row.getValue("checkoutDate"));
      return (
        <div className="flex items-center space-x-1">
          <CalendarIcon size={14} className="text-gray-400" />
          <span>{date.toLocaleDateString(undefined, { 
            month: 'short', 
            day: 'numeric', 
            year: 'numeric' 
          })}</span>
        </div>
      );
    },
  },
  {
    accessorKey: "guests",
    header: "Guests",
    cell: ({ row }) => (
      <div className="font-medium text-center">{row.getValue("guests")}</div>
    ),
  },
  {
    accessorKey: "totalAmount",
    header: "Amount",
    cell: ({ row }) => {
      const amount = parseFloat(row.getValue("totalAmount"));
      const formatted = new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
      }).format(amount);
      
      return <div className="font-medium text-right">{formatted}</div>;
    },
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => (
      <div className="flex justify-center">
        <BookingStatusBadge status={row.getValue("status")} />
      </div>
    ),
  },
  {
    id: "actions",
    cell: () => (
      <div className="flex justify-end">
        <Button 
          variant="ghost" 
          size="sm" 
          className="h-8 w-8 p-0"
        >
          <span className="sr-only">Open menu</span>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="h-4 w-4"
          >
            <circle cx="12" cy="12" r="1" />
            <circle cx="19" cy="12" r="1" />
            <circle cx="5" cy="12" r="1" />
          </svg>
        </Button>
      </div>
    ),
  },
];

export default function Bookings() {
  const { bookings, isLoading } = useBooking();
  const [activeFilter, setActiveFilter] = useState<string | null>(null);
  
  const AddNewBookingButton = () => (
    <Button className="w-full md:w-auto flex items-center gap-1">
      <PlusCircle size={16} />
      <span>New Booking</span>
    </Button>
  );

  // Filter buttons for quick status filtering
  const FilterTabs = () => (
    <div className="flex flex-wrap gap-2 mb-4">
      {["all", "pending", "confirmed", "cancelled"].map((status) => (
        <Button
          key={status}
          variant={activeFilter === status ? "default" : "outline"}
          size="sm"
          onClick={() => setActiveFilter(status === "all" ? null : status)}
          className="text-xs capitalize"
        >
          {status}
        </Button>
      ))}
    </div>
  );

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <h1 className="text-2xl font-bold tracking-tight">Bookings</h1>
        <AddNewBookingButton />
      </div>
      
      <FilterTabs />
      
      <DataTable 
        data={bookings ?? []} 
        columns={bookingColumns} 
        filterPlaceholder="Search bookings..." 
        addNewComponent={
          <div className="hidden md:block">
            <AddNewBookingButton />
          </div>
        } 
      />
    </div>
  );
}