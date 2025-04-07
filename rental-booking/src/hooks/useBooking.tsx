import axios from "@/lib/axios.config";
import { Booking } from "@/lib/data";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import useSWR from "swr";
import { useToast } from "./use-toast";
import useAuth from "./useAuth";

export default function useBooking() {
  const navigate = useNavigate();
  const { toast } = useToast();
  const { user } = useAuth()

  const [bookingProperty, setBookingProperty] = useState(false);
  const [deletingBooking, setDeletingBooking] = useState(false);
  const [updatingBooking, setUpdateBooking] = useState(false);

  const {
    data: bookings,
    isLoading,
    error,
    mutate,
  } = useSWR<Booking[]>("/booking", async (url: string) => {
    if (!user){
        toast({
            title: "Something went wrong",
            description: "Login to Book a property",
            open: true,
            onOpenChange: () => {},
          });
        return;
    }
    const { data } = await axios.get(url);
    return data.bookings;
  });

  useEffect(() => {
    mutate();
  }, [user]);

  const getBookingById = (id: string) => {
    const booking = bookings?.find((b) => b.id === id);
    if (!booking) {
        toast({
            title: "Booking",
            description: "Your booking was successful.",
            open: true,
            onOpenChange: () => {},
          });
        navigate("/properties");
    }
    return booking;
  };

  const getBookingsByPropertyId = (propertyId: string): Booking[] => {
    if (!bookings) return [];  
    const booking = bookings.filter((booking) => booking.propertyId === propertyId);
    if (!booking) {
      toast({
        title: "Booking",
        description: "Your booking was successful.",
        open: true,
        onOpenChange: () => {},
      });
      navigate("/properties");
    }
    return booking;
  };

  const createBooking = async (booking: Omit<Booking, "id" | "renter" | "property">) => {
    setBookingProperty(true);
    try {
      const { data } = await axios.post("/booking/create", booking);
      if (data.success) {
        toast({
          title: "Booking created",
          description: "Your booking was successful.",
          open: true,
          onOpenChange: () => {},
        });
        mutate([...(bookings || []), data.booking]);
        navigate("/properties");
      } else {
        toast({
          title: "Something went wrong",
          description: "Could not create the booking.",
          open: true,
          onOpenChange: () => {},
        });
      }
    } catch (error) {
      console.error(error);
      toast({
        title: "Error",
        description: "An error occurred while creating the booking.",
        open: true,
        onOpenChange: () => {},
      });
    } finally {
      setBookingProperty(false);
    }
  };

  const getBookingByRenter = (renterId: string): Booking[] => {
    if(!bookings) return [];
      const booking = bookings?.filter((booking) => booking.renterId === renterId);
      if (!booking) {
          toast({
              title: "Booking",
              description: "Your booking was successful.",
              open: true,
              onOpenChange: () => {},
            });
          navigate("/properties");
      }
      return booking;
  }

  const updateBooking = async(id: string , updatedData: Partial<Omit<Booking , "id">>) => {
    setUpdateBooking(true);
    try{
        const { data } = await axios.patch(`/booking/${id}`, updatedData);

        if(data.success){
            toast({
                title: "Booking created",
                description: "Your booking was successful.",
                open: true,
                onOpenChange: () => {},
              });
        }else{
            toast({
                title: "Error",
                description: "An error occurred while updating the booking.",
                open: true,
                onOpenChange: () => {},
              });
        }
    }catch(error){
        console.error(error)
        toast({
            title: "Error",
            description: "An error occurred while updating the booking.",
            open: true,
            onOpenChange: () => {},
          });
    }
  }

  const deleteBooking = async (id: string) => {
    setDeletingBooking(true);
    try {
        const { data } = await axios.delete(`/bookings/${id}`);
        if (data.success) {
            toast({
                title: "Booking created",
                description: "Your booking was successful.",
                open: true,
                onOpenChange: () => {},
              });
            mutate((prev) => prev?.filter((b) => b.id !== id) || [], false);
            navigate("/dashboard/bookings");
        } else {
            toast({
                title: "Error",
                description: "An error occurred while deleting the booking.",
                open: true,
                onOpenChange: () => {},
              });
        }
    } catch (error) {
        console.error(error);
        toast({
            title: "Error",
            description: "An error occurred while deleting the booking.",
            open: true,
            onOpenChange: () => {},
          });
    } finally {
        setDeletingBooking(false);
    }
};

  return {
    bookings,
    isLoading,
    error,
    createBooking,
    updateBooking,
    getBookingById,
    deleteBooking,
    getBookingsByPropertyId,
    getBookingByRenter,
    bookingProperty,
    deletingBooking,
    updatingBooking,
    setBookingProperty,
    setDeletingBooking,
    setUpdateBooking,
  };
}
