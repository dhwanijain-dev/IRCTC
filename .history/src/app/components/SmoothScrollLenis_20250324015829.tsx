"use client";
import { useEffect } from "react";
import Lenis from "@studio-freight/lenis";

const SmoothScrollLenis = () => {
    useEffect(() => {
        const lenis = new Lenis({
            smoothWheel:        });

        const raf = (time) => {
            lenis.raf(time);
            requestAnimationFrame(raf);
        };

        requestAnimationFrame(raf);
    }, []);

    return (
        <></>
    );
};

export default SmoothScrollLenis;
