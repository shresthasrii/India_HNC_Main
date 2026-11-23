import { Feature } from "@/types/map";

export const FLAG_COLORS = [
  "#FF671F", // saffron
  "#FF8F4A",
  "#FFB07A",
  "#F2F2F2", // white tint
  "#DDE6DD",
  "#1A9B0A", // green
  "#138808",
  "#0B5CAB", // navy (Ashoka chakra accent)
  "#4C86C6",
];

export function colorForKey(key: string): string {
  let hash = 0;
  for (let i = 0; i < key.length; i++) {
    hash = (hash * 31 + key.charCodeAt(i)) >>> 0;
  }
  return FLAG_COLORS[hash % FLAG_COLORS.length];
}

export function normalizeKey(key?: string, name?: string): string {
  if (key) return key.toLowerCase();
  if (name) return `in-${name.toLowerCase().replace(/\s+/g, "-")}`;
  return "";
}

export function computeBounds(features: Feature[]) {
  let minLon = Infinity;
  let maxLon = -Infinity;
  let minLat = Infinity;
  let maxLat = -Infinity;

  const scan = (coords: any) => {
    const each = (pt: any) => {
      const lon = pt[0];
      const lat = pt[1];
      if (lon < minLon) minLon = lon;
      if (lon > maxLon) maxLon = lon;
      if (lat < minLat) minLat = lat;
      if (lat > maxLat) maxLat = lat;
    };
    const walk = (a: any) => {
      if (typeof a?.[0] === "number") each(a);
      else if (Array.isArray(a)) a.forEach(walk);
    };
    walk(coords);
  };

  for (const f of features) {
    scan(f.geometry.coordinates);
  }

  return { minLon, maxLon, minLat, maxLat };
}

export function centroidOfFeature(feature: Feature): { lon: number; lat: number } {
  let sumLon = 0;
  let sumLat = 0;
  let count = 0;

  const walk = (a: any) => {
    if (Array.isArray(a) && typeof a[0] === "number") {
      sumLon += a[0];
      sumLat += a[1];
      count++;
    } else if (Array.isArray(a)) {
      a.forEach(walk);
    }
  };

  walk(feature.geometry.coordinates);
  return {
    lon: sumLon / Math.max(1, count),
    lat: sumLat / Math.max(1, count),
  };
}
