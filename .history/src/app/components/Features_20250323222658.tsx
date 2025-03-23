"use client";

import { Box, Lock, Search, Settings, Sparkles } from "lucide-react";
import { GlowingEffect } from "@/components/ui/glowing-effect";
import { useEffect, useState } from "react";

export function Features() {
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

    const items = isMobile ? mobileItems : allItems;

    return (
        <ul className="grid grid-cols-1 gap-4 md:grid-cols-12 md:grid-rows-3 lg:gap-4 xl:max-h-[34rem] xl:grid-rows-2">
            {items.map((item, index) => (
                <GridItem
                    key={index}
                    area={item.area}
                    icon={item.icon}
                    title={item.title}
                    description={item.description}
                />
            ))}
        </ul>
    );
}

const allItems = [
    {
        area: "md:[grid-area:1/1/2/7] xl:[grid-area:1/1/2/5]",
        icon: <Box className="h-4 w-4 text-black dark:text-neutral-400" />,
        title: "Easy Ticket Booking",
        description: "Book your train tickets easily and quickly with our user-friendly platform.",
    },
    {
        area: "md:[grid-area:1/7/2/13] xl:[grid-area:2/1/3/5]",
        icon: <Settings className="h-4 w-4 text-black dark:text-neutral-400" />,
        title: "Real-Time Train Tracking",
        description: "Track your train in real-time and stay updated with its current status.",
    },
    {
        area: "md:[grid-area:2/1/3/7] xl:[grid-area:1/5/3/8]",
        icon: <Lock className="h-4 w-4 text-black dark:text-neutral-400" />,
        title: "Secure Payments",
        description: "Make secure payments with our trusted and reliable payment gateway.",
    },
    {
        area: "md:[grid-area:2/7/3/13] xl:[grid-area:1/8/2/13]",
        icon: <Sparkles className="h-4 w-4 text-black dark:text-neutral-400" />,
        title: "Comfortable Journey",
        description: "Enjoy a comfortable journey with our well-maintained and clean trains.",
    },
    {
        area: "md:[grid-area:3/1/4/13] xl:[grid-area:2/8/3/13]",
        icon: <Search className="h-4 w-4 text-black dark:text-neutral-400" />,
        title: "Customer Support",
        description: "Get 24/7 customer support for all your queries and concerns.",
    },
];

const mobileItems = allItems.slice(0, 3);

interface GridItemProps {
    area: string;
    icon: React.ReactNode;
    title: string;
    description: React.ReactNode;
}

const GridItem = ({ area, icon, title, description }: GridItemProps) => {
    return (
        <li className={`min-h-[14rem] list-none ${area}`}>
            <div className="relative h-full rounded-2.5xl border p-2 md:rounded-3xl md:p-3">
                <GlowingEffect
                    blur={0}
                    borderWidth={3}
                    spread={80}
                    glow={true}
                    disabled={false}
                    proximity={64}
                    inactiveZone={0.01}
                />
                <div className="relative flex h-full flex-col justify-between gap-6 overflow-hidden rounded-xl border-0.75 p-6 dark:shadow-[0px_0px_27px_0px_#2D2D2D] md:p-6">
                    <div className="relative flex flex-1 flex-col justify-between gap-3">
                        <div className="w-fit rounded-lg border border-gray-600 p-2">
                            {icon}
                        </div>
                        <div className="space-y-3">
                            <h3 className="pt-0.5 text-xl/[1.375rem] font-semibold font-sans -tracking-4 md:text-2xl/[1.875rem] text-balance text-black dark:text-white">
                                {title}
                            </h3>
                            <h2 className="[&_b]:md:font-semibold [&_strong]:md:font-semibold font-sans text-sm/[1.125rem] md:text-base/[1.375rem] text-black dark:text-neutral-400">
                                {description}
                            </h2>
                        </div>
                    </div>
                </div>
            </div>
        </li>
    );
};