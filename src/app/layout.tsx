import type { Metadata } from "next";
import { Geist_Mono, Hanken_Grotesk, IBM_Plex_Sans, Inter, Karla, Libre_Franklin, Noto_Sans, Plus_Jakarta_Sans, Public_Sans, Space_Grotesk } from "next/font/google";
import "./globals.css";
import localFont from 'next/font/local'

export const metadata: Metadata = {
  title: "Check Site Meta",
  description: "Check the metadata of any site",
  
}

const geistSans = Plus_Jakarta_Sans({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});
const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});
// Karla
const twitterDisplay = Inter({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const fonts = {
  geistSans,
  geistMono,
  twitterDisplay,
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`
          ${ Object.entries(fonts).map(([_, font]) => font.variable).join(" ") } antialiased bg-gray-50`}
      >
        {children}
      </body>
    </html>
  );
}
