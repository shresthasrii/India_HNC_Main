import React from "react";
import { MapShape } from "@/types/map";
import { STATE_INFO } from "@/data/stateInfo";
import { colorForKey } from "@/lib/mapUtils";

interface StateShapeProps {
  shape: MapShape;
  onHover: (key: string | null) => void;
}

export default function StateShape({ shape, onHover }: StateShapeProps) {
  const info = STATE_INFO[shape.key];
  const displayName = info?.name || shape.name;
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
    : info?.tourismUrl ||
      `https://www.google.com/search?q=${encodeURIComponent(displayName + " tourism heritage")}`;

  return (
    <a
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={`View heritage of ${displayName}`}
    >
      <g
        onMouseEnter={() => onHover(shape.key)}
        onFocus={() => onHover(shape.key)}
        onMouseLeave={() => onHover(null)}
        onBlur={() => onHover(null)}
        tabIndex={0}
        role="link"
        className="cursor-pointer outline-none transition-opacity hover:opacity-90"
        style={{ transformBox: "fill-box", transformOrigin: "center" }}
      >
        <path
          d={shape.d}
          fill={colorForKey(shape.key)}
          stroke="#0B5CAB"
          strokeWidth={1}
        />
      </g>
    </a>
  );
}
