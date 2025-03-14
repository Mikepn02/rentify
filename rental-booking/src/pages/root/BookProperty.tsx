
import { useState, useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { getPropertyById } from '@/lib/data';
import { Calendar, CreditCard, User, Mail, Phone } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import PageTransition from '@/components/layouts/PageTransition';

const Booking = () => {
  const [searchParams] = useSearchParams();
  const propertyId = searchParams.get('property');
  const navigate = useNavigate();
  const { toast } = useToast();
  
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    cardNumber: '',
    expiryDate: '',
    cvc: '',
  });
  
  const property = propertyId ? getPropertyById(propertyId) : undefined;
  
  useEffect(() => {
    if (!property) {
      navigate('/listings');
    }
    
    window.scrollTo(0, 0);
  }, [property, navigate]);
  
  if (!property) {
    return null;
  }
  
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // In a real app, you would process the booking here
    console.log('Booking submitted:', formData);
    
    toast({
      title: "Booking Confirmed!",
      description: `Your reservation for ${property.title} has been confirmed. Check your email for details.`,
      open: true, // Add this to indicate that the toast is open
      onOpenChange: (open: boolean) => {
        // Handle the change in open state if needed
        if (!open) {
          console.log("Toast closed");
        }
      },
    });
    
    // Redirect to listings page after successful booking
    setTimeout(() => {
      navigate('/listings');
    }, 2000);
  };

  return (
    <PageTransition>
      <div className="min-h-screen flex flex-col mt-10">
        <main className="flex-grow pt-24 pb-16">
          <div className="max-w-5xl mx-auto px-6 lg:px-8">
            <div className="mb-8">
              <h1 className="text-2xl md:text-3xl font-medium mb-2">Complete your booking</h1>
              <p className="text-muted-foreground">You're just a few steps away from your stay at {property.title}</p>
            </div>
            
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Booking Form */}
              <div className="lg:col-span-2">
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="bg-white rounded-xl border p-6">
                    <h2 className="text-xl font-medium mb-4 flex items-center gap-2">
                      <User className="w-5 h-5" />
                      Guest Information
                    </h2>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="firstName">First Name</Label>
                        <Input
                          id="firstName"
                          name="firstName"
                          value={formData.firstName}
                          onChange={handleInputChange}
                          required
                        />
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor="lastName">Last Name</Label>
                        <Input
                          id="lastName"
                          name="lastName"
                          value={formData.lastName}
                          onChange={handleInputChange}
                          required
                        />
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                      <div className="space-y-2">
                        <Label htmlFor="email" className="flex items-center gap-1">
                          <Mail className="w-4 h-4" /> Email
                        </Label>
                        <Input
                          id="email"
                          name="email"
                          type="email"
                          value={formData.email}
                          onChange={handleInputChange}
                          required
                        />
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor="phone" className="flex items-center gap-1">
                          <Phone className="w-4 h-4" /> Phone
                        </Label>
                        <Input
                          id="phone"
                          name="phone"
                          type="tel"
                          value={formData.phone}
                          onChange={handleInputChange}
                          required
                        />
                      </div>
                    </div>
                  </div>
                  
                  <div className="bg-white rounded-xl border p-6">
                    <h2 className="text-xl font-medium mb-4 flex items-center gap-2">
                      <CreditCard className="w-5 h-5" />
                      Payment Information
                    </h2>
                    
                    <div className="space-y-2">
                      <Label htmlFor="cardNumber">Card Number</Label>
                      <Input
                        id="cardNumber"
                        name="cardNumber"
                        placeholder="0000 0000 0000 0000"
                        value={formData.cardNumber}
                        onChange={handleInputChange}
                        required
                      />
                    </div>
                    
                    <div className="grid grid-cols-2 gap-4 mt-4">
                      <div className="space-y-2">
                        <Label htmlFor="expiryDate">Expiry Date</Label>
                        <Input
                          id="expiryDate"
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
                          id="cvc"
                          name="cvc"
                          placeholder="123"
                          value={formData.cvc}
                          onChange={handleInputChange}
                          required
                        />
                      </div>
                    </div>
                  </div>
                  
                  <Button type="submit" className="w-full py-6 text-lg">
                    Confirm Booking
                  </Button>
                  
                  <p className="text-sm text-muted-foreground text-center">
                    By confirming, you agree to our Terms of Service and Privacy Policy
                  </p>
                </form>
              </div>
              
              {/* Booking Summary */}
              <div className="lg:col-span-1">
                <Card className="rounded-xl overflow-hidden">
                  <div className="aspect-[3/2] relative">
                    <img
                      src={property.images[0]}
                      alt={property.title}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  
                  <div className="p-5">
                    <h3 className="font-medium mb-1">{property.title}</h3>
                    <p className="text-sm text-muted-foreground mb-4">{property.location}</p>
                    
                    <Separator className="my-4" />
                    
                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <Calendar className="w-4 h-4 text-muted-foreground" />
                          <span className="text-sm">Check-in</span>
                        </div>
                        <span className="font-medium">May 15, 2023</span>
                      </div>
                      
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <Calendar className="w-4 h-4 text-muted-foreground" />
                          <span className="text-sm">Check-out</span>
                        </div>
                        <span className="font-medium">May 20, 2023</span>
                      </div>
                      
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <User className="w-4 h-4 text-muted-foreground" />
                          <span className="text-sm">Guests</span>
                        </div>
                        <span className="font-medium">2 guests</span>
                      </div>
                    </div>
                    
                    <Separator className="my-4" />
                    
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span>${property.price} x 5 nights</span>
                        <span>${property.price * 5}</span>
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
                        <span>
                          ${property.price * 5 + 
                             Math.round(property.price * 5 * 0.12) + 
                             Math.round(property.price * 5 * 0.08)}
                        </span>
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
