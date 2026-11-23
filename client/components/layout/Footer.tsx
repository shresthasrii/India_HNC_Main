import React from "react";

export default function Footer() {
  return (
    <footer className="mt-16 border-t">
      <div className="container mx-auto px-4 py-6 text-xs text-muted-foreground flex flex-col md:flex-row items-center justify-between gap-2">
        <div>© {new Date().getFullYear()} Bharat Heritage Explorer</div>
        <div className="flex items-center gap-4">
          <a
            href="https://code.highcharts.com/mapdata/countries/in/in-all.geo.json"
            target="_blank"
            rel="noreferrer noopener"
            className="hover:text-foreground transition-colors"
          >
            Map data source
          </a>
          <a
            href="https://www.mygov.in/states/"
            target="_blank"
            rel="noreferrer noopener"
            className="hover:text-foreground transition-colors"
          >
            State portals
          </a>
        </div>
      </div>
    </footer>
  );
}
