/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import axios from "@/lib/axios.config";
import { Booking, BookingStatus } from "@/lib/data";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import useSWR from "swr";
import { useToast } from "./use-toast";
import useAuth from "./useAuth";
import { notifications } from "@mantine/notifications";

export default function useBooking() {
  const navigate = useNavigate();
  const { toast } = useToast();
  const { user } = useAuth();

  const [bookingProperty, setBookingProperty] = useState(false);
  const [deletingBooking, setDeletingBooking] = useState(false);
  const [updatingBooking, setUpdateBooking] = useState(false);

  const bookingKey = user
    ? user.role === "RENTER"
      ? "/booking"
      : "/booking/host"
    : null;

  const {
    data: bookings,
    isLoading,
    error,
    mutate,
  } = useSWR<Booking[]>(bookingKey, async (url: string) => {
    const { data } = await axios.get(url);
    console.log("Bookings data: ", data);
    return data.bookings;
  });

  useEffect(() => {
    if (user) mutate();
  }, [user, mutate]);

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
    const booking = bookings.filter(
      (booking) => booking.propertyId === propertyId
    );
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

  const createBooking = async (
    booking: Omit<Booking, "id" | "renter" | "property" | "status">
  ) => {
    setBookingProperty(true);
    try {
      const { data } = await axios.post("/booking/create", booking);
      if (data.success) {
        notifications.show({
          title: "Success",
          message: "Booking created successfully",
          color: "green",
        });
        mutate([...(bookings || []), data.booking]);
        navigate("/properties");
      } else {
        notifications.show({
          message: "something went wrong",
          color: "red",
        });
      }
    } catch (error: any) {
      console.error(error);
      notifications.show({
              title: "Error",
              message: error.response?.data?.message ?? "An error occured",
              color: "red",
            });
    } finally {
      setBookingProperty(false);
    }
  };

  const getBookingByRenter = (renterId: string): Booking[] => {
    if (!bookings) return [];
    const booking = bookings?.filter(
      (booking) => booking.renterId === renterId
    );
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

  const getBookingsByStatus = async (status: BookingStatus) => {
    try {
      const { data } = await axios.get(`/booking/status/${status}`);
      return data.bookings as Booking[];
    } catch (error) {
      console.error("Error fetching bookings by status", error);
      toast({
        title: "Error",
        description: "Could not fetch bookings by status.",
        open: true,
        onOpenChange: () => {},
      });
      return [];
    }
  };

  const getBookingsByHost = async () => {
    try {
      const { data } = await axios.get("/booking/host");
      if (data.success) {
        return data.bookings;
      }
    } catch (error) {
      console.error("Error fetching host bookings", error);
      toast({
        title: "Error",
        description: "Could not fetch host bookings.",
        open: true,
        onOpenChange: () => {},
      });
      return [];
    }
  };

  const confirmBooking = async (id: string) => {
    try {
      const { data } = await axios.patch(`/booking/${id}/confirm`);
      if (data.success) {
        notifications.show({
          title: "Success",
          message: "Booking confirmed successfully",
          color: "green",
        });
        mutate();
      }
    } catch (error) {
      console.error("Error confirming booking", error);
      toast({
        title: "Error",
        description: "Could not confirm booking.",
        open: true,
        onOpenChange: () => {},
      });
    }
  };

  const cancelBooking = async (id: string) => {
    try {
      const { data } = await axios.patch(`/booking/${id}/cancel`);
      if (data.success) {
        notifications.show({
          title: "Success",
          message: "Booking cancelled successfully",
          color: "green",
        });
        mutate();
      }
    } catch (error) {
      console.error("Error cancelling booking", error);
      toast({
        title: "Error",
        description: "Could not cancel booking.",
        open: true,
        onOpenChange: () => {},
      });
    }
  };

  const checkAvailability = async (
    propertyId: string,
    checkInDate: string,
    checkoutDate: string
  ) => {
    try {
      const { data } = await axios.post("/booking/check-availability", {
        propertyId,
        checkInDate,
        checkoutDate,
      });
      return data.available as boolean;
    } catch (error) {
      console.error("Error checking availability", error);
      toast({
        title: "Error",
        description: "Could not check availability.",
        open: true,
        onOpenChange: () => {},
      });
      return false;
    }
  };
  const updateBooking = async (
    id: string,
    updatedData: Partial<Omit<Booking, "id">>
  ) => {
    setUpdateBooking(true);
    try {
      const { data } = await axios.patch(`/booking/${id}`, updatedData);

      if (data.success) {
        toast({
          title: "Booking created",
          description: "Your booking was successful.",
          open: true,
          onOpenChange: () => {},
        });
      } else {
        toast({
          title: "Error",
          description: "An error occurred while updating the booking.",
          open: true,
          onOpenChange: () => {},
        });
      }
    } catch (error) {
      console.error(error);
      toast({
        title: "Error",
        description: "An error occurred while updating the booking.",
        open: true,
        onOpenChange: () => {},
      });
    }
  };

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
    getBookingsByStatus,
    checkAvailability,
    confirmBooking,
    cancelBooking,
    getBookingsByHost,
    bookingProperty,
    deletingBooking,
    updatingBooking,
    setBookingProperty,
    setDeletingBooking,
    setUpdateBooking,
  };
}
