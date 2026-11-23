import React, { useCallback, useEffect, useState } from "react";
import useEmblaCarousel from "embla-carousel-react";
import { TIMELINE_EVENTS } from "@/data/timelineEvents";

type EmblaOptionsType = Parameters<typeof useEmblaCarousel>[0];
type EmblaCarouselType = NonNullable<ReturnType<typeof useEmblaCarousel>[1]>;
import TimelineCard from "@/components/timeline/TimelineCard";

const OPTIONS: EmblaOptionsType = {
  loop: true,
  align: "center",
  dragFree: false,
  skipSnaps: false,
  inViewThreshold: 0.6,
};

export default function Timeline() {
  const [emblaRef, emblaApi] = useEmblaCarousel(OPTIONS);
  const [hovering, setHovering] = useState(false);

  const scrollPrev = useCallback(() => emblaApi?.scrollPrev(), [emblaApi]);
  const scrollNext = useCallback(() => emblaApi?.scrollNext(), [emblaApi]);

  const autoPlay = useCallback(
    (api: EmblaCarouselType | undefined) => {
      if (!api) return;
      let raf: number | undefined;
      let last = 0;
      const step = (t: number) => {
        if (hovering) {
          last = t;
          raf = requestAnimationFrame(step);
          return;
        }
        if (t - last > 3500) {
          api.scrollNext();
          last = t;
        }
        raf = requestAnimationFrame(step);
      };
      raf = requestAnimationFrame(step);
      return () => {
        if (raf) cancelAnimationFrame(raf);
      };
    },
    [hovering]
  );

  useEffect(() => autoPlay(emblaApi), [emblaApi, autoPlay]);

  return (
    <section
      aria-label="Timeline of key moments in India"
      className="group relative"
      onMouseEnter={() => setHovering(true)}
      onMouseLeave={() => setHovering(false)}
      onKeyDown={(e) => {
        if (e.key === "ArrowLeft") scrollPrev();
        if (e.key === "ArrowRight") scrollNext();
      }}
      tabIndex={0}
      role="region"
    >
      <div className="mb-3 flex items-baseline justify-between">
        <h3 className="text-2xl font-extrabold text-primary">Timeline of India</h3>
        <div className="text-xs text-muted-foreground">
          Auto-plays • Pause on hover • Arrow keys navigate
        </div>
      </div>

      <div
        className="overflow-hidden rounded-2xl ring-1 ring-border shadow-lg bg-card/60 backdrop-blur relative"
        ref={emblaRef}
      >
        <div className="flex" aria-live="off">
          {TIMELINE_EVENTS.map((item, idx) => (
            <TimelineCard key={idx} item={item} />
          ))}
        </div>

        {/* Previous & Next Navigation Controls */}
        <div className="pointer-events-none absolute inset-0 flex items-center justify-between p-2">
          <button
            type="button"
            onClick={scrollPrev}
            className="pointer-events-auto inline-flex h-9 w-9 items-center justify-center rounded-full bg-black/50 text-white backdrop-blur ring-1 ring-white/20 hover:bg-black/60 focus:outline-none focus-visible:ring-2 focus-visible:ring-ring"
            aria-label="Previous event"
          >
            ‹
          </button>
          <button
            type="button"
            onClick={scrollNext}
            className="pointer-events-auto inline-flex h-9 w-9 items-center justify-center rounded-full bg-black/50 text-white backdrop-blur ring-1 ring-white/20 hover:bg-black/60 focus:outline-none focus-visible:ring-2 focus-visible:ring-ring"
            aria-label="Next event"
          >
            ›
          </button>
        </div>
      </div>
    </section>
  );
}
