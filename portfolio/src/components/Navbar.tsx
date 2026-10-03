"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Volume2, VolumeX, Menu, X, ArrowUpRight, Sparkles } from "lucide-react";
import { soundFx } from "@/utils/audio";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [soundEnabled, setSoundEnabled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 40);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [mobileMenuOpen]);

  const handleSoundToggle = () => {
    const isNowActive = soundFx.toggleMute();
    setSoundEnabled(isNowActive);
  };

  const navLinks = [
    { name: "// 01. WORK", href: "#work" },
    { name: "// 02. ABOUT", href: "#about" },
    { name: "// 03. SKILLS", href: "#skills" },
    { name: "// 04. REVIEWS", href: "#reviews" },
    { name: "// 05. CONTACT", href: "#contact" },
  ];

  return (
    <header className="fixed top-0 left-0 right-0 z-40 transition-all duration-300 px-3 sm:px-8 py-3 sm:py-5 flex justify-center">
      <nav
        className={`w-full max-w-7xl flex items-center justify-between transition-all duration-300 rounded-full px-4 sm:px-6 py-2.5 sm:py-3 ${
          scrolled
            ? "glass-panel bg-[#0a0a14]/90 border-[#00D9FF]/20 shadow-[0_10px_35px_rgba(0,0,0,0.8),0_0_20px_rgba(0,217,255,0.12)] py-2 sm:py-2.5"
            : "bg-transparent border-transparent"
        }`}
      >
        {/* Brand Logo */}
        <a
          href="#"
          className="flex items-center gap-2 sm:gap-2.5 group cursor-pointer select-none shrink-0"
          data-cursor="hover"
          data-cursor-text="VALEN"
        >
          <div className="w-8 h-8 rounded-lg bg-[#00D9FF]/10 border border-[#00D9FF]/40 flex items-center justify-center text-[#00D9FF] group-hover:scale-105 group-hover:shadow-[0_0_15px_#00D9FF] transition-all">
            <span className="font-heading font-black text-sm tracking-tighter">VD</span>
          </div>
          <div className="flex flex-col">
            <span className="font-heading font-bold text-xs sm:text-sm tracking-wider text-[#F2F4F8] group-hover:text-[#00D9FF] transition-colors">
              VALEN DRAKE
            </span>
            <span className="text-[8px] sm:text-[9px] font-mono text-[#00D9FF] tracking-widest hidden xs:inline-block">
              VISUAL ARCHITECT
            </span>
          </div>
        </a>

        {/* Desktop Nav Links */}
        <div className="hidden lg:flex items-center gap-7">
          {navLinks.map((link, idx) => (
            <a
              key={idx}
              href={link.href}
              className="text-xs font-mono text-[#9BA3B0] hover:text-[#00D9FF] tracking-wider transition-colors relative py-1 group cursor-pointer"
              data-cursor="hover"
            >
              {link.name}
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-[#00D9FF] group-hover:w-full transition-all duration-200" />
            </a>
          ))}
        </div>

        {/* Right Actions: Sound + Status + CTA + Mobile Hamburger */}
        <div className="flex items-center gap-2 sm:gap-3">
          {/* Sound Toggle */}
          <button
            onClick={handleSoundToggle}
            className={`w-8 h-8 rounded-full border flex items-center justify-center transition-all cursor-pointer ${
              soundEnabled
                ? "border-[#00D9FF] bg-[#00D9FF]/20 text-[#00D9FF] shadow-[0_0_12px_#00D9FF]"
                : "border-white/10 bg-[#0a0a14]/60 text-[#9BA3B0] hover:text-white"
            }`}
            title={soundEnabled ? "Mute Ambient Sound" : "Enable Ambient Atmosphere"}
            aria-label={soundEnabled ? "Mute Audio" : "Enable Audio"}
            data-cursor="hover"
            data-cursor-text="AUDIO"
          >
            {soundEnabled ? <Volume2 size={14} /> : <VolumeX size={14} />}
          </button>

          {/* Availability Status Dot (Desktop) */}
          <div className="hidden md:flex items-center gap-2 px-3 py-1 rounded-full bg-[#050508]/80 border border-[#00D9FF]/20 text-[10px] font-mono text-[#F2F4F8]">
            <span className="w-1.5 h-1.5 rounded-full bg-[#00D9FF] animate-pulse shadow-[0_0_6px_#00D9FF]" />
            <span className="text-[#00D9FF]">AVAILABLE Q2</span>
          </div>

          {/* Contact CTA (Desktop/Tablet) */}
          <a
            href="#contact"
            className="hidden sm:flex items-center gap-1.5 px-3.5 sm:px-4 py-1.5 rounded-full bg-[#00D9FF] text-[#050508] font-mono text-xs font-bold tracking-wider hover:shadow-[0_0_20px_#00D9FF] transition-all cursor-pointer shrink-0"
            data-cursor="hover"
            data-cursor-text="TALK"
          >
            <span>COMMISSION</span>
            <ArrowUpRight size={13} />
          </a>

          {/* Mobile Menu Button */}
          <button
            onClick={() => {
              soundFx.playClick();
              setMobileMenuOpen(!mobileMenuOpen);
            }}
            aria-label={mobileMenuOpen ? "Close Navigation Menu" : "Open Navigation Menu"}
            className="lg:hidden w-8 sm:w-9 h-8 sm:h-9 rounded-lg border border-[#00D9FF]/25 bg-[#0a0a14]/80 flex items-center justify-center text-[#F2F4F8] hover:text-[#00D9FF] transition-colors cursor-pointer"
            data-cursor="hover"
          >
            {mobileMenuOpen ? <X size={18} /> : <Menu size={18} />}
          </button>
        </div>
      </nav>

      {/* Mobile Drawer Menu & Backdrop */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <>
            {/* Backdrop overlay */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setMobileMenuOpen(false)}
              className="lg:hidden fixed inset-0 bg-black/70 backdrop-blur-md z-45"
            />

            {/* Drawer Modal */}
            <motion.div
              initial={{ opacity: 0, y: -15, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -10, scale: 0.98 }}
              transition={{ type: "spring", damping: 25, stiffness: 350 }}
              className="lg:hidden fixed inset-x-3.5 top-18 max-h-[85vh] overflow-y-auto rounded-2xl glass-panel bg-[#0a0a14]/95 border-[#00D9FF]/30 p-5 shadow-[0_20px_60px_rgba(0,0,0,0.9),0_0_30px_rgba(0,217,255,0.15)] flex flex-col gap-3 z-50"
            >
              {/* Top status inside drawer */}
              <div className="flex items-center justify-between pb-3 border-b border-white/10">
                <div className="flex items-center gap-2 text-[10px] font-mono text-[#00D9FF]">
                  <span className="w-2 h-2 rounded-full bg-[#00D9FF] animate-pulse" />
                  <span>SYSTEM ONLINE // AVAILABLE Q2</span>
                </div>
                <button
                  onClick={handleSoundToggle}
                  className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-[#050508] border border-[#00D9FF]/30 text-[10px] font-mono text-[#00D9FF]"
                >
                  {soundEnabled ? <Volume2 size={12} /> : <VolumeX size={12} />}
                  <span>{soundEnabled ? "AUDIO ON" : "MUTED"}</span>
                </button>
              </div>

              {/* Navigation links */}
              <div className="flex flex-col py-1">
                {navLinks.map((link, idx) => (
                  <a
                    key={idx}
                    href={link.href}
                    onClick={() => {
                      soundFx.playClick();
                      setMobileMenuOpen(false);
                    }}
                    className="flex items-center justify-between text-sm font-mono text-[#F2F4F8] hover:text-[#00D9FF] py-3 border-b border-white/5 transition-colors"
                  >
                    <span>{link.name}</span>
                    <ArrowUpRight size={14} className="text-[#00D9FF]/60" />
                  </a>
                ))}
              </div>

              {/* Mobile CTA */}
              <a
                href="#contact"
                onClick={() => {
                  soundFx.playClick();
                  setMobileMenuOpen(false);
                }}
                className="mt-2 w-full py-3.5 rounded-xl bg-[#00D9FF] text-[#050508] font-mono text-xs font-bold tracking-widest text-center flex items-center justify-center gap-2 shadow-[0_0_20px_rgba(0,217,255,0.4)]"
              >
                <Sparkles size={14} />
                <span>INITIALIZE COMMISSION</span>
              </a>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </header>
  );
}
