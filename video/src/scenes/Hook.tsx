import React from "react";
import { AbsoluteFill, useCurrentFrame, useVideoConfig, spring, interpolate } from "remotion";
import { COLORS, ORBS, SCENE_DURATIONS } from "../constants";
import { BODY } from "../fonts";
import { AnimatedBackground } from "../components/AnimatedBackground";

export const Hook: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const dur = SCENE_DURATIONS.hook;
  const exitOp = interpolate(frame, [dur - 20, dur], [1, 0], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });

  const mark = spring({ frame, fps, config: { damping: 13, stiffness: 90 } });
  const markScale = interpolate(mark, [0, 1], [0.7, 1]);
  const markOp = interpolate(mark, [0, 0.5], [0, 1], { extrapolateRight: "clamp" });

  const l1 = spring({ frame: frame - 18, fps, config: { damping: 15, stiffness: 70 } });
  const l2 = spring({ frame: frame - 40, fps, config: { damping: 15, stiffness: 70 } });
  const subP = spring({ frame: frame - 70, fps, config: { damping: 16, stiffness: 80 } });

  const line = (p: number) => ({
    opacity: interpolate(p, [0, 0.4], [0, 1], { extrapolateRight: "clamp" }),
    transform: `translateY(${interpolate(p, [0, 1], [26, 0])}px)`,
  });

  return (
    <AbsoluteFill style={{ background: COLORS.bg, opacity: exitOp }}>
      <AnimatedBackground orbs={ORBS} />
      <AbsoluteFill style={{ justifyContent: "center", alignItems: "center", flexDirection: "column", gap: 26 }}>
        {/* brand mark */}
        <div style={{ display: "flex", alignItems: "center", gap: 18, opacity: markOp, transform: `scale(${markScale})` }}>
          <div
            style={{
              width: 68, height: 68, borderRadius: 18,
              background: `linear-gradient(135deg, ${COLORS.accent}, ${COLORS.accent2})`,
              display: "grid", placeItems: "center", color: "#fff", fontFamily: BODY, fontWeight: 800, fontSize: 38,
              boxShadow: `0 0 60px ${COLORS.accent}55`,
            }}
          >
            B
          </div>
          <div style={{ fontFamily: BODY, fontWeight: 800, fontSize: 44, color: COLORS.ink, letterSpacing: -1 }}>Baton</div>
        </div>

        {/* headline */}
        <div style={{ textAlign: "center", marginTop: 14 }}>
          <div style={{ ...line(l1), fontFamily: BODY, fontWeight: 800, fontSize: 92, color: COLORS.ink, letterSpacing: -3, lineHeight: 1.02 }}>
            Your XRP, working on Flare.
          </div>
          <div
            style={{
              ...line(l2), fontFamily: BODY, fontWeight: 800, fontSize: 92, letterSpacing: -3, lineHeight: 1.05, marginTop: 4,
              background: `linear-gradient(100deg, ${COLORS.accent}, ${COLORS.accent2})`,
              WebkitBackgroundClip: "text", backgroundClip: "text", color: "transparent",
            }}
          >
            In one signature.
          </div>
        </div>

        <div style={{ ...line(subP), fontFamily: BODY, fontSize: 30, color: COLORS.inkDim, marginTop: 12 }}>
          No EVM wallet. No gas. No bridge.
        </div>
      </AbsoluteFill>
    </AbsoluteFill>
  );
};
