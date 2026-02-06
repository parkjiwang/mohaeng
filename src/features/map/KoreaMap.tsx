"use client";

import { useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import { geoMercator, geoPath } from "d3-geo";
import { REGION_CENTER, type RegionKey } from "@/lib/regions";

import { normalizeRegionName } from "./normalizeRegionName";
import { keepLargestPolygonUnlessJeju } from "./geometryUtils";
import { labelText, labelOffset } from "./labelOffsets";

export default function KoreaMap({ requireLogin = false }: { requireLogin?: boolean }) {
  const router = useRouter();
  const svgRef = useRef<SVGSVGElement | null>(null);

  useEffect(() => {
    const svg = svgRef.current;
    if (!svg) return;

    let disposed = false;

    const run = async () => {
      const res = await fetch("/geo/korea-sido.json");
      const geojson = await res.json();
      if (disposed) return;

      const ns = "http://www.w3.org/2000/svg";

      svg.innerHTML = `
        <defs>
          <filter id="softShadow" x="-70%" y="-70%" width="240%" height="240%">
            <feGaussianBlur in="SourceAlpha" stdDeviation="7" result="blur"/>
            <feOffset in="blur" dx="0" dy="16" result="offsetBlur"/>
            <feColorMatrix in="offsetBlur" type="matrix"
              values="0 0 0 0 0
                      0 0 0 0 0
                      0 0 0 0 0
                      0 0 0 0.42 0" />
            <feMerge>
              <feMergeNode/>
              <feMergeNode in="SourceGraphic"/>
            </feMerge>
          </filter>

          <filter id="baseBlur" x="-60%" y="-60%" width="220%" height="220%">
            <feGaussianBlur stdDeviation="1.2" />
          </filter>

          <linearGradient id="tileFill" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stop-color="#ffffff"/>
            <stop offset="58%" stop-color="#f3f4f6"/>
            <stop offset="100%" stop-color="#e5e7eb"/>
          </linearGradient>

          <linearGradient id="tileFillHover" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stop-color="#ffffff"/>
            <stop offset="55%" stop-color="#eef2f7"/>
            <stop offset="100%" stop-color="#dfe7f2"/>
          </linearGradient>
        </defs>
      `;

      const width = 1100;
      const height = 820;
      svg.setAttribute("viewBox", `0 0 ${width} ${height + 60}`);

      const cleaned = {
        ...geojson,
        features: geojson.features.map(keepLargestPolygonUnlessJeju),
      };

      const projection = geoMercator();
      const path = geoPath().projection(projection);

      projection.fitExtent(
        [
          [8, 8],
          [width - 8, height - 24],
        ],
        cleaned as any
      );

      const baseG = document.createElementNS(ns, "g");
      baseG.setAttribute("transform", "translate(0,28)");
      baseG.setAttribute("opacity", "0.70");
      baseG.setAttribute("filter", "url(#baseBlur)");
      svg.appendChild(baseG);

      const topG = document.createElementNS(ns, "g");
      topG.setAttribute("transform", "translate(0,6)");
      topG.setAttribute("filter", "url(#softShadow)");
      svg.appendChild(topG);

      let hoveredG: SVGGElement | null = null;
      let hoveredPath: SVGPathElement | null = null;

      const resetHover = () => {
        if (!hoveredG || !hoveredPath) return;
        hoveredG.setAttribute("transform", "translate(0,0)");
        hoveredPath.setAttribute("fill", "url(#tileFill)");
        hoveredPath.setAttribute("stroke", "#9CA3AF");
        hoveredPath.setAttribute("stroke-width", "1");
        hoveredG = null;
        hoveredPath = null;
      };

      // 지도 bounds 계산 → 지도 밖이면 hover 해제
      const boundsAll = (cleaned.features as any[]).reduce(
        (acc, f) => {
          const b = path.bounds(f);
          acc.minX = Math.min(acc.minX, b[0][0]);
          acc.minY = Math.min(acc.minY, b[0][1]);
          acc.maxX = Math.max(acc.maxX, b[1][0]);
          acc.maxY = Math.max(acc.maxY, b[1][1]);
          return acc;
        },
        { minX: Infinity, minY: Infinity, maxX: -Infinity, maxY: -Infinity }
      );

      const pad = 10;
      const mapX = boundsAll.minX - pad;
      const mapY = boundsAll.minY - pad;
      const mapW = boundsAll.maxX - boundsAll.minX + pad * 2;
      const mapH = boundsAll.maxY - boundsAll.minY + pad * 2;

      svg.onmousemove = (e) => {
        const ctm = svg.getScreenCTM();
        if (!ctm) return;
        const pt = svg.createSVGPoint();
        pt.x = e.clientX;
        pt.y = e.clientY;
        const p = pt.matrixTransform(ctm.inverse());

        const inside = p.x >= mapX && p.x <= mapX + mapW && p.y >= mapY && p.y <= mapY + mapH;
        if (!inside) resetHover();
      };

      (cleaned.features as any[]).forEach((feature) => {
        const d = path(feature) ?? "";
        if (!d) return;

        const base = document.createElementNS(ns, "path");
        base.setAttribute("d", d);
        base.setAttribute("fill", "#bfc5cc");
        base.setAttribute("stroke", "none");
        base.style.pointerEvents = "none";
        baseG.appendChild(base);

        const g = document.createElementNS(ns, "g");
        topG.appendChild(g);

        const p = document.createElementNS(ns, "path");
        p.setAttribute("d", d);
        p.setAttribute("fill", "url(#tileFill)");
        p.setAttribute("stroke", "#9CA3AF");
        p.setAttribute("stroke-width", "1");
        p.style.cursor = "pointer";
        g.appendChild(p);

        const rawName = feature?.properties?.NAME_1 ?? feature?.properties?.name;
        const key = normalizeRegionName(rawName);

        if (key && labelText[key as RegionKey]) {
          const b = path.bounds(feature);
          const cx = (b[0][0] + b[1][0]) / 2;
          const cy = (b[0][1] + b[1][1]) / 2;
          const off = labelOffset[key as RegionKey] ?? { dx: 0, dy: 0 };

          const t = document.createElementNS(ns, "text");
          t.setAttribute("x", String(cx + off.dx));
          t.setAttribute("y", String(cy + off.dy));
          t.setAttribute("text-anchor", "middle");
          t.setAttribute("dominant-baseline", "middle");
          t.setAttribute("font-size", "13");
          t.setAttribute("font-weight", "700");
          t.setAttribute("fill", "#6b7280");
          t.setAttribute("stroke", "rgba(255,255,255,0.92)");
          t.setAttribute("stroke-width", "3");
          t.setAttribute("paint-order", "stroke");
          t.style.pointerEvents = "none";
          t.textContent = labelText[key as RegionKey]!;
          g.appendChild(t);
        }

        g.addEventListener("mouseenter", () => {
          if (hoveredG && hoveredG !== g) resetHover();

          topG.appendChild(g);
          g.setAttribute("transform", "translate(0,-12)");

          p.setAttribute("fill", "url(#tileFillHover)");
          p.setAttribute("stroke", "#374151");
          p.setAttribute("stroke-width", "2");

          hoveredG = g;
          hoveredPath = p;
        });

        g.addEventListener("mouseleave", () => {
          if (hoveredG === g) resetHover();
        });

        g.addEventListener("click", () => {
          if (!key) return;

          resetHover();
          topG.appendChild(g);

          g.style.transition = "transform 0.6s cubic-bezier(.16,1,.3,1)";
          g.setAttribute("transform", "translate(0,-14) scale(1.08)");

          p.setAttribute("stroke", "#111827");
          p.setAttribute("stroke-width", "2.2");

          setTimeout(() => {
            if (requireLogin) {
              router.push("/login");
            } else {
              router.push(`/region/${REGION_CENTER[key].slug}`);
            }
          }, 600);
        });
      });
    };

    run().catch(console.error);

    return () => {
      disposed = true;
    };
  }, [router, requireLogin]);

  return (
    <div className="w-full h-full">
      <svg ref={svgRef} className="w-full h-full" preserveAspectRatio="xMidYMid meet" />
    </div>
  );
}



