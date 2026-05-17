export const hostels = [
  {
    id: 1,
    name: "Sunrise Hostel",
    location: "Cape Coast",
    nearSchool: "University of Cape Coast",
    price: 2500,
    period: "year",
    rating: 4.5,
    reviews: 128,
    images: [
      "https://images.unsplash.com/photo-1555854877-bab0e564b8d5?w=400",
      "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=400",
      "https://images.unsplash.com/photo-1502672260266-1c1ef2d93636?w=400"
    ],
    description: "Modern hostel with 24/7 security, WiFi, and study rooms. Perfect for UCC students.",
    facilities: ["WiFi", "Security", "Study Room", "Kitchen", "Laundry", "Parking"],
    rules: ["No smoking", "No pets", "Quiet hours 10PM-6AM", "Visitors until 8PM"],
    roomTypes: ["Single", "Double", "4-Bed Shared"],
    distance: "0.8km from UCC",
    contact: { phone: "+233 24 123 4567", whatsapp: "+233 24 123 4567", email: "sunrise@staynear.com" },
    owner: "Mr. Kwame Asante",
    available: true,
    coordinates: { lat: 5.1053, lng: -1.2466 }
  },
  {
    id: 2,
    name: "Ocean View Hostel",
    location: "Accra",
    nearSchool: "University of Ghana",
    price: 3200,
    period: "year",
    rating: 4.8,
    reviews: 96,
    images: [
      "https://images.unsplash.com/photo-1566073771259-6a8506099945?w=400",
      "https://images.unsplash.com/photo-1582719508461-905c673771fd?w=400"
    ],
    description: "Premium hostel near Legon with ocean views, gym, and rooftop lounge.",
    facilities: ["WiFi", "Gym", "Rooftop", "AC", "Kitchen", "Laundry", "Parking", "CCTV"],
    rules: ["No smoking indoors", "No loud music after 11PM", "ID required for visitors"],
    roomTypes: ["Single", "Double", "Suite"],
    distance: "1.2km from UG",
    contact: { phone: "+233 20 987 6543", whatsapp: "+233 20 987 6543", email: "oceanview@staynear.com" },
    owner: "Mrs. Abena Mensah",
    available: true,
    coordinates: { lat: 5.6500, lng: -0.1800 }
  },
  {
    id: 3,
    name: "Campus Heights",
    location: "Kumasi",
    nearSchool: "KNUST",
    price: 1800,
    period: "year",
    rating: 4.2,
    reviews: 215,
    images: [
      "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=400",
      "https://images.unsplash.com/photo-1502005229762-cf1b2da7c5d6?w=400"
    ],
    description: "Affordable student hostel with shared spaces and community events.",
    facilities: ["WiFi", "Common Room", "Kitchen", "Laundry"],
    rules: ["No pets", "Clean shared spaces", "Respect quiet hours"],
    roomTypes: ["4-Bed Shared", "6-Bed Shared"],
    distance: "0.5km from KNUST",
    contact: { phone: "+233 54 111 2222", whatsapp: "+233 54 111 2222", email: "campus@staynear.com" },
    owner: "Dr. Yaw Boateng",
    available: true,
    coordinates: { lat: 6.6745, lng: -1.5716 }
  },
  {
    id: 4,
    name: "Elite Residence",
    location: "Accra",
    nearSchool: "Central University",
    price: 4500,
    period: "year",
    rating: 4.9,
    reviews: 64,
    images: [
      "https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?w=400",
      "https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=400"
    ],
    description: "Luxury hostel with private balconies, smart TVs, and concierge service.",
    facilities: ["WiFi", "AC", "Smart TV", "Balcony", "Gym", "Pool", "Parking", "CCTV"],
    rules: ["No parties", "No pets", "Professional environment"],
    roomTypes: ["Single", "Double", "Studio"],
    distance: "2.0km from Central University",
    contact: { phone: "+233 27 333 4444", whatsapp: "+233 27 333 4444", email: "elite@staynear.com" },
    owner: "Ms. Sandra Osei",
    available: false,
    coordinates: { lat: 5.7000, lng: -0.1500 }
  },
  {
    id: 5,
    name: "Scholar's Nest",
    location: "Tamale",
    nearSchool: "University for Development Studies",
    price: 1500,
    period: "year",
    rating: 4.0,
    reviews: 89,
    images: [
      "https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?w=400"
    ],
    description: "Budget-friendly hostel with all essentials for focused students.",
    facilities: ["WiFi", "Study Area", "Kitchen", "Water Supply"],
    rules: ["No smoking", "Study priority", "Shared responsibilities"],
    roomTypes: ["Double", "4-Bed Shared"],
    distance: "1.5km from UDS",
    contact: { phone: "+233 24 555 6666", whatsapp: "+233 24 555 6666", email: "scholars@staynear.com" },
    owner: "Mr. Ibrahim Mohammed",
    available: true,
    coordinates: { lat: 9.4000, lng: -0.8500 }
  },
  {
    id: 6,
    name: "Green Valley Hostel",
    location: "Cape Coast",
    nearSchool: "Cape Coast Technical University",
    price: 2200,
    period: "year",
    rating: 4.3,
    reviews: 156,
    images: [
      "https://images.unsplash.com/photo-1598928506311-c55ded91a20c?w=400",
      "https://images.unsplash.com/photo-1493809842364-78817add7ffb?w=400"
    ],
    description: "Eco-friendly hostel with garden spaces and solar power.",
    facilities: ["WiFi", "Solar Power", "Garden", "Kitchen", "Laundry", "Bicycle Storage"],
    rules: ["Eco-friendly practices", "No plastic waste", "Respect nature"],
    roomTypes: ["Single", "Double", "4-Bed Shared"],
    distance: "1.0km from CCTU",
    contact: { phone: "+233 26 777 8888", whatsapp: "+233 26 777 8888", email: "greenvalley@staynear.com" },
    owner: "Ms. Akosua Green",
    available: true,
    coordinates: { lat: 5.1100, lng: -1.2500 }
  }
]

export const categories = [
  { id: 'all', name: 'All', icon: 'LayoutGrid' },
  { id: 'budget', name: 'Budget', icon: 'Wallet' },
  { id: 'premium', name: 'Premium', icon: 'Crown' },
  { id: 'near-campus', name: 'Near Campus', icon: 'GraduationCap' },
  { id: 'shared', name: 'Shared', icon: 'Users' },
  { id: 'single', name: 'Single', icon: 'User' }
]

export const schools = [
  "University of Ghana",
  "University of Cape Coast", 
  "KNUST",
  "Central University",
  "University for Development Studies",
  "Cape Coast Technical University"
]

export const locations = ["Accra", "Cape Coast", "Kumasi", "Tamale", "Legon", "KNUST"]
