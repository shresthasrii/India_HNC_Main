import React from "react";
import { KNOWLEDGE_CARDS } from "@/data/knowledgeCards";

export default function KnowledgeCards() {
  return (
    <div className="mt-14 grid gap-6 md:grid-cols-3">
      {KNOWLEDGE_CARDS.map((card, idx) => (
        <article
          key={idx}
          className="rounded-xl bg-card/80 backdrop-blur supports-[backdrop-filter]:bg-card/70 p-6 ring-1 ring-border shadow-sm hover:shadow-md transition-shadow"
        >
          <h3 className="text-xl font-bold text-primary">{card.title}</h3>
          <p className="mt-2 text-sm text-muted-foreground">{card.description}</p>
          <a
            className="mt-3 inline-block text-sm text-[#0B5CAB] hover:underline"
            href={card.linkUrl}
            target="_blank"
            rel="noreferrer noopener"
          >
            {card.linkText}
          </a>
        </article>
      ))}
    </div>
  );
}
