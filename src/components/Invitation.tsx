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

const sectionFx: Record<SectionId, "paper" | "cube" | "card" | "fold" | "box"> = {
  home: "paper",
  schedule: "cube",
  gallery: "card",
  love: "fold",
  gift: "box",
};

function turnClass(
  id: SectionId,
  kind: "in" | "out",
  dir: 1 | -1,
) {
  const style = sectionFx[id];
  const way = dir === 1 ? "next" : "prev";
  return `fx-${style}-${kind}-${way}`;
}

function Section({
  id,
  active,
  leaving,
  dir,
  children,
}: {
  id: SectionId;
  active: SectionId;
  leaving: SectionId | null;
  dir: 1 | -1;
  children: ReactNode;
}) {
  const shown = id === active;
  const isLeaving = id === leaving;
  const visible = shown || isLeaving;
  const [play, setPlay] = useState(0);

  useEffect(() => {
    if (!shown) return;
    const frame = window.requestAnimationFrame(() => setPlay((n) => n + 1));
    return () => window.cancelAnimationFrame(frame);
  }, [shown]);

  const turn = isLeaving
    ? turnClass(id, "out", dir)
    : leaving
      ? turnClass(id, "in", dir)
      : "";

  return (
    <div
      className={`page-sheet absolute inset-0 ${turn} ${
        visible
          ? shown
            ? "z-20"
            : "z-10"
          : "pointer-events-none z-0 opacity-0"
      }`}
    >
      <section
        id={id}
        className="h-full overflow-y-auto overflow-x-hidden overscroll-y-contain px-5 pt-10 pb-32"
      >
        {visible && play > 0 ? (
          <div
            key={play}
            className="reveal is-in flex min-h-full flex-col justify-center py-8 text-center"
          >
            {children}
          </div>
        ) : null}
      </section>
    </div>
  );
}

function PageHints({
  index,
  onPrev,
  onNext,
}: {
  index: number;
  onPrev: () => void;
  onNext: () => void;
}) {
  const hasPrev = index > 0;
  const hasNext = index < sections.length - 1;

  return (
    <>
      {hasPrev ? (
        <button
          type="button"
          aria-label="Halaman sebelumnya"
          onClick={onPrev}
          className="absolute top-1/2 left-0.5 z-20 -translate-y-1/2 p-1 text-white/20"
        >
          <svg viewBox="0 0 24 24" className="size-5" fill="none" stroke="currentColor" strokeWidth="1.6">
            <path d="m14.5 5-6 7 6 7" />
          </svg>
        </button>
      ) : null}
      {hasNext ? (
        <button
          type="button"
          aria-label="Halaman berikutnya"
          onClick={onNext}
          className="absolute top-1/2 right-0.5 z-20 -translate-y-1/2 p-1 text-white/20"
        >
          <svg viewBox="0 0 24 24" className="size-5" fill="none" stroke="currentColor" strokeWidth="1.6">
            <path d="m9.5 5 6 7-6 7" />
          </svg>
        </button>
      ) : null}
      <div className="absolute inset-x-0 bottom-[4.35rem] z-20 flex justify-center gap-1.5">
        {sections.map((id, i) => (
          <span
            key={id}
            className={`size-1 rounded-full ${
              i === index ? "bg-gold/65" : "bg-white/20"
            }`}
          />
        ))}
      </div>
    </>
  );
}

