"use client";
import { useEffect, useState } from "react";

export default function useWindowSize() {
    const [winWidth, setWidth] = useState(0);
    const [winHeight, setHeight] = useState(0);
    
    useEffect(() => {
        function handleResize() {
            setWidth(window.innerWidth);
            setHeight(window.innerHeight);
        }
        handleResize();

        window.addEventListener("resize", handleResize);

        return () => {
            window.removeEventListener("resize", handleResize)
        }

    }, []);
    return {winWidth, winHeight};
}