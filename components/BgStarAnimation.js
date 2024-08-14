import React, { useState, useEffect } from 'react'

const BgStarAnimation = () => {

    const [deg, setDeg] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            if (deg == 360) {
                setDeg(deg - 360)
            }
            else {

                setDeg(deg + 1);
            }

        }, 100); // Increment every second

        return () => clearInterval(interval); // Clean up the interval on unmount
    }, [deg]);

    return (
        <div className="absolute inset-x-0 top-[5rem] -z-10 transform-gpu overflow-hidden blur-3xl sm:top-[5rem] " aria-hidden="true">
            <div className={`relative left-1/2 -z-10 aspect-square w-[36.125rem] max-w-none -translate-x-1/2 bg-gradient-to-tr dark:from-slate-100 dark:to-[#da7ee6bb] from-[#ec9ebf] to-[#948df1] opacity-50 sm:left-[calc(20%-2rem)] sm:w-[70rem]`} style={{ clipPath: " polygon(50% 0%, 61% 35%, 98% 35%, 68% 57%, 79% 91%, 50% 70%, 21% 91%, 32% 57%, 2% 35%, 39% 35%)", transform: `rotate(${deg}deg)`, left: "auto" }}></div>
        </div>
    )
}
export default BgStarAnimation