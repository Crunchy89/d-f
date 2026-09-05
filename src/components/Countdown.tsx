"use client";

import { useEffect, useState } from "react";

type TimeLeft = {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
};

function getTimeLeft(iso: string): TimeLeft {
  const diff = Math.max(0, new Date(iso).getTime() - Date.now());
  return {
    days: Math.floor(diff / 86_400_000),
    hours: Math.floor((diff / 3_600_000) % 24),
    minutes: Math.floor((diff / 60_000) % 60),
    seconds: Math.floor((diff / 1_000) % 60),
  };
}

function pad(value: number) {
  return String(value).padStart(2, "0");
}

export function Countdown({ iso }: { iso: string }) {
  const [time, setTime] = useState<TimeLeft | null>(null);

  useEffect(() => {
    setTime(getTimeLeft(iso));
    const id = window.setInterval(() => setTime(getTimeLeft(iso)), 1000);
    return () => window.clearInterval(id);
  }, [iso]);

  const units: { label: string; value: string }[] = [
    { label: "Days", value: time ? String(time.days) : "—" },
    { label: "Hours", value: time ? pad(time.hours) : "—" },
    { label: "Min", value: time ? pad(time.minutes) : "—" },
    { label: "Sec", value: time ? pad(time.seconds) : "—" },
  ];

  return (
    <div className="grid grid-cols-4 gap-2">
      {units.map((unit) => (
        <div
          key={unit.label}
          className="rounded-xl border border-gold/30 bg-black/25 px-1 py-3 text-center backdrop-blur-[2px]"
        >
          <p className="readable font-serif text-3xl leading-none">{unit.value}</p>
          <p className="readable-soft mt-1.5 font-sans text-xs tracking-[0.16em] uppercase">
            {unit.label}
          </p>
        </div>
      ))}
    </div>
  );
}
