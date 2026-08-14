import React from "react";
import { AbsoluteFill, Sequence, Audio, interpolate, staticFile } from "remotion";
import { SCENE_DURATIONS, FPS, AUDIO_FILES, COLORS } from "./constants";
import { Hook } from "./scenes/Hook";
import { Problem } from "./scenes/Problem";
import { HowItWorks } from "./scenes/HowItWorks";
import { App } from "./scenes/App";
import { Proof } from "./scenes/Proof";
import { Close } from "./scenes/Close";
import { Subtitles } from "./Subtitles";

// Audio is loudnorm'd to -16 LUFS, so play at volume 1.0 with a gentle tail fade.
const SceneAudio: React.FC<{ src: string; durationInFrames: number }> = ({ src, durationInFrames }) => (
  <Audio
    src={staticFile(src)}
    volume={(f: number) =>
      interpolate(f, [durationInFrames - FPS * 1.2, durationInFrames], [1, 0], {
        extrapolateLeft: "clamp",
        extrapolateRight: "clamp",
      })
    }
  />
);

const scenes = [
  { id: "hook", Component: Hook, dur: SCENE_DURATIONS.hook },
  { id: "problem", Component: Problem, dur: SCENE_DURATIONS.problem },
  { id: "howitworks", Component: HowItWorks, dur: SCENE_DURATIONS.howitworks },
  { id: "app", Component: App, dur: SCENE_DURATIONS.app },
  { id: "proof", Component: Proof, dur: SCENE_DURATIONS.proof },
  { id: "close", Component: Close, dur: SCENE_DURATIONS.close },
] as const;

export const MainVideo: React.FC = () => {
  let offset = 0;
  return (
    <AbsoluteFill style={{ background: COLORS.bg }}>
      {scenes.map((scene) => {
        const from = offset;
        offset += scene.dur;
        return (
          <Sequence key={scene.id} from={from} durationInFrames={scene.dur}>
            <scene.Component />
            <SceneAudio src={AUDIO_FILES[scene.id as keyof typeof AUDIO_FILES]} durationInFrames={scene.dur} />
          </Sequence>
        );
      })}
      <Subtitles />
    </AbsoluteFill>
  );
};
