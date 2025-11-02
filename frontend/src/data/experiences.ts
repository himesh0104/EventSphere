import { cafeImage, yogaImage, artImage, hikingImage, cookingImage, spaImage, heroImage } from "@/assets/images";

export interface Experience {
  id: string;
  title: string;
  description: string;
  longDescription: string;
  image: string;
  price: number;
  location: string;
  duration: string;
  category: string;
}

export const experiences: Experience[] = [
  {
    id: "cozy-cafe-experience",
    title: "Cozy Café & Coffee Tasting",
    description:
      "Immerse yourself in the warmth of artisan coffee and delightful pastries in a charming café setting.",
    longDescription:
      "Step into a world of rich aromas and cozy ambiance. This experience offers you the chance to taste handcrafted coffee blends prepared by expert baristas, paired with freshly baked pastries. Learn about coffee origins, brewing techniques, and enjoy meaningful conversations in a space designed for connection and comfort.",
    image: cafeImage,
    price: 35,
    location: "Downtown Arts District",
    duration: "2 hours",
    category: "Food & Drink",
  },
  {
    id: "mindful-yoga-session",
    title: "Mindful Yoga & Meditation",
    description:
      "Find peace and balance through gentle yoga flows and guided meditation in a serene studio.",
    longDescription:
      "Reconnect with yourself in this calming yoga and meditation session. Perfect for all levels, this experience combines gentle stretching, breathwork, and mindfulness practices to help you release stress and find inner peace. The studio's tranquil atmosphere and soft natural light create the perfect space for self-care and renewal.",
    image: yogaImage,
    price: 40,
    location: "Peaceful Wellness Center",
    duration: "90 minutes",
    category: "Wellness",
  },
  {
    id: "creative-art-workshop",
    title: "Creative Art Workshop",
    description:
      "Unleash your creativity in a vibrant studio space with guidance from professional artists.",
    longDescription:
      "Discover your inner artist in this hands-on creative workshop. Whether you're a beginner or experienced, you'll be guided through painting, drawing, or mixed media techniques in a supportive and inspiring environment. All materials are provided, and you'll leave with your own unique artwork and newfound confidence in your creative abilities.",
    image: artImage,
    price: 55,
    location: "Creative Arts Studio",
    duration: "3 hours",
    category: "Arts & Culture",
  },
  {
    id: "nature-hiking-adventure",
    title: "Golden Hour Nature Hike",
    description:
      "Experience the magic of nature during golden hour on scenic trails with breathtaking views.",
    longDescription:
      "Join us for an unforgettable hike through pristine trails as the sun casts its golden glow across the landscape. This guided experience takes you through scenic routes with stunning mountain views, peaceful forests, and opportunities to connect with nature. Perfect for photography enthusiasts and anyone seeking tranquility in the great outdoors.",
    image: hikingImage,
    price: 45,
    location: "Mountain View Trail",
    duration: "3 hours",
    category: "Outdoor",
  },
  {
    id: "culinary-cooking-class",
    title: "Gourmet Cooking Class",
    description:
      "Learn to create delicious dishes from scratch in a professional kitchen with expert chefs.",
    longDescription:
      "Embark on a culinary journey in this immersive cooking class. Under the guidance of professional chefs, you'll learn essential techniques, knife skills, and the art of flavor pairing. Prepare a complete meal from appetizer to dessert using fresh, seasonal ingredients. Best of all, you'll enjoy the fruits of your labor together with fellow food lovers.",
    image: cookingImage,
    price: 75,
    location: "Culinary Institute Kitchen",
    duration: "3.5 hours",
    category: "Food & Drink",
  },
  {
    id: "luxury-spa-retreat",
    title: "Luxury Spa & Relaxation",
    description:
      "Indulge in ultimate relaxation with premium spa treatments in an elegant, peaceful sanctuary.",
    longDescription:
      "Treat yourself to a luxurious spa experience designed to rejuvenate your body and mind. This comprehensive package includes a soothing massage, aromatherapy session, and access to tranquil relaxation areas. The elegant spa environment, soft lighting, and gentle music create the perfect atmosphere for complete relaxation and self-care.",
    image: spaImage,
    price: 120,
    location: "Serenity Spa & Wellness",
    duration: "2.5 hours",
    category: "Wellness",
  },
];
