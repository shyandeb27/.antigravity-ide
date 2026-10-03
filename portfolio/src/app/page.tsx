"use client";

import React from "react";
import dynamic from "next/dynamic";
import SmoothScroll from "@/components/SmoothScroll";
import CustomCursor from "@/components/CustomCursor";
import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import AboutSection from "@/components/AboutSection";
import PortfolioSection from "@/components/PortfolioSection";
import SkillsSection from "@/components/SkillsSection";
import TestimonialsSection from "@/components/TestimonialsSection";
import ContactSection from "@/components/ContactSection";
import Footer from "@/components/Footer";

// Lazy-load the 3D Background Canvas with ssr: false for maximum performance
const BackgroundCanvas = dynamic(
  () => import("@/components/canvas/BackgroundCanvas"),
  { ssr: false }
);

export default function Home() {
  return (
    <SmoothScroll>
      <div className="relative min-h-screen bg-[#050508] text-[#F2F4F8] selection:bg-[#00D9FF]/30 selection:text-white overflow-hidden">
        {/* Custom Glowing Cursor */}
        <CustomCursor />

        {/* 3D Animated Three.js Particle & Geometric Background (Fixed behind all content) */}
        <BackgroundCanvas />

        {/* Fixed Sticky Glass Navbar */}
        <Navbar />

        {/* Main Sections */}
        <main className="relative z-10 flex flex-col w-full">
          <HeroSection />
          <AboutSection />
          <PortfolioSection />
          <SkillsSection />
          <TestimonialsSection />
          <ContactSection />
        </main>

        {/* Minimal Cyberpunk Footer */}
        <Footer />
      </div>
    </SmoothScroll>
  );
}
