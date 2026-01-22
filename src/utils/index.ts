import type { MapPoint } from "@/types";

export function buildRouteLine(points: MapPoint[]) {
  return {
    type: "FeatureCollection",
    features: [
      {
        type: "Feature",
        properties: {},
        geometry: {
          type: "LineString",
          coordinates: points.map((p) => [p.lng, p.lat]),
        },
      },
    ],
  } as const;
}
