import { useState } from "react";
import { DataTable } from "@/components/table/PaginatedTable";
import useBooking from "@/hooks/useBooking";
import { ColumnDef } from "@tanstack/react-table";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/button";
import { CalendarIcon} from "lucide-react";

import { Booking } from "@/lib/data";

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
    accessorFn: (row) => row.property.title,
    id: "propertyName",
    header: "Property",
    cell: ({ row }) => (
      <div className="font-medium text-gray-900">
        {row.original.property.title}
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
    header: () => <div className="text-center">Guests</div>,
    cell: ({ row }) => (
      <div className="text-center font-medium">{row.getValue("guests")}</div>
    ),
  },
  {
    accessorKey: "totalAmount",
    header: () => <div className="text-right">Amount</div>,
    cell: ({ row }) => {
      const amount = parseFloat(row.getValue("totalAmount"));
      const formatted = new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
      }).format(amount);
      
      return <div className="text-right font-medium">{formatted}</div>;
    },
  },
  {
    accessorKey: "status",
    header: () => <div className="text-center">Status</div>,
    cell: ({ row }) => (
      <div className="flex justify-center items-center">
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
  const { bookings } = useBooking();
  const [activeFilter, setActiveFilter] = useState<string | null>(null);
  


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

  console.log("Here are the booking: ", bookings)

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <h1 className="text-2xl font-bold tracking-tight">Bookings</h1>
      </div>
      
      <FilterTabs />
      
      <DataTable 
        data={bookings ?? []} 
        columns={bookingColumns} 
        filterPlaceholder="Search bookings..." 
        
      />
    </div>
  );
}