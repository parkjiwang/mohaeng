import { geoArea } from "d3-geo";

export function keepLargestPolygonUnlessJeju(feature: any) {
  const name = String(feature?.properties?.NAME_1 ?? feature?.properties?.name ?? "");
  const lower = name.toLowerCase();
  const isJeju = lower.includes("jeju") || lower.includes("제주");
  if (isJeju) return feature;

  const geom = feature?.geometry;
  if (!geom) return feature;

  if (geom.type === "MultiPolygon" && Array.isArray(geom.coordinates)) {
    let bestIdx = 0;
    let bestArea = -Infinity;

    geom.coordinates.forEach((polyCoords: any, idx: number) => {
      const poly = {
        type: "Feature",
        properties: {},
        geometry: { type: "Polygon", coordinates: polyCoords },
      };
      const a = geoArea(poly as any);
      if (a > bestArea) {
        bestArea = a;
        bestIdx = idx;
      }
    });

    return {
      ...feature,
      geometry: { type: "Polygon", coordinates: geom.coordinates[bestIdx] },
    };
  }

  return feature;
}
