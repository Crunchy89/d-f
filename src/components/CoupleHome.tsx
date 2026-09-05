import Image from "next/image";
import { wedding } from "@/data/wedding";

const text = "readable";
const muted = "readable-soft";

function Portrait({
  src,
  alt,
  delay,
}: {
  src: string;
  alt: string;
  delay: string;
}) {
  return (
    <Image
      src={src}
      alt={alt}
      width={360}
      height={529}
      className={`reveal-photo ${delay} mx-auto h-auto w-1/2`}
    />
  );
}

export function CoupleHome() {
  return (
    <div className="text-center">
      <p className={`reveal-line d1 font-script text-[3.25rem] leading-none ${text}`}>
        D<span className="mx-1 text-3xl text-gold">&</span>F
      </p>
      <p className={`reveal-line d2 mt-2 font-script text-[1.75rem] leading-none ${text}`}>
        {wedding.bismillah}
      </p>
      <p className={`reveal-line d3 mt-3 font-arabic text-lg leading-relaxed ${text}`}>
        {wedding.salam}
      </p>
      <p className={`reveal-line d4 mx-auto mt-4 max-w-[22rem] font-sans text-[15px] leading-relaxed ${muted}`}>
        {wedding.intro}
      </p>

      <div className="mt-5">
        <Portrait
          src="/asset/groom.webp"
          alt={wedding.couple.partnerOneFull}
          delay="d5"
        />
        <p className={`reveal-line d6 mt-3 font-script text-[1.85rem] leading-none ${text}`}>
          {wedding.couple.partnerOneFull}
        </p>
        <p className={`reveal-line d7 mt-2 font-sans text-[13px] leading-relaxed ${muted}`}>
          {wedding.couple.groomParents}
        </p>
      </div>

      <p className={`reveal-line d8 py-2 font-script text-4xl text-gold ${text}`}>&</p>

      <div>
        <Portrait
          src="/asset/bride.webp"
          alt={wedding.couple.partnerTwoFull}
          delay="d9"
        />
        <p className={`reveal-line d10 mt-3 font-script text-[1.85rem] leading-none ${text}`}>
          {wedding.couple.partnerTwoFull}
        </p>
        <p className={`reveal-line d11 mt-2 font-sans text-[13px] leading-relaxed ${muted}`}>
          {wedding.couple.brideParents}
        </p>
      </div>
    </div>
  );
}
