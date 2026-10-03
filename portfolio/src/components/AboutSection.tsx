"use client";

import React, { useEffect, useState, useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Cpu, Compass, Layers, Sparkles } from "lucide-react";

function CountingNumber({ target, suffix = "", duration = 2 }: { target: number; suffix?: string; duration?: number }) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-40px" });

  useEffect(() => {
    if (!isInView) return;

    let start = 0;
    const stepTime = 16;
    const totalSteps = (duration * 1000) / stepTime;
    const increment = target / totalSteps;

    const timer = setInterval(() => {
      start += increment;
      if (start >= target) {
        setCount(target);
        clearInterval(timer);
      } else {
        setCount(Math.floor(start));
      }
    }, stepTime);

    return () => clearInterval(timer);
  }, [isInView, target, duration]);

  return (
    <span ref={ref} className="font-heading font-black text-3xl sm:text-5xl text-[#F2F4F8] tracking-tight">
      {count}
      <span className="text-[#00D9FF]">{suffix}</span>
    </span>
  );
}

export default function AboutSection() {
  const stats = [
    { target: 8, suffix: "+", label: "YEARS EXP", desc: "Defining visual languages for tech giants and vanguard studios" },
    { target: 140, suffix: "+", label: "DELIVERABLES", desc: "Global identity systems, CGI sets, and spatial HUD packages" },
    { target: 24, suffix: "", label: "DESIGN AWARDS", desc: "Awwwards SOTD, Tokyo TDC, FWA, and Behance Curated Honors" },
    { target: 99, suffix: ".8%", label: "APPROVAL INDEX", desc: "Client satisfaction rate across North America, Europe, and Asia" },
  ];

  const pillars = [
    {
      icon: Cpu,
      title: "Algorithmic Precision",
      num: "01",
      desc: "Mathematical harmonic grids, golden-ratio typography, and procedural geometry that scale from micro-wearables to stadium LED projections without fidelity loss.",
    },
    {
      icon: Layers,
      title: "Kinetic Dimension",
      num: "02",
      desc: "Motion-first brand systems designed to breathe, deform, and respond in real-time across 2D viewports, WebGL canvases, and augmented reality overlays.",
    },
    {
      icon: Compass,
      title: "Diegetic Spatial UI",
      num: "03",
      desc: "Holographic telemetry HUDs, modular instrument clusters, and tactile spatial widgets engineered for next-generation robotics and spatial headsets.",
    },
    {
      icon: Sparkles,
      title: "Sci-Fi Worldbuilding",
      num: "04",
      desc: "Deep visual bibles, fictional corporate lore, futuristic packaging, and hard-surface iconography that turn abstract concepts into tangible realities.",
    },
  ];

  return (
    <section id="about" className="relative py-16 sm:py-28 px-4 sm:px-8 border-t border-[#00D9FF]/10 overflow-hidden">
      {/* Background glow orbs */}
      <div className="absolute top-1/2 -right-48 w-96 h-96 bg-[#0066FF]/10 rounded-full blur-[140px] pointer-events-none" />

      <div className="w-full max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="flex flex-col items-start mb-10 sm:mb-16">
          <div className="flex items-center gap-2 px-3 py-1 rounded bg-[#0a0a14] border border-[#00D9FF]/20 text-[10px] font-mono text-[#00D9FF] mb-3">
            <span>// 02. DOSSIER & MANIFESTO</span>
          </div>
          <h2 className="text-2xl sm:text-4xl md:text-5xl font-black font-heading tracking-tight text-[#F2F4F8]">
            BRIDGING HYPER-DIMENSIONAL VISION <br className="hidden sm:inline" />
            <span className="text-[#00D9FF] glow-cyan-text">WITH SURGICAL EXECUTION</span>
          </h2>
          <p className="mt-3 sm:mt-4 text-sm sm:text-lg text-[#9BA3B0] max-w-3xl leading-relaxed">
            I am Valen Drake, a senior graphic designer, visual architect, and creative technologist.
            Over the past decade, I have operated at the vanguard of cybernetic aesthetics, crafting
            brand ecosystems, spatial user interfaces, and generative CGI for the companies inventing the next century.
          </p>
        </div>

        {/* Animated Counting Stats Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-6 mb-12 sm:mb-20">
          {stats.map((stat, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-30px" }}
              transition={{ duration: 0.45, delay: idx * 0.08 }}
              className="glass-panel p-4 sm:p-6 rounded-2xl border border-[#00D9FF]/15 hover:border-[#00D9FF]/35 transition-all"
            >
              <div className="text-[9px] sm:text-[10px] font-mono tracking-widest text-[#00D9FF] uppercase mb-1.5 sm:mb-2">
                {stat.label}
              </div>
              <CountingNumber target={stat.target} suffix={stat.suffix} />
              <p className="text-[11px] sm:text-xs text-[#9BA3B0] mt-2 sm:mt-3 leading-normal line-clamp-3 sm:line-clamp-none">
                {stat.desc}
              </p>
            </motion.div>
          ))}
        </div>

        {/* Core Pillars / Methodology */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          {pillars.map((pillar, idx) => {
            const Icon = pillar.icon;
            return (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 25 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-20px" }}
                transition={{ duration: 0.45, delay: idx * 0.1 }}
                className="group relative p-5 sm:p-6 rounded-2xl glass-panel border border-[#00D9FF]/15 hover:border-[#00D9FF]/50 bg-[#0a0a14]/60 hover:bg-[#0e0e1e]/80 transition-all duration-300"
                data-cursor="hover"
              >
                <div className="flex items-center justify-between mb-4 sm:mb-5">
                  <div className="w-10 h-10 rounded-xl bg-[#00D9FF]/10 border border-[#00D9FF]/30 flex items-center justify-center text-[#00D9FF] group-hover:scale-110 group-hover:shadow-[0_0_15px_#00D9FF] transition-all">
                    <Icon size={20} />
                  </div>
                  <span className="text-xs font-mono text-[#00D9FF]/60 group-hover:text-[#00D9FF]">
                    {pillar.num}
                  </span>
                </div>

                <h3 className="text-base sm:text-lg font-bold font-heading text-[#F2F4F8] mb-2 group-hover:text-[#00D9FF] transition-colors">
                  {pillar.title}
                </h3>
                <p className="text-xs sm:text-sm text-[#9BA3B0] leading-relaxed">
                  {pillar.desc}
                </p>

                {/* Subtle corner line */}
                <div className="absolute bottom-0 right-0 w-6 h-6 border-b-2 border-r-2 border-[#00D9FF]/20 group-hover:border-[#00D9FF] transition-colors rounded-br-2xl" />
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
