import { getCardData } from "./get-card-data";
import FeaturedGigs from "./FeaturedGigs";

export default async function FeaturedGigsServer() {
  const cardData = await getCardData();
  return <FeaturedGigs cardData={cardData} />;
}