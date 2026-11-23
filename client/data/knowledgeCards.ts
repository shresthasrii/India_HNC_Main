export interface KnowledgeCard {
  title: string;
  description: string;
  linkText: string;
  linkUrl: string;
}

export const KNOWLEDGE_CARDS: KnowledgeCard[] = [
  {
    title: "History of India",
    description:
      "From the Indus Valley civilisation and Vedic age to the Mauryan, Gupta, Chola, Delhi Sultanate and Mughal empires, India’s history spans millennia of ideas, trade, science and arts, culminating in a vibrant modern republic.",
    linkText: "Read more →",
    linkUrl: "https://en.wikipedia.org/wiki/History_of_India",
  },
  {
    title: "Heritage of India",
    description:
      "India is home to diverse UNESCO World Heritage Sites—from Ajanta–Ellora and Hampi to Jaipur, the Western Ghats and Sundarbans—reflecting architecture, nature, crafts and living traditions preserved across regions.",
    linkText: "Explore sites →",
    linkUrl: "https://whc.unesco.org/en/statesparties/in",
  },
  {
    title: "Cultural Data & Diversity",
    description:
      "22 scheduled languages, hundreds of dialects, classical arts like Bharatanatyam, Kathak and Odissi, and festivals from Navratri to Onam reflect India’s pluralism and shared heritage evolving through centuries.",
    linkText: "Incredible India →",
    linkUrl: "https://incredibleindia.org/",
  },
];
