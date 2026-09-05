export function LoadingScreen({ progress = 0 }: { progress?: number }) {
  return (
    <div className="absolute inset-0 z-50 flex flex-col items-center justify-center bg-plum px-8">
      <p className="font-sans text-sm tracking-[0.32em] text-gold/90 uppercase">
        The Wedding Of
      </p>
      <p className="mt-4 font-script text-[4.2rem] leading-none text-ivory">
        D<span className="mx-2 font-script text-4xl text-gold">&</span>F
      </p>
      <div className="mt-10 size-11 rounded-full border-2 border-gold/25 border-t-gold animate-spin" />
      <div className="mt-8 h-px w-40 overflow-hidden bg-white/15">
        <div
          className="h-full bg-gold transition-[width] duration-300 ease-out"
          style={{ width: `${progress}%` }}
        />
      </div>
      <p className="mt-4 font-sans text-xs tracking-[0.22em] text-ivory/75 uppercase">
        Memuat undangan
      </p>
    </div>
  );
}
