
import { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { getBookingsByPropertyId } from '@/lib/data';
import { Calendar, MapPin, User, Home, Bath, Maximize } from 'lucide-react';
import PageTransition from '@/components/layouts/PageTransition';
import { Badge } from '@/components/ui/Badge';
import BookingCalendar from '@/components/ui/BookingCalendar';
import useProperties from '@/hooks/useProperties';

const PropertyDetail = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { getPropertyById } = useProperties()
  const [currentImage, setCurrentImage] = useState(0);
  const [selectedDates, setSelectedDates] = useState<{ 
    startDate?: Date; 
    endDate?: Date; 
    nights: number; 
    totalPrice: number;
  }>({ nights: 0, totalPrice: 0 });
  
  const property = id ? getPropertyById(id) : undefined;
  const bookings = id ? getBookingsByPropertyId(id) : [];
  
  useEffect(() => {
    if (!property) {
      navigate('/listings');
    }
    
    window.scrollTo(0, 0);
  }, [property, navigate]);
  
  if (!property) {
    return null;
  }
  
  const handleDateSelect = (startDate: Date | undefined, endDate: Date | undefined) => {
    if (startDate && endDate) {
      const diffTime = Math.abs(endDate.getTime() - startDate.getTime());
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
      
      setSelectedDates({
        startDate,
        endDate,
        nights: diffDays,
        totalPrice: diffDays * property.price
      });
    } else {
      setSelectedDates({ nights: 0, totalPrice: 0 });
    }
  };
  
  const handleNextImage = () => {
    setCurrentImage(current => 
      current === property.images.length - 1 ? 0 : current + 1
    );
  };
  
  const handlePrevImage = () => {
    setCurrentImage(current => 
      current === 0 ? property.images.length - 1 : current - 1
    );
  };

  return (
    <PageTransition>
      <div className="min-h-screen flex flex-col">        
        <main className="flex-grow pt-24">
          {/* Property Images */}
          <section className="relative bg-accent">
            <div className="max-w-7xl mx-auto px-0 md:px-6 lg:px-8 py-4">
              <div className="relative aspect-[16/9] overflow-hidden rounded-none md:rounded-xl">
                <img
                  src={property.images[currentImage]}
                  alt={property.title}
                  className="w-full h-full object-cover transition-transform duration-500"
                />
                
                {/* Navigation Arrows */}
                <div className="absolute inset-0 flex items-center justify-between p-4">
                  <Button
                    variant="secondary"
                    size="icon"
                    className="bg-black/20 hover:bg-black/40 backdrop-blur-sm text-white rounded-full"
                    onClick={handlePrevImage}
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="m15 18-6-6 6-6"/>
                    </svg>
                  </Button>
                  <Button
                    variant="secondary"
                    size="icon"
                    className="bg-black/20 hover:bg-black/40 backdrop-blur-sm text-white rounded-full"
                    onClick={handleNextImage}
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="m9 18 6-6-6-6"/>
                    </svg>
                  </Button>
                </div>
                
                {/* Image Thumbnails */}
                <div className="absolute bottom-4 left-0 right-0 flex justify-center gap-2">
                  {property.images.map((_, index) => (
                    <button
                      key={index}
                      className={`w-2 h-2 rounded-full transition-all ${
                        index === currentImage ? 'bg-white w-6' : 'bg-white/50'
                      }`}
                      onClick={() => setCurrentImage(index)}
                    />
                  ))}
                </div>
              </div>
            </div>
          </section>
          
          {/* Property Details */}
          <section className="py-8 px-6 lg:px-8">
            <div className="max-w-7xl mx-auto">
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
                {/* Left Column - Main Info */}
                <div className="lg:col-span-2">
                  <div className="flex flex-col md:flex-row md:items-start md:justify-between mb-6">
                    <div>
                      <h1 className="text-2xl md:text-3xl font-medium mb-2">{property.title}</h1>
                      <div className="flex items-center text-muted-foreground">
                        <MapPin className="w-4 h-4 mr-1" />
                        <span>{property.location}</span>
                      </div>
                    </div>
                    <div className="flex items-center mt-4 md:mt-0">
                      <div className="flex items-center bg-accent rounded-full px-3 py-1.5">
                        <span className="text-yellow-500 mr-1.5">★</span>
                        <span className="font-medium">{property.rating}</span>
                        <span className="mx-1 text-muted-foreground">•</span>
                        <span className="text-muted-foreground">{property.reviewCount} reviews</span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-3 gap-4 mb-8">
                    <div className="bg-accent rounded-lg p-4 text-center">
                      <Home className="w-5 h-5 mx-auto mb-2" />
                      <div className="text-sm text-muted-foreground">Type</div>
                      <div className="font-medium">{property.type}</div>
                    </div>
                    <div className="bg-accent rounded-lg p-4 text-center">
                      <User className="w-5 h-5 mx-auto mb-2" />
                      <div className="text-sm text-muted-foreground">Bedrooms</div>
                      <div className="font-medium">{property.bedrooms}</div>
                    </div>
                    <div className="bg-accent rounded-lg p-4 text-center">
                      <Bath className="w-5 h-5 mx-auto mb-2" />
                      <div className="text-sm text-muted-foreground">Bathrooms</div>
                      <div className="font-medium">{property.bathrooms}</div>
                    </div>
                  </div>
                  
                  <Tabs defaultValue="description" className="mb-8">
                    <TabsList className="mb-6">
                      <TabsTrigger value="description">Description</TabsTrigger>
                      <TabsTrigger value="amenities">Amenities</TabsTrigger>
                      <TabsTrigger value="location">Location</TabsTrigger>
                    </TabsList>
                    <TabsContent value="description" className="space-y-4">
                      <p className="text-muted-foreground">
                        {property.description}
                      </p>
                      <div className="flex items-center gap-2 text-muted-foreground mt-4">
                        <Maximize className="w-4 h-4" />
                        <span>{property.area} sq ft</span>
                      </div>
                    </TabsContent>
                    <TabsContent value="amenities">
                      <div className="grid grid-cols-2 md:grid-cols-3 gap-y-4">
                        {property.amenities.map(amenity => (
                          <div key={amenity} className="flex items-center gap-2">
                            <div className="w-2 h-2 rounded-full bg-primary" />
                            <span>{amenity}</span>
                          </div>
                        ))}
                      </div>
                    </TabsContent>
                    <TabsContent value="location">
                      <div className="bg-accent rounded-lg p-6 text-center">
                        <MapPin className="w-8 h-8 mx-auto mb-3 text-primary" />
                        <h3 className="font-medium mb-1">{property.location}</h3>
                        <p className="text-muted-foreground text-sm">
                          Exact location provided after booking.
                        </p>
                      </div>
                    </TabsContent>
                  </Tabs>
                  
                  <div className="border-t pt-8">
                    <h2 className="text-xl font-medium mb-6">Reviews</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      {[1, 2].map(i => (
                        <div key={i} className="border rounded-lg p-4">
                          <div className="flex items-center mb-3">
                            <div className="w-10 h-10 bg-accent rounded-full mr-3" />
                            <div>
                              <div className="font-medium">Guest {i}</div>
                              <div className="text-xs text-muted-foreground">1 month ago</div>
                            </div>
                          </div>
                          <div className="flex items-center mb-2">
                            {[...Array(5)].map((_, i) => (
                              <span key={i} className="text-yellow-500">★</span>
                            ))}
                          </div>
                          <p className="text-sm text-muted-foreground">
                            Exceptional property with amazing views. Everything was perfect during our stay. Highly recommended!
                          </p>
                        </div>
                      ))}
                    </div>
                    <Button variant="outline" className="mt-6">
                      View All {property.reviewCount} Reviews
                    </Button>
                  </div>
                </div>
                
                {/* Right Column - Booking Form */}
                <div className="lg:col-span-1">
                  <div className="bg-white rounded-xl border shadow-sm p-6 sticky top-24">
                    <div className="flex items-center justify-between mb-6">
                      <div>
                        <span className="text-2xl font-medium">${property.price}</span>
                        <span className="text-muted-foreground"> / night</span>
                      </div>
                      <Badge variant="outline" className="flex items-center gap-1">
                        <Calendar className="w-3.5 h-3.5" />
                        <span>Available</span>
                      </Badge>
                    </div>
                    
                    <div className="mb-6">
                      <h3 className="text-sm font-medium mb-3">Dates</h3>
                      <BookingCalendar 
                        bookings={bookings} 
                        onDateSelect={handleDateSelect}
                      />
                    </div>
                    
                    {selectedDates.nights > 0 && (
                      <div className="border-t pt-4 mb-6">
                        <div className="flex justify-between mb-2">
                          <span>
                            ${property.price} x {selectedDates.nights} nights
                          </span>
                          <span>${selectedDates.totalPrice}</span>
                        </div>
                        <div className="flex justify-between mb-2">
                          <span>Service fee</span>
                          <span>${Math.round(selectedDates.totalPrice * 0.12)}</span>
                        </div>
                        <div className="flex justify-between font-medium pt-3 border-t mt-3">
                          <span>Total</span>
                          <span>${selectedDates.totalPrice + Math.round(selectedDates.totalPrice * 0.12)}</span>
                        </div>
                      </div>
                    )}
                    
                    <Link to={`/booking?property=${property.id}`}>
                      <Button className="w-full">
                        {selectedDates.nights > 0 ? 'Reserve' : 'Check Availability'}
                      </Button>
                    </Link>
                    
                    <p className="text-xs text-center text-muted-foreground mt-4">
                      You won't be charged yet
                    </p>
                  </div>
                </div>
              </div>
              
              {/* Similar Properties */}
              <div className="mt-16 pt-8 border-t">
                <h2 className="text-2xl font-medium mb-6">Similar Properties</h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {/* Show 3 similar properties from the same type */}
                </div>
              </div>
            </div>
          </section>
        </main>
      </div>
    </PageTransition>
  );
};

export default PropertyDetail;
