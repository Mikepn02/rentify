import { Agent, TestimonialSlider } from "@/@types/types";
import { Blog, City, FilterProperty, Property, Service, Testimonial } from "../@types/types";
import { NavLink } from "../@types/types";


export const navLinks: NavLink[] = [
    {
        title: "Home",
        href: "/"
    },
    {
        title: "About",
        href: "/about"
    },
    {
        title: "Services",
        href: "/services"
    },
    {
        title: "Properties",
        href: "/properties"
    },
    {
        title: "Agents",
        href: "/agents"

    },

    {
        title: "Contact",
        href: "/contact"
    },

]

export const filterProperties: FilterProperty[] = [
    {
        title: "Looking For",
        options: [
            {
                label: "Appartment",
                value: "appartment"
            },
            {
                label: "Family House",
                value: "familyHouse"
            },
            {
                label: "Town House",
                value: "townHouse"
            },
            {
                label: "Modern Villa",
                value: "modernVilla"
            }
        ]
    },
    {
        title: "Property Size",
        options: [
            {
                label: "Large",
                value: "large"
            },
            {
                label: "Medium",
                value: "medium"
            },
            {
                label: "Small",
                value: "small"
            },
        ]
    },

    {
        title: "Property Location",
        options: [
            {
                label: "Africa",
                value: "africa"
            },
            {
                label: "USA",
                value: "usa"
            },
            {
                label: "Asia",
                value: "asia"
            },
            {
                label: "Europe",
                value: "europe"
            }
        ]
    },
    {
        title: "Property  Price",
        options: [
            {
                label: "Low(<$1000)",
                value: "low"
            },
            {
                label: "Medium ($1000-$30000)",
                value: "medium"
            },
            {
                label: "High(>$30000)",
                value: "high"
            }
        ]
    },
    {
        title: "Total Rooms",
        options: [
            {
                label: "1",
                value: "1"
            },
            {
                label: "2",
                value: "2"
            },
            {
                label: "3",
                value: "3"
            },
            {
                label: "4",
                value: "4"
            },
            {
                label: "5",
                value: "5"
            },
            {
                label: "6",
                value: "6"
            },
            {
                label: "7",
                value: "7"
            },
            {
                label: "many",
                value: "many"
            }
        ]
    },

    {
        title: "Total Baths",
        options: [
            {
                label: "1",
                value: "1"
            },
            {
                label: "2",
                value: "2"
            },
            {
                label: "3",
                value: "3"
            },
            {
                label: "4",
                value: "4"
            },
            {
                label: "5",
                value: "5"
            },
            {
                label: "6",
                value: "6"
            },
            {
                label: "7",
                value: "7"
            },
            {
                label: "many",
                value: "many"
            }
        ]
    },
]


  
  
export const dummycities: City[] = [
    {
        name: "New York",
        banner: { image: "/images/cities/1.png", _type: "image", asset: "" }
    },
    {
        name: "Los Angeles",
        banner: { image: "/images/cities/1.png", _type: "image", asset: "" }
    },
    {
        name: "San Francisco",
        banner: { image: "/images/cities/1.png", _type: "image", asset: "" }
    },
    {
        name: "Chicago",
        banner: { image: "/images/cities/1.png", _type: "image", asset: "" }
    },
    {
        name: "Miami",
        banner: { image: "/images/cities/1.png", _type: "image", asset: "" }
    }
];

