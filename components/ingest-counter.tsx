"use client";

import { useEffect, useState } from "react";

export function IngestCounter({ start }: { start: number }) {
  const [value, setValue] = useState(start);

  useEffect(() => {
    setValue(start);
  }, [start]);

  useEffect(() => {
    const timer = window.setInterval(() => {
      setValue((current) => current + Math.floor(Math.random() * 3));
    }, 3200);
    return () => window.clearInterval(timer);
  }, []);

  return (
    <div className="font-display-xl-mobile text-display-xl-mobile font-bold tracking-tight text-on-primary">
      {value.toLocaleString()}
    </div>
  );
}
