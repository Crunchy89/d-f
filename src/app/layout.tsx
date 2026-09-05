import type { Metadata, Viewport } from "next";
import {
  Cormorant_Garamond,
  Great_Vibes,
  Noto_Naskh_Arabic,
  Outfit,
} from "next/font/google";
import "./globals.css";

const outfit = Outfit({
  variable: "--font-outfit",
  subsets: ["latin"],
});

const cormorant = Cormorant_Garamond({
  variable: "--font-cormorant",
  subsets: ["latin"],
  weight: ["400", "500", "600"],
});

const script = Great_Vibes({
  variable: "--font-script",
  subsets: ["latin"],
  weight: "400",
});

const arabic = Noto_Naskh_Arabic({
  variable: "--font-arabic",
  subsets: ["arabic"],
  weight: ["400", "500"],
});

export const metadata: Metadata = {
  title: "Didiet Kurniawan & Sofiyyah Azizah — Wedding Invitation",
  description:
    "Undangan pernikahan Didiet Kurniawan dan Sofiyyah Azizah. Sabtu, 26 September 2026.",
  openGraph: {
    title: "Didiet Kurniawan & Sofiyyah Azizah — Wedding Invitation",
    description:
      "Undangan pernikahan Didiet Kurniawan dan Sofiyyah Azizah. Sabtu, 26 September 2026.",
    type: "website",
    images: ["/asset/d-and-f-1.webp"],
  },
  twitter: {
    card: "summary_large_image",
    title: "Didiet Kurniawan & Sofiyyah Azizah — Wedding Invitation",
    description:
      "Undangan pernikahan Didiet Kurniawan dan Sofiyyah Azizah. Sabtu, 26 September 2026.",
    images: ["/asset/d-and-f-1.webp"],
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="id"
      className={`${outfit.variable} ${cormorant.variable} ${script.variable} ${arabic.variable} h-full antialiased`}
    >
      <body className="min-h-full">{children}</body>
    </html>
  );
}
