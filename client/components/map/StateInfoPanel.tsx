import React from "react";
import { MapShape, StateInfo } from "@/types/map";
import { colorForKey } from "@/lib/mapUtils";

interface StateInfoPanelProps {
  shape: MapShape;
  info: StateInfo;
  mapWidth: number;
  mapHeight: number;
}

export default function StateInfoPanel({
  shape,
  info,
  mapWidth,
  mapHeight,
}: StateInfoPanelProps) {
  const panelW = 260;
  const panelH = 140;
  const panelX = mapWidth - panelW - 12;
  const panelY = Math.min(
    Math.max(12, shape.centroid.y - panelH / 2),
    mapHeight - panelH - 12
  );
  const anchorY = Math.min(
    Math.max(panelY + 16, shape.centroid.y),
    panelY + panelH - 16
  );

  const isUP =
    shape.key === "in-up" ||
    shape.key === "in-uttar-pradesh" ||
    shape.key === "uttar pradesh" ||
    (shape.name || "").toLowerCase().includes("uttar pradesh");

  const isJK =
    shape.key === "in-jk" ||
    shape.key === "jammu and kashmir" ||
    shape.key === "in-jammu-and-kashmir" ||
    (shape.name || "").toLowerCase().includes("jammu");

  const isUT =
    shape.key === "in-ut" ||
    shape.key === "in-uk" ||
    shape.key === "uttarakhand" ||
    shape.key === "in-uttarakhand" ||
    (shape.name || "").toLowerCase().includes("uttarakhand") ||
    (shape.name || "").toLowerCase().includes("uttaranchal");

  const isJH =
    shape.key === "in-jh" ||
    shape.key === "jharkhand" ||
    shape.key === "in-jharkhand" ||
    (shape.name || "").toLowerCase().includes("jharkhand");

  const isKA =
    shape.key === "in-ka" ||
    shape.key === "in-kt" ||
    shape.key === "karnataka" ||
    shape.key === "in-karnataka" ||
    (shape.name || "").toLowerCase().includes("karnataka");

  const isKL =
    shape.key === "in-kl" ||
    shape.key === "in-kr" ||
    shape.key === "kerala" ||
    shape.key === "in-kerala" ||
    (shape.name || "").toLowerCase().includes("kerala") ||
    (shape.name || "").toLowerCase().includes("kerela");

  const isTN =
    shape.key === "in-tn" ||
    shape.key === "tamil nadu" ||
    shape.key === "in-tamil-nadu" ||
    (shape.name || "").toLowerCase().includes("tamil");

  const isBR =
    shape.key === "in-br" ||
    shape.key === "bihar" ||
    shape.key === "in-bihar" ||
    (shape.name || "").toLowerCase().includes("bihar");

  const isOD =
    shape.key === "in-od" ||
    shape.key === "odisha" ||
    shape.key === "in-odisha" ||
    shape.key === "orissa" ||
    shape.key === "in-orissa" ||
    (shape.name || "").toLowerCase().includes("odisha") ||
    (shape.name || "").toLowerCase().includes("orissa");

  const isDL =
    shape.key === "in-dl" ||
    shape.key === "delhi" ||
    shape.key === "in-delhi" ||
    shape.key === "nct of delhi" ||
    shape.key === "in-nct-of-delhi" ||
    shape.key === "new delhi" ||
    shape.key === "in-new-delhi" ||
    (shape.name || "").toLowerCase().includes("delhi");

  const isCG =
    shape.key === "in-cg" ||
    shape.key === "in-ct" ||
    shape.key === "chhattisgarh" ||
    shape.key === "in-chhattisgarh" ||
    (shape.name || "").toLowerCase().includes("chhattisgarh");

  const isMH =
    shape.key === "in-mh" ||
    shape.key === "maharashtra" ||
    shape.key === "in-maharashtra" ||
    (shape.name || "").toLowerCase().includes("maharashtra");

  const isMP =
    shape.key === "in-mp" ||
    shape.key === "madhya pradesh" ||
    shape.key === "in-madhya-pradesh" ||
    (shape.name || "").toLowerCase().includes("madhya");

  const isRJ =
    shape.key === "in-rj" ||
    shape.key === "rajasthan" ||
    shape.key === "in-rajasthan" ||
    (shape.name || "").toLowerCase().includes("rajasthan");

  const isPB =
    shape.key === "in-pb" ||
    shape.key === "punjab" ||
    shape.key === "in-punjab" ||
    (shape.name || "").toLowerCase().includes("punjab");

  const isHR =
    shape.key === "in-hr" ||
    shape.key === "haryana" ||
    shape.key === "in-haryana" ||
    (shape.name || "").toLowerCase().includes("haryana");

  const isHP =
    shape.key === "in-hp" ||
    shape.key === "hp" ||
    shape.key === "himachal pradesh" ||
    shape.key === "in-himachal-pradesh" ||
    (shape.name || "").toLowerCase().includes("himachal");

  const isTG =
    shape.key === "in-tl" ||
    shape.key === "in-tg" ||
    shape.key === "telangana" ||
    shape.key === "telengana" ||
    shape.key === "in-telangana" ||
    shape.key === "in-telengana" ||
    (shape.name || "").toLowerCase().includes("telan") ||
    (shape.name || "").toLowerCase().includes("telen");

  const url = isJK
    ? "https://india-inc-jnk-l.vercel.app/"
    : isUT
    ? "https://india-inc-ut.vercel.app/"
    : isJH
    ? "https://india-inc-jk.vercel.app/"
    : isKA
    ? "https://india-inc-kt.vercel.app/"
    : isUP
    ? "https://india-inc-up.vercel.app/"
    : isKL
    ? "https://india-inc-kr.vercel.app/"
    : isTN
    ? "https://india-inc-tn.vercel.app/#top"
    : isBR
    ? "https://india-inc-bihar.vercel.app/"
    : isOD
    ? "https://india-inc-od.vercel.app/"
    : isDL
    ? "https://new-delhi.vercel.app/"
    : isCG
    ? "https://chhattisgarh.vercel.app/"
    : isMH
    ? "https://maharashtra-five.vercel.app/"
    : isMP
    ? "https://madhya-pradesh-pi.vercel.app/"
    : isRJ
    ? "https://rajasthan-psi.vercel.app/"
    : isPB
    ? "https://punjab-livid.vercel.app/"
    : isHR
    ? "https://haryana-beta.vercel.app/"
    : isHP
    ? "https://india-inc-hp.vercel.app/"
    : isTG
    ? "https://india-inc-tl.vercel.app/"
    : info.tourismUrl ||
      `https://www.google.com/search?q=${encodeURIComponent(info.name + " tourism heritage")}`;

  return (
    <g aria-label={`Details for ${info.name}`}>
      {/* Anchored zoom overlay */}
      <g pointerEvents="none">
        <path
          d={shape.d}
          fill={colorForKey(shape.key)}
          stroke="#0B5CAB"
          strokeWidth={2.2}
          filter="url(#dropShadow)"
          style={{ transition: "transform .25s ease" }}
          transform={`translate(${shape.centroid.x},${shape.centroid.y}) scale(1.12) translate(${-shape.centroid.x},${-shape.centroid.y})`}
          strokeDasharray={shape.isCircle ? "4 3" : undefined}
        />
      </g>

      {/* Dashed leader line */}
      <line
        x1={shape.centroid.x}
        y1={shape.centroid.y}
        x2={panelX}
        y2={anchorY}
        stroke="#0B5CAB"
        strokeWidth={1.5}
        strokeDasharray="3 3"
      >
        <animate
          attributeName="stroke-dashoffset"
          from="20"
          to="0"
          dur="0.35s"
          fill="freeze"
        />
      </line>

      <circle cx={shape.centroid.x} cy={shape.centroid.y} r={3} fill="#0B5CAB" />

      {/* Clickable Panel */}
      <a
        href={url}
        target="_blank"
        rel="noopener noreferrer"
        className="cursor-pointer"
        aria-label={`Open link for ${info.name}`}
      >
        {/* Panel backdrop */}
        <rect
          x={panelX}
          y={panelY}
          width={panelW}
          height={panelH}
          rx={10}
          fill="#ffffff"
          opacity={0}
          stroke="#cfe1ff"
        >
          <animate
            attributeName="opacity"
            from="0"
            to="0.96"
            dur="0.25s"
            fill="freeze"
          />
        </rect>

        {/* Title */}
        <text
          x={panelX + 12}
          y={panelY + 22}
          fontSize={14}
          fontWeight={700}
          fill="#0B5CAB"
        >
          {info.name}
        </text>

        {/* Notes */}
        {info.notes.slice(0, 3).map((note, i) => (
          <text
            key={i}
            x={panelX + 18}
            y={panelY + 44 + i * 20}
            fontSize={12.5}
            fill="#1a7e0a"
          >
            • {note}
          </text>
        ))}

        {/* Action CTA */}
        <text
          x={panelX + 12}
          y={panelY + panelH - 12}
          fontSize={11}
          fill="#FF671F"
        >
          Click to open website →
        </text>
      </a>
    </g>
  );
}
