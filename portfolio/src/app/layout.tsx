import type { Metadata, Viewport } from "next";
import { Space_Grotesk, Inter } from "next/font/google";
import "./globals.css";

const spaceGrotesk = Space_Grotesk({
  variable: "--font-heading",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

const inter = Inter({
  variable: "--font-body",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "VALEN DRAKE // Dimensional Graphic Designer & Art Director",
  description: "Futuristic visual designer and creative technologist forging hyper-dimensional brand identities, kinetic typography, sci-fi worldbuilding, and cybernetic spatial interfaces.",
  keywords: [
    "Graphic Designer",
    "Futuristic Design",
    "Brand Identity",
    "3D Visuals",
    "Sci-Fi Art Direction",
    "Kinetic Typography",
    "Cyberpunk UI",
    "Spatial Computing Design",
  ],
  authors: [{ name: "Valen Drake" }],
  openGraph: {
    title: "VALEN DRAKE // Dimensional Graphic Designer & Art Director",
    description: "Forging otherworldly visual identities and digital realities.",
    type: "website",
  },
};

export const viewport: Viewport = {
  themeColor: "#050508",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${spaceGrotesk.variable} ${inter.variable} dark scroll-smooth`}>
      <body className="bg-[#050508] text-[#9BA3B0] antialiased selection:bg-[#00D9FF]/30 selection:text-white min-h-screen">
        {children}
      </body>
    </html>
  );
}
