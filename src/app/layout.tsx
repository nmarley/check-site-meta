import type { Metadata } from "next";
import { Geist_Mono, Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";

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

const fonts = {
  geistSans,
  geistMono,
  // twitterDisplay,
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
          ${ Object.entries(fonts).map(([, font]) => font.variable).join(" ") } antialiased bg-gray-50`}
      >
        {children}
      </body>
    </html>
  );
}