export function Invitation() {
  const pageRef = useRef<HTMLDivElement>(null);
  const activeRef = useRef<SectionId>("home");
  const lockedRef = useRef(false);
  const touchStart = useRef({ x: 0, y: 0 });
  const [active, setActive] = useState<SectionId>("home");
  const [leaving, setLeaving] = useState<SectionId | null>(null);
  const [dir, setDir] = useState<1 | -1>(1);
  const pageIndex = sections.indexOf(active);

  function goTo(id: SectionId) {
    const from = sections.indexOf(activeRef.current);
    const to = sections.indexOf(id);
    if (from === to) return;
    setDir(to > from ? 1 : -1);
    setLeaving(activeRef.current);
    activeRef.current = id;
    setActive(id);
    window.setTimeout(() => setLeaving(null), 800);
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
    }, 800);
  }

  function activeScroller() {
    return pageRef.current?.querySelector<HTMLElement>(
      `#${activeRef.current}`,
    );
  }

  useEffect(() => {
    const root = pageRef.current;
    if (!root) return;

    function onWheel(event: WheelEvent) {
      const scroller = activeScroller();
      if (!scroller) return;
      const atTop = scroller.scrollTop <= 2;
      const atBottom =
        scroller.scrollTop + scroller.clientHeight >= scroller.scrollHeight - 2;
      if (event.deltaY > 20 && atBottom) {
        event.preventDefault();
        shift(1);
      } else if (event.deltaY < -20 && atTop) {
        event.preventDefault();
        shift(-1);
      }
    }

    root.addEventListener("wheel", onWheel, { passive: false });
    return () => root.removeEventListener("wheel", onWheel);
  }, []);

  return (
    <div className="relative h-full overflow-hidden">
      <div
        ref={pageRef}
        className="page-stage relative h-full overflow-hidden"
        onTouchStart={(event) => {
          touchStart.current = {
            x: event.touches[0].clientX,
            y: event.touches[0].clientY,
          };
        }}
        onTouchEnd={(event) => {
          const dx = event.changedTouches[0].clientX - touchStart.current.x;
          const dy = event.changedTouches[0].clientY - touchStart.current.y;
          if (Math.abs(dx) > Math.abs(dy) && Math.abs(dx) > 48) {
            shift(dx < 0 ? 1 : -1);
            return;
          }
          const scroller = activeScroller();
          if (!scroller || Math.abs(dy) < 56) return;
          const atTop = scroller.scrollTop <= 2;
          const atBottom =
            scroller.scrollTop + scroller.clientHeight >=
            scroller.scrollHeight - 2;
          if (dy < 0 && atBottom) shift(1);
          if (dy > 0 && atTop) shift(-1);
        }}
      >
        <Section id="home" active={active} leaving={leaving} dir={dir}>
          <CoupleHome />
        </Section>

        <Section id="schedule" active={active} leaving={leaving} dir={dir}>
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

        <Section id="gallery" active={active} leaving={leaving} dir={dir}>
          <p className="reveal-line d1 readable font-sans text-sm font-light tracking-[0.28em] uppercase">
            Galery
          </p>
          <p className="reveal-line d2 readable mt-1 mb-5 font-sans text-xl font-bold tracking-[0.18em] uppercase">
            {wedding.couple.partnerOne} & {wedding.couple.partnerTwo}
          </p>
          <div className="grid grid-cols-2 gap-5">
            <Image
              src="/asset/gallery_1.webp"
              alt={`${wedding.couple.partnerOne} & ${wedding.couple.partnerTwo} 1`}
              width={320}
              height={314}
              className="reveal-photo d3 h-auto max-w-none -mr-5"
              style={{ width: 180 }}
            />
            <Image
              src="/asset/gallery_2.webp"
              alt={`${wedding.couple.partnerOne} & ${wedding.couple.partnerTwo} 2`}
              width={390}
              height={331}
              className="reveal-photo d4 h-auto max-w-none -ml-5"
              style={{ width: 210 }}
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

        <Section id="love" active={active} leaving={leaving} dir={dir}>
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

        <Section id="gift" active={active} leaving={leaving} dir={dir}>
          <p className="reveal-line d1 readable font-sans text-lg font-bold tracking-[0.2em] uppercase">
            Send Gift
          </p>
          <div className="relative mt-10">
            <Image
              src="/asset/gift.webp"
              alt=""
              width={400}
              height={429}
              className="reveal-photo-zoom-lg d2 pointer-events-none absolute inset-y-0 right-0 h-full w-auto max-w-[58%] object-contain object-right mix-blend-screen"
            />
            <div className="relative z-10 space-y-6 text-left">
              {wedding.gifts.map((gift, index) => (
                <div
                  key={gift.bank}
                  className={`reveal-line ${index === 0 ? "d2" : "d3"}`}
                >
                  <p className="readable font-sans text-[17px] font-bold">
                    {gift.bank}
                  </p>
                  <p className="readable-soft mt-1.5 font-sans text-[15px]">
                    Nama : <span className="font-bold text-white">{gift.name}</span>
                  </p>
                  <p className="readable-soft mt-0.5 font-sans text-[15px]">
                    No. Rekening :{" "}
                    <span className="font-bold text-white">{gift.number}</span>
                  </p>
                </div>
              ))}
            </div>
          </div>
        </Section>
      </div>

      <PageHints
        index={pageIndex}
        onPrev={() => shift(-1)}
        onNext={() => shift(1)}
      />
      <FloatingNav active={active} onSelect={goTo} />
    </div>
  );
}
