import React from "react";
import { AbsoluteFill, useCurrentFrame, useVideoConfig, spring, interpolate } from "remotion";
import { COLORS, SOCIAL_DURATION, URLS } from "./constants";
import { BODY, MONO } from "./fonts";
import { AnimatedBackground } from "./components/AnimatedBackground";
import { Mark } from "./components/Mark";

const VERTICAL_ORBS = [
  { baseX: 220, baseY: 360, size: 460, color: COLORS.accent, blur: 130, opacity: 0.12, speed: 0.006 },
  { baseX: 860, baseY: 1560, size: 420, color: COLORS.accent2, blur: 120, opacity: 0.1, speed: 0.005 },
  { baseX: 540, baseY: 980, size: 520, color: COLORS.accentDim, blur: 150, opacity: 0.07, speed: 0.008 },
];

export const SocialClip: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const fadeOut = interpolate(frame, [SOCIAL_DURATION - 20, SOCIAL_DURATION], [1, 0], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });

  const mark = spring({ frame, fps, config: { damping: 13, stiffness: 90 } });
  const markOp = interpolate(mark, [0, 0.5], [0, 1], { extrapolateRight: "clamp" });
  const l1 = spring({ frame: frame - 20, fps, config: { damping: 15, stiffness: 75 } });
  const l2 = spring({ frame: frame - 45, fps, config: { damping: 15, stiffness: 75 } });
  const url = spring({ frame: frame - 150, fps, config: { damping: 14, stiffness: 90 } });
  const line = (p: number) => ({ opacity: interpolate(p, [0, 0.4], [0, 1], { extrapolateRight: "clamp" }), transform: `translateY(${interpolate(p, [0, 1], [24, 0])}px)` });

  return (
    <AbsoluteFill style={{ background: COLORS.bg, opacity: fadeOut }}>
      <AnimatedBackground orbs={VERTICAL_ORBS} />
      <AbsoluteFill style={{ justifyContent: "center", alignItems: "center", flexDirection: "column", gap: 34, padding: "0 70px" }}>
        <div style={{ opacity: markOp }}>
          <Mark size={148} id="socialmk" />
        </div>
        <div style={{ textAlign: "center" }}>
          <div style={{ ...line(l1), fontFamily: BODY, fontWeight: 800, fontSize: 78, color: COLORS.ink, letterSpacing: -2, lineHeight: 1.08 }}>Your XRP, working on Flare.</div>
          <div style={{ ...line(l2), fontFamily: BODY, fontWeight: 800, fontSize: 78, letterSpacing: -2, lineHeight: 1.12, marginTop: 8, background: `linear-gradient(100deg, ${COLORS.accent}, ${COLORS.accent2})`, WebkitBackgroundClip: "text", backgroundClip: "text", color: "transparent" }}>In one signature.</div>
        </div>
        <div style={{ opacity: interpolate(l2, [0, 0.6], [0, 1], { extrapolateRight: "clamp" }), fontFamily: BODY, fontSize: 34, color: COLORS.inkDim, textAlign: "center" }}>
          Mint FXRP and earn yield. No EVM wallet. No gas.
        </div>
        <div style={{ opacity: interpolate(url, [0, 0.5], [0, 1], { extrapolateRight: "clamp" }), marginTop: 20, fontFamily: MONO, fontSize: 34, fontWeight: 600, color: "#fff", background: `linear-gradient(100deg, ${COLORS.accent}, ${COLORS.accentDim})`, borderRadius: 16, padding: "18px 40px", boxShadow: `0 0 50px ${COLORS.accent}55` }}>
          {URLS.app}
        </div>
      </AbsoluteFill>
    </AbsoluteFill>
  );
};
