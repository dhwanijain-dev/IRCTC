'use client';
import { HoverEffect } from "@/components/ui/card-hover-effect";
import { useEffect, useState } from "react";

export function Holidays() {
    const [isMobile, setIsMobile] = useState(false);

    useEffect(() => {
        const handleResize = () => {
            setIsMobile(window.innerWidth < 768);
        };

        handleResize();
        window.addEventListener("resize", handleResize);

        return () => {
            window.removeEventListener("resize", handleResize);
        };
    }, []);

    const items = isMobile ? projects.slice(0, 3) : projects;

    return (
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
            <HoverEffect items={items} />
        </div>
    );
}

export const projects = [
    {
        title: "Easy Ticket Booking",
        description: "Book your train tickets easily and quickly with our user-friendly platform.",
        link: "https://booking.example.com",
    },
    {
        title: "Real-Time Train Tracking",
        description: "Track your train in real-time and stay updated with its current status.",
        link: "https://tracking.example.com",
    },
    {
        title: "Secure Payments",
        description: "Make secure payments with our trusted and reliable payment gateway.",
        link: "https://payments.example.com",
    },
    {
        title: "Comfortable Journey",
        description: "Enjoy a comfortable journey with our well-maintained and clean trains.",
        link: "https://journey.example.com",
    },
    {
        title: "Customer Support",
        description: "Get 24/7 customer support for all your queries and concerns.",
        link: "https://support.example.com",
    },
    {
        title: "Special Offers",
        description: "Avail special offers and discounts on train tickets and services.",
        link: "https://offers.example.com",
    },
];