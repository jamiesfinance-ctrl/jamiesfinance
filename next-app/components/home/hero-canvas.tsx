"use client";

import dynamic from "next/dynamic";

const FlowField = dynamic(
  () => import("@/components/ui/flow-field-background"),
  { ssr: false }
);

export function HeroCanvas() {
  return (
    <div style={{ position: "absolute", inset: 0, width: "100%", height: "100%" }}>
      <FlowField color="#cccccc" trailOpacity={0.08} particleCount={500} speed={0.7} />
    </div>
  );
}
