"use client";

import { useState } from "react";
import { Icon } from "./icon";

export function AudioDigest({
  title = "The 5-Minute Morning Wire",
  summary,
}: {
  title?: string;
  summary: string;
}) {
  const [playing, setPlaying] = useState(false);
  const [speed, setSpeed] = useState("1.0x");
  const [progress, setProgress] = useState(33);

  return (
    <div className="mt-space-lg bg-primary p-space-md text-on-primary shadow-md">
      <div className="mb-space-xs flex items-center justify-between">
        <span className="font-label-caps text-label-caps font-bold uppercase tracking-widest text-secondary">
          AUDIO SYNTHESIS
        </span>
        <span className="font-timestamp text-timestamp text-on-primary-container">
          05:40 DURATION
        </span>
      </div>
      <div className="mb-space-xs font-headline-sm text-headline-sm text-on-primary">
        {title}
      </div>
      <p className="mb-space-md font-body-sm text-body-sm text-on-primary-container">
        {summary}
      </p>
      <div className="flex min-w-0 items-center gap-space-sm">
        <button
          className="flex size-10 shrink-0 items-center justify-center bg-secondary text-on-secondary hover:bg-secondary-container"
          type="button"
          onClick={() => setPlaying((value) => !value)}
          aria-label={playing ? "Pause" : "Play"}
        >
          <Icon name={playing ? "pause" : "play_arrow"} className="text-[24px]" />
        </button>
        <div className="flex-1">
          <button
            className="relative h-1 w-full cursor-pointer bg-on-primary/20"
            type="button"
            aria-label="Seek audio"
            onClick={(event) => {
              const rect = event.currentTarget.getBoundingClientRect();
              const next = ((event.clientX - rect.left) / rect.width) * 100;
              setProgress(Math.min(100, Math.max(0, next)));
            }}
          >
            <span
              className="absolute inset-y-0 left-0 bg-secondary"
              style={{ width: `${progress}%` }}
            />
          </button>
          <div className="mt-1 flex justify-between font-timestamp text-timestamp text-on-primary-container">
            <span>01:52</span>
            <span>05:40</span>
          </div>
        </div>
        <button
          className="text-on-primary hover:text-secondary"
          type="button"
          onClick={() => {
            const speeds = ["1.0x", "1.25x", "1.5x", "2.0x"];
            setSpeed((current) => speeds[(speeds.indexOf(current) + 1) % speeds.length]);
          }}
        >
          <span className="font-label-caps text-label-caps">{speed}</span>
        </button>
      </div>
    </div>
  );
}
