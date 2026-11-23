import React from "react";
import { TimelineItem } from "@/types/timeline";

interface TimelineCardProps {
  item: TimelineItem;
}

export default function TimelineCard({ item }: TimelineCardProps) {
  return (
    <a
      href={item.href}
      target="_blank"
      rel="noreferrer noopener"
      className="relative min-w-0 flex-[0_0_85%] md:flex-[0_0_60%] lg:flex-[0_0_50%] h-[42vh] md:h-[56vh] select-none focus:outline-none focus-visible:ring-2 focus-visible:ring-ring"
      aria-label={`${item.title}, ${item.date}`}
    >
      <img
        src={item.image}
        alt={item.alt}
        className="absolute inset-0 h-full w-full object-cover [filter:brightness(1.08)_contrast(1.05)]"
        loading="lazy"
      />
      <div className="absolute inset-0 bg-gradient-to-tr from-black/35 via-black/10 to-transparent" />
      <div className="absolute bottom-3 left-3 md:bottom-4 md:left-4">
        <div className="inline-flex items-center gap-2 rounded-md bg-black/65 px-3 py-1.5 text-xs uppercase tracking-wide text-white ring-1 ring-white/10">
          <span className="font-semibold">{item.date}</span>
        </div>
        <div className="mt-2 max-w-[80%] text-white drop-shadow-md">
          <h4 className="text-lg md:text-2xl font-bold leading-tight">{item.title}</h4>
        </div>
      </div>
    </a>
  );
}
