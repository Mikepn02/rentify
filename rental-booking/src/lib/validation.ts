import { z } from "zod";




export const PropertyFormValidation = z.object({
    id: z.string().uuid(),
    title: z.string().min(3, "Title must be at least 3 characters long"),
    location: z.string().min(3, "Location must be at least 3 characters long"),
    price: z.number().min(0, "Price must be a positive number"),
    rating: z.number().min(0).max(5, "Rating must be between 0 and 5"),
    reviewCount: z.number().min(0, "Review count cannot be negative"),
    type: z.string().min(3, "Type must be at least 3 characters long"),
    bedrooms: z.number().min(1, "Must have at least 1 bedroom"),
    bathrooms: z.number().min(1, "Must have at least 1 bathroom"),
    area: z.number().min(1, "Area must be greater than 0"),
    description: z.string().min(10, "Description must be at least 10 characters long"),
    amenities: z.array(z.string()).nonempty("At least one amenity is required"),
    images: z.array(z.string().url()).nonempty("At least one image URL is required"),
    available: z.boolean(),
  });