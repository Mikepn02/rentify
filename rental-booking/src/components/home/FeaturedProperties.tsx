import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import PropertyCard from "../cards/PropertyCard";
import { Button } from "../ui/button";
import { properties } from "../../constants";

const FeaturedProperties = () => {
  const [isLoaded, setIsLoaded] = useState(false);

  console.log("Here are all properties: ", properties);

  useEffect(() => {
    setIsLoaded(true);
  }, []);
  return (
    <main>
      <section className="py-20 px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div
            className={`transition-all duration-1000 delay-300 transform ${
              isLoaded
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-10"
            }`}
          >
            <div className="flex flex-col md:flex-row md:items-end justify-between mb-12">
              <div>
                <h2 className="text-3xl font-medium mb-3">
                  Featured Properties
                </h2>
                <p className="text-muted-foreground max-w-2xl">
                  Discover our handpicked selection of exceptional properties,
                  each offering a unique experience.
                </p>
              </div>
              <Link to="/listings" className="mt-4 md:mt-0">
                <Button variant="outline">View All Properties</Button>
              </Link>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
              {properties.map((property, index) => (
                <div
                  key={property.id}
                  className={`transition-all duration-700 transform ${
                    isLoaded
                      ? "opacity-100 translate-y-0"
                      : "opacity-0 translate-y-10"
                  }`}
                  style={{ transitionDelay: `${index * 150 + 500}ms` }}
                >
                  <PropertyCard property={property} />
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Experience Section */}
      <section className="py-20 px-6 lg:px-8 bg-accent">
        <div className="max-w-7xl mx-auto">
          <div
            className={`transition-all duration-1000 delay-500 transform ${
              isLoaded
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-10"
            }`}
          >
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div>
                <h2 className="text-3xl font-medium mb-6">
                  Experience Unparalleled Comfort and Luxury
                </h2>
                <p className="text-muted-foreground mb-6">
                  Our curated collection of premium properties offers more than
                  just a place to stay—it provides a gateway to exceptional
                  experiences. From oceanfront villas to urban penthouses, each
                  property is selected for its unique character and impeccable
                  amenities.
                </p>
                <p className="text-muted-foreground mb-8">
                  Whether you're planning a family vacation, a romantic getaway,
                  or a business trip, we ensure your stay exceeds expectations.
                  With attentive service and meticulous attention to detail,
                  your comfort is our priority.
                </p>
                <Link to="/booking">
                  <Button className="h-12 px-6">Book Your Stay</Button>
                </Link>
              </div>
              <div className="relative">
                <div className="aspect-square rounded-2xl overflow-hidden">
                  <img
                    src="https://images.unsplash.com/photo-1613977257363-707ba9348227?q=80&w=2070&auto=format&fit=crop"
                    alt="Luxury Property"
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="absolute -bottom-6 -left-6 bg-white p-6 rounded-xl shadow-lg max-w-xs">
                  <div className="flex items-center mb-3">
                    <div className="text-yellow-500 flex">
                      {[...Array(5)].map((_, i) => (
                        <span key={i}>★</span>
                      ))}
                    </div>
                    <span className="ml-2 font-medium">5.0 Rating</span>
                  </div>
                  <p className="text-sm text-foreground">
                    "An absolutely stunning property with impeccable service.
                    Every detail was perfect. Will definitely return!"
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-20 px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div
            className={`text-center mb-16 transition-all duration-1000 delay-700 transform ${
              isLoaded
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-10"
            }`}
          >
            <h2 className="text-3xl font-medium mb-4">
              Premium Services for Exceptional Stays
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              We take pride in offering comprehensive services that ensure your
              stay is perfect from start to finish.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                title: "Personalized Booking",
                description:
                  "Tailored booking experience with flexible options and transparent pricing.",
                icon: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=2070&auto=format&fit=crop",
              },
              {
                title: "Concierge Support",
                description:
                  "24/7 dedicated concierge to assist with any requests during your stay.",
                icon: "https://images.unsplash.com/photo-1566073771259-6a8506099945?q=80&w=2070&auto=format&fit=crop",
              },
              {
                title: "Property Management",
                description:
                  "Professional management for property owners ensuring optimal presentation and care.",
                icon: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=2070&auto=format&fit=crop",
              },
            ].map((service, index) => (
              <div
                key={service.title}
                className={`bg-white rounded-xl overflow-hidden shadow-sm transition-all duration-700 transform ${
                  isLoaded
                    ? "opacity-100 translate-y-0"
                    : "opacity-0 translate-y-10"
                }`}
                style={{ transitionDelay: `${index * 150 + 900}ms` }}
              >
                <div className="aspect-[3/2] overflow-hidden">
                  <img
                    src={service.icon}
                    alt={service.title}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-medium mb-3">{service.title}</h3>
                  <p className="text-muted-foreground">{service.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 px-6 lg:px-8 bg-primary-light text-white">
        <div className="max-w-7xl mx-auto text-center">
          <div
            className={`transition-all duration-1000 delay-1000 transform ${
              isLoaded
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-10"
            }`}
          >
            <h2 className="text-3xl md:text-4xl font-medium mb-6">
              Ready for Your Next Adventure?
            </h2>
            <p className="text-primary-foreground/80 max-w-2xl mx-auto mb-8">
              Browse our exclusive collection of properties and find the perfect
              setting for your next getaway.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <Link to="/listings">
                <Button className="h-12 px-8 bg-white text-primary hover:bg-white/90">
                  Explore Properties
                </Button>
              </Link>
              <Link to="/booking">
                <Button className="h-12 px-8 bg-white text-primary hover:bg-white/90">
                  Book Now
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
};
export default FeaturedProperties;
