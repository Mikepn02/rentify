import AuthLayout from "@/components/layouts/AuthLayout";
import React from "react";
import { Link } from "react-router-dom";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

const icons = [
  {
    icon: "/icons/icons8-facebook.svg",
    alt: "Facebook",
  },
  {
    icon: "/icons/icons8-google.svg",
    alt: "Google",
  },
  {
    icon: "/icons/icons8-apple.svg",
    alt: "Apple",
  },
];

const formschema = z.object({
  firstName: z.string().min(2, "First Name must be atleast 2 characters"),
  lastName: z.string().min(2, "last name must be atleast 2 characters"),
  email: z.string().email("Invalid email address."),
  password: z.string().min(8, "Password must be atleast 8 characters"),
  confirmPassword: z.string().min(8, "Password must be atleast 8 characters"),
  phoneNumber: z.string().optional(),
});
const SignUp = () => {
  const form = useForm<z.infer<typeof formschema>>({
    resolver: zodResolver(formschema),
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      confirmPassword: "",
      phoneNumber: "",
    },
  });

  const onSubmit = (data: z.infer<typeof formschema>) => {
    console.log(data);
  };
  return (
    <AuthLayout>
      <div className="md:mx-auto max-w-3xl lg:w-[80%]">
        <div>
          <Link to={"/"}>
            <p className="font-bold text-3xl text-primary-light italic text-center">
              Tura
            </p>
          </Link>
        </div>

        <div className="mt-10">
          <div>
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-6"
              >
                <div className="flex flex-col sm:flex-row gap-4">
                  <FormField
                    control={form.control}
                    name="firstName"
                    render={({ field }) => (
                      <FormItem className="w-full">
                        <FormLabel>First Name</FormLabel>
                        <FormControl>
                          <Input
                            type="text"
                            placeholder="Your First Name"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="lastName"
                    render={({ field }) => (
                      <FormItem className="w-full">
                        <FormLabel>Last Name</FormLabel>
                        <FormControl>
                          <Input
                            type="text"
                            placeholder="Your Last Name"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem className="w-full">
                      <FormLabel>Email</FormLabel>
                      <FormControl>
                        <Input
                          type="text"
                          placeholder="Your email"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="phoneNumber"
                  render={({ field }) => (
                    <FormItem className="w-full">
                      <FormLabel>Phone Number</FormLabel>
                      <FormControl>
                        <Input
                          type="text"
                          placeholder="Your Phone Number"
                          {...field}
                        />
                      </FormControl>
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="password"
                  render={({ field }) => (
                    <FormItem className="w-full">
                      <FormLabel>Password</FormLabel>
                      <FormControl>
                        <Input
                          type="text"
                          placeholder="Your Password"
                          {...field}
                        />
                      </FormControl>
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="confirmPassword"
                  render={({ field }) => (
                    <FormItem className="w-full">
                      <FormLabel>Confirm Password</FormLabel>
                      <FormControl>
                        <Input
                          type="text"
                          placeholder="Confirm Password"
                          {...field}
                        />
                      </FormControl>
                    </FormItem>
                  )}
                />
                <Button className="bg-primary-light w-full hover:bg-primary-light">Sign Up</Button>
              </form>
            </Form>

            <div className="w-full mt-6 flex items-center justify-center">
              <div className="flex-1 border-t border-gray-300"></div>
              <span className=" px-5 text-gray-500">Or continue with</span>
              <div className="flex-1 border-t border-gray-300"></div>
            </div>

            <div className="mx-auto grid grid-cols-3 gap-6 mt-6">
              {icons.map((icon, idx) => (
                <Button
                key={idx}
                className="w-full border bg-transparent flex justify-center items-center p-2 hover:bg-transparent"
                aria-label={icon.alt}
              >
                <img src={icon.icon} alt={icon.alt} className="w-6 h-6" />
              </Button>
              
              ))}
            </div>

            <p className="text-gray-primary/75 mt-5 text-center">Already a member? <Link to={'/login'} className="text-primary-light">Login</Link></p>
          </div>
        </div>
      </div>
    </AuthLayout>
  );
};

export default SignUp;
