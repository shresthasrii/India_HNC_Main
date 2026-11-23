import React, { useMemo, useRef, useState } from "react";
import ChakraIcon from "@/components/icons/ChakraIcon";
import { IndiaMapProps, MapShape, StateInfo } from "@/types/map";
import { STATE_INFO, getStateFallbackInfo } from "@/data/stateInfo";
import { computeBounds, centroidOfFeature, normalizeKey } from "@/lib/mapUtils";
import { useGeoJSON } from "@/hooks/useGeoJSON";
import StateShape from "@/components/map/StateShape";
import StateInfoPanel from "@/components/map/StateInfoPanel";

export default function IndiaMap({ width = 960, height = 720 }: IndiaMapProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const { data, error } = useGeoJSON(
    "https://code.highcharts.com/mapdata/countries/in/custom/in-all-disputed.geo.json"
  );

  const [hoverKey, setHoverKey] = useState<string | null>(null);

  const computed = useMemo(() => {
    if (!data) return null;
    const features = data.features;
    const { minLon, maxLon, minLat, maxLat } = computeBounds(features);

    const PANEL_W = 260;
    const padTop = 20;
    const padLeft = 20;
    const padBottom = 20;
    const padRight = PANEL_W + 24;
    const lonRange = maxLon - minLon;
    const latRange = maxLat - minLat;
    const mapW = width - (padLeft + padRight);
    const mapH = height - (padTop + padBottom);
    const scaleX = mapW / lonRange;
    const scaleY = mapH / latRange;
    const scale = Math.min(scaleX, scaleY);
    const offsetX = padLeft + (mapW - lonRange * scale) / 2;
    const offsetY = padTop + (mapH - latRange * scale) / 2;

    const project = (lon: number, lat: number) => {
      const x = offsetX + (lon - minLon) * scale;
      const y = offsetY + (maxLat - lat) * scale;
      return [x, y] as const;
    };

    const shapes: MapShape[] = features.map((f) => {
      const key = normalizeKey(f.properties["hc-key"], f.properties.name);
      const geom = f.geometry;

      const toPath = (coords: any) => {
        const parts: string[] = [];
        if (geom.type === "Polygon") {
          for (const ring of coords as any[]) {
            ring.forEach((pt: number[], i: number) => {
              const [x, y] = project(pt[0], pt[1]);
              parts.push(i === 0 ? `M${x},${y}` : `L${x},${y}`);
            });
            parts.push("Z");
          }
        } else if (geom.type === "MultiPolygon") {
          for (const poly of coords as any[]) {
            for (const ring of poly as any[]) {
              ring.forEach((pt: number[], i: number) => {
                const [x, y] = project(pt[0], pt[1]);
                parts.push(i === 0 ? `M${x},${y}` : `L${x},${y}`);
              });
              parts.push("Z");
            }
          }
        }
        return parts.join(" ");
      };

      const c = centroidOfFeature(f);
      const [cx, cy] = project(c.lon, c.lat);

      return {
        key,
        name: f.properties.name || key.toUpperCase(),
        d: toPath(geom.coordinates),
        centroid: { x: cx, y: cy },
      };
    });

    // Overlays for PoK and Aksai Chin
    const overlays: MapShape[] = [
      { key: "in-pok", name: "Pakistan-occupied Kashmir (PoK)", lon: 74.3, lat: 34.7, radiusDeg: 1.1 },
      { key: "in-aksai-chin", name: "Aksai Chin", lon: 79.2, lat: 35.1, radiusDeg: 1.0 },
    ].map((r) => {
      const [cx, cy] = project(r.lon, r.lat);
      const pixR = r.radiusDeg * scale;
      const pathD = `M ${cx + pixR},${cy} A ${pixR} ${pixR} 0 1 0 ${cx - pixR},${cy} A ${pixR} ${pixR} 0 1 0 ${cx + pixR},${cy}`;
      return { key: r.key, name: r.name, d: pathD, centroid: { x: cx, y: cy }, isCircle: true };
    });

    return { shapes: [...shapes, ...overlays] };
  }, [data, height, width]);

  const activeShape = hoverKey && computed ? computed.shapes.find((s) => s.key === hoverKey) : null;
  const hoveredInfo: StateInfo | null = hoverKey
    ? STATE_INFO[hoverKey] || getStateFallbackInfo(hoverKey, activeShape?.name || "")
    : null;

  return (
    <div ref={containerRef} className="relative w-full max-w-6xl mx-auto">
      {/* Title Header */}
      <div className="mb-4 flex items-end justify-between gap-4">
        <div>
          <div className="flex items-center gap-3">
            <ChakraIcon className="motion-safe:animate-[spin_12s_linear_infinite]" size={28} />
            <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight text-primary">
              Bharat Explorer Map
            </h2>
          </div>
          <p className="text-muted-foreground max-w-2xl mt-1">
            Hover over a state to see key heritage highlights. Click to open the
            official tourism site for in-depth history, culture and travel.
          </p>
        </div>
        <div className="hidden sm:flex items-center gap-2 text-xs text-muted-foreground">
          <span className="inline-block h-3 w-3 rounded-sm bg-[color:var(--flag-saffron,#FF671F)]" />
          Tiranga palette
        </div>
      </div>

      {/* Map SVG Container */}
      <div className="relative rounded-xl bg-transparent p-3 ring-1 ring-border/50 shadow-md">
        <svg
          role="img"
          aria-label="Map of India with states"
          viewBox={`0 0 ${width} ${height}`}
          className="w-full h-auto select-none"
        >
          <defs>
            <filter id="dropShadow" x="-20%" y="-20%" width="140%" height="140%">
              <feGaussianBlur in="SourceAlpha" stdDeviation="2" />
              <feOffset dx="0" dy="1" result="offsetblur" />
              <feComponentTransfer>
                <feFuncA type="linear" slope="0.35" />
              </feComponentTransfer>
              <feMerge>
                <feMergeNode />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
          </defs>

          <rect x="0" y="0" width={width} height={height} fill="none" />

          {/* Render All State Shapes */}
          {computed?.shapes.map((s) => (
            <StateShape key={s.key} shape={s} onHover={setHoverKey} />
          ))}

          {/* Render Side Panel and Zoom Overlay if Hovered */}
          {activeShape && hoveredInfo && (
            <StateInfoPanel
              shape={activeShape}
              info={hoveredInfo}
              mapWidth={width}
              mapHeight={height}
            />
          )}

          {/* Watermark */}
          <text
            x={width - 12}
            y={height - 12}
            textAnchor="end"
            className="fill-stone-400 text-[10px]"
          >
            © Cultural map for educational use
          </text>
        </svg>
      </div>

      {error && (
        <div className="mt-3 text-sm text-destructive">Failed to load map: {error}</div>
      )}
    </div>
  );
}
