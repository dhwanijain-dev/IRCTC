"use client";

import React, { createContext, useContext, useState, useEffect } from "react";

const MousePositionContext = createContext({ x: 0, y: 0 });

export const MousePositionProvider: React.FC = ({ children }) => {
    const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

    useEffect(() => {
        const handleMouseMove = (event: MouseEvent) => {
            setMousePosition({ x: event.clientX, y: event.clientY });
        };

        window.addEventListener("mousemove", handleMouseMove);

        return () => {
            window.removeEventListener("mousemove", handleMouseMove);
        };
    }, []);

    return (
        <MousePositionContext.Provider value={mousePosition}>
            {children}
        </MousePositionContext.Provider>
    );
};

export const useMousePosition = () => useContext(MousePositionContext);