export const dummyblogs: Blog[] = [
    {
        _id: "b1",
        title: "5 Tips for Buying Your First Home",
        category: {
            title: "Real Estate",
            slug: "real-estate"
        },
        banner: "/images/blogs/1.png",
        content: "Here are some tips to help first-time homebuyers make informed decisions...",
        description: "A guide for first-time homebuyers on how to navigate the process.",
        postedBy: {
            _id: "agent1",
            name: "Sarah Johnson",
            profileImage: "/images/agents/1.png",
            role: "Real Estate Agent",
            email: "sarah@example.com",
            phoneNumber: "+1234567890",
            whatsappNumber: "+1234567890",
            about: "Experienced real estate agent helping clients buy and sell homes.",
            socialMedia: [
                { name: "LinkedIn", url: "https://linkedin.com/in/sarahjohnson" },
                { name: "Instagram", url: "https://instagram.com/sarahjohnson" }
            ],
            slug: "sarah-johnson",
            likedBy: ["user1", "user3"],
            comments: []
        },
        publishedAt: "2025-02-22",
        tags: ["home buying", "real estate", "tips"],
        slug: "5-tips-for-buying-your-first-home"
    },
    {
        _id: "b2",
        title: "How to Stage Your Home for a Quick Sale",
        category: {
            title: "Home Staging",
            slug: "home-staging"
        },
        banner: "/images/blogs/1.png",
        content: "Staging your home can make a big difference when it comes to selling fast...",
        description: "Learn how to stage your home to attract buyers and sell quickly.",
        postedBy: {
            _id: "agent2",
            name: "Michael Lee",
            profileImage: "/images/agents/1.png",
            role: "Home Stager",
            email: "michael@example.com",
            phoneNumber: "+1234567891",
            whatsappNumber: "+1234567891",
            about: "A professional home stager with over 5 years of experience.",
            socialMedia: [
                { name: "Facebook", url: "https://facebook.com/michaellee" },
                { name: "Pinterest", url: "https://pinterest.com/michaellee" }
            ],
            slug: "michael-lee",
            likedBy: ["user2", "user4"],
            comments: []
        },
        publishedAt: "2025-02-20",
        tags: ["home staging", "real estate", "selling tips"],
        slug: "how-to-stage-your-home-for-a-quick-sale"
    },
    {
        _id: "b3",
        title: "Understanding the Market: Trends for 2025",
        category: {
            title: "Market Insights",
            slug: "market-insights"
        },
        banner: "/images/blogs/1.png",
        content: "2025 will be an interesting year for real estate market trends. Here's what you need to know...",
        description: "Insights and predictions for the real estate market in 2025.",
        postedBy: {
            _id: "agent3",
            name: "Emily Davis",
            profileImage: "/images/agents/1.png",
            role: "Market Analyst",
            email: "emily@example.com",
            phoneNumber: "+1234567892",
            whatsappNumber: "+1234567892",
            about: "Market analyst providing the latest trends and predictions.",
            socialMedia: [
                { name: "Twitter", url: "https://twitter.com/emilydavis" },
                { name: "YouTube", url: "https://youtube.com/emilydavis" }
            ],
            slug: "emily-davis",
            likedBy: ["user5", "user6"],
            comments: []
        },
        publishedAt: "2025-02-18",
        tags: ["market trends", "real estate", "predictions"],
        slug: "understanding-the-market-trends-for-2025"
    }
];

export const dummytestimonials: Testimonial[] = [
    {
        name: "John Smith",
        profileImage: "/images/agents/1.png",
        role: "Homebuyer",
        testimonial: "This service helped me find my dream home. The team was very professional and supportive throughout the entire process!",
        stars: 5
    },
    {
        name: "Alice Brown",
        profileImage: "/images/agents/2.png",
        role: "Seller",
        testimonial: "Selling my home was a breeze with this real estate agency. They took care of everything and got me an amazing deal!",
        stars: 4
    },
    {
        name: "Mark Wilson",
        profileImage: "/images/agents/4.png",
        role: "Investor",
        testimonial: "I’ve worked with many agents in the past, but these guys really know their stuff. Highly recommend!",
        stars: 5
    },
    {
        name: "Jennifer Lee",
        profileImage: "/images/agents/1.png",
        role: "Tenant",
        testimonial: "Finding a rental property was so easy thanks to their services. The team was friendly and efficient!",
        stars: 4
    },
    {
        name: "Paul Harris",
        profileImage: "/images/agents/2.png",
        role: "Homebuyer",
        testimonial: "A fantastic experience from start to finish. They really took the time to understand my needs and delivered above expectations.",
        stars: 5
    }
];
    

