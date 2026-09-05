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
        <path d="M12 20s-7-4.4-7-9.2C5 8 7.2 6 9.6 6c1.5 0 2.4.7 2.4 1.6C12 6.7 12.9 6 14.4 6 16.8 6 19 8 19 10.8 19 15.6 12 20 12 20Z" />
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
        <rect x="7" y="4.5" width="13" height="10.5" rx="1.6" />
        <rect x="4" y="8.5" width="13" height="10.5" rx="1.6" />
      </svg>
    ),
  },
  {
    id: "love",
    label: "Pesan",
    icon: (
      <svg viewBox="0 0 24 24" className="size-[18px]" fill="none" stroke="currentColor" strokeWidth="1.6">
        <rect x="3.5" y="6" width="17" height="12" rx="2" />
        <path d="m4.5 8 7.5 5.2L19.5 8" />
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
    <nav className="anim-slide-up absolute inset-x-[10px] bottom-[10px] z-30 grid h-12 grid-cols-6 rounded-full bg-[rgba(58,24,68,0.45)] px-3 shadow-[0_8px_24px_rgba(0,0,0,0.28)] backdrop-blur-md">
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
          className={`grid place-items-center transition-all duration-300 ${
            active === item.id ? "scale-110 text-gold" : "scale-100 text-white"
          }`}
        >
          {item.icon}
        </button>
      ))}
    </nav>
  );
}
