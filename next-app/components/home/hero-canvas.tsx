"use client";

import dynamic from "next/dynamic";

const FlowField = dynamic(
  () => import("@/components/ui/flow-field-background"),
  { ssr: false }
);

interface HeroCanvasProps {
  color?: string;
  bgColor?: string;
  trailColor?: string;
}

export function HeroCanvas({ color = "#cccccc", bgColor = "#0a0a0a", trailColor = "rgba(0,0,0,0.08)" }: HeroCanvasProps) {
  return (
    <div style={{ position: "absolute", inset: 0, width: "100%", height: "100%" }}>
      <FlowField
        color={color}
        bgColor={bgColor}
        trailColor={trailColor}
        trailOpacity={0.08}
        particleCount={500}
        speed={0.7}
      />
    </div>
  );
}
