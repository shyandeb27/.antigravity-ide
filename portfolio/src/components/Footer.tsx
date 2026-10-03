"use client";

import React, { useEffect, useState } from "react";
import { ArrowUp } from "lucide-react";
import { soundFx } from "@/utils/audio";

export default function Footer() {
  const [time, setTime] = useState("");

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      setTime(now.toUTCString().slice(17, 25) + " UTC");
    };
    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  const scrollToTop = () => {
    soundFx.playClick();
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="relative border-t border-[#00D9FF]/15 bg-[#050508] py-12 px-4 sm:px-8 z-10">
      <div className="w-full max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
        {/* Left: Brand Identity & Copyright */}
        <div className="flex flex-col sm:flex-row items-center gap-4 text-center sm:text-left">
          <div className="w-7 h-7 rounded-lg bg-[#00D9FF]/10 border border-[#00D9FF]/40 flex items-center justify-center text-[#00D9FF] font-heading font-black text-xs">
            VD
          </div>
          <div>
            <div className="text-xs font-mono text-[#F2F4F8] font-bold tracking-wider">
              VALEN DRAKE // ARCHITECT OF DIGITAL REALITY
            </div>
            <div className="text-[10px] font-mono text-[#9BA3B0] mt-0.5">
              © {new Date().getFullYear()} ALL RIGHTS RESERVED. FORGED IN NEXT.JS & THREE.JS.
            </div>
          </div>
        </div>

        {/* Center: Live UTC Clock & Coordinates */}
        <div className="flex items-center gap-4 text-[10px] font-mono text-[#9BA3B0]">
          <span className="flex items-center gap-1.5 text-[#00D9FF]">
            <span className="w-1.5 h-1.5 rounded-full bg-[#00D9FF] animate-pulse" />
            <span>TIME: {time || "00:00:00 UTC"}</span>
          </span>
          <span>•</span>
          <span>LAT 37.77° N / LON 122.41° W</span>
        </div>

        {/* Right: Return to Orbit (Back to Top) */}
        <button
          onClick={scrollToTop}
          className="flex items-center gap-2 px-4 py-2 rounded-full bg-[#0a0a14] border border-[#00D9FF]/30 hover:border-[#00D9FF] text-[#9BA3B0] hover:text-[#00D9FF] hover:shadow-[0_0_15px_rgba(0,217,255,0.3)] text-xs font-mono tracking-wider transition-all cursor-pointer"
          data-cursor="hover"
          data-cursor-text="TOP"
        >
          <span>RETURN TO ORBIT</span>
          <ArrowUp size={14} />
        </button>
      </div>
    </footer>
  );
}
