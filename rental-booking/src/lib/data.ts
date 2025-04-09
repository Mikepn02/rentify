export type Property = {
  id: string;
  title: string;
  location: string;
  price: number;
  rating: number;
  reviewCount: number;
  type: string;
  bedrooms: number;
  bathrooms: number;
  area: number;
  description: string;
  amenities: string[];
  images: string[];
  available: boolean;
};


export enum BookingStatus {
  PENDING,
  CONFIRMED,
  CANCELLED,
}

export const properties: Property[] = [
  {
    id: "1",
    title: "Luxurious Oceanfront Villa",
    location: "Malibu, California",
    price: 725,
    rating: 4.92,
    reviewCount: 86,
    type: "Villa",
    bedrooms: 4,
    bathrooms: 3,
    area: 3200,
    description:
      "Stunning oceanfront villa with panoramic views of the Pacific. This modern retreat features floor-to-ceiling windows, a private infinity pool, and direct beach access. Perfect for luxury getaways and special occasions.",
    amenities: [
      "Ocean View",
      "Private Pool",
      "Beach Access",
      "Modern Kitchen",
      "Home Theater",
      "Free Parking",
      "Wi-Fi",
      "Air Conditioning",
    ],
    images: [
      "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?q=80&w=2075&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?q=80&w=2070&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?q=80&w=2070&auto=format&fit=crop",
    ],
    available: true,
  },
  {
    id: "2",
    title: "Modern Downtown Loft",
    location: "New York, NY",
    price: 275,
    rating: 4.85,
    reviewCount: 124,
    type: "Apartment",
    bedrooms: 2,
    bathrooms: 2,
    area: 1200,
    description:
      "Stylish loft in the heart of Manhattan. This contemporary space features high ceilings, industrial-chic design, and state-of-the-art amenities. Walking distance to premium restaurants, theaters, and shopping.",
    amenities: [
      "City View",
      "Gym Access",
      "Doorman",
      "Smart Home",
      "Washer/Dryer",
      "Wi-Fi",
      "Air Conditioning",
      "Pet Friendly",
    ],
    images: [
      "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?q=80&w=2070&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1630699144339-420f59b4747a?q=80&w=2070&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1512918728675-ed5a9ecdebfd?q=80&w=2070&auto=format&fit=crop",
    ],
    available: true,
  },
  {
    id: "3",
    title: "Mountain Retreat Cabin",
    location: "Aspen, Colorado",
    price: 395,
    rating: 4.97,
    reviewCount: 58,
    type: "Cabin",
    bedrooms: 3,
    bathrooms: 2,
    area: 1800,
    description:
      "Cozy mountain cabin with breathtaking views. This rustic-luxury property features a stone fireplace, hot tub, and wraparound deck. Perfect for ski trips, hiking adventures, or peaceful mountain getaways.",
    amenities: [
      "Mountain View",
      "Hot Tub",
      "Fireplace",
      "Ski Storage",
      "Hiking Trails",
      "Free Parking",
      "Wi-Fi",
      "Heating",
    ],
    images: [
      "https://images.unsplash.com/photo-1542718610-a1d656d1884c?q=80&w=2070&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1520984032042-162d526883e0?q=80&w=2070&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1470770841072-f978cf4d019e?q=80&w=2070&auto=format&fit=crop",
    ],
    available: true,
  },
  {
    id: "4",
    title: "Mediterranean Beachfront Estate",
    location: "Miami, Florida",
    price: 890,
    rating: 4.89,
    reviewCount: 42,
    type: "Villa",
    bedrooms: 5,
    bathrooms: 4,
    area: 4500,
    description:
      "Magnificent Mediterranean-style estate with direct beach access. This luxurious property features a grand foyer, chef's kitchen, private pool, and lush tropical gardens. Perfect for entertaining and beach vacations.",
    amenities: [
      "Beach Access",
      "Private Pool",
      "Garden",
      "Chef's Kitchen",
      "Home Office",
      "Free Parking",
      "Wi-Fi",
      "Air Conditioning",
    ],
    images: [
      "https://images.unsplash.com/photo-1613977257363-707ba9348227?q=80&w=2070&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1613977257592-4a9a464364e0?q=80&w=2070&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1615874959474-d609969a20ed?q=80&w=2070&auto=format&fit=crop",
    ],
    available: true,
  },
  {
    id: "5",
    title: "Minimalist Desert Oasis",
    location: "Scottsdale, Arizona",
    price: 340,
    rating: 4.95,
    reviewCount: 37,
    type: "House",
    bedrooms: 3,
    bathrooms: 2,
    area: 2100,
    description:
      "Contemporary desert home with stunning architecture. This minimalist property features clean lines, a private courtyard with plunge pool, and floor-to-ceiling windows showcasing the breathtaking desert landscape.",
    amenities: [
      "Desert View",
      "Plunge Pool",
      "Outdoor Shower",
      "Modern Design",
      "Patio",
      "Free Parking",
      "Wi-Fi",
      "Air Conditioning",
    ],
    images: [
      "https://images.unsplash.com/photo-1580587771525-78b9dba3b914?q=80&w=2074&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1583608205776-bfd35f0d9f83?q=80&w=2070&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1605276374104-dee2a0ed3cd6?q=80&w=2070&auto=format&fit=crop",
    ],
    available: true,
  },
  {
    id: "6",
    title: "Historic Brownstone",
    location: "Boston, Massachusetts",
    price: 295,
    rating: 4.85,
    reviewCount: 65,
    type: "Townhouse",
    bedrooms: 3,
    bathrooms: 2.5,
    area: 2400,
    description:
      "Charming brownstone with historic character and modern amenities. This elegant property features original woodwork, high ceilings, updated kitchen, and a private garden patio. Located in a sought-after historic district.",
    amenities: [
      "Historic Features",
      "Garden Patio",
      "Modern Kitchen",
      "Fireplace",
      "Near Public Transit",
      "Free Parking",
      "Wi-Fi",
      "Heating",
    ],
    images: [
      "https://images.unsplash.com/photo-1567496898669-ee935f5f647a?q=80&w=2071&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?q=80&w=2070&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1605146769289-440113cc3d00?q=80&w=2070&auto=format&fit=crop",
    ],
    available: true,
  },
];

export type Booking = {
  id: string;
  renterId: string;
  firstName: string;
  lastName: string;
  propertyId: string;
  checkInDate: string;
  property: {
    title: string;
  },
  renter: {
    firstName:string;
    lastName: string;
    email: string;
  }
  checkoutDate: string;
  guests: number;
  totalAmount: number;
  cardNumber: string;
  expiryDate: string;
  cvc: string;
  status: string;
};





export const getPropertyById = (id: string): Property | undefined => {
  return properties.find((property) => property.id === id);
};



export function getAllProperties(): Property[] {
  return properties;
}
