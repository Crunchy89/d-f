import Image from "next/image";
import { wedding } from "@/data/wedding";

const text = "readable";
const muted = "readable-soft";

function Portrait({ src, alt }: { src: string; alt: string }) {
  return (
    <Image
      src={src}
      alt={alt}
      width={360}
      height={529}
      className="mx-auto h-auto w-1/2"
    />
  );
}

export function CoupleHome() {
  return (
    <div className="text-center">
      <p className={`font-script text-[3.25rem] leading-none ${text}`}>
        D<span className="mx-1 text-3xl">&</span>F
      </p>
      <p className={`mt-2 font-script text-[1.75rem] leading-none ${text}`}>
        {wedding.bismillah}
      </p>
      <p className={`mt-3 font-arabic text-lg leading-relaxed ${text}`}>
        {wedding.salam}
      </p>
      <p className={`mx-auto mt-4 max-w-[22rem] font-sans text-[15px] leading-relaxed ${muted}`}>
        {wedding.intro}
      </p>

      <div className="mt-5">
        <Portrait
          src="/asset/groom.webp"
          alt={wedding.couple.partnerOneFull}
        />
        <p className={`mt-3 font-script text-[1.85rem] leading-none ${text}`}>
          {wedding.couple.partnerOneFull}
        </p>
        <p className={`mt-2 font-sans text-[13px] leading-relaxed ${muted}`}>
          {wedding.couple.groomParents}
        </p>
      </div>

      <p className={`py-2 font-script text-4xl ${text}`}>&</p>

      <div>
        <Portrait
          src="/asset/bride.webp"
          alt={wedding.couple.partnerTwoFull}
        />
        <p className={`mt-3 font-script text-[1.85rem] leading-none ${text}`}>
          {wedding.couple.partnerTwoFull}
        </p>
        <p className={`mt-2 font-sans text-[13px] leading-relaxed ${muted}`}>
          {wedding.couple.brideParents}
        </p>
      </div>
    </div>
  );
}
