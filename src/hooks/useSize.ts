import { useState } from "react";


const widthQuery = window.matchMedia("(max-width: 640px)");

export default function useSize(n: number) {
    const [size, setSize] = useState(widthQuery.matches ? n * 0.85 : n);

    widthQuery.addEventListener("change", (e) => {
        setSize(e.matches ? n * 0.85 : n);
    });

    return size;
}