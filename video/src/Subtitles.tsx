import React from "react";
import { AbsoluteFill, useCurrentFrame } from "remotion";
import { BODY } from "./fonts";

type SubtitleEntry = { text: string; startFrame: number; endFrame: number };

// Whisper-timed on the real ElevenLabs audio; text corrected to the script spelling.
export const SUBTITLE_ENTRIES: SubtitleEntry[] = [
  // hook (offset 0)
  { text: "Your XRP mostly just sits there.", startFrame: 0, endFrame: 67 },
  { text: "On Flare, that same XRP could be earning yield.", startFrame: 67, endFrame: 160 },
  { text: "Baton makes it happen from the wallet you already own.", startFrame: 160, endFrame: 250 },
  // problem (offset 280)
  { text: "Normally, this is a slog.", startFrame: 280, endFrame: 339 },
  { text: "You bridge or mint a wrapped asset, set up a wallet on a new chain,", startFrame: 339, endFrame: 498 },
  { text: "buy its gas token, approve a contract, and only then deposit.", startFrame: 498, endFrame: 642 },
  { text: "Five steps across two chains.", startFrame: 642, endFrame: 706 },
  { text: "Most people quit before they finish.", startFrame: 706, endFrame: 780 },
  // howitworks (offset 791)
  { text: "Baton uses Flare Smart Accounts to collapse all of that.", startFrame: 791, endFrame: 897 },
  { text: "You sign from your XRP Ledger wallet, and Flare's operator takes it from there.", startFrame: 897, endFrame: 1050 },
  { text: "It mints real FXRP through FAssets and deposits it into a live yield vault.", startFrame: 1050, endFrame: 1279 },
  { text: "No EVM wallet, no gas, no bridge. Your key never leaves your hands.", startFrame: 1279, endFrame: 1445 },
  // app (offset 1457)
  { text: "Here's the app, running live. Pick a strategy: Upshift or Firelight.", startFrame: 1457, endFrame: 1613 },
  { text: "Choose how much to put to work, and confirm.", startFrame: 1613, endFrame: 1679 },
  { text: "The Flare operator does the on-chain work, and your position shows up for real.", startFrame: 1679, endFrame: 1847 },
  { text: "Ten FXRP, in a live Flare vault, valued in real time through Flare's FTSO oracle.", startFrame: 1847, endFrame: 2114 },
  { text: "Every figure here is read straight from the chain.", startFrame: 2114, endFrame: 2215 },
  // proof (offset 2222)
  { text: "And none of it is staged.", startFrame: 2222, endFrame: 2277 },
  { text: "This is the real transaction on the Coston2 block explorer.", startFrame: 2277, endFrame: 2396 },
  { text: "In one Flare transaction, the operator minted 10 FXRP and deposited it,", startFrame: 2396, endFrame: 2574 },
  { text: "driven entirely from the XRP Ledger, with no EVM wallet and no gas.", startFrame: 2574, endFrame: 2756 },
  { text: "Network: Coston2. Chain ID: 114.", startFrame: 2756, endFrame: 2874 },
  { text: "If the price oracle ever goes quiet, your balance still renders.", startFrame: 2874, endFrame: 2974 },
  { text: "Nothing here is faked.", startFrame: 2974, endFrame: 3022 },
  // close (offset 3037)
  { text: "Baton. Your XRP, working on Flare.", startFrame: 3037, endFrame: 3133 },
  { text: "Try it live at baton-flare.onrender.com", startFrame: 3133, endFrame: 3268 },
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
