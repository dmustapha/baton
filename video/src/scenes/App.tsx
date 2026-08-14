import React from "react";
import { AbsoluteFill, Img, staticFile, useCurrentFrame, useVideoConfig, spring, interpolate } from "remotion";
import { COLORS, ORBS, SCENE_DURATIONS, IMG } from "../constants";
import { BODY, MONO } from "../fonts";
import { AnimatedBackground } from "../components/AnimatedBackground";

const Callout: React.FC<{ label: string; top: string; left: string; delay: number; color: string }> = ({ label, top, left, delay, color }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const p = spring({ frame: frame - delay, fps, config: { damping: 15, stiffness: 100 } });
  const op = interpolate(p, [0, 0.5], [0, 1], { extrapolateRight: "clamp" });
  const scale = interpolate(p, [0, 1], [0.8, 1]);
  return (
    <div style={{ position: "absolute", top, left, opacity: op, transform: `scale(${scale})`, transformOrigin: "left center", zIndex: 10 }}>
      <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
        <div style={{ width: 12, height: 12, borderRadius: "50%", background: color, boxShadow: `0 0 14px ${color}` }} />
        <div style={{ fontFamily: BODY, fontWeight: 700, fontSize: 22, color: "#fff", background: "rgba(6,9,18,0.9)", border: `1px solid ${color}66`, borderRadius: 999, padding: "8px 16px", whiteSpace: "nowrap" }}>
          {label}
        </div>
      </div>
    </div>
  );
};

export const App: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const dur = SCENE_DURATIONS.app;
  const exitOp = interpolate(frame, [dur - 20, dur], [1, 0], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });

  const win = spring({ frame, fps, config: { damping: 16, stiffness: 70 } });
  const winOp = interpolate(win, [0, 0.4], [0, 1], { extrapolateRight: "clamp" });
  const winY = interpolate(win, [0, 1], [30, 0]);
  // slow Ken Burns zoom
  const zoom = interpolate(frame, [0, dur], [1.0, 1.08], { extrapolateRight: "clamp" });

  return (
    <AbsoluteFill style={{ background: COLORS.bg, opacity: exitOp }}>
      <AnimatedBackground orbs={ORBS} />
      <AbsoluteFill style={{ justifyContent: "center", alignItems: "center" }}>
        <div style={{ position: "relative", width: 1560, opacity: winOp, transform: `translateY(${winY}px)` }}>
          {/* browser chrome */}
          <div style={{ background: "#0d1322", borderTopLeftRadius: 14, borderTopRightRadius: 14, border: `1px solid ${COLORS.line}`, borderBottom: "none", height: 46, display: "flex", alignItems: "center", padding: "0 18px", gap: 8 }}>
            <div style={{ width: 12, height: 12, borderRadius: "50%", background: "#ff5f57" }} />
            <div style={{ width: 12, height: 12, borderRadius: "50%", background: "#febc2e" }} />
            <div style={{ width: 12, height: 12, borderRadius: "50%", background: "#28c840" }} />
            <div style={{ marginLeft: 18, fontFamily: MONO, fontSize: 17, color: COLORS.inkDim, background: "#060912", borderRadius: 8, padding: "6px 16px", flex: 1, textAlign: "center" }}>
              baton-flare.onrender.com
            </div>
          </div>
          {/* screenshot */}
          <div style={{ overflow: "hidden", borderBottomLeftRadius: 14, borderBottomRightRadius: 14, border: `1px solid ${COLORS.line}`, borderTop: "none", position: "relative", height: 812 }}>
            <Img src={staticFile(IMG.appHero)} style={{ width: "100%", transform: `scale(${zoom})`, transformOrigin: "70% 80%" }} />
          </div>

          {/* callouts positioned over the app regions */}
          <Callout label="Live FTSO price" top="70px" left="1120px" delay={40} color={COLORS.good} />
          <Callout label="Pick a strategy" top="360px" left="60px" delay={70} color={COLORS.accent} />
          <Callout label="Real 10 FXRP position" top="360px" left="900px" delay={120} color={COLORS.accent2} />
        </div>
      </AbsoluteFill>
    </AbsoluteFill>
  );
};
