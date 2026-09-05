"use client";

import type { ReactNode } from "react";
import { useMusic } from "@/components/MusicProvider";

export type SectionId =
  | "home"
  | "schedule"
  | "gallery"
  | "love"
  | "gift";

const items: { id: SectionId; label: string; icon: ReactNode }[] = [
  {
    id: "home",
    label: "Beranda",
    icon: (
      <svg viewBox="0 0 24 24" className="size-[18px]" fill="none" stroke="currentColor" strokeWidth="1.6">
        <path d="M4 10.5 12 4l8 6.5V20a1 1 0 0 1-1 1h-5v-6H10v6H5a1 1 0 0 1-1-1v-9.5Z" />
        <path d="M11.2 10.2c.4-1 1.2-1.5 1.8-1.2.3.2.4.6.3 1.1-.3 1.1-1.6 1.6-1.6 1.6" />
      </svg>
    ),
  },
  {
    id: "schedule",
    label: "Acara",
    icon: (
      <svg viewBox="0 0 24 24" className="size-[18px]" fill="none" stroke="currentColor" strokeWidth="1.6">
        <rect x="4" y="5" width="16" height="15" rx="2" />
        <path d="M8 3v4M16 3v4M4 10h16M8 14h2M12 14h2M16 14h2M8 17h2M12 17h2" />
      </svg>
    ),
  },
  {
    id: "gallery",
    label: "Galeri",
    icon: (
      <svg viewBox="0 0 24 24" className="size-[18px]" fill="none" stroke="currentColor" strokeWidth="1.6">
        <rect x="3.5" y="6" width="17" height="12" rx="3" />
        <path d="m10 12 4 2.4-4 2.4V12Z" fill="currentColor" stroke="none" />
      </svg>
    ),
  },
  {
    id: "love",
    label: "Kisah",
    icon: (
      <svg viewBox="0 0 24 24" className="size-[18px]" fill="none" stroke="currentColor" strokeWidth="1.6">
        <path d="M12 20s-7-4.4-7-9.2C5 8 7.2 6 9.6 6c1.5 0 2.4.7 2.4 1.6C12 6.7 12.9 6 14.4 6 16.8 6 19 8 19 10.8 19 15.6 12 20 12 20Z" />
      </svg>
    ),
  },
  {
    id: "gift",
    label: "Hadiah",
    icon: (
      <svg viewBox="0 0 24 24" className="size-[18px]" fill="none" stroke="currentColor" strokeWidth="1.6">
        <rect x="4" y="11" width="16" height="9" rx="1.5" />
        <path d="M4 11h16M12 11v9M12 11c0-3-2-5-4.2-5C6 6 5 7.4 5 9c0 1.2.6 2 1.6 2H12Zm0 0c0-3 2-5 4.2-5C18 6 19 7.4 19 9c0 1.2-.6 2-1.6 2H12Z" />
      </svg>
    ),
  },
];

export function FloatingNav({
  active,
  onSelect,
}: {
  active: SectionId;
  onSelect: (id: SectionId) => void;
}) {
  const { playing, toggle } = useMusic();

  return (
    <nav className="absolute inset-x-[10px] bottom-[10px] z-30 grid h-12 grid-cols-6 rounded-full bg-[rgba(58,24,68,0.45)] px-3 shadow-[0_8px_24px_rgba(0,0,0,0.28)] backdrop-blur-md">
      <button
        type="button"
        onClick={toggle}
        aria-label={playing ? "Pause music" : "Play music"}
        className="grid place-items-center text-white"
      >
        {playing ? (
          <svg viewBox="0 0 24 24" className="size-[18px]" fill="currentColor" aria-hidden>
            <rect x="6" y="5" width="4" height="14" rx="1" />
            <rect x="14" y="5" width="4" height="14" rx="1" />
          </svg>
        ) : (
          <svg viewBox="0 0 24 24" className="size-[18px]" fill="currentColor" aria-hidden>
            <path d="M8 5.5v13l11-6.5-11-6.5Z" />
          </svg>
        )}
      </button>
      {items.map((item) => (
        <button
          key={item.id}
          type="button"
          onClick={() => onSelect(item.id)}
          aria-label={item.label}
          className={`grid place-items-center ${
            active === item.id ? "text-gold" : "text-white"
          }`}
        >
          {item.icon}
        </button>
      ))}
    </nav>
  );
}
