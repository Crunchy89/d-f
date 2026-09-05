"use client";

import {
  useEffect,
  useRef,
  useState,
  type ReactNode,
  type RefObject,
} from "react";
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

function SectionCard({ children }: { children: ReactNode }) {
  return (
    <div className="rounded-2xl border border-gold/60 bg-[rgba(42,20,52,0.42)] px-5 py-8 text-center backdrop-blur-[2px]">
      {children}
    </div>
  );
}

function Section({
  id,
  children,
  scrollerRef,
}: {
  id: SectionId;
  children: ReactNode;
  scrollerRef: RefObject<HTMLDivElement | null>;
}) {
  const ref = useRef<HTMLElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    const root = scrollerRef.current;
    if (!el || !root) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { root, threshold: 0.16, rootMargin: "0px 0px -6% 0px" },
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [scrollerRef]);

  return (
    <section id={id} ref={ref} className="px-5 py-8">
      <div className={`reveal ${visible ? "is-in" : ""}`}>
        <SectionCard>{children}</SectionCard>
      </div>
    </section>
  );
}

export function Invitation() {
  const scrollerRef = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState<SectionId>("home");

  useEffect(() => {
    const root = scrollerRef.current;
    if (!root) return;

    function syncActive() {
      if (!root) return;

      const { scrollTop, clientHeight, scrollHeight } = root;
      if (scrollTop + clientHeight >= scrollHeight - 16) {
        setActive(sections[sections.length - 1]);
        return;
      }

      const marker = root.getBoundingClientRect().top + clientHeight * 0.32;
      let current: SectionId = sections[0];
      for (const id of sections) {
        const el = root.querySelector<HTMLElement>(`#${id}`);
        if (!el) continue;
        if (el.getBoundingClientRect().top <= marker) current = id;
      }
      setActive(current);
    }

    syncActive();
    root.addEventListener("scroll", syncActive, { passive: true });
    return () => root.removeEventListener("scroll", syncActive);
  }, []);

  function scrollTo(id: SectionId) {
    setActive(id);
    const root = scrollerRef.current;
    const target = root?.querySelector<HTMLElement>(`#${id}`);
    target?.scrollIntoView({ behavior: "smooth", block: "start" });
  }

  return (
    <div className="relative h-full">
      <div
        ref={scrollerRef}
        className="h-full overflow-y-auto overscroll-y-contain pb-20"
      >
        <Section id="home" scrollerRef={scrollerRef}>
          <CoupleHome />
        </Section>

        <Section id="schedule" scrollerRef={scrollerRef}>
          <p className="readable font-sans text-sm font-light tracking-[0.28em] uppercase">
            Event
          </p>
          <p className="readable font-sans text-lg font-bold tracking-[0.16em] uppercase">
            Details & Venue
          </p>
          <p className="readable-soft mt-5 font-sans text-[15px] leading-relaxed">
            {wedding.eventIntro}
          </p>
          <p className="readable mt-3 font-sans text-lg font-bold">
            {wedding.date.weekdayId} | {wedding.date.day} {wedding.date.month} |{" "}
            {wedding.date.year}
          </p>
          <Image
            src="/asset/calendar.webp"
            alt="26 September 2026"
            width={352}
            height={310}
            className="mx-auto mt-6 mb-6 h-auto w-44 mix-blend-screen"
          />
          <p className="readable mt-2 font-sans text-[15px]">
            Akad Nikah : {wedding.akad}
          </p>
          <p className="readable mt-1 font-sans text-[15px]">
            Resepsi : {wedding.resepsi}
          </p>
          <p className="readable mt-1 font-sans text-[15px]">
            Lokasi : <span className="font-bold">{wedding.venue}</span>
          </p>
          <div className="mt-5 overflow-hidden rounded-2xl border-2 border-white">
            <iframe
              title="Lokasi pernikahan"
              src={wedding.mapEmbed}
              className="h-36 w-full border-0"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>
          <div className="mt-5 flex flex-col items-center gap-3">
            <a
              href={wedding.mapUrl}
              target="_blank"
              rel="noreferrer"
              className="inline-flex rounded-full border border-gold/70 px-7 py-2.5 font-sans text-sm tracking-[0.16em] text-white uppercase"
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
          <p className="readable mt-8 font-script text-6xl leading-none">D&F</p>
        </Section>

        <Section id="gallery" scrollerRef={scrollerRef}>
          <p className="readable font-sans text-sm font-light tracking-[0.28em] uppercase">
            Galery
          </p>
          <p className="readable mt-1 mb-5 font-sans text-xl font-bold tracking-[0.18em] uppercase">
            {wedding.couple.partnerOne} & {wedding.couple.partnerTwo}
          </p>
          <div className="grid grid-cols-2 gap-2">
            <Image
              src="/asset/gallery_1.webp"
              alt={`${wedding.couple.partnerOne} & ${wedding.couple.partnerTwo} 1`}
              width={320}
              height={314}
              className="h-auto max-w-none -mr-5"
              style={{ width: 160 }}
            />
            <Image
              src="/asset/gallery_2.webp"
              alt={`${wedding.couple.partnerOne} & ${wedding.couple.partnerTwo} 2`}
              width={390}
              height={331}
              className="h-auto max-w-none -ml-5"
              style={{ width: 195 }}
            />
            <Image
              src="/asset/gallery_3.webp"
              alt={`${wedding.couple.partnerOne} & ${wedding.couple.partnerTwo} 3`}
              width={360}
              height={409}
              className="h-auto w-full"
            />
            <Image
              src="/asset/gallery_4.webp"
              alt={`${wedding.couple.partnerOne} & ${wedding.couple.partnerTwo} 4`}
              width={360}
              height={409}
              className="h-auto w-full"
            />
            <Image
              src="/asset/gallery_5.webp"
              alt={`${wedding.couple.partnerOne} & ${wedding.couple.partnerTwo} 5`}
              width={360}
              height={409}
              className="h-auto w-full"
            />
            <Image
              src="/asset/gallery_6.webp"
              alt={`${wedding.couple.partnerOne} & ${wedding.couple.partnerTwo} 6`}
              width={360}
              height={409}
              className="h-auto w-full"
            />
          </div>
          <p className="readable mt-8 font-script text-6xl leading-none">
            D&F
          </p>
        </Section>

        <Section id="love" scrollerRef={scrollerRef}>
          <p className="readable font-script text-6xl leading-none">D&F</p>
          <p
            dir="rtl"
            className="readable mt-6 font-arabic text-lg leading-loose"
          >
            {wedding.quranArabic}
          </p>
          <p className="readable-soft mt-5 font-sans text-[15px] leading-relaxed">
            {wedding.quranTranslation}
          </p>
          <p className="readable mt-4 font-sans text-sm font-semibold tracking-[0.12em]">
            {wedding.quranSource}
          </p>
        </Section>

        <Section id="gift" scrollerRef={scrollerRef}>
          <p className="readable font-sans text-lg font-bold tracking-[0.2em] uppercase">
            Send Gift
          </p>
          <div className="mx-auto mt-6 w-54 rounded-2xl bg-white p-3">
            <img
              src={wedding.giftQr}
              alt="QR send gift"
              width={240}
              height={240}
              className="h-auto w-full"
            />
          </div>
          <div className="mt-6 space-y-5 text-left">
            {wedding.gifts.map((gift) => (
              <div key={gift.bank}>
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
          <p className="readable mt-8 font-script text-6xl leading-none">D&F</p>
        </Section>
      </div>

      <FloatingNav active={active} onSelect={scrollTo} />
    </div>
  );
}
