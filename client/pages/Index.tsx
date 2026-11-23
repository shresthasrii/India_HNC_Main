import React from "react";
import CenteredHero from "@/components/CenteredHero";
import IndiaMap from "@/components/IndiaMap";
import Timeline from "@/components/Timeline";
import KnowledgeCards from "@/components/home/KnowledgeCards";
import ChakraIcon from "@/components/icons/ChakraIcon";

export default function Index() {
  return (
    <main className="min-h-screen">
      {/* Hero Section */}
      <CenteredHero />

      {/* Main Content Section */}
      <section className="relative pt-20 pb-10">
        <div className="container mx-auto px-4">
          {/* Header & Legend */}
          <div className="mb-10 grid gap-6 md:grid-cols-[1fr_auto] md:items-end">
            <div>
              <div className="flex items-center gap-3">
                <ChakraIcon
                  className="motion-safe:animate-[spin_12s_linear_infinite]"
                  size={36}
                />
                <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight text-primary">
                  India Culture & Heritage
                </h1>
              </div>
              <p className="mt-3 max-w-2xl text-base md:text-lg text-muted-foreground">
                Explore the incredible diversity of Bharat. Hover over states to reveal
                key cultural highlights. Click any state to visit its official tourism
                website for history, heritage and travel guides.
              </p>
            </div>
            <div className="hidden md:flex items-center gap-3 text-sm text-muted-foreground">
              <div className="flex items-center gap-2">
                <span className="inline-block size-4 rounded-sm bg-[#FF671F] ring-1 ring-border" />
                <span>Flag-theme regions</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="inline-block size-4 rounded-sm bg-[#138808] ring-1 ring-border" />
                <span>Interactive pop-outs</span>
              </div>
            </div>
          </div>

          {/* Interactive GeoJSON Map */}
          <IndiaMap />

          {/* Historical Milestones Carousel */}
          <div className="mt-14">
            <Timeline />
          </div>

          {/* Educational Knowledge Cards */}
          <KnowledgeCards />
        </div>
      </section>
    </main>
  );
}
