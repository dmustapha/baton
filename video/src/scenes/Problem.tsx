import React from "react";
import { AbsoluteFill, useCurrentFrame, useVideoConfig, spring, interpolate } from "remotion";
import { COLORS, ORBS, SCENE_DURATIONS, FRICTION_STEPS } from "../constants";
import { BODY, MONO } from "../fonts";
import { AnimatedBackground } from "../components/AnimatedBackground";

export const Problem: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const dur = SCENE_DURATIONS.problem;
  const exitOp = interpolate(frame, [dur - 20, dur], [1, 0], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });

  const title = spring({ frame, fps, config: { damping: 15, stiffness: 80 } });
  const titleOp = interpolate(title, [0, 0.4], [0, 1], { extrapolateRight: "clamp" });

  // steps appear sequentially from frame ~55, ~55 frames apart
  const stepStart = 55;
  const stepGap = 62;

  const footStart = stepStart + FRICTION_STEPS.length * stepGap + 10;
  const foot = spring({ frame: frame - footStart, fps, config: { damping: 14, stiffness: 90 } });
  const footOp = interpolate(foot, [0, 0.4], [0, 1], { extrapolateRight: "clamp" });

  return (
    <AbsoluteFill style={{ background: COLORS.bg, opacity: exitOp }}>
      <AnimatedBackground orbs={ORBS} />
      <AbsoluteFill style={{ justifyContent: "center", alignItems: "center", flexDirection: "column", padding: "0 120px" }}>
        <div style={{ opacity: titleOp, fontFamily: BODY, fontWeight: 700, fontSize: 34, color: COLORS.inkDim, marginBottom: 34 }}>
          Today, putting XRP to work on Flare means:
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 16, width: 900 }}>
          {FRICTION_STEPS.map((s, i) => {
            const p = spring({ frame: frame - (stepStart + i * stepGap), fps, config: { damping: 16, stiffness: 90 } });
            const op = interpolate(p, [0, 0.5], [0, 1], { extrapolateRight: "clamp" });
            const x = interpolate(p, [0, 1], [-30, 0]);
            return (
              <div
                key={i}
                style={{
                  opacity: op, transform: `translateX(${x}px)`,
                  display: "flex", alignItems: "center", gap: 18,
                  background: COLORS.bgElevated, border: `1px solid ${COLORS.line}`, borderRadius: 12, padding: "16px 22px",
                }}
              >
                <div style={{ fontFamily: MONO, fontSize: 22, color: COLORS.accent2, fontWeight: 700, width: 34 }}>{i + 1}</div>
                <div style={{ fontFamily: BODY, fontSize: 27, color: COLORS.ink, fontWeight: 500 }}>{s}</div>
              </div>
            );
          })}
        </div>

        <div style={{ opacity: footOp, marginTop: 34, textAlign: "center" }}>
          <div style={{ fontFamily: BODY, fontWeight: 800, fontSize: 40, color: COLORS.accent2 }}>Five steps. Two chains.</div>
          <div style={{ fontFamily: BODY, fontSize: 26, color: COLORS.inkDim, marginTop: 6 }}>Most people quit before they finish.</div>
        </div>
      </AbsoluteFill>
    </AbsoluteFill>
  );
};
