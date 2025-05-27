import React from "react";

export default function Button({
    children,
    type = "button",
    bgColor = "bg-[#1e40af]",
    textColor = "text-white",
    className = "",
    ...props
}) {
    return (
        <button
            className={`px-4 py-2 rounded-lg shadow-md transition-all duration-300 
                       hover:translate-y-[-2px] hover:shadow-lg 
                       active:translate-y-[1px] active:shadow-sm
                       focus:outline-none focus:ring-2 focus:ring-blue-400/50
                       before:absolute before:inset-0 before:bg-white before:opacity-0 
                       before:transition-opacity hover:before:opacity-5 
                       relative overflow-hidden ${bgColor} ${textColor} ${className}`}
            style={{
                transform: "translateZ(0)", // Force GPU acceleration
                backfaceVisibility: "hidden", // Reduce flickering
                willChange: "transform, box-shadow", // Performance optimization
            }}
            {...props}
        >
            <span className="relative z-10 flex items-center justify-center gap-2">
                {children}
            </span>
        </button>
    );
}
