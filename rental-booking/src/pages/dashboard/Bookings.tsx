import { useState, useEffect } from "react";
import { DataTable } from "@/components/table/PaginatedTable";
import useBooking from "@/hooks/useBooking";
import { ColumnDef } from "@tanstack/react-table";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/button";
import { CalendarIcon, MoreHorizontal, CheckCircle, XCircle } from "lucide-react";
import ConfirmModal from "@/components/modal/ConfirmModal";

import { Booking } from "@/lib/data";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

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

export default function Bookings() {
  const { bookings, isLoading, confirmBooking, cancelBooking } = useBooking();
  const [activeFilter, setActiveFilter] = useState<string | null>(null);
  const [filteredBookings, setFilteredBookings] = useState<Booking[]>([]);
  
  // Apply filtering when bookings data changes or filter changes
  useEffect(() => {
    if (!bookings) {
      setFilteredBookings([]);
      return;
    }
    
    if (!activeFilter) {
      setFilteredBookings(bookings);
    } else {
      const filtered = bookings.filter(booking => 
        booking.status.toLowerCase() === activeFilter.toLowerCase()
      );
      setFilteredBookings(filtered);
    }
  }, [bookings, activeFilter]);

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
      enableHiding: false,
      cell: ({ row }) => {
        const booking = row.original;
        const isPending = booking.status === "PENDING";
        const isConfirmed = booking.status === "CONFIRMED";
        const isCancelled = booking.status === "CANCELLED";
        
        return (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="h-8 w-8 p-0">
                <span className="sr-only">Open menu</span>
                <MoreHorizontal />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>Actions</DropdownMenuLabel>
              
              {isPending && (
                <ConfirmModal
                  title="Confirm Booking"
                  description={`Are you sure you want to confirm booking for "${booking.property.title}"?`}
                  actionLabel="Confirm"
                  actionButtonVariant="default"
                  actionButtonColor="bg-green-600 hover:bg-green-700"
                  onAction={() => confirmBooking(booking.id)}
                  trigger={
                    <DropdownMenuItem onSelect={(e) => e.preventDefault()}>
                      <div className="flex items-center">
                        <CheckCircle size={16} className="mr-2 text-green-600" />
                        Confirm Booking
                      </div>
                    </DropdownMenuItem>
                  }
                />
              )}
              
              {(isPending || isConfirmed) && (
                <ConfirmModal
                  title="Cancel Booking"
                  description={`Are you sure you want to cancel booking for "${booking.property.title}"? This action cannot be undone.`}
                  actionLabel="Cancel Booking"
                  actionButtonVariant="destructive"
                  onAction={() => cancelBooking(booking.id)}
                  trigger={
                    <DropdownMenuItem onSelect={(e) => e.preventDefault()}>
                      <div className="flex items-center">
                        <XCircle size={16} className="mr-2 text-red-600" />
                        Cancel Booking
                      </div>
                    </DropdownMenuItem>
                  }
                />
              )}
              
              {isCancelled && (
                <DropdownMenuItem disabled>No actions available</DropdownMenuItem>
              )}
            </DropdownMenuContent>
          </DropdownMenu>
        );
      },
    }
  ];

  const FilterTabs = () => (
    <div className="flex flex-wrap gap-2 mb-4">
      {["all", "pending", "confirmed", "cancelled"].map((status) => (
        <Button
          key={status}
          variant={activeFilter === status || (status === "all" && activeFilter === null) ? "default" : "outline"}
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
      </div>
      
      <FilterTabs />
      
      {isLoading ? (
        <div className="flex justify-center p-8">Loading bookings...</div>
      ) : (
        <DataTable 
          data={filteredBookings} 
          columns={bookingColumns} 
          filterPlaceholder="Search bookings..." 
        />
      )}
    </div>
  );
}