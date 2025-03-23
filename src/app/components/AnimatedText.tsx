"use client";  // NextJs will need this, React users feel free to remove this

import React, { useRef, useEffect, RefObject } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface AnimatedTextProps {
    text: string;
}

const AnimatedText: React.FC<AnimatedTextProps> = ({ text }) => {
    const lettersRef = useRef<(HTMLHeadingElement | null)[]>([]);  // Create a reference for the letters

    useEffect(() => {
        // This effect sets up mouse movement interaction for the letters.
        const handleMouseMove = (e: MouseEvent) => {
            // Handle mouse movement to change font properties based on proximity to the mouse.
            lettersRef.current.forEach((letter) => {
                if (letter) {
                    const rect = letter.getBoundingClientRect();
                    const dx = e.clientX - (rect.left + rect.width / 2);
                    const dy = e.clientY - (rect.top + rect.height / 2);
                    const distance = Math.sqrt(dx * dx + dy * dy);
                    const maxDistance = 150;  // Maximum distance for interaction (feel free to adjust this).
                    const proximity = Math.max(0, maxDistance - distance) / maxDistance;

                    // Modify the font properties based on proximity to the mouse.
                    letter.style.fontWeight = `${300 + proximity * 1000}`;
                    letter.style.fontVariationSettings = `"wdth" ${20 * proximity + 100}`;
                }
            });
        };

        // Add a mousemove event listener to trigger the interaction.
        window.addEventListener("mousemove", handleMouseMove);

        // Clean up the event listener when the component unmounts.
        return () => {
            window.removeEventListener("mousemove", handleMouseMove);
        };
    }, []);

    return (
        <AnimatePresence mode='wait'>
            {text.split("").map((letter, index) => (
                <motion.h1
                    key={index}
                    initial={{ opacity: 0, y: 30 }}
                    animate={{
                        opacity: 1,
                        y: 0,
                        transition: { duration: 0.8, delay: index * 0.1 }, // creating a staggered slide-in effect
                    }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    className="inline-block transition-all duration-100 delay-[-30ms] whitespace-nowrap"
                    ref={(el: HTMLHeadingElement | null) => (lettersRef.current[index] = el)}
                >
                    {letter}
                </motion.h1>
            ))}
        </AnimatePresence>
    );
};

export default AnimatedText;