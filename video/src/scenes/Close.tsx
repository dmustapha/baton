import React from "react";
import { AbsoluteFill, useCurrentFrame, useVideoConfig, spring, interpolate } from "remotion";
import { COLORS, ORBS, SCENE_DURATIONS, URLS } from "../constants";
import { BODY, MONO } from "../fonts";
import { AnimatedBackground } from "../components/AnimatedBackground";

export const Close: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const dur = SCENE_DURATIONS.close;
  const fadeOut = interpolate(frame, [dur - 30, dur], [1, 0], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });

  const mark = spring({ frame, fps, config: { damping: 13, stiffness: 90 } });
  const markOp = interpolate(mark, [0, 0.5], [0, 1], { extrapolateRight: "clamp" });
  const markScale = interpolate(mark, [0, 1], [0.75, 1]);

  const tag = spring({ frame: frame - 22, fps, config: { damping: 15, stiffness: 80 } });
  const tagOp = interpolate(tag, [0, 0.4], [0, 1], { extrapolateRight: "clamp" });

  const url = spring({ frame: frame - 50, fps, config: { damping: 14, stiffness: 90 } });
  const urlOp = interpolate(url, [0, 0.5], [0, 1], { extrapolateRight: "clamp" });
  const urlScale = interpolate(url, [0, 1], [0.9, 1]);
  const glow = interpolate(frame, [70, 110], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });

  return (
    <AbsoluteFill style={{ background: COLORS.bg, opacity: fadeOut }}>
      <AnimatedBackground orbs={ORBS} />
      <AbsoluteFill style={{ justifyContent: "center", alignItems: "center", flexDirection: "column", gap: 22 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 18, opacity: markOp, transform: `scale(${markScale})` }}>
          <div
            style={{
              width: 76, height: 76, borderRadius: 20,
              background: `linear-gradient(135deg, ${COLORS.accent}, ${COLORS.accent2})`,
              display: "grid", placeItems: "center", color: "#fff", fontFamily: BODY, fontWeight: 800, fontSize: 42,
              boxShadow: `0 0 70px ${COLORS.accent}66`,
            }}
          >
            B
          </div>
          <div style={{ fontFamily: BODY, fontWeight: 800, fontSize: 60, color: COLORS.ink, letterSpacing: -2 }}>Baton</div>
        </div>

        <div style={{ opacity: tagOp, fontFamily: BODY, fontSize: 34, color: COLORS.inkDim, marginTop: 6 }}>
          Your XRP, working on Flare.
        </div>

        <div
          style={{
            opacity: urlOp, transform: `scale(${urlScale})`, marginTop: 18,
            fontFamily: MONO, fontSize: 30, fontWeight: 600, color: "#fff",
            background: `linear-gradient(100deg, ${COLORS.accent}, ${COLORS.accentDim})`,
            borderRadius: 12, padding: "14px 30px",
            boxShadow: `0 0 ${30 + glow * 40}px ${COLORS.accent}${Math.round((0.3 + glow * 0.4) * 255).toString(16).padStart(2, "0")}`,
          }}
        >
          {URLS.app}
        </div>

        <div style={{ opacity: urlOp, fontFamily: MONO, fontSize: 18, color: COLORS.inkFaint, marginTop: 8 }}>
          {URLS.github}
        </div>
      </AbsoluteFill>
    </AbsoluteFill>
  );
};
