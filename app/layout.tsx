import type { Metadata, Viewport } from "next";
import { Bodoni_Moda, Geist } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const bodoni = Bodoni_Moda({
  variable: "--font-bodoni",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "Dispatch News — Global Headlines",
    template: "%s · Dispatch News",
  },
  description:
    "Editorial dispatch aggregating live NewsAPI headlines into a broadsheet front page, tech desk, and source directory.",
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${bodoni.variable} h-full antialiased`}
    >
      <head>
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@24,400,0,0"
        />
      </head>
      <body className="flex min-h-dvh flex-col bg-surface font-body-md text-body-md text-on-surface selection:bg-primary selection:text-on-primary">
        {children}
      </body>
    </html>
  );
}
