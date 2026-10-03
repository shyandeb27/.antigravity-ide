"use client";

import React, { useState, useEffect } from "react";
import { Volume2, VolumeX, Menu, X, ArrowUpRight } from "lucide-react";
import { soundFx } from "@/utils/audio";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [soundEnabled, setSoundEnabled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 80);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

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
    <header className="fixed top-0 left-0 right-0 z-40 transition-all duration-300 px-4 sm:px-8 py-4 sm:py-5 flex justify-center">
      <nav
        className={`w-full max-w-7xl flex items-center justify-between transition-all duration-300 rounded-full px-5 py-3 ${
          scrolled
            ? "glass-panel bg-[#0a0a14]/85 border-[#00D9FF]/20 shadow-[0_10px_35px_rgba(0,0,0,0.8),0_0_20px_rgba(0,217,255,0.1)] py-2.5"
            : "bg-transparent border-transparent"
        }`}
      >
        {/* Brand Logo */}
        <a
          href="#"
          className="flex items-center gap-2.5 group cursor-pointer"
          data-cursor="hover"
          data-cursor-text="VALEN"
        >
          <div className="w-8 h-8 rounded-lg bg-[#00D9FF]/10 border border-[#00D9FF]/40 flex items-center justify-center text-[#00D9FF] group-hover:scale-105 group-hover:shadow-[0_0_15px_#00D9FF] transition-all">
            <span className="font-heading font-black text-sm tracking-tighter">VD</span>
          </div>
          <div className="flex flex-col">
            <span className="font-heading font-bold text-sm tracking-wider text-[#F2F4F8] group-hover:text-[#00D9FF] transition-colors">
              VALEN DRAKE
            </span>
            <span className="text-[9px] font-mono text-[#00D9FF] tracking-widest hidden sm:inline-block">
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

        {/* Right Actions: Sound + Status + CTA */}
        <div className="flex items-center gap-3">
          {/* Sound Toggle */}
          <button
            onClick={handleSoundToggle}
            className={`w-8 h-8 rounded-full border flex items-center justify-center transition-all cursor-pointer ${
              soundEnabled
                ? "border-[#00D9FF] bg-[#00D9FF]/20 text-[#00D9FF] shadow-[0_0_12px_#00D9FF]"
                : "border-white/10 bg-[#0a0a14]/60 text-[#9BA3B0] hover:text-white"
            }`}
            title={soundEnabled ? "Mute Ambient Sound" : "Enable Ambient Atmosphere"}
            data-cursor="hover"
            data-cursor-text="AUDIO"
          >
            {soundEnabled ? <Volume2 size={14} /> : <VolumeX size={14} />}
          </button>

          {/* Availability Status Dot (Desktop) */}
          <div className="hidden sm:flex items-center gap-2 px-3 py-1 rounded-full bg-[#050508]/80 border border-[#00D9FF]/20 text-[10px] font-mono text-[#F2F4F8]">
            <span className="w-1.5 h-1.5 rounded-full bg-[#00D9FF] animate-pulse shadow-[0_0_6px_#00D9FF]" />
            <span className="text-[#00D9FF]">AVAILABLE Q2</span>
          </div>

          {/* Contact CTA */}
          <a
            href="#contact"
            className="hidden md:flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-[#00D9FF] text-[#050508] font-mono text-xs font-bold tracking-wider hover:shadow-[0_0_20px_#00D9FF] transition-all cursor-pointer"
            data-cursor="hover"
            data-cursor-text="TALK"
          >
            <span>COMMISSION</span>
            <ArrowUpRight size={13} />
          </a>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden w-9 h-9 rounded-lg border border-[#00D9FF]/25 bg-[#0a0a14]/80 flex items-center justify-center text-[#F2F4F8] hover:text-[#00D9FF] transition-colors cursor-pointer"
          >
            {mobileMenuOpen ? <X size={18} /> : <Menu size={18} />}
          </button>
        </div>
      </nav>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden fixed inset-x-4 top-20 rounded-2xl glass-panel bg-[#0a0a14]/95 border-[#00D9FF]/25 p-6 shadow-2xl flex flex-col gap-4 animate-in fade-in duration-200 z-50">
          {navLinks.map((link, idx) => (
            <a
              key={idx}
              href={link.href}
              onClick={() => setMobileMenuOpen(false)}
              className="text-sm font-mono text-[#F2F4F8] hover:text-[#00D9FF] py-2 border-b border-white/5 transition-colors"
            >
              {link.name}
            </a>
          ))}
          <a
            href="#contact"
            onClick={() => setMobileMenuOpen(false)}
            className="mt-2 w-full py-2.5 rounded-lg bg-[#00D9FF] text-[#050508] font-mono text-xs font-bold tracking-wider text-center"
          >
            INITIALIZE CONTACT
          </a>
        </div>
      )}
    </header>
  );
}
