import { z } from "zod";
import { User } from "../types";

export const userSchema = z.object({
  firstName: z.string().min(3),
  lastName: z.string().min(3),
  email: z.string().email(),
  password: z
    .string()
    .min(8, "Password should be atleast 8 characters")
    .regex(
      /[!@#$%^&*(),.?":{}|<>]/,
      "Password must contain at least one special character"
    ),
  phoneNumber: z
    .string()
    .min(10, "Phone Number should be at least 10 characters")
    .regex(/^(?:\+2507|07)\d{8}$/, "Invalid Rwandan phone number"),

  role: z.enum(["HOST", "RENTER"]).default("HOST"),
})



export const propertySchema = z.object({
  title: z.string().min(3, "Title should be at least 3 characters long"),
  description: z.string().min(10, "Description should be at least 10 characters long"),
  hostId: z.string().uuid("Invalid host ID"),
  price: z.number().positive("Price must be a positive number"),
  rating: z.number().min(0).max(5).default(0),
  reviewCount: z.number().int().min(0).default(0),
  type: z.string().min(3, "Property type must be at least 3 characters long"),
  bedrooms: z.number().int().positive("Bedrooms must be a positive integer"),
  bathrooms: z.number().int().positive("Bathrooms must be a positive integer"),
  area: z.number().positive("Area must be a positive number"),
  location: z.string().min(5, "Location should be at least 5 characters long"),
  amenities: z.array(z.string()).nonempty("Amenities cannot be empty"),
  images: z.array(z.string().url()).nonempty("At least one image is required"),
  available: z.boolean().default(true),
});


export const bookingSchema = z.object({
  propertyId: z.string().uuid("Invalid property ID"),
  checkInDate: z.preprocess(
    (arg) => (typeof arg === "string" || arg instanceof Date ? new Date(arg) : arg),
    z.date().refine((date) => date > new Date(), "Check-in date must be in the future")
  ),
  checkoutDate: z.preprocess(
    (arg) => (typeof arg === "string" || arg instanceof Date ? new Date(arg) : arg),
    z.date().refine((date) => date > new Date(), "Checkout date must be after check-in")
  ),
  guests: z.number().int().positive("Number of guests must be at least 1"),
  totalAmount: z.number().positive("Total amount must be greater than 0"),
  cardNumber: z
    .string()
    .regex(/^\d{16}$/, "Card number must be 16 digits"),
  expiryDate: z
    .string()
    .regex(/^(0[1-9]|1[0-2])\/\d{2}$/, "Expiry date must be in MM/YY format"),
  cvc: z.string().regex(/^\d{3,4}$/, "CVC must be 3 or 4 digits"),
});


export const validateUser = (data: User) => {
  const user = userSchema.safeParse(data);
  if (!user.success) {
    throw new Error(user.error.errors[0].message);
  }
  return user.data;
};


export const validateProperty = (data: any) => {
  const property = propertySchema.safeParse(data);

  if(!property.success) {
    throw new Error(property.error.errors[0].message)
  }
  return property.data;
}

export const validateBooking = (data: any) => {
  const booking = bookingSchema.safeParse(data);
  if (!booking.success) {
    throw new Error(booking.error.errors[0].message);
  }
  return booking.data;
};