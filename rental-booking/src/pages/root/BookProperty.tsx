import React from "react";
import { FaArrowLeft } from "react-icons/fa";
import { Link, useNavigate, useParams } from "react-router-dom";
import { z } from "zod";
import { CustomForm } from "@/components/forms/FormField";
import { dummyProperties } from "@/constants";

const formSchema = z.object({
  fullNames: z.string().min(2, "Full Name must be at least 2 characters."),
  email: z.string().email("Invalid email address."),
  phoneNumber: z.string().min(10, "Phone Number must be at least 10 characters."),
  moveInDate: z.string().nonempty("Move-in Date is required."),
  paymentMethod: z.string().nonempty("Payment Method is required."),
});

const fields: Array<{
  name: keyof z.infer<typeof formSchema>;
  label: string;
  placeholder: string;
  type?: string;
  description?: string;
  options?: string[];
}> = [
  {
    name: "fullNames",
    label: "Full Name",
    placeholder: "Enter your full name",
    description: "This is your public display name.",
  },
  {
    name: "email",
    label: "Email",
    placeholder: "Enter your email",
    type: "email",
    description: "We'll never share your email with anyone else.",
  },
  {
    name: "phoneNumber",
    label: "Phone Number",
    placeholder: "Enter your phone number",
    type: "tel",
  },
  {
    name: "moveInDate",
    label: "Move-in Date",
    placeholder: "Select your move-in date",
    type: "date",
  },
  {
    name: "paymentMethod",
    label: "Payment Method",
    placeholder: "Select your payment method",
    type: "booking-form",
    options: ["Credit Card", "PayPal", "Bank Transfer"],
  },
];

const BookProperty = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const property = dummyProperties.find((p) => p._id === id);
  const fee = 50;

  const handleSubmit = (data: z.infer<typeof formSchema>) => {
    console.log("Booking details submitted:", data);
  };

  return (
    <div className="relative w-full min-h-screen">
      <header className="shadow-md p-5 flex items-center bg-white">
        <Link to="/" className="flex items-center text-gray-800">
          <img src="/logo.svg" alt="Rentify Properties Logo" className="w-10 h-10 mr-2" />
          <span className="text-xl font-semibold">Rentify Properties</span>
        </Link>
      </header>

      <main className="md:max-w-5xl mx-auto flex flex-col md:flex-row p-5 gap-5">
        <section className="flex flex-col items-center w-full md:w-[60%] p-5">
          <div className="w-full p-6 rounded-lg shadow-md bg-white">
            <div className="flex items-center mb-4">
              <button
                onClick={() => navigate(-1)}
                className="text-2xl text-gray-800 focus:outline-none"
              >
                <FaArrowLeft />
              </button>
              <h2 className="ml-3 text-2xl font-semibold">Confirm and Pay</h2>
            </div>
            <CustomForm schema={formSchema} onSubmit={handleSubmit} fields={fields} />
          </div>
        </section>

        <aside className="w-full md:w-[40%] h-auto md:h-[50vh] bg-white p-6 rounded-lg shadow-md border">
          <div className="mb-5 flex gap-5 items-center">
            <img
              src={property?.bannerImage || "/placeholder.jpg"}
              alt="Property"
              className="w-32 h-40 sm:h-48 md:h-28 object-cover rounded-lg"
            />
            <div>
              <h3 className="text-2xl font-semibold text-gray-700">{property?.name || "Unknown Property"}</h3>
              <p className="text-gray-500">{property?.overview || "No details available."}</p>
            </div>
          </div>

          <hr className="my-4" />

          <h4 className="text-xl font-semibold">Price Details</h4>
          <div className="flex justify-between items-center">
            <p className="mt-2 text-gray-700">
              {property?.price ? `$${property.price} x 5 nights: ` : "Pricing unavailable"}
            </p>
            <p>{property?.price ? `$${property.price * 5}` : "Pricing unavailable"}</p>
          </div>

          <div className="flex justify-between items-center">
            <p className="mt-2 text-gray-700">
              Service Fee
            </p>
            <p>$50</p>
          </div>

          <hr className="my-4" />

          <div className="flex justify-between items-center">
            <p className="mt-2 font-bold">
              Total:
            </p>
            <p className="font-bold">${ fee + ((property?.price ?? 0) * 5)}</p>
          </div>
        </aside>
      </main>
    </div>
  );
};

export default BookProperty;