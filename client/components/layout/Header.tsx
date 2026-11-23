import React from "react";
import { Link } from "react-router-dom";
import ChakraIcon from "@/components/icons/ChakraIcon";

export default function Header() {
  return (
    <header className="sticky top-0 z-50 backdrop-blur supports-[backdrop-filter]:bg-background/70 bg-background/90 border-b border-border shadow-sm">
      <div className="container mx-auto px-4 h-14 flex items-center justify-between">
        <Link
          to="/"
          className="flex items-center gap-2 font-extrabold tracking-tight text-lg text-primary"
        >
          <ChakraIcon size={18} className="opacity-90" />
          <span>Bharat</span>
        </Link>
        <nav className="flex items-center gap-6 text-sm">
          <Link to="/" className="text-foreground/80 hover:text-foreground transition-colors">
            Home
          </Link>
          <Link to="/about" className="text-foreground/80 hover:text-foreground transition-colors">
            About
          </Link>
          <a
            href="https://incredibleindia.org/"
            target="_blank"
            rel="noreferrer noopener"
            className="text-foreground/80 hover:text-foreground transition-colors"
          >
            Incredible India
          </a>
        </nav>
      </div>
    </header>
  );
}
