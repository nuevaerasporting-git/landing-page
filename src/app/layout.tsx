import type { Metadata } from "next";
import { Montserrat } from "next/font/google";
import type { ReactNode } from "react";
import "./globals.css";

const montserrat = Montserrat({
  subsets: ["latin"],
  variable: "--font-montserrat",
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "Nueva Era Sporting Club | María Teresa, Santa Fe",
    template: "%s | Nueva Era Sporting Club",
  },
  description:
    "Club deportivo y social de María Teresa, Santa Fe. Fútbol, hockey, tenis, pádel, folklore y natatorio desde 1961.",
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="es-AR" className={montserrat.variable}>
      <body className="min-h-dvh bg-surface font-sans text-ink antialiased">
        {children}
      </body>
    </html>
  );
}
