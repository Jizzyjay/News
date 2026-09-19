"use client";

import { useEffect, useState } from "react";
import { formatEditionStamp } from "@/lib/utils";

export function LiveEditionClock() {
  const [stamp, setStamp] = useState<string | null>(null);

  useEffect(() => {
    setStamp(formatEditionStamp());
    const timer = window.setInterval(() => {
      setStamp(formatEditionStamp());
    }, 1000);
    return () => window.clearInterval(timer);
  }, []);

  return (
    <span className="font-timestamp text-timestamp text-on-surface-variant">
      EDITION: GLOBAL DISPATCH · {stamp ?? "LIVE UTC FEED"} UTC
    </span>
  );
}
