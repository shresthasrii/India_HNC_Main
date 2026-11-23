export interface Position {
  0: number;
  1: number;
}

export type PolygonCoords = Position[];
export type MultiPolygonCoords = (PolygonCoords | PolygonCoords[])[];

export interface FeatureGeometry {
  type: "Polygon" | "MultiPolygon";
  coordinates: any;
}

export interface FeatureProperties {
  name?: string;
  "hc-key"?: string;
}

export interface Feature {
  type: "Feature";
  id?: string;
  properties: FeatureProperties;
  geometry: FeatureGeometry;
}

export interface FeatureCollection {
  type: "FeatureCollection";
  features: Feature[];
}

export type StateKey = string;

export interface StateInfo {
  name: string;
  tourismUrl: string;
  notes: string[];
}

export interface MapShape {
  key: string;
  name: string;
  d: string;
  centroid: { x: number; y: number };
  isCircle?: boolean;
}

export interface IndiaMapProps {
  width?: number;
  height?: number;
}
