import { useState, useEffect, useMemo } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { MapPin } from "lucide-react";
import PageTransition from "@/components/layouts/PageTransition";
import { Slider } from "@/components/ui/Slider";
import { Button } from "@/components/ui/button";
import PropertyCard from "@/components/cards/PropertyCard";
import useProperties from "@/hooks/useProperties";

const PropertyList = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { properties } = useProperties();
  const [isLoaded, setIsLoaded] = useState(false);

  // Filter states
  const [priceRange, setPriceRange] = useState<number[]>([0, 1000]);
  const [propertyType, setPropertyType] = useState<string>("");
  const [bedrooms, setBedrooms] = useState<string>("");
  const [bathrooms, setBathrooms] = useState<string>("");

  useEffect(() => {
    setIsLoaded(true);

    const params = new URLSearchParams(location.search);
    const typeParam = params.get("type");

    if (typeParam) {
      setPropertyType(typeParam);
    }
  }, [location.search]);

  const filteredProperties = useMemo(() => {
    if (!properties || properties.length === 0) return [];

    return properties.filter((property) => {
      const matchesType = propertyType ? property.type === propertyType : true;
      const matchesBedrooms = bedrooms
        ? bedrooms === "4+"
          ? property.bedrooms >= 4
          : property.bedrooms === parseInt(bedrooms)
        : true;
      const matchesBathrooms = bathrooms
        ? bathrooms === "3+"
          ? property.bathrooms >= 3
          : property.bathrooms === parseInt(bathrooms)
        : true;
      const matchesPrice = property.price >= priceRange[0] && property.price <= priceRange[1];

      return matchesType && matchesBedrooms && matchesBathrooms && matchesPrice;
    });
  }, [properties, propertyType, bedrooms, bathrooms, priceRange]);


  const locationGroups = useMemo(() => {
    if (!properties) return [];
    return Array.from(
      new Set(properties.map((property) => property.location.split(",")[1]?.trim()))
    ).filter(Boolean);
  }, [properties]);

  const applyFilter = (type: string, value: string) => {
    if (type === "type") {
      setPropertyType(value);
      const params = new URLSearchParams(location.search);
      if (value) {
        params.set("type", value);
      } else {
        params.delete("type");
      }
      navigate({ search: params.toString() });
    } else if (type === "bedrooms") {
      setBedrooms(value);
    } else if (type === "bathrooms") {
      setBathrooms(value);
    }
  };

  const resetFilters = () => {
    setPriceRange([0, 1000]);
    setPropertyType("");
    setBedrooms("");
    setBathrooms("");
    navigate("/properties");
  };

  return (
    <PageTransition>
      <div className="min-h-screen flex flex-col mt-10">
        <main className="flex-grow pt-24">
          {/* Hero Section */}
          <section className="relative h-[30vh] min-h-[240px] bg-accent">
            <div className="absolute inset-0 bg-gradient-to-r from-primary/30 to-primary/10" />
            <div className="relative h-full flex items-center px-6 lg:px-8">
              <div className="max-w-7xl mx-auto w-full">
                <h1 className="text-3xl md:text-4xl font-medium mb-4">
                  Find Your Perfect Property
                </h1>
                <p className="text-lg text-muted-foreground max-w-2xl">
                  Browse our extensive collection of premium properties across
                  various locations.
                </p>
              </div>
            </div>
          </section>

          {/* Filters and Listings */}
          <section className="py-12 px-6 lg:px-8">
            <div className="max-w-7xl mx-auto">
              <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
                {/* Filters Sidebar */}
                <div className="lg:col-span-1">
                  <div className="bg-white p-6 rounded-xl shadow-sm sticky top-24">
                    <h2 className="text-lg font-medium mb-6">Filters</h2>

                    <div className="space-y-6">
                      {/* Price Range */}
                      <div>
                        <h3 className="text-sm font-medium mb-4">Price Range</h3>
                        <div className="px-2">
                          <Slider
                            defaultValue={[0, 1000]}
                            max={1000}
                            step={50}
                            value={priceRange}
                            onValueChange={setPriceRange}
                            className="mb-6"
                          />
                          <div className="flex items-center justify-between text-sm">
                            <span>${priceRange[0]}</span>
                            <span>${priceRange[1]}+</span>
                          </div>
                        </div>
                      </div>

                      {/* Property Type */}
                      <div>
                        <h3 className="text-sm font-medium mb-3">Property Type</h3>
                        <Select
                          value={propertyType}
                          onValueChange={(value) => applyFilter("type", value)}
                        >
                          <SelectTrigger>
                            <SelectValue placeholder="Any type" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="0">Any type</SelectItem>
                            <SelectItem value="Villa">Villa</SelectItem>
                            <SelectItem value="House">House</SelectItem>
                            <SelectItem value="Apartment">Apartment</SelectItem>
                            <SelectItem value="Cabin">Cabin</SelectItem>
                            <SelectItem value="Townhouse">Townhouse</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>

                      {/* Bedrooms */}
                      <div>
                        <h3 className="text-sm font-medium mb-3">Bedrooms</h3>
                        <Select 
                          value={bedrooms}
                          onValueChange={(value) => applyFilter('bedrooms', value)}
                        >
                          <SelectTrigger>
                            <SelectValue placeholder="Any bedrooms" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="0">Any bedrooms</SelectItem>
                            <SelectItem value="1">1 Bedroom</SelectItem>
                            <SelectItem value="2">2 Bedrooms</SelectItem>
                            <SelectItem value="3">3 Bedrooms</SelectItem>
                            <SelectItem value="4+">4+ Bedrooms</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>

                      {/* Bathrooms */}
                      <div>
                        <h3 className="text-sm font-medium mb-3">Bathrooms</h3>
                        <Select 
                          value={bathrooms} 
                          onValueChange={(value) => applyFilter('bathrooms', value)}
                        >
                          <SelectTrigger>
                            <SelectValue placeholder="Any bathrooms" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="0">Any bathrooms</SelectItem>
                            <SelectItem value="1">1 Bathroom</SelectItem>
                            <SelectItem value="2">2 Bathrooms</SelectItem>
                            <SelectItem value="3+">3+ Bathrooms</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>

                      {/* Locations */}
                      <div>
                        <h3 className="text-sm font-medium mb-3">Popular Locations</h3>
                        <div className="space-y-2">
                          {locationGroups.map((location) => (
                            <div key={location} className="flex items-center gap-2">
                              <MapPin className="w-3.5 h-3.5 text-muted-foreground" />
                              <span className="text-sm text-muted-foreground">{location}</span>
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* Reset Filters */}
                      <Button variant="outline" className="w-full mt-4" onClick={resetFilters}>
                        Reset Filters
                      </Button>
                    </div>
                  </div>
                </div>

                {/* Listings */}
                <div className="lg:col-span-3">
                  <div className="flex justify-between items-center mb-6">
                    <h2 className="text-xl font-medium">
                      {filteredProperties.length}{" "}
                      {filteredProperties.length === 1 ? "Property" : "Properties"}
                    </h2>
                    <Select defaultValue="featured">
                      <SelectTrigger className="w-[180px]">
                        <SelectValue placeholder="Sort by" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="featured">Featured</SelectItem>
                        <SelectItem value="price-asc">Price: Low to High</SelectItem>
                        <SelectItem value="price-desc">Price: High to Low</SelectItem>
                        <SelectItem value="rating">Highest Rating</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  {filteredProperties.length > 0 ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                      {filteredProperties.map((property, index) => (
                        <div
                          key={property.id}
                          className={`transition-all duration-500 transform ${
                            isLoaded
                              ? "opacity-100 translate-y-0"
                              : "opacity-0 translate-y-10"
                          }`}
                          style={{ transitionDelay: `${index * 100}ms` }}
                        >
                          <PropertyCard property={property} />
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="bg-accent rounded-xl p-12 text-center">
                      <h3 className="text-xl font-medium mb-2">No properties found</h3>
                      <p className="text-muted-foreground mb-6">
                        Try adjusting your filters to find more properties.
                      </p>
                      <Button onClick={resetFilters}>Reset Filters</Button>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </section>
        </main>
      </div>
    </PageTransition>
  );
};

export default PropertyList;
