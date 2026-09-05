export function FloralCorner({ className = "" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 120 120"
      fill="none"
      aria-hidden
      className={className}
    >
      <path
        d="M8 112C18 78 42 52 78 38"
        stroke="currentColor"
        strokeWidth="1.1"
      />
      <path
        d="M22 108C28 86 46 68 70 58"
        stroke="currentColor"
        strokeWidth="0.8"
        opacity="0.7"
      />
      <ellipse cx="82" cy="34" rx="9" ry="14" transform="rotate(-28 82 34)" fill="currentColor" opacity="0.35" />
      <ellipse cx="96" cy="28" rx="7" ry="12" transform="rotate(18 96 28)" fill="currentColor" opacity="0.28" />
      <ellipse cx="88" cy="18" rx="6" ry="10" transform="rotate(-8 88 18)" fill="currentColor" opacity="0.22" />
      <circle cx="90" cy="30" r="3.2" fill="currentColor" opacity="0.45" />
    </svg>
  );
}

export function GoldRule() {
  return (
    <div className="flex items-center gap-3" aria-hidden>
      <span className="h-px flex-1 bg-linear-to-r from-transparent via-gold/70 to-gold/40" />
      <span className="size-1.5 rotate-45 border border-gold/70" />
      <span className="h-px flex-1 bg-linear-to-l from-transparent via-gold/70 to-gold/40" />
    </div>
  );
}

export function Monogram({ initials }: { initials: string }) {
  return (
    <div className="relative mx-auto grid size-20 place-items-center">
      <svg viewBox="0 0 80 80" className="absolute inset-0 text-gold" aria-hidden>
        <circle cx="40" cy="40" r="37" fill="none" stroke="currentColor" strokeWidth="0.7" />
        <circle cx="40" cy="40" r="33" fill="none" stroke="currentColor" strokeWidth="0.4" opacity="0.5" />
      </svg>
      <span className="font-script text-3xl text-ivory">{initials}</span>
    </div>
  );
}
