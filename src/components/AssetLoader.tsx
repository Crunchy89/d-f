"use client";

import { useEffect, useState, type ReactNode } from "react";
import { LoadingScreen } from "@/components/LoadingScreen";
import { invitationAudio, invitationImages } from "@/data/assets";

const ASSET_TIMEOUT_MS = 12_000;
const MIN_SPLASH_MS = 600;

function withTimeout(task: Promise<void>, ms: number) {
  return Promise.race([
    task,
    new Promise<void>((resolve) => {
      window.setTimeout(resolve, ms);
    }),
  ]);
}

function loadImage(src: string) {
  return new Promise<void>((resolve) => {
    const image = new window.Image();
    const finish = () => resolve();
    image.onload = () => {
      if (image.decode) {
        void image.decode().then(finish).catch(finish);
        return;
      }
      finish();
    };
    image.onerror = finish;
    image.src = src;
  });
}

function loadAudio(src: string) {
  return new Promise<void>((resolve) => {
    const audio = new Audio();
    const finish = () => resolve();
    audio.preload = "auto";
    audio.addEventListener("canplaythrough", finish, { once: true });
    audio.addEventListener("error", finish, { once: true });
    audio.src = src;
    audio.load();
    if (audio.readyState >= HTMLMediaElement.HAVE_FUTURE_DATA) finish();
  });
}

export function AssetLoader({ children }: { children: ReactNode }) {
  const [ready, setReady] = useState(false);
  const [visible, setVisible] = useState(false);
  const [showSplash, setShowSplash] = useState(true);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    let cancelled = false;
    const startedAt = Date.now();
    let loaded = 0;
    const total = invitationImages.length + 2;

    function markDone() {
      loaded += 1;
      if (!cancelled) {
        setProgress(Math.round((loaded / total) * 100));
      }
    }

    async function preload() {
      const jobs = [
        ...invitationImages.map((src) =>
          withTimeout(loadImage(src), ASSET_TIMEOUT_MS).then(markDone),
        ),
        withTimeout(loadAudio(invitationAudio), ASSET_TIMEOUT_MS).then(markDone),
        withTimeout(
          document.fonts ? document.fonts.ready.then(() => undefined) : Promise.resolve(),
          ASSET_TIMEOUT_MS,
        ).then(markDone),
      ];

      await Promise.all(jobs);

      const wait = Math.max(0, MIN_SPLASH_MS - (Date.now() - startedAt));
      await new Promise((resolve) => window.setTimeout(resolve, wait));

      if (!cancelled) {
        setProgress(100);
        setReady(true);
      }
    }

    void preload();
    return () => {
      cancelled = true;
    };
  }, []);

  useEffect(() => {
    if (!ready) return;
    const frame = window.requestAnimationFrame(() => setVisible(true));
    const hide = window.setTimeout(() => setShowSplash(false), 500);
    return () => {
      window.cancelAnimationFrame(frame);
      window.clearTimeout(hide);
    };
  }, [ready]);

  return (
    <div className="relative h-full">
      {ready ? (
        <div
          className={`relative h-full transition-opacity duration-500 ${
            visible ? "opacity-100" : "opacity-0"
          }`}
        >
          {children}
        </div>
      ) : null}
      {showSplash ? (
        <div
          className={`absolute inset-0 z-50 transition-opacity duration-500 ${
            ready ? "pointer-events-none opacity-0" : "opacity-100"
          }`}
        >
          <LoadingScreen progress={progress} />
        </div>
      ) : null}
    </div>
  );
}
