import { useState, useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { CreditCard, User, Mail, Phone } from "lucide-react";
import PageTransition from "@/components/layouts/PageTransition";
import useProperties from "@/hooks/useProperties";
import useBooking from "@/hooks/useBooking";
import useAuth from "@/hooks/useAuth";

const Booking = () => {
  const [searchParams] = useSearchParams();
  const propertyId = searchParams.get("property");
  const startDate = new Date(searchParams.get("startDate") || "");
  const endDate = new Date(searchParams.get("endDate") || "");
  const { getPropertyById } = useProperties();
  const navigate = useNavigate();
  const { user } = useAuth();
  const { createBooking } = useBooking();

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    cardNumber: "",
    expiryDate: "",
    cvc: "",
  });

  const property = propertyId ? getPropertyById(propertyId) : undefined;

  console.log("Property ID: ", property);

  useEffect(() => {
    if (!user) {
      navigate("/login");
    }
  }, [user, navigate]);

  if (!property) return null;

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const bookingDuration = Math.ceil(
        (endDate.getTime() - startDate.getTime()) / (1000 * 3600 * 24)
      );

      const newBooking = {
        firstName: user?.firstName,
        lastName: user?.lastName,
        propertyId: property.id,
        checkInDate: startDate.toISOString(),
        checkoutDate: endDate.toISOString(),
        guests: 2,
        totalAmount:
          property.price * bookingDuration +
          Math.round(property.price * bookingDuration * 0.12) +
          Math.round(property.price * bookingDuration * 0.08),
        cardNumber: formData.cardNumber,
        expiryDate: formData.expiryDate,
        cvc: formData.cvc,
      };

      console.log(newBooking);

      await createBooking({ ...newBooking, renterId: user.id });
    } catch (error) {
      console.error("Error while booking a property: ", error);
    }
  };

  return (
    <PageTransition>
      <div className="min-h-screen flex flex-col mt-10">
        <main className="flex-grow pt-24 pb-16">
          <div className="max-w-5xl mx-auto px-6 lg:px-8">
            <div className="mb-8">
              <h1 className="text-2xl md:text-3xl font-medium mb-2">
                Complete your booking
              </h1>
              <p className="text-muted-foreground">
                You're just a few steps away from your stay at {property.title}
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              <div className="lg:col-span-2">
                <form onSubmit={handleSubmit} className="space-y-6">
                  {/* Guest Info */}
                  <div className="bg-white rounded-xl border p-6">
                    <h2 className="text-xl font-medium mb-4 flex items-center gap-2">
                      <User className="w-5 h-5" />
                      Guest Information
                    </h2>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="firstName">First Name</Label>
                        <Input
                          name="firstName"
                          value={user ? user.firstName : formData.firstName}
                          onChange={handleInputChange}
                          required
                        />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="lastName">Last Name</Label>
                        <Input
                          name="lastName"
                          value={user ? user.lastName : formData.lastName}
                          onChange={handleInputChange}
                          required
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                      <div className="space-y-2">
                        <Label htmlFor="email">
                          <Mail className="w-4 h-4" /> Email
                        </Label>
                        <Input
                          name="email"
                          type="email"
                          value={user ? user.email : formData.email}
                          onChange={handleInputChange}
                          required
                        />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="phone">
                          <Phone className="w-4 h-4" /> Phone
                        </Label>
                        <Input
                          name="phone"
                          type="tel"
                          value={user ? user.phoneNumber : formData.phone}
                          onChange={handleInputChange}
                          required
                        />
                      </div>
                    </div>
                  </div>

                  {/* Payment Info */}
                  <div className="bg-white rounded-xl border p-6">
                    <h2 className="text-xl font-medium mb-4 flex items-center gap-2">
                      <CreditCard className="w-5 h-5" />
                      Payment Information
                    </h2>

                    <div className="space-y-2">
                      <Label htmlFor="cardNumber">Card Number</Label>
                      <Input
                        name="cardNumber"
                        value={formData.cardNumber}
                        onChange={handleInputChange}
                        required
                      />
                    </div>

                    <div className="grid grid-cols-2 gap-4 mt-4">
                      <div className="space-y-2">
                        <Label htmlFor="expiryDate">Expiry Date</Label>
                        <Input
                          name="expiryDate"
                          placeholder="MM/YY"
                          value={formData.expiryDate}
                          onChange={handleInputChange}
                          required
                        />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="cvc">CVC</Label>
                        <Input
                          name="cvc"
                          placeholder="123"
                          value={formData.cvc}
                          onChange={handleInputChange}
                          required
                        />
                      </div>
                    </div>
                  </div>

                  {user && user.role === "HOST" ? (
                    <h1 className="text-lg font-bold text-center text-red-500">Hosts are not allowed to book a property</h1>
                  ):
                  <Button type="submit" className="w-full py-6 text-lg">
                  Confirm Booking
                </Button>}
                  <p className="text-sm text-muted-foreground text-center">
                    By confirming, you agree to our Terms of Service and Privacy Policy
                  </p>
                </form>
              </div>

              {/* Booking Summary */}
              <div className="lg:col-span-1">
                <Card className="rounded-xl overflow-hidden">
                  <img
                    src={property.images[0]}
                    alt={property.title}
                    className="w-full h-[200px] object-cover"
                  />
                  <div className="p-5">
                    <h3 className="font-medium mb-1">{property.title}</h3>
                    <p className="text-sm text-muted-foreground mb-4">
                      {property.location}
                    </p>
                    <Separator className="my-4" />
                    <div className="space-y-3">
                      <div className="flex justify-between text-sm">
                        <span>${property.price} x {Math.ceil((endDate.getTime() - startDate.getTime()) / (1000 * 3600 * 24))} nights</span>
                        <span>${property.price * Math.ceil((endDate.getTime() - startDate.getTime()) / (1000 * 3600 * 24))}</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span>Service fee</span>
                        <span>${Math.round(property.price * 5 * 0.12)}</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span>Taxes</span>
                        <span>${Math.round(property.price * 5 * 0.08)}</span>
                      </div>
                      <Separator className="my-2" />
                      <div className="flex justify-between font-medium">
                        <span>Total</span>
                        <span>${property.price * Math.ceil((endDate.getTime() - startDate.getTime()) / (1000 * 3600 * 24)) + Math.round(property.price * 5 * 0.12) + Math.round(property.price * 5 * 0.08)}</span>
                      </div>
                    </div>
                  </div>
                </Card>
              </div>
            </div>
          </div>
        </main>
      </div>
    </PageTransition>
  );
};

export default Booking;
