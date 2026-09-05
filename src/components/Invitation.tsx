"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";
import { FloatingNav, type SectionId } from "@/components/FloatingNav";
import { CoupleHome } from "@/components/CoupleHome";
import { wedding } from "@/data/wedding";
import Image from "next/image";

const sections: SectionId[] = [
  "home",
  "schedule",
  "gallery",
  "love",
  "gift",
];

function Section({
  id,
  active,
  children,
}: {
  id: SectionId;
  active: SectionId;
  children: ReactNode;
}) {
  const shown = id === active;
  const [play, setPlay] = useState(0);

  useEffect(() => {
    if (!shown) return;
    const frame = window.requestAnimationFrame(() => setPlay((n) => n + 1));
    return () => window.cancelAnimationFrame(frame);
  }, [shown]);

  return (
    <section
      id={id}
      className={`absolute inset-0 flex flex-col overflow-hidden px-5 pt-8 pb-20 transition-opacity duration-500 ${
        shown ? "z-10 opacity-100" : "pointer-events-none z-0 opacity-0"
      }`}
    >
      {shown && play > 0 ? (
        <div key={play} className="reveal is-in my-auto text-center">
          {children}
        </div>
      ) : null}
    </section>
  );
}

export function Invitation() {
  const pageRef = useRef<HTMLDivElement>(null);
  const activeRef = useRef<SectionId>("home");
  const lockedRef = useRef(false);
  const touchStartY = useRef(0);
  const [active, setActive] = useState<SectionId>("home");

  function goTo(id: SectionId) {
    activeRef.current = id;
    setActive(id);
  }

  function shift(delta: number) {
    if (lockedRef.current) return;
    const index = sections.indexOf(activeRef.current);
    const next = sections[index + delta];
    if (!next) return;
    lockedRef.current = true;
    goTo(next);
    window.setTimeout(() => {
      lockedRef.current = false;
    }, 550);
  }

  useEffect(() => {
    const root = pageRef.current;
    if (!root) return;

    function onWheel(event: WheelEvent) {
      event.preventDefault();
      if (Math.abs(event.deltaY) < 16) return;
      shift(event.deltaY > 0 ? 1 : -1);
    }

    root.addEventListener("wheel", onWheel, { passive: false });
    return () => root.removeEventListener("wheel", onWheel);
  }, []);

  return (
    <div className="relative h-full overflow-hidden">
      <div
        ref={pageRef}
        className="relative h-full touch-none overflow-hidden"
        onTouchStart={(event) => {
          touchStartY.current = event.touches[0].clientY;
        }}
        onTouchEnd={(event) => {
          const dy = event.changedTouches[0].clientY - touchStartY.current;
          if (dy < -48) shift(1);
          if (dy > 48) shift(-1);
        }}
      >
        <Section id="home" active={active}>
          <CoupleHome />
        </Section>

        <Section id="schedule" active={active}>
          <p className="reveal-line d1 readable font-sans text-sm font-light tracking-[0.28em] uppercase">
            Event
          </p>
          <p className="reveal-line d2 readable font-sans text-lg font-bold tracking-[0.16em] uppercase">
            Details & Venue
          </p>
          <p className="reveal-line d3 readable-soft mt-5 font-sans text-[15px] leading-relaxed">
            {wedding.eventIntro}
          </p>
          <p className="reveal-line d4 readable mt-3 font-sans text-lg font-bold">
            {wedding.date.weekdayId} | {wedding.date.day} {wedding.date.month} |{" "}
            {wedding.date.year}
          </p>
          <Image
            src="/asset/calendar.webp"
            alt="26 September 2026"
            width={352}
            height={310}
            className="reveal-photo-zoom d5 mx-auto mt-6 mb-6 h-auto w-44 mix-blend-screen"
          />
          <p className="reveal-line d6 readable mt-2 font-sans text-[15px]">
            Akad Nikah : {wedding.akad}
          </p>
          <p className="reveal-line d7 readable mt-1 font-sans text-[15px]">
            Resepsi : {wedding.resepsi}
          </p>
          <p className="reveal-line d8 readable mt-1 font-sans text-[15px]">
            Lokasi : <span className="font-bold">{wedding.venue}</span>
          </p>
          <div className="reveal-photo d9 mt-5 overflow-hidden rounded-2xl border-2 border-white">
            <iframe
              title="Lokasi pernikahan"
              src={wedding.mapEmbed}
              className="h-36 w-full border-0"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>
          <div className="reveal-line d10 mt-5 flex flex-col items-center gap-3">
            <a
              href={wedding.mapUrl}
              target="_blank"
              rel="noreferrer"
              className="inline-flex rounded-full border-2 border-gold bg-[rgba(42,20,52,0.88)] px-7 py-2.5 font-sans text-sm tracking-[0.16em] text-ivory uppercase shadow-[0_4px_16px_rgba(0,0,0,0.35)]"
            >
              Get Direction
            </a>
            <a
              href={wedding.calendarUrl}
              target="_blank"
              rel="noreferrer"
              className="inline-flex rounded-full bg-gold px-7 py-2.5 font-sans text-sm tracking-[0.16em] text-ink uppercase"
            >
              Add to Calendar
            </a>
          </div>
          <p className="reveal-line d11 readable mt-8 font-script text-6xl leading-none">
            D<span className="text-gold">&</span>F
          </p>
        </Section>

        <Section id="gallery" active={active}>
          <p className="reveal-line d1 readable font-sans text-sm font-light tracking-[0.28em] uppercase">
            Galery
          </p>
          <p className="reveal-line d2 readable mt-1 mb-5 font-sans text-xl font-bold tracking-[0.18em] uppercase">
            {wedding.couple.partnerOne} & {wedding.couple.partnerTwo}
          </p>
          <div className="grid grid-cols-2 gap-2">
            <Image
              src="/asset/gallery_1.webp"
              alt={`${wedding.couple.partnerOne} & ${wedding.couple.partnerTwo} 1`}
              width={320}
              height={314}
              className="reveal-photo d3 h-auto max-w-none -mr-5"
              style={{ width: 160 }}
            />
            <Image
              src="/asset/gallery_2.webp"
              alt={`${wedding.couple.partnerOne} & ${wedding.couple.partnerTwo} 2`}
              width={390}
              height={331}
              className="reveal-photo d4 h-auto max-w-none -ml-5"
              style={{ width: 195 }}
            />
            <Image
              src="/asset/gallery_3.webp"
              alt={`${wedding.couple.partnerOne} & ${wedding.couple.partnerTwo} 3`}
              width={360}
              height={409}
              className="reveal-photo d5 h-auto w-full"
            />
            <Image
              src="/asset/gallery_4.webp"
              alt={`${wedding.couple.partnerOne} & ${wedding.couple.partnerTwo} 4`}
              width={360}
              height={409}
              className="reveal-photo d6 h-auto w-full"
            />
            <Image
              src="/asset/gallery_5.webp"
              alt={`${wedding.couple.partnerOne} & ${wedding.couple.partnerTwo} 5`}
              width={360}
              height={409}
              className="reveal-photo d7 h-auto w-full"
            />
            <Image
              src="/asset/gallery_6.webp"
              alt={`${wedding.couple.partnerOne} & ${wedding.couple.partnerTwo} 6`}
              width={360}
              height={409}
              className="reveal-photo d8 h-auto w-full"
            />
          </div>
          <p className="reveal-line d9 readable mt-8 font-script text-6xl leading-none">
            D<span className="text-gold">&</span>F
          </p>
        </Section>

        <Section id="love" active={active}>
          <p className="reveal-line d1 readable font-script text-6xl leading-none">
            D<span className="text-gold">&</span>F
          </p>
          <p
            dir="rtl"
            className="reveal-line d2 readable mt-6 font-arabic text-lg leading-loose"
          >
            {wedding.quranArabic}
          </p>
          <p className="reveal-line d3 readable-soft mt-5 font-sans text-[15px] leading-relaxed">
            {wedding.quranTranslation}
          </p>
          <p className="reveal-line d4 readable mt-4 font-sans text-sm font-semibold tracking-[0.12em]">
            {wedding.quranSource}
          </p>
        </Section>

        <Section id="gift" active={active}>
          <p className="reveal-line d1 readable font-sans text-lg font-bold tracking-[0.2em] uppercase">
            Send Gift
          </p>
          <div className="reveal-photo-zoom d2 mx-auto mt-6 w-54 rounded-2xl bg-white p-3">
            <img
              src={wedding.giftQr}
              alt="QR send gift"
              width={240}
              height={240}
              className="h-auto w-full"
            />
          </div>
          <div className="mt-6 space-y-5 text-left">
            {wedding.gifts.map((gift, index) => (
              <div
                key={gift.bank}
                className={`reveal-line ${index === 0 ? "d3" : "d4"}`}
              >
                <p className="readable font-sans text-base font-bold">
                  {gift.bank}
                </p>
                <p className="readable-soft mt-1 font-sans text-[15px]">
                  Nama : {gift.name}
                </p>
                <p className="readable-soft mt-0.5 font-sans text-[15px]">
                  No. Rekening : {gift.number}
                </p>
              </div>
            ))}
          </div>
          <p className="reveal-line d5 readable mt-8 font-script text-6xl leading-none">
            D<span className="text-gold">&</span>F
          </p>
        </Section>
      </div>

      <FloatingNav active={active} onSelect={goTo} />
    </div>
  );
}
