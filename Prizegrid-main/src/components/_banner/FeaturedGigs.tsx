"use client";

import { AnimatedCard } from "./animated-card";
import { useEffect, useRef, useState } from "react";
import Marquee from "react-fast-marquee";

interface CardData {
  id: number;
  title: string;
  description: string;
  imageUrl: string;
}

interface FeaturedGigsProps {
  cardData: CardData[];
}

export default function FeaturedGigs({ cardData }: FeaturedGigsProps) {


  return (
    <div className="bg-white flex flex-col items-center justify-start p-0 m-0 overflow-visible">
      <h1 className="text-4xl font-bold mb-8 text-gray-800">Trending Bounties</h1>
      <Marquee
           gradient={false}
           speed={80}
           pauseOnHover={true}
           pauseOnClick={true}
           delay={0}
           play={true}
           direction="left"
           >
      <div
        className="relative w-full h-[500px] flex items-center overflow-hidden"
        style={{ cursor: 'grab' }}
      >
        <div className="flex" style={{ width: "200%" }} >
         
            {cardData.map((data, index) => (
              <AnimatedCard key={index} data={data} className="w-64 flex-shrink-0 mx-4" />
            ))}
         
        </div>
      </div>
      </Marquee>
    </div>
  );
}