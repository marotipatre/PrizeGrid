"use client"

import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
} from "@/components/ui/carousel"
import Image from "next/image"

export default function FeaturedGigs() {
    return (
        <div id="feature-gigs" className='w-screen h-[70vh] flex justify-center items-center flex-col mb-24 -mt-[200px]' >
            <h1 className='text-3xl text-slate-800 text-center mb-16'>Featured Gigs</h1>
            <Carousel>
                <CarouselContent>
                    <CarouselItem className="md:basis-1/2 lg:basis-1/3">
                        <div className="w-[400px] border-2 rounded-lg border-slate-900 bg-slate-100 h-auto p-4">
                            <h1 className="text-slate-800 text-xl my-2">Aptos Twitter Thread</h1>
                            <h2 className="text-slate-600 text-base my-2 mb-4">by - Aptos</h2>
                            <div className="w-full bg-slate-200 rounded-lg p-2 flex justify-center items-center my-2">
                            
                            </div>
                            <h1 className="text-slate-900 text-2xl text-center mt-6 mb-4">100 APT</h1>
                        </div>
                    </CarouselItem>
                    <CarouselItem className="md:basis-1/2 lg:basis-1/3">
                        <div className="w-[400px] border-2 rounded-lg border-slate-900 bg-slate-100 h-auto p-4">
                            <h1 className="text-slate-800 text-xl my-2">Aptos Cellana Thread</h1>
                            <h2 className="text-slate-600 text-base my-2 mb-4">by - Aptos</h2>
                            <div className="w-full bg-slate-200 rounded-lg p-2 flex justify-center items-center my-2">
                               
                            </div>
                            <h1 className="text-slate-900 text-2xl text-center mt-6 mb-4">50 APT</h1>
                        </div>
                    </CarouselItem>
                    <CarouselItem className="md:basis-1/2 lg:basis-1/3">
                        <div className="w-[400px] border-2 rounded-lg border-slate-900 bg-slate-100 h-auto p-4">
                            <h1 className="text-slate-800 text-xl my-2">Aptos Stan Thread</h1>
                            <h2 className="text-slate-600 text-base my-2 mb-4">by - Aptos</h2>
                            <div className="w-full bg-slate-200 rounded-lg p-2 flex justify-center items-center my-2">
                              
                            </div>
                            <h1 className="text-slate-900 text-2xl text-center mt-6 mb-4">200 APT</h1>
                        </div>
                    </CarouselItem>
                </CarouselContent>
            </Carousel>
        </div>
    )
}