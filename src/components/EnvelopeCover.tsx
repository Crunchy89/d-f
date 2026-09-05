"use client";

import Image from "next/image";
import { useState, type ReactNode } from "react";
import { GuestGreeting } from "@/components/GuestGreeting";
import { MusicProvider } from "@/components/MusicProvider";
import { wedding } from "@/data/wedding";

export function EnvelopeCover({
  children,
  guestName,
}: {
  children: ReactNode;
  guestName: string;
}) {
  const [opened, setOpened] = useState(false);

  return (
    <MusicProvider shouldPlay={opened}>
    <div className="relative h-full">
      <div
        className={`h-full overflow-hidden transition-opacity duration-700 ${
          opened ? "opacity-100" : "pointer-events-none opacity-0"
        }`}
      >
        {children}
      </div>

      <div
        className={`absolute inset-0 z-20 overflow-hidden transition-all duration-700 ease-out ${
          opened
            ? "pointer-events-none -translate-y-8 scale-[1.04] opacity-0"
            : "translate-y-0 scale-100 opacity-100"
        }`}
      >
        <Image
          src="/asset/d-and-f-1.webp"
          alt={`${wedding.couple.partnerOne} and ${wedding.couple.partnerTwo}`}
          fill
          preload
          sizes="390px"
          className="anim-cover-zoom object-cover object-[center_62%]"
        />
        <div className="cover-overlay anim-fade-in absolute inset-0" />

        <button
          type="button"
          onClick={() => setOpened(true)}
          className="relative z-10 flex h-full w-full flex-col items-center justify-between px-8 pt-16 pb-12 text-center"
        >
          <div>
            <p className="anim-fade-up font-sans text-sm tracking-[0.32em] text-gold/90 uppercase">
              The Wedding Of
            </p>
            <h1 className="anim-fade-up anim-delay-1 mt-4 font-script text-[4.2rem] leading-none text-ivory">
              {wedding.couple.partnerOne}
              <span className="mx-2 font-script text-4xl text-gold">&</span>
              {wedding.couple.partnerTwo}
            </h1>
            <p className="anim-fade-up anim-delay-2 mt-3 font-serif text-xl text-ivory/90">
              {wedding.date.display}
            </p>
            <div className="anim-fade-up anim-delay-3 mt-5">
              <GuestGreeting
                name={guestName}
                dearClassName="font-sans text-sm tracking-[0.24em] text-gold/90 uppercase"
                nameClassName="mt-1 font-script text-4xl text-ivory"
              />
            </div>
          </div>

          <div className="anim-fade-up anim-delay-4">
            <span className="seal mx-auto grid size-[4.4rem] place-items-center rounded-full bg-plum shadow-[0_8px_24px_rgba(0,0,0,0.35)] ring-4 ring-gold/50 transition-transform duration-200 active:scale-95">
              <span className="font-script text-2xl text-ivory">
                {wedding.couple.partnerOne[0]}
                {wedding.couple.partnerTwo[0]}
              </span>
            </span>
            <p className="mt-6 animate-pulse font-sans text-sm tracking-[0.24em] text-ivory/90 uppercase">
              Tap to open
            </p>
          </div>
        </button>
      </div>
    </div>
    </MusicProvider>
  );
}
