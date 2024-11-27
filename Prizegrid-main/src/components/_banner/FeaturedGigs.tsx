
import { AnimatedCard } from "./animated-card"
import { HorizontalScroll } from "./horizontal-scroll"
import { getCardData } from "./get-card-data"

export default async function FeaturedGigs() {
    const cardData = await getCardData()
    return (
        <div className=" bg-white flex flex-col items-center justify-start p-0 m-0 overflow-visible">
          <h1 className="text-4xl font-bold mb-8 text-gray-800">Trending Bounties</h1>
          <div className="relative w-full h-[500px] flex items-center overflow-visible">
          <HorizontalScroll>
            {cardData.map((data) => (
              <AnimatedCard key={data.id} data={data} className="w-64 flex-shrink-0 mx-4" />
            ))}
          </HorizontalScroll>
          </div>
        </div>
      )
}