import AuthLayout from "@/components/layouts/AuthLayout";
import { Link } from "react-router-dom";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Form } from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import useAuth from "@/hooks/useAuth";
import CustomFormField, {
  FormFieldType,
} from "@/components/forms/CustomFormField";
import { SelectItem } from "@/components/ui/select";

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
  phoneNumber: z.string().min(10, "Phone number must be atleast 10 numbers"),
  role: z.enum(["RENTER", "HOST"], {
    errorMap: () => ({ message: "Invalid role" }),
  }),
});
const SignUp = () => {
  const { register } = useAuth();
  const form = useForm<z.infer<typeof formschema>>({
    resolver: zodResolver(formschema),
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      role: "RENTER",
      password: "",
      confirmPassword: "",
      phoneNumber: "",
    },
  });

  const onSubmit = async (data: z.infer<typeof formschema>) => {
    try {
      const response = await register(data);
      console.log("Here is the response: ", response);
      return response;
    } catch (error) {
      console.error(error);
    }
  };

  console.log(form.formState.errors);
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
          <div>
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-6"
              >
                <div className="flex flex-col sm:flex-row gap-4">
                  <CustomFormField
                    fieldType={FormFieldType.INPUT}
                    name="firstName"
                    placeholder="Enter your first Name"
                    control={form.control}
                    label="First Name"
                  />
                  <CustomFormField
                    fieldType={FormFieldType.INPUT}
                    name="lastName"
                    placeholder="Enter your Last Name"
                    control={form.control}
                    label="Last Name"
                  />
                </div>
                <CustomFormField
                  fieldType={FormFieldType.INPUT}
                  name="email"
                  placeholder="Enter your Email"
                  control={form.control}
                  label="Email"
                />
                <CustomFormField
                  fieldType={FormFieldType.PHONE_INPUT}
                  control={form.control}
                  name="phoneNumber"
                  label="Phone number"
                  placeholder="(555) 123-4567"
                />

                <CustomFormField
                  fieldType={FormFieldType.SELECT}
                  name="role"
                  control={form.control}
                  label="Select your Role"
                  placeholder="Select your Role"
                >
                  {[
                    { value: "RENTER", label: "Renter" },
                    { value: "HOST", label: "Host" },
                  ].map((option) => (
                    <SelectItem key={option.value} value={option.value}>
                      {option.label}
                    </SelectItem>
                  ))}
                </CustomFormField>

                <CustomFormField
                  fieldType={FormFieldType.INPUT}
                  name="password"
                  placeholder="Enter your Password"
                  control={form.control}
                  label="Password"
                />

                <CustomFormField
                  fieldType={FormFieldType.INPUT}
                  name="confirmPassword"
                  placeholder="Confirm Password"
                  control={form.control}
                  label="Confirm Password"
                />
                <Button
                  type="submit"
                  className="bg-primary-light w-full hover:bg-primary-light"
                >
                  Sign Up
                </Button>
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

            <p className="text-gray-primary/75 mt-5 text-center">
              Already a member?{" "}
              <Link to={"/login"} className="text-primary-light">
                Login
              </Link>
            </p>
          </div>
        </div>
      </div>
    </AuthLayout>
  );
};

export default SignUp;
