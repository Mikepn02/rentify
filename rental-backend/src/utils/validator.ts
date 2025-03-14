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
});

export const validateUser = (data: User) => {
  const user = userSchema.safeParse(data);
  if (!user.success) {
    throw new Error(user.error.errors[0].message);
  }

  return user.data;
};
