import { z } from "zod";
import { User } from "../types";



export const userSchema  = z.object({
     firstName: z.string().min(3),
     lastName: z.string().min(3),
     email: z.string().email(),
     password: z.string().min(8, "Password should be atleast 8 characters").regex(/[!@#$%^&*(),.?":{}|<>]/, "Password must contain at least one special character"),
     role: z.enum(["HOST", "RENTER"]).default("HOST"),
})

export const validateUser = (data: User) => {
   const user =  userSchema.safeParse(data);
   if(!user.success){
     throw new Error(user.error.errors[0].message)
   }

   return user.data;
}