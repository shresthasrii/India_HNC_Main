import { useState, useEffect } from "react";
import { FeatureCollection } from "@/types/map";

export function useGeoJSON(url: string) {
  const [data, setData] = useState<FeatureCollection | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let mounted = true;
    (async () => {
      try {
        const res = await fetch(url);
        if (!res.ok) throw new Error(`Failed to fetch map: ${res.status}`);
        const json = (await res.json()) as FeatureCollection;
        if (mounted) setData(json);
      } catch (e: any) {
        setError(e?.message || "Failed to load map");
      }
    })();

    return () => {
      mounted = false;
    };
  }, [url]);

  return { data, error };
}
