import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono, Noto_Serif_Tamil } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const notoTamil = Noto_Serif_Tamil({
  variable: "--font-noto-tamil",
  subsets: ["tamil"],
  weight: ["400", "700"],
});

export const metadata: Metadata = {
  title: "ஸ்ரீ லோகமுருகன் ஜுவல் மார்ட்",
  description: "Jewelry Studio App",
  manifest: "/manifest.json",
  icons: {
    icon: "/Logo_Top.png",
    apple: "/Logo_Top.png",
  },
  appleWebApp: {
    capable: true,
    statusBarStyle: "default",
    title: "SLJM",
  },
  formatDetection: {
    telephone: false,
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
  viewportFit: "cover",
  themeColor: "#050402",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased dark`}
    >
      <body className="h-screen overflow-hidden flex flex-col bg-[#050402] text-[#e5d5c5]">
        {children}
      </body>
    </html>
  );
}
