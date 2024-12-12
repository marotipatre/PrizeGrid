"use client";

import { AnimatedCard } from "./animated-card";
import { HorizontalScroll } from "./horizontal-scroll";
import { useEffect, useRef, useState } from "react";

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
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);

  useEffect(() => {
    const scrollContainer = scrollContainerRef.current;
    if (!scrollContainer) return;

    let scrollInterval: NodeJS.Timeout;

    const startScrolling = () => {
      scrollInterval = setInterval(() => {
        if (!isDragging) {
          scrollContainer.scrollLeft += 1;
          if (scrollContainer.scrollLeft >= scrollContainer.scrollWidth / 2) {
            scrollContainer.scrollLeft = 0;
          }
        }
      }, 10);
    };

    startScrolling();

    const handleMouseDown = (e: MouseEvent) => {
      setIsDragging(true);
      setStartX(e.pageX - scrollContainer.offsetLeft);
      setScrollLeft(scrollContainer.scrollLeft);
    };

    const handleMouseLeave = () => {
      setIsDragging(false);
    };

    const handleMouseUp = () => {
      setIsDragging(false);
    };

    const handleMouseMove = (e: MouseEvent) => {
      if (!isDragging) return;
      e.preventDefault();
      const x = e.pageX - scrollContainer.offsetLeft;
      const walk = (x - startX) * 2; // Scroll-fast
      scrollContainer.scrollLeft = scrollLeft - walk;
    };

    const handleTouchStart = (e: TouchEvent) => {
      setIsDragging(true);
      setStartX(e.touches[0].pageX - scrollContainer.offsetLeft);
      setScrollLeft(scrollContainer.scrollLeft);
    };

    const handleTouchEnd = () => {
      setIsDragging(false);
    };

    const handleTouchMove = (e: TouchEvent) => {
      if (!isDragging) return;
      const x = e.touches[0].pageX - scrollContainer.offsetLeft;
      const walk = (x - startX) * 2; // Scroll-fast
      scrollContainer.scrollLeft = scrollLeft - walk;
    };

    scrollContainer.addEventListener("mousedown", handleMouseDown);
    scrollContainer.addEventListener("mouseleave", handleMouseLeave);
    scrollContainer.addEventListener("mouseup", handleMouseUp);
    scrollContainer.addEventListener("mousemove", handleMouseMove);
    scrollContainer.addEventListener("touchstart", handleTouchStart);
    scrollContainer.addEventListener("touchend", handleTouchEnd);
    scrollContainer.addEventListener("touchmove", handleTouchMove);

    return () => {
      scrollContainer.removeEventListener("mousedown", handleMouseDown);
      scrollContainer.removeEventListener("mouseleave", handleMouseLeave);
      scrollContainer.removeEventListener("mouseup", handleMouseUp);
      scrollContainer.removeEventListener("mousemove", handleMouseMove);
      scrollContainer.removeEventListener("touchstart", handleTouchStart);
      scrollContainer.removeEventListener("touchend", handleTouchEnd);
      scrollContainer.removeEventListener("touchmove", handleTouchMove);
      clearInterval(scrollInterval);
    };
  }, [isDragging, startX, scrollLeft]);

  return (
    <div className="bg-white flex flex-col items-center justify-start p-0 m-0 overflow-visible">
      <h1 className="text-4xl font-bold mb-8 text-gray-800">Trending Bounties</h1>
      <div
        className="relative w-full h-[500px] flex items-center overflow-hidden"
        ref={scrollContainerRef}
      >
        <div className="flex" style={{ width: "200%" }}>
          <HorizontalScroll>
            {cardData.map((data, index) => (
              <AnimatedCard key={index} data={data} className="w-64 flex-shrink-0 mx-4" />
            ))}
            {cardData.map((data, index) => (
              <AnimatedCard key={index + cardData.length} data={data} className="w-64 flex-shrink-0 mx-4" />
            ))}
          </HorizontalScroll>
        </div>
      </div>
    </div>
  );
}