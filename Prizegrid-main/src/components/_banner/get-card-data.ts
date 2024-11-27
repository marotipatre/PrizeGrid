import { cache } from 'react'

export interface CardData {
  id: number
  title: string
  description: string
  imageUrl: string
}

export const getCardData = cache(async (): Promise<CardData[]> => {
  // In a real application, you would fetch this data from an API
  // For this example, we'll return mock data
  return [
    {
      id: 1,
      title: "Mountain Retreat",
      description: "Experience the serenity of nature in our mountain cabin.",
      imageUrl: "https://res.cloudinary.com/dmebegin1/image/upload/v1732649956/Untitled_design_5_p74g6w.png"
    },
    {
      id: 2,
      title: "Beach Paradise",
      description: "Relax on pristine beaches with crystal clear waters.",
      imageUrl: "https://res.cloudinary.com/dmebegin1/image/upload/v1732649956/Untitled_design_5_p74g6w.png"
    },
    {
      id: 3,
      title: "City Adventure",
      description: "Explore vibrant city life with endless entertainment options.",
      imageUrl: "https://res.cloudinary.com/dmebegin1/image/upload/v1732649956/Untitled_design_5_p74g6w.png"
    },
    {
      id: 4,
      title: "Historical Journey",
      description: "Step back in time and discover rich cultural heritage.",
      imageUrl: "https://res.cloudinary.com/dmebegin1/image/upload/v1732649956/Untitled_design_5_p74g6w.png"
    },
    {
      id: 5,
      title: "Culinary Delights",
      description: "Indulge in exquisite cuisines from around the world.",
      imageUrl: "https://res.cloudinary.com/dmebegin1/image/upload/v1732649956/Untitled_design_5_p74g6w.png"
    }
  ]
})

