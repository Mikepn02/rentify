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
    {
        title: "Testimonails",
        href: "/testimonials"
    },
    {
        title: "Blogs",
        href: '/blogs'
    },
    {
        title: "Partners",
        href: '/agencies'
    },
    {
        title: 'Pricing',
        href: '/pricing'
    },
    {
        title: "FAQ",
        href: '/faq'
    },
    {
        title: 'Gallery',
        href: '/gallery'
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

export const dummyProperties: Property[] = [
    {
        _id: "1",
        name: "Oceanview Villa",
        price: 2500000,
        overview: "A stunning villa with breathtaking ocean views.",
        bannerImage: "/images/properties/1.png",
        address: {
            _type: "Address",
            lat: 34.0522,
            long: -118.2437
        },
        features: [
            { name: 1, value: 5, icon: "🌊" },
            { name: 2, value: 4, icon: "🏖️" },
            { name: 3, value: 2, icon: "🛥️" }
        ],
        gallery: [
            { image: "/images/properties/2.png", _type: "image", asset: "" },
            { image: "/images/properties/2.png", _type: "image", asset: "" },
            { image: "/images/properties/2.png", _type: "image", asset: "" },
            { image: "/images/properties/2.png", _type: "image", asset: "" },
            { image: "/images/properties/2.png", _type: "image", asset: "" },
            { image: "/images/properties/2.png", _type: "image", asset: "" },
            { image: "/images/properties/2.png", _type: "image", asset: "" }
        ],
        slug: "oceanview-villa",
        status: "forSale",
        videos: [
            { banner: "/images/properties/1.png", url: "https://youtube.com/oceanview-villa" }
        ],
        likedBy: ["user1", "user3"]
    },
    {
        _id: "2",
        name: "City Penthouse",
        price: 3500000,
        overview: "A luxurious penthouse located in the heart of the city.",
        bannerImage: "/images/properties/1.png",
        address: {
            _type: "Address",
            lat: 40.7128,
            long: -74.0060
        },
        features: [
            { name: 1, value: 5, icon: "🌆" },
            { name: 2, value: 5, icon: "🛋️" },
            { name: 3, value: 3, icon: "🏢" }
        ],
        gallery: [
            { image: "/images/properties/2.png", _type: "image", asset: "" },
            { image: "/images/properties/2.png", _type: "image", asset: "" }
        ],
        slug: "city-penthouse",
        status: "sold",
        videos: [
            { banner: "/images/properties/1.png", url: "https://youtube.com/city-penthouse" }
        ],
        likedBy: ["user2", "user4"]
    },
    {
        _id: "3",
        name: "Mountain Retreat",
        price: 1500000,
        overview: "A peaceful retreat nestled in the mountains.",
        bannerImage: "/images/properties/1.png",
        address: {
            _type: "Address",
            lat: 39.7392,
            long: -104.9903
        },
        features: [
            { name: 1, value: 4, icon: "🏞️" },
            { name: 2, value: 5, icon: "🏕️" },
            { name: 3, value: 4, icon: "🔥" }
        ],
        gallery: [
            { image: "/images/properties/2.png", _type: "image", asset: "" },
            { image: "/images/properties/2.png", _type: "image", asset: "" }
        ],
        slug: "mountain-retreat",
        status: "forSale",
        videos: [
            { banner: "/images/properties/1.png", url: "https://youtube.com/mountain-retreat" }
        ],
        likedBy: ["user3", "user5"]
    },
    {
        _id: "4",
        name: "Modern Loft",
        price: 1800000,
        overview: "A stylish loft with modern amenities.",
        bannerImage: "/images/properties/1.png",
        address: {
            _type: "Address",
            lat: 41.8781,
            long: -87.6298
        },
        features: [
            { name: 1, value: 4, icon: "🏙️" },
            { name: 2, value: 3, icon: "🛁" },
            { name: 3, value: 5, icon: "🎨" }
        ],
        gallery: [
            { image: "/images/properties/2.png", _type: "image", asset: "" },
            { image: "/images/properties/2.png", _type: "image", asset: "" }
        ],
        slug: "modern-loft",
        status: "available",
        videos: [
            { banner: "/images/properties/1.png", url: "https://youtube.com/modern-loft" }
        ],
        likedBy: ["user1", "user5"]
    },
    {
        _id: "5",
        name: "Suburban Home",
        price: 950000,
        overview: "A cozy home perfect for a small family.",
        bannerImage: "/images/properties/1.png",
        address: {
            _type: "Address",
            lat: 36.1699,
            long: -115.1398
        },
        features: [
            { name: 1, value: 4, icon: "🏠" },
            { name: 2, value: 3, icon: "🛏️" },
            { name: 3, value: 4, icon: "🌳" }
        ],
        gallery: [
            { image: "/images/properties/2.png", _type: "image", asset: "" },
            { image: "/images/properties/2.png", _type: "image", asset: "" }
        ],
        slug: "suburban-home",
        status: "pending",
        videos: [
            { banner: "/images/properties/1.png", url: "https://youtube.com/suburban-home" }
        ],
        likedBy: ["user4", "user6"]
    }
];


  
  
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