export const dummyGalleryImages = [
    { bannerImage: "/images/properties/gallery/1.png" },
    { bannerImage: "/images/properties/gallery/2.png" },
    { bannerImage: "/images/properties/gallery/3.png" },
    { bannerImage: "/images/properties/gallery/4.png" },
    { bannerImage: "/images/properties/gallery/5.png" },
    { bannerImage: "/images/properties/gallery/6.png" },
  ];



  export const dummyServices: Service[] = [
    {
      name: "Property Management",
      description: "We offer comprehensive property management services to ensure your property is well-maintained and profitable.",
      banner: "/images/services/1.png",
      slug: "property-management",
    },
    {
      name: "Real Estate Consulting",
      description: "Our experts provide professional real estate consulting services to help you make informed decisions.",
      banner: "/images/services/2.png",
      slug: "real-estate-consulting",
    },
    {
      name: "Home Staging",
      description: "We provide home staging services to make your property more attractive to potential buyers.",
      banner: "/images/services/3.png",
      slug: "home-staging",
    },
    {
      name: "Mortgage Assistance",
      description: "Our team offers mortgage assistance services to help you secure the best financing options.",
      banner: "/images/services/4.png",
      slug: "mortgage-assistance",
    },
    {
      name: "Legal Services",
      description: "We provide legal services to ensure all your real estate transactions are legally sound.",
      banner: "/images/services/5.png",
      slug: "legal-services",
    },
  ];


  export const dummyAgents: Agent[] = [
    {
      _id: "1",
      name: "John Doe",
      profileImage: "/images/agents/1.png",
      role: "Senior Agent",
      email: "john.doe@example.com",
      phoneNumber: "+1234567890",
      whatsappNumber: "+1234567890",
      about: "Experienced real estate agent with over 10 years in the industry.",
      socialMedia: [
        { name: "Facebook", url: "https://facebook.com/johndoe" },
        { name: "Twitter", url: "https://twitter.com/johndoe" },
        { name: "LinkedIn", url: "https://linkedin.com/in/johndoe" },
      ],
      slug: "john-doe",
      likedBy: ["user1", "user2"],
      comments: [
        {
          commentedBy: "user1",
          body: "Great agent!",
          _id: "comment1",
        },
      ],
    },
    {
      _id: "2",
      name: "Jane Smith",
      profileImage: "/images/agents/2.png",
      role: "Real Estate Consultant",
      email: "jane.smith@example.com",
      phoneNumber: "+1234567891",
      whatsappNumber: "+1234567891",
      about: "Specializes in residential properties and first-time homebuyers.",
      socialMedia: [
        { name: "Facebook", url: "https://facebook.com/janesmith" },
        { name: "Twitter", url: "https://twitter.com/janesmith" },
        { name: "LinkedIn", url: "https://linkedin.com/in/janesmith" },
      ],
      slug: "jane-smith",
      likedBy: ["user3", "user4"],
      comments: [
        {
          commentedBy: "user3",
          body: "Very helpful!",
          _id: "comment2",
        },
      ],
    },
    {
      _id: "3",
      name: "Michael Johnson",
      profileImage: "/images/agents/3.png",
      role: "Commercial Real Estate Expert",
      email: "michael.johnson@example.com",
      phoneNumber: "+1234567892",
      whatsappNumber: "+1234567892",
      about: "Expert in commercial real estate and investment properties.",
      socialMedia: [
        { name: "Facebook", url: "https://facebook.com/michaeljohnson" },
        { name: "Twitter", url: "https://twitter.com/michaeljohnson" },
        { name: "LinkedIn", url: "https://linkedin.com/in/michaeljohnson" },
      ],
      slug: "michael-johnson",
      likedBy: ["user5", "user6"],
      comments: [
        {
          commentedBy: "user5",
          body: "Highly recommended!",
          _id: "comment3",
        },
      ],
    },
    {
      _id: "4",
      name: "Emily Davis",
      profileImage: "/images/agents/4.png",
      role: "Customer Service Specialist",
      email: "emily.davis@example.com",
      phoneNumber: "+1234567893",
      whatsappNumber: "+1234567893",
      about: "Known for exceptional customer service and attention to detail.",
      socialMedia: [
        { name: "Facebook", url: "https://facebook.com/emilydavis" },
        { name: "Twitter", url: "https://twitter.com/emilydavis" },
        { name: "LinkedIn", url: "https://linkedin.com/in/emilydavis" },
      ],
      slug: "emily-davis",
      likedBy: ["user7", "user8"],
      comments: [
        {
          commentedBy: "user7",
          body: "Very professional!",
          _id: "comment4",
        },
      ],
    },
    {
      _id: "5",
      name: "David Brown",
      profileImage: "/images/agents/5.png",
      role: "Market Analyst",
      email: "david.brown@example.com",
      phoneNumber: "+1234567894",
      whatsappNumber: "+1234567894",
      about: "Skilled negotiator with a deep understanding of the local market.",
      socialMedia: [
        { name: "Facebook", url: "https://facebook.com/davidbrown" },
        { name: "Twitter", url: "https://twitter.com/davidbrown" },
        { name: "LinkedIn", url: "https://linkedin.com/in/davidbrown" },
      ],
      slug: "david-brown",
      likedBy: ["user9", "user10"],
      comments: [
        {
          commentedBy: "user9",
          body: "Great insights!",
          _id: "comment5",
        },
      ],
    },
  ];


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
      description: "Stunning oceanfront villa with panoramic views of the Pacific. This modern retreat features floor-to-ceiling windows, a private infinity pool, and direct beach access. Perfect for luxury getaways and special occasions.",
      amenities: ["Ocean View", "Private Pool", "Beach Access", "Modern Kitchen", "Home Theater", "Free Parking", "Wi-Fi", "Air Conditioning"],
      images: [
        "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?q=80&w=2075&auto=format&fit=crop",
        "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?q=80&w=2070&auto=format&fit=crop",
        "https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?q=80&w=2070&auto=format&fit=crop"
      ],
      available: true
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
      description: "Stylish loft in the heart of Manhattan. This contemporary space features high ceilings, industrial-chic design, and state-of-the-art amenities. Walking distance to premium restaurants, theaters, and shopping.",
      amenities: ["City View", "Gym Access", "Doorman", "Smart Home", "Washer/Dryer", "Wi-Fi", "Air Conditioning", "Pet Friendly"],
      images: [
        "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?q=80&w=2070&auto=format&fit=crop",
        "https://images.unsplash.com/photo-1630699144339-420f59b4747a?q=80&w=2070&auto=format&fit=crop",
        "https://images.unsplash.com/photo-1512918728675-ed5a9ecdebfd?q=80&w=2070&auto=format&fit=crop"
      ],
      available: true
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
      description: "Cozy mountain cabin with breathtaking views. This rustic-luxury property features a stone fireplace, hot tub, and wraparound deck. Perfect for ski trips, hiking adventures, or peaceful mountain getaways.",
      amenities: ["Mountain View", "Hot Tub", "Fireplace", "Ski Storage", "Hiking Trails", "Free Parking", "Wi-Fi", "Heating"],
      images: [
        "https://images.unsplash.com/photo-1542718610-a1d656d1884c?q=80&w=2070&auto=format&fit=crop",
        "https://images.unsplash.com/photo-1520984032042-162d526883e0?q=80&w=2070&auto=format&fit=crop",
        "https://images.unsplash.com/photo-1470770841072-f978cf4d019e?q=80&w=2070&auto=format&fit=crop"
      ],
      available: true
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
      description: "Magnificent Mediterranean-style estate with direct beach access. This luxurious property features a grand foyer, chef's kitchen, private pool, and lush tropical gardens. Perfect for entertaining and beach vacations.",
      amenities: ["Beach Access", "Private Pool", "Garden", "Chef's Kitchen", "Home Office", "Free Parking", "Wi-Fi", "Air Conditioning"],
      images: [
        "https://images.unsplash.com/photo-1613977257363-707ba9348227?q=80&w=2070&auto=format&fit=crop",
        "https://images.unsplash.com/photo-1613977257592-4a9a464364e0?q=80&w=2070&auto=format&fit=crop",
        "https://images.unsplash.com/photo-1615874959474-d609969a20ed?q=80&w=2070&auto=format&fit=crop"
      ],
      available: true
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
      description: "Contemporary desert home with stunning architecture. This minimalist property features clean lines, a private courtyard with plunge pool, and floor-to-ceiling windows showcasing the breathtaking desert landscape.",
      amenities: ["Desert View", "Plunge Pool", "Outdoor Shower", "Modern Design", "Patio", "Free Parking", "Wi-Fi", "Air Conditioning"],
      images: [
        "https://images.unsplash.com/photo-1580587771525-78b9dba3b914?q=80&w=2074&auto=format&fit=crop",
        "https://images.unsplash.com/photo-1583608205776-bfd35f0d9f83?q=80&w=2070&auto=format&fit=crop",
        "https://images.unsplash.com/photo-1605276374104-dee2a0ed3cd6?q=80&w=2070&auto=format&fit=crop"
      ],
      available: true
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
      description: "Charming brownstone with historic character and modern amenities. This elegant property features original woodwork, high ceilings, updated kitchen, and a private garden patio. Located in a sought-after historic district.",
      amenities: ["Historic Features", "Garden Patio", "Modern Kitchen", "Fireplace", "Near Public Transit", "Free Parking", "Wi-Fi", "Heating"],
      images: [
        "https://images.unsplash.com/photo-1567496898669-ee935f5f647a?q=80&w=2071&auto=format&fit=crop",
        "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?q=80&w=2070&auto=format&fit=crop",
        "https://images.unsplash.com/photo-1605146769289-440113cc3d00?q=80&w=2070&auto=format&fit=crop"
      ],
      available: true
    }
  ];
  
export const testimonials: TestimonialSlider[] = [
    {
      testimonial:
        "The app has completely transformed the way we manage our properties. The user interface is intuitive and the features are exactly what we need. It has saved us so much time and effort.",
      name: "Alice Johnson",
      role: "Property Manager, Real Estate Co.",
      image: "/images/properties/12.jpg"
    },
    {
      testimonial:
        "I have been using this app for a few months now and I am extremely satisfied with its performance. The customer support is also excellent, always ready to help with any issues.",
      name: "Michael Brown",
      role: "CEO, Brown Enterprises",
      image: "/images/properties/13.png"
    },
    {
      testimonial:
        "This app is a game-changer for our business. The ease of use and the comprehensive features make it an indispensable tool for managing our properties. Highly recommended!",
      name: "Sarah Williams",
      role: "Operations Manager, Property Solutions",
      image: "/images/properties/1.png"
    },
    {
      testimonial:
        "I love how user-friendly this app is. It has all the features we need to manage our properties efficiently. The regular updates and new features keep getting better and better.",
      name: "David Smith",
      role: "Owner, Smith Properties",
      image: "/images/properties/14.jpg"
    },
  ];