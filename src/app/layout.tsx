import type { Metadata, Viewport } from "next";
import { Montserrat } from "next/font/google";
import type { ReactNode } from "react";
import "./globals.css";

const montserrat = Montserrat({
  subsets: ["latin"],
  variable: "--font-montserrat",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Nueva Era Sporting Club | María Teresa, Santa Fe",
  description:
    "Deporte, comunidad y momentos compartidos en Nueva Era Sporting Club. Conocé las actividades y cómo asociarte.",
};

export const viewport: Viewport = {
  themeColor: "#e30613",
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="es-AR" className={`${montserrat.variable} h-full`}>
      <body className="flex min-h-full flex-col">{children}</body>
    </html>
  );
}
