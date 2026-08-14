import React from "react";
import { AbsoluteFill, Img, staticFile, useCurrentFrame, useVideoConfig, spring, interpolate } from "remotion";
import { COLORS, ORBS, SCENE_DURATIONS, IMG, FACTS } from "../constants";
import { BODY, MONO } from "../fonts";
import { AnimatedBackground } from "../components/AnimatedBackground";

const Fact: React.FC<{ children: React.ReactNode; delay: number; color: string }> = ({ children, delay, color }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const p = spring({ frame: frame - delay, fps, config: { damping: 16, stiffness: 90 } });
  const op = interpolate(p, [0, 0.5], [0, 1], { extrapolateRight: "clamp" });
  const x = interpolate(p, [0, 1], [26, 0]);
  return (
    <div style={{ opacity: op, transform: `translateX(${x}px)`, display: "flex", alignItems: "center", gap: 12 }}>
      <div style={{ width: 10, height: 10, borderRadius: "50%", background: color, boxShadow: `0 0 12px ${color}`, flex: "none" }} />
      <div style={{ fontFamily: BODY, fontSize: 24, color: COLORS.ink }}>{children}</div>
    </div>
  );
};

export const Proof: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const dur = SCENE_DURATIONS.proof;
  const exitOp = interpolate(frame, [dur - 20, dur], [1, 0], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });

  const head = spring({ frame, fps, config: { damping: 15, stiffness: 80 } });
  const headOp = interpolate(head, [0, 0.4], [0, 1], { extrapolateRight: "clamp" });

  const shot = spring({ frame: frame - 20, fps, config: { damping: 16, stiffness: 70 } });
  const shotOp = interpolate(shot, [0, 0.4], [0, 1], { extrapolateRight: "clamp" });
  const shotY = interpolate(shot, [0, 1], [24, 0]);

  const badge = spring({ frame: frame - 430, fps, config: { damping: 13, stiffness: 90 } });
  const badgeOp = interpolate(badge, [0, 0.5], [0, 1], { extrapolateRight: "clamp" });
  const badgeScale = interpolate(badge, [0, 1], [0.8, 1]);

  const safe = spring({ frame: frame - 620, fps, config: { damping: 15, stiffness: 90 } });
  const safeOp = interpolate(safe, [0, 0.5], [0, 1], { extrapolateRight: "clamp" });

  return (
    <AbsoluteFill style={{ background: COLORS.bg, opacity: exitOp }}>
      <AnimatedBackground orbs={ORBS} />
      <AbsoluteFill style={{ padding: "56px 80px", flexDirection: "column", alignItems: "center" }}>
        <div style={{ opacity: headOp, fontFamily: BODY, fontWeight: 800, fontSize: 40, color: COLORS.ink, marginBottom: 26, letterSpacing: -1 }}>
          Real, and on-chain.
        </div>

        <div style={{ display: "flex", gap: 34, alignItems: "center", width: "100%", justifyContent: "center" }}>
          {/* explorer screenshot */}
          <div style={{ width: 980, opacity: shotOp, transform: `translateY(${shotY}px)`, borderRadius: 12, overflow: "hidden", border: `1px solid ${COLORS.line}`, boxShadow: `0 0 50px ${COLORS.accent}14` }}>
            <Img src={staticFile(IMG.explorerTx)} style={{ width: "100%", display: "block" }} />
          </div>

          {/* fact panel */}
          <div style={{ width: 560, display: "flex", flexDirection: "column", gap: 20 }}>
            <Fact delay={70} color={COLORS.good}>Status: <b>Success</b></Fact>
            <Fact delay={120} color={COLORS.accent}>Method: <span style={{ fontFamily: MONO, fontSize: 20, color: COLORS.accentDim }}>{FACTS.method}</span></Fact>
            <Fact delay={180} color={COLORS.accent2}><b>10 FXRP</b> minted and deposited into the Upshift vault</Fact>
            <Fact delay={240} color={COLORS.ink}>Interacted with <b>MasterAccountController</b></Fact>
            <Fact delay={300} color={COLORS.inkDim}>No EVM wallet. No gas from the user.</Fact>
            <div style={{ marginTop: 8, fontFamily: MONO, fontSize: 16, color: COLORS.inkFaint, opacity: interpolate(spring({ frame: frame - 340, fps, config: { damping: 16, stiffness: 90 } }), [0, 0.5], [0, 1], { extrapolateRight: "clamp" }) }}>
              tx {FACTS.depositTxShort}
            </div>
          </div>
        </div>

        {/* network + chainId badge + safeguard */}
        <div style={{ display: "flex", gap: 20, marginTop: 34, alignItems: "center" }}>
          <div style={{ opacity: badgeOp, transform: `scale(${badgeScale})`, fontFamily: BODY, fontWeight: 800, fontSize: 28, color: "#fff", background: `linear-gradient(100deg, ${COLORS.accent}, ${COLORS.accentDim})`, borderRadius: 12, padding: "12px 26px", boxShadow: `0 0 40px ${COLORS.accent}44` }}>
            Network: {FACTS.network} · chainId {FACTS.chainId}
          </div>
          <div style={{ opacity: safeOp, fontFamily: BODY, fontSize: 22, color: COLORS.good, border: `1px solid ${COLORS.good}55`, borderRadius: 999, padding: "12px 22px", background: `${COLORS.good}12` }}>
            Price feed down? Your balance still renders.
          </div>
        </div>
      </AbsoluteFill>
    </AbsoluteFill>
  );
};
