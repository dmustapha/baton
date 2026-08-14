import React from "react";
import { AbsoluteFill, useCurrentFrame, useVideoConfig, spring, interpolate } from "remotion";
import { COLORS, ORBS, SCENE_DURATIONS, FLOW_STEPS } from "../constants";
import { BODY } from "../fonts";
import { AnimatedBackground } from "../components/AnimatedBackground";

export const HowItWorks: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const dur = SCENE_DURATIONS.howitworks;
  const exitOp = interpolate(frame, [dur - 20, dur], [1, 0], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });

  const title = spring({ frame, fps, config: { damping: 15, stiffness: 80 } });
  const titleOp = interpolate(title, [0, 0.4], [0, 1], { extrapolateRight: "clamp" });

  const nodeStart = 45;
  const nodeGap = 78;
  const footStart = nodeStart + FLOW_STEPS.length * nodeGap + 20;
  const foot = spring({ frame: frame - footStart, fps, config: { damping: 15, stiffness: 90 } });
  const footOp = interpolate(foot, [0, 0.4], [0, 1], { extrapolateRight: "clamp" });

  return (
    <AbsoluteFill style={{ background: COLORS.bg, opacity: exitOp }}>
      <AnimatedBackground orbs={ORBS} />
      <AbsoluteFill style={{ justifyContent: "center", alignItems: "center", flexDirection: "column" }}>
        <div style={{ opacity: titleOp, fontFamily: BODY, fontWeight: 800, fontSize: 44, color: COLORS.ink, marginBottom: 44, letterSpacing: -1 }}>
          One signature. Flare does the rest.
        </div>

        <div style={{ display: "flex", alignItems: "center", gap: 0 }}>
          {FLOW_STEPS.map((step, i) => {
            const p = spring({ frame: frame - (nodeStart + i * nodeGap), fps, config: { damping: 15, stiffness: 85 } });
            const op = interpolate(p, [0, 0.5], [0, 1], { extrapolateRight: "clamp" });
            const scale = interpolate(p, [0, 1], [0.82, 1]);
            // connector to the previous node
            const conn = i > 0 ? interpolate(frame - (nodeStart + i * nodeGap - 30), [0, 20], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" }) : 0;
            return (
              <React.Fragment key={i}>
                {i > 0 && (
                  <div style={{ width: 70, height: 3, background: COLORS.line, position: "relative", overflow: "hidden" }}>
                    <div style={{ position: "absolute", inset: 0, width: `${conn * 100}%`, background: `linear-gradient(90deg, ${COLORS.accent}, ${step.color})` }} />
                  </div>
                )}
                <div
                  style={{
                    opacity: op, transform: `scale(${scale})`,
                    width: 210, height: 180, borderRadius: 18,
                    background: COLORS.bgCard, border: `1px solid ${step.color}44`,
                    boxShadow: `0 0 40px ${step.color}18`,
                    display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center", gap: 10, padding: 18, textAlign: "center",
                  }}
                >
                  <div style={{ width: 44, height: 44, borderRadius: 12, background: `${step.color}22`, border: `1px solid ${step.color}66`, display: "grid", placeItems: "center", color: step.color, fontFamily: BODY, fontWeight: 800, fontSize: 22 }}>
                    {i + 1}
                  </div>
                  <div style={{ fontFamily: BODY, fontWeight: 700, fontSize: 24, color: COLORS.ink }}>{step.label}</div>
                  <div style={{ fontFamily: BODY, fontSize: 16, color: COLORS.inkDim, lineHeight: 1.3 }}>{step.sub}</div>
                </div>
              </React.Fragment>
            );
          })}
        </div>

        <div style={{ opacity: footOp, marginTop: 46, display: "flex", gap: 14 }}>
          {["No EVM wallet", "No gas", "No bridge", "You keep custody"].map((c) => (
            <div key={c} style={{ fontFamily: BODY, fontSize: 22, color: COLORS.good, border: `1px solid ${COLORS.good}44`, borderRadius: 999, padding: "8px 18px", background: `${COLORS.good}12` }}>
              {c}
            </div>
          ))}
        </div>
      </AbsoluteFill>
    </AbsoluteFill>
  );
};
