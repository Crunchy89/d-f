"use client";

import {
  createContext,
  useContext,
  useEffect,
  useRef,
  useState,
  type ReactNode,
} from "react";

const MusicContext = createContext<{
  playing: boolean;
  toggle: () => void;
} | null>(null);

export function useMusic() {
  const value = useContext(MusicContext);
  if (!value) {
    throw new Error("useMusic must be used within MusicProvider");
  }
  return value;
}

export function MusicProvider({
  shouldPlay,
  children,
}: {
  shouldPlay: boolean;
  children: ReactNode;
}) {
  const audioRef = useRef<HTMLAudioElement>(null);
  const [playing, setPlaying] = useState(false);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const sync = () => setPlaying(!audio.paused);
    audio.addEventListener("play", sync);
    audio.addEventListener("pause", sync);

    void audio.play().catch(() => {});

    const unlock = () => {
      void audio.play().catch(() => {});
    };
    document.addEventListener("pointerdown", unlock, { once: true });

    return () => {
      audio.removeEventListener("play", sync);
      audio.removeEventListener("pause", sync);
      document.removeEventListener("pointerdown", unlock);
    };
  }, []);

  useEffect(() => {
    if (!shouldPlay) return;
    void audioRef.current?.play().catch(() => {});
  }, [shouldPlay]);

  function toggle() {
    const audio = audioRef.current;
    if (!audio) return;
    if (audio.paused) {
      void audio.play().catch(() => {});
    } else {
      audio.pause();
    }
  }

  return (
    <MusicContext.Provider value={{ playing, toggle }}>
      <audio
        ref={audioRef}
        src="/asset/theme.mp3"
        autoPlay
        loop
        playsInline
        preload="auto"
      />
      {children}
    </MusicContext.Provider>
  );
}
