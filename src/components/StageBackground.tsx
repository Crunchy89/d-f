import Image from "next/image";

export function StageBackground() {
  return (
    <div className="absolute inset-0">
      <Image
        src="/asset/background.webp"
        alt=""
        fill
        preload
        sizes="390px"
        className="object-fill"
      />
    </div>
  );
}
