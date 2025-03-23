"use client";

import Image from "next/image";
import React from "react";
// import { CardBody, CardContainer, CardItem } from "../ui/3d-card";
import Link from "next/link";
import { CardBody, CardContainer, CardItem } from "@/components/ui/3d-card";
// import image from './avatar.png'
export function Testimonials() {
    return (
        <CardContainer className="inter-var">
            <CardBody className="bg-gray-50  relative group/card  dark:hover:shadow-2xl dark:hover:shadow-emerald-500/[0.1] dark:bg-black dark:border-white/[0.2] border-black/[0.1] w-auto sm:w-[30rem] h-auto rounded-3xl p-6 border  ">
                <CardItem>
                    <Image
                        src='/pictures/avatar.svg'
                       alt="Avatar"
                       width={100}
                       height={100}
                    />
                </CardItem>
                <CardItem translateZ="50">
                    <h1>Ramesh Kumar</h1>
                </CardItem>
                <CardItem translateZ="100" className="w-full mt-4">
                    <h1>
                        Smooth and Hassle-Free Booking!
                    </h1>
                    <p>
                        I’ve been using IRCTC for years, and it keeps getting better! The app is so user-friendly, and I love how quickly I can book tickets. The e-ticket feature is a lifesaver. Kudos to the team for making travel so convenient!
                    </p>
                </CardItem>
                <div className="flex justify-between items-center mt-20">
                    <CardItem
                        translateZ={50}
                        as={Link}
                        href="https://twitter.com/mannupaaji"
                        target="__blank"
                        className="px-4 py-2 rounded-xl  font-normal text-4xl dark:text-white"
                    >
                        ⭐⭐⭐⭐⭐
                    </CardItem>
                    
                </div>
            </CardBody>
        </CardContainer>
    );
}
