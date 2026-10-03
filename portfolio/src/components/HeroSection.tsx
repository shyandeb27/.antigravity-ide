"use client";

import React from "react";
import { motion } from "framer-motion";
import { ArrowDown, Sparkles, Terminal } from "lucide-react";
import Hero3DObject from "./canvas/Hero3DObject";
import { soundFx } from "@/utils/audio";

export default function HeroSection() {
  const words = "TRANSCENDING REALITY THROUGH DIMENSIONAL DESIGN".split(" ");

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.08,
        delayChildren: 0.2,
      },
    },
  };

  const wordVariants = {
    hidden: { opacity: 0, y: 35 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut" as const,
      },
    },
  };

  return (
    <section className="relative min-h-screen w-full flex flex-col justify-center items-center pt-24 pb-16 px-4 sm:px-8 overflow-hidden">
      {/* Background Cyber Glow Core */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-radial-glow pointer-events-none" />

      <div className="w-full max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8 items-center z-10">
        {/* Left Column: Typography & CTAs (7 cols) */}
        <div className="lg:col-span-7 flex flex-col items-start text-left">
          {/* Classification Tag */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#0a0a14]/90 border border-[#00D9FF]/25 mb-6 backdrop-blur-md"
          >
            <Terminal size={12} className="text-[#00D9FF]" />
            <span className="text-[11px] font-mono tracking-widest text-[#00D9FF] uppercase">
              VISUAL ARCHITECT // ART DIRECTOR
            </span>
          </motion.div>

          {/* Staggered Main Headline */}
          <motion.h1
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="text-4xl sm:text-6xl md:text-7xl font-black font-heading tracking-tight leading-[1.05] text-[#F2F4F8] mb-6"
          >
            {words.map((word, idx) => (
              <motion.span
                key={idx}
                variants={wordVariants}
                className={`inline-block mr-3 sm:mr-4 ${
                  word === "REALITY" || word === "DIMENSIONAL"
                    ? "text-[#00D9FF] glow-cyan-text"
                    : ""
                }`}
              >
                {word}
              </motion.span>
            ))}
          </motion.h1>

          {/* One-Line Sci-Fi Tagline */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.7 }}
            className="text-base sm:text-lg md:text-xl text-[#9BA3B0] max-w-2xl leading-relaxed mb-8 font-light"
          >
            Forging hyper-futuristic brand identities, sci-fi worldbuilding, kinetic
            typography, and next-generation spatial interfaces for visionary innovators.
          </motion.p>

          {/* CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.9 }}
            className="flex flex-wrap items-center gap-4 sm:gap-5"
          >
            {/* Primary CTA */}
            <a
              href="#work"
              onClick={() => soundFx.playClick()}
              className="relative group px-7 py-3.5 rounded-xl bg-[#00D9FF] text-[#050508] font-mono text-xs font-bold tracking-widest uppercase overflow-hidden shadow-[0_0_25px_rgba(0,217,255,0.4)] hover:shadow-[0_0_40px_rgba(0,217,255,0.8)] transition-all cursor-pointer cyber-corner-sm"
              data-cursor="hover"
              data-cursor-text="WORK"
            >
              <span className="relative z-10 flex items-center gap-2">
                <span>VIEW MY WORK</span>
                <Sparkles size={14} />
              </span>
              <div className="absolute inset-0 bg-white opacity-0 group-hover:opacity-20 transition-opacity" />
            </a>

            {/* Secondary CTA */}
            <a
              href="#contact"
              onClick={() => soundFx.playClick()}
              className="px-6 py-3.5 rounded-xl glass-panel border border-[#00D9FF]/25 hover:border-[#00D9FF] text-[#F2F4F8] hover:text-[#00D9FF] font-mono text-xs tracking-widest uppercase transition-all cursor-pointer"
              data-cursor="hover"
              data-cursor-text="HELLO"
            >
              INITIATE CONTACT
            </a>
          </motion.div>

          {/* System Telemetry HUD Bar */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 1.1 }}
            className="mt-12 flex flex-wrap items-center gap-6 text-[10px] font-mono text-[#9BA3B0]/80 border-t border-[#00D9FF]/10 pt-4"
          >
            <div className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-[#00D9FF] animate-pulse" />
              <span>SYSTEM: ONLINE [v4.8]</span>
            </div>
            <span>•</span>
            <div>COORDS: 37.77° N, 122.41° W</div>
            <span>•</span>
            <div className="text-[#00D9FF]">DIMENSIONAL ENGINE: ACTIVE</div>
          </motion.div>
        </div>

        {/* Right Column: The Cursor-Reactive 3D Interactive Object (5 cols) */}
        <motion.div
          initial={{ opacity: 0, scale: 0.85 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, delay: 0.4 }}
          className="lg:col-span-5 relative flex items-center justify-center"
        >
          <Hero3DObject />
        </motion.div>
      </div>

      {/* Subtle Scroll Down Indicator */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{
          duration: 1,
          delay: 1.4,
          repeat: Infinity,
          repeatType: "reverse",
        }}
        className="absolute bottom-6 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 cursor-pointer select-none"
        onClick={() => {
          const el = document.getElementById("about");
          el?.scrollIntoView({ behavior: "smooth" });
        }}
        data-cursor="hover"
        data-cursor-text="DOWN"
      >
        <span className="text-[9px] font-mono tracking-widest text-[#9BA3B0] uppercase">
          SCROLL TO EXPLORE
        </span>
        <div className="w-5 h-8 rounded-full border border-[#00D9FF]/30 flex items-start justify-center p-1">
          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
            className="w-1 h-2 rounded-full bg-[#00D9FF] shadow-[0_0_6px_#00D9FF]"
          />
        </div>
      </motion.div>
    </section>
  );
}
