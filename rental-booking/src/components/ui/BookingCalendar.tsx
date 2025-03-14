
import { useState, useEffect } from 'react';
import { Calendar as CalendarIcon } from 'lucide-react';
import { format } from 'date-fns';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { Booking } from '@/lib/data';
import { DateRange } from 'react-day-picker';

interface BookingCalendarProps {
  bookings?: Booking[];
  onDateSelect: (startDate: Date | undefined, endDate: Date | undefined) => void;
}

const BookingCalendar = ({ bookings = [], onDateSelect }: BookingCalendarProps) => {
  const [date, setDate] = useState<DateRange>({
    from: undefined,
    to: undefined,
  });

  // Determine which dates are unavailable due to existing bookings
  const disabledDates = () => {
    const disabledDays: Date[] = [];
    bookings.forEach(booking => {
      if (booking.status === 'confirmed') {
        const start = new Date(booking.startDate);
        const end = new Date(booking.endDate);
        const days = Math.ceil((end.getTime() - start.getTime()) / (1000 * 60 * 60 * 24));
        
        for (let i = 0; i <= days; i++) {
          const date = new Date(start);
          date.setDate(date.getDate() + i);
          disabledDays.push(date);
        }
      }
    });
    return disabledDays;
  };

  useEffect(() => {
    onDateSelect(date.from, date.to);
  }, [date, onDateSelect]);

  return (
    <div className="grid gap-2">
      <Popover>
        <PopoverTrigger asChild>
          <Button
            id="date"
            variant="outline"
            className={cn(
              "justify-start text-left font-normal",
              !date.from && "text-muted-foreground"
            )}
          >
            <CalendarIcon className="mr-2 h-4 w-4" />
            {date.from ? (
              date.to ? (
                <>
                  {format(date.from, "LLL dd, y")} - {format(date.to, "LLL dd, y")}
                </>
              ) : (
                format(date.from, "LLL dd, y")
              )
            ) : (
              <span>Select dates</span>
            )}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0" align="start">
          <Calendar
            initialFocus
            mode="range"
            defaultMonth={date.from || new Date()}
            selected={date}
            onSelect={setDate}
            numberOfMonths={2}
            disabled={(date) => 
              date < new Date(new Date().setHours(0, 0, 0, 0)) ||
              disabledDates().some(
                disabledDate => 
                  disabledDate.getDate() === date.getDate() &&
                  disabledDate.getMonth() === date.getMonth() &&
                  disabledDate.getFullYear() === date.getFullYear()
              )
            }
          />
        </PopoverContent>
      </Popover>
    </div>
  );
};

export default BookingCalendar;
