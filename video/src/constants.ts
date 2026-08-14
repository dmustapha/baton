// Baton demo — control center. Palette matches the live app (globals.css).
export const FPS = 30;
export const W = 1920;
export const H = 1080;

export const COLORS = {
  bg: "#0a0e1a",
  bgElevated: "#111726",
  bgCard: "rgba(17,23,38,0.82)",
  accent: "#2f7bff", // XRP blue
  accentDim: "#1e63e0",
  accent2: "#ff5a3c", // Flare ember
  ink: "#eef2fb",
  inkDim: "#9aa6c4",
  inkFaint: "#5f6c8c",
  line: "#232c44",
  good: "#35d09a",
  warn: "#ffb84d",
  white: "#ffffff",
};

// Orb palette for AnimatedBackground (blue + ember, matching the app glow)
export const ORBS = [
  { baseX: 300, baseY: 220, size: 520, color: "#2f7bff", blur: 130, opacity: 0.1, speed: 0.006 },
  { baseX: 1580, baseY: 800, size: 460, color: "#ff5a3c", blur: 120, opacity: 0.07, speed: 0.005 },
  { baseX: 960, baseY: 480, size: 560, color: "#1e63e0", blur: 150, opacity: 0.06, speed: 0.008 },
  { baseX: 1680, baseY: 180, size: 360, color: "#2f7bff", blur: 110, opacity: 0.05, speed: 0.007 },
];

// Scene durations — driven by the real ElevenLabs audio length + tail (no narration is ever cut).
// audio(s): hook 9.38, problem 16.25, howitworks 21.41, app 24.71, proof 27.82, close 6.73
export const SCENE_DURATIONS = {
  hook: 305,
  problem: 511,
  howitworks: 666,
  app: 765,
  proof: 862,
  close: 238,
} as const;

export const SCENE_ORDER = ["hook", "problem", "howitworks", "app", "proof", "close"] as const;

export const TOTAL_FRAMES = Object.values(SCENE_DURATIONS).reduce((a, b) => a + b, 0);

export const AUDIO_FILES: Record<keyof typeof SCENE_DURATIONS, string> = {
  hook: "audio/hook.mp3",
  problem: "audio/problem.mp3",
  howitworks: "audio/howitworks.mp3",
  app: "audio/app.mp3",
  proof: "audio/proof.mp3",
  close: "audio/close.mp3",
};

export const IMG = {
  appHero: "img/app-hero.png",
  appFull: "img/app-full.png",
  proof: "img/proof.png",
  explorerTx: "img/explorer-tx.png",
};

// The friction (problem scene) — the normal 5-step slog
export const FRICTION_STEPS = [
  "Bridge or mint a wrapped asset",
  "Set up a wallet on a new chain",
  "Buy that chain's gas token",
  "Approve a contract",
  "Finally deposit",
];

// The Baton flow (howItWorks scene)
export const FLOW_STEPS = [
  { label: "Sign once", sub: "from your XRP Ledger wallet", color: COLORS.accent },
  { label: "Flare operator", sub: "picks up the instruction", color: COLORS.ink },
  { label: "Mint FXRP", sub: "real FAssets, on your behalf", color: COLORS.accent2 },
  { label: "Deposit to vault", sub: "a live Flare yield position", color: COLORS.good },
];

// Real on-chain facts (Real-Only — verified this session)
export const FACTS = {
  network: "Coston2",
  chainId: "114",
  depositTx: "0x5f4766e1bb83c34363d67f289e4ffdab0d8dd3c0903cea0b9d2c10df1c2ed6cb",
  depositTxShort: "0x5f4766e1…c2ed6cb",
  method: "executeDepositAfterMinting",
  fxrp: "10 FXRP",
  personalAccount: "0x27fBb63780AB83aE7CEcd69291AAbb0A769071f7",
  masterAccountController: "0x434936d47503353f06750Db1A444DBDC5F0AD37c",
  upshiftVault: "0xD91324A6e8884147F6425E9ddd60e11Aea060B5b",
};

export const URLS = {
  app: "baton-flare.onrender.com",
  github: "github.com/dmustapha/baton",
};

// Social clip (vertical)
export const SOCIAL_FPS = 30;
export const SOCIAL_W = 1080;
export const SOCIAL_H = 1920;
export const SOCIAL_DURATION = 10 * FPS;
