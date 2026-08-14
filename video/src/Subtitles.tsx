import React from "react";
import { AbsoluteFill, useCurrentFrame } from "remotion";
import { BODY } from "./fonts";

type SubtitleEntry = { text: string; startFrame: number; endFrame: number };

// Whisper-timed on the real ElevenLabs audio; text corrected to the script spelling.
export const SUBTITLE_ENTRIES: SubtitleEntry[] = [
  // hook (offset 0)
  { text: "Your XRP mostly just sits there.", startFrame: 0, endFrame: 79 },
  { text: "On Flare, that same XRP could be earning yield.", startFrame: 79, endFrame: 180 },
  { text: "Baton makes it happen from the wallet you already own.", startFrame: 180, endFrame: 300 },
  // problem (offset 305)
  { text: "Normally, this is a slog.", startFrame: 305, endFrame: 364 },
  { text: "You bridge or mint a wrapped asset, set up a wallet on a new chain,", startFrame: 364, endFrame: 523 },
  { text: "buy its gas token, approve a contract, and only then deposit.", startFrame: 523, endFrame: 667 },
  { text: "Five steps across two chains.", startFrame: 667, endFrame: 731 },
  { text: "Most people quit before they finish.", startFrame: 731, endFrame: 805 },
  // howitworks (offset 816)
  { text: "Baton uses Flare Smart Accounts to collapse all of that.", startFrame: 816, endFrame: 922 },
  { text: "You sign from your XRP Ledger wallet, and Flare's operator takes it from there.", startFrame: 922, endFrame: 1075 },
  { text: "It mints real FXRP through FAssets and deposits it into a live yield vault.", startFrame: 1075, endFrame: 1304 },
  { text: "No EVM wallet, no gas, no bridge. Your key never leaves your hands.", startFrame: 1304, endFrame: 1470 },
  // app (offset 1482)
  { text: "Here's the app, running live. Pick a strategy: Upshift or Firelight.", startFrame: 1482, endFrame: 1638 },
  { text: "Choose how much to put to work, and confirm.", startFrame: 1638, endFrame: 1704 },
  { text: "The Flare operator does the on-chain work, and your position shows up for real.", startFrame: 1704, endFrame: 1872 },
  { text: "Ten FXRP, in a live Flare vault, valued in real time through Flare's FTSO oracle.", startFrame: 1872, endFrame: 2139 },
  { text: "Every figure here is read straight from the chain.", startFrame: 2139, endFrame: 2240 },
  // proof (offset 2247)
  { text: "And none of it is staged.", startFrame: 2247, endFrame: 2307 },
  { text: "This is the real transaction on the Coston2 block explorer.", startFrame: 2307, endFrame: 2439 },
  { text: "In one Flare transaction, the operator minted 10 FXRP and deposited it,", startFrame: 2439, endFrame: 2611 },
  { text: "driven entirely from the XRP Ledger, with no EVM wallet and no gas.", startFrame: 2611, endFrame: 2794 },
  { text: "Network: Coston2. Chain ID: 114.", startFrame: 2794, endFrame: 2929 },
  { text: "If the price oracle ever goes quiet, your balance still renders.", startFrame: 2929, endFrame: 3045 },
  { text: "Nothing here is faked.", startFrame: 3045, endFrame: 3100 },
  // close (offset 3109)
  { text: "Baton. Your XRP, working on Flare.", startFrame: 3109, endFrame: 3205 },
  { text: "Try it live at baton-flare.onrender.com", startFrame: 3205, endFrame: 3340 },
];

export const Subtitles: React.FC = () => {
  const frame = useCurrentFrame();
  const active = SUBTITLE_ENTRIES.find((e) => frame >= e.startFrame && frame < e.endFrame);
  if (!active) return null;
  return (
    <AbsoluteFill style={{ justifyContent: "flex-end", alignItems: "center", zIndex: 50 }}>
      <div
        style={{
          background: "rgba(6,9,18,0.78)",
          border: "1px solid rgba(47,123,255,0.18)",
          backdropFilter: "blur(8px)",
          borderRadius: 12,
          padding: "12px 30px",
          marginBottom: 56,
          maxWidth: 1500,
        }}
      >
        <div
          style={{
            fontFamily: BODY,
            fontSize: 30,
            fontWeight: 600,
            color: "#eef2fb",
            textAlign: "center",
            lineHeight: 1.4,
          }}
        >
          {active.text}
        </div>
      </div>
    </AbsoluteFill>
  );
};
