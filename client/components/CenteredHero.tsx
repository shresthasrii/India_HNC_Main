import React from "react";
import ChakraIcon from "@/components/icons/ChakraIcon";
import DigitalClock from "@/components/DigitalClock";
import "./CenteredHero.css";

export default function CenteredHero() {
  return (
    <div className="relative flex items-center justify-center min-h-96 py-16 overflow-hidden">
      {/* Animated starfield background */}
      <div className="absolute inset-0 pointer-events-none">
        {[...Array(50)].map((_, i) => (
          <div
            key={i}
            className="absolute rounded-full bg-white"
            style={{
              width: Math.random() * 3 + 1 + "px",
              height: Math.random() * 3 + 1 + "px",
              left: Math.random() * 100 + "%",
              top: Math.random() * 100 + "%",
              opacity: Math.random() * 0.7 + 0.2,
              animation: `twinkle ${Math.random() * 3 + 2}s infinite`,
              animationDelay: Math.random() * 2 + "s",
            }}
          />
        ))}
      </div>

      {/* Content */}
      <div className="text-center space-y-8 relative z-10 animate-fade-in">
        <div className="flex items-center justify-center gap-4 animate-fade-in" style={{ animationDelay: "0.2s" }}>
          <ChakraIcon className="motion-safe:animate-[spin_12s_linear_infinite]" size={40} />
          <h1 className="text-5xl md:text-6xl font-extrabold tracking-tight text-primary">
            Bharat SamayPatra
            <br />
          </h1>
          <ChakraIcon className="motion-safe:animate-[spin_12s_linear_infinite] rotate-180" size={40} />
        </div>
        <div className="max-w-2xl mx-auto space-y-6 animate-fade-in" style={{ animationDelay: "0.4s" }}>
          <div className="scale-animation">
            <DigitalClock />
          </div>
          <p className="text-lg text-muted-foreground">
            Explore the incredible diversity of Bharat
          </p>
        </div>
      </div>
    </div>
  );
}
