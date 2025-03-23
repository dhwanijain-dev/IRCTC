'use client'
import * as React from "react"

import { Card, CardContent } from "@/components/ui/card"
import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
} from "@/components/ui/carousel"
import AutoScroll from "embla-carousel-auto-scroll"
import { Testimonials } from "./Testimonials"


export function Carousal() {
    return (
        <Carousel className="w-screen"
            opts={{loop:true}}
            plugins={[
                AutoScroll({
                    playOnInit: true,
                    stopOnInteraction:false,
                    stopOnFocusIn:false,
                    stopOnMouseEnter:false,
                    
                    
                }),
               
            ]}
        >
            <CarouselContent className="-ml-1 ">
                {Array.from({ length: 5 }).map((_, index) => (
                    <CarouselItem key={index} className="pl-1 md:basis-1/2 lg:basis-1/3 " >
                        <div className="p-1 ">
                            <Card className="border-none shadow-none">
                                <CardContent className="flex   aspect-square items-center justify-center p-6">
                                    {/* <span className="text-2xl font-semibold">{index + 1}</span> */}
                                    <Testimonials/>
                                </CardContent>
                            </Card>
                        </div>
                    </CarouselItem>
                ))}
            </CarouselContent>
            <CarouselPrevious />
            <CarouselNext />
        </Carousel>
    )
}
