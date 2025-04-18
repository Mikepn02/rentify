import AuthLayout from "@/components/layouts/AuthLayout";
import { Link } from "react-router-dom";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import {
  Form,
} from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import useAuth from "@/hooks/useAuth";
import CustomFormField, { FormFieldType } from "@/components/forms/CustomFormField";

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
  email: z.string().email("Invalid email address."),
  password: z.string().min(8, "Password must be at least 8 characters."),
});

const Login = () => {
  const { login, signInWithGoogle } = useAuth();

  const form = useForm<z.infer<typeof formschema>>({
    resolver: zodResolver(formschema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = async (data: z.infer<typeof formschema>) => {
    try {
      const response = await login(data.email, data.password);
      console.log("response: ", response);
      return response;
    } catch (error) {
      console.error("Error while logging in: ", error);
    }
  };

  return (
    <AuthLayout>
      <div className="md:mx-auto max-w-3xl lg:w-[80%]">
        <div>
          <Link to={"/"}>
            <p className="font-bold text-3xl text-primary-light italic text-center">
              Rentify Properties
            </p>
          </Link>
        </div>

        <div className="mt-10">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <CustomFormField
                fieldType={FormFieldType.INPUT}
                name="email"
                placeholder="Enter your Email"
                control={form.control}
                label="Email"
              />
              <CustomFormField
                fieldType={FormFieldType.INPUT}
                name="password"
                placeholder="Enter your Password"
                control={form.control}
                label="Password"
              />
              <Button
                type="submit"
                className="bg-primary-light w-full hover:bg-primary-light"
              >
                Log In
              </Button>
            </form>
          </Form>

          {/* Divider */}
          <div className="w-full mt-6 flex items-center justify-center">
            <div className="flex-1 border-t border-gray-300"></div>
            <span className="px-5 text-gray-500">Or continue with</span>
            <div className="flex-1 border-t border-gray-300"></div>
          </div>

          <div className="mx-auto grid grid-cols-3 gap-6 mt-6">
            {icons.map((icon, idx) => (
              <Button
                key={idx}
                onClick={signInWithGoogle} // Use signInWithGoogle for OAuth
                className="w-full border bg-transparent flex justify-center items-center p-2 hover:bg-transparent"
                aria-label={icon.alt}
              >
                <img src={icon.icon} alt={icon.alt} className="w-6 h-6" />
              </Button>
            ))}
          </div>

          <p className="text-gray-primary/75 mt-5 text-center">
            Don't have an account?{" "}
            <Link to={"/signup"} className="text-primary-light">
              Sign up
            </Link>
          </p>
        </div>
      </div>
    </AuthLayout>
  );
};

export default Login;
