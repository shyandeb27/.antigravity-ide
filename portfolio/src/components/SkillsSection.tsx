"use client";

import React from "react";
import { motion } from "framer-motion";
import { 
  Palette, 
  PenTool, 
  Box, 
  Video, 
  Radio, 
  Zap, 
  Sparkles,
  Layers,
  Code
} from "lucide-react";

// Sleek Custom Figma SVG icon
function FigmaSvg({ size = 18 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 38 57" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M19 28.5C19 23.2533 23.2533 19 28.5 19C33.7467 19 38 23.2533 38 28.5C38 33.7467 33.7467 38 28.5 38C23.2533 38 19 33.7467 19 28.5Z" fill="#00D9FF" />
      <path d="M0 47.5C0 42.2533 4.25329 38 9.5 38H19V47.5C19 52.7467 14.7467 57 9.5 57C4.25329 57 0 52.7467 0 47.5Z" fill="#0066FF" />
      <path d="M19 0V19H28.5C33.7467 19 38 14.7467 38 9.5C38 4.25329 33.7467 0 28.5 0H19Z" fill="#00D9FF" />
      <path d="M0 9.5C0 14.7467 4.25329 19 9.5 19H19V0H9.5C4.25329 0 0 4.25329 0 9.5Z" fill="#00D9FF" opacity="0.8" />
      <path d="M0 28.5C0 33.7467 4.25329 38 9.5 38H19V19H9.5C4.25329 19 0 23.2533 0 28.5Z" fill="#0066FF" opacity="0.9" />
    </svg>
  );
}

export default function SkillsSection() {
  const marqueeItems = [
    "ADOBE PHOTOSHOP",
    "ADOBE ILLUSTRATOR",
    "FIGMA DESIGN SYSTEMS",
    "BLENDER 3D",
    "CINEMA 4D",
    "AFTER EFFECTS",
    "TOUCHDESIGNER",
    "HOUDINI FX",
    "MIDJOURNEY PROMPTING",
    "GLSL SHADERS",
    "OCTANE RENDER",
    "REDSHIFT CGI",
  ];

  const tools = [
    {
      name: "Adobe Photoshop",
      role: "Concept Art & Matte Painting",
      icon: Palette,
      proficiency: 98,
      accent: "#00D9FF",
      desc: "Ultra-high-res digital painting, composite keyframes, texture synthesis, and cybernetic matte painting.",
    },
    {
      name: "Adobe Illustrator",
      role: "Vector Identity & Glyphs",
      icon: PenTool,
      proficiency: 99,
      accent: "#0066FF",
      desc: "Mathematical bezier perfection, logo architecture, bespoke typography sets, and print-ready vector packages.",
    },
    {
      name: "Figma",
      role: "Spatial Systems & Micro-UI",
      icon: FigmaSvg,
      proficiency: 96,
      accent: "#00D9FF",
      desc: "Atomic design tokens, interactive prototyping, responsive fluid layouts, and developer handoff architecture.",
    },
    {
      name: "Blender & Cinema 4D",
      role: "3D Hard-Surface & Spatial Sets",
      icon: Box,
      proficiency: 94,
      accent: "#0066FF",
      desc: "Procedural geometry nodes, hard-surface sci-fi modeling, volumetric cinematic lighting, and Octane shaders.",
    },
    {
      name: "After Effects",
      role: "Kinetic Motion & Title Design",
      icon: Video,
      proficiency: 93,
      accent: "#00D9FF",
      desc: "Kinetic typography, holographic HUD animation, micro-interaction transitions, and procedural audio-reactivity.",
    },
    {
      name: "TouchDesigner",
      role: "Generative Real-time Visuals",
      icon: Radio,
      proficiency: 88,
      accent: "#0066FF",
      desc: "Real-time particle networks, audio-reactive stage graphics, dynamic data visualization, and GLSL shading.",
    },
  ];

  const domains = [
    { name: "Brand Architecture & Identity", level: 98 },
    { name: "Sci-Fi HUD & Holographic UI", level: 96 },
    { name: "3D CGI & Volumetric Lighting", level: 94 },
    { name: "Kinetic Motion & Typography", level: 92 },
    { name: "Packaging & Physical Collateral", level: 90 },
    { name: "Procedural / Generative Art", level: 89 },
  ];

  return (
    <section id="skills" className="relative py-28 px-4 sm:px-8 border-t border-[#00D9FF]/10 overflow-hidden">
      {/* Background glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] bg-radial-glow pointer-events-none" />

      <div className="w-full max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="flex flex-col items-start mb-16">
          <div className="flex items-center gap-2 px-3 py-1 rounded bg-[#0a0a14] border border-[#00D9FF]/20 text-[10px] font-mono text-[#00D9FF] mb-3">
            <span>// 03. TOOL MATRIX & PROFICIENCIES</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-black font-heading tracking-tight text-[#F2F4F8]">
            THE <span className="text-[#00D9FF] glow-cyan-text">CREATIVE ARSENAL</span>
          </h2>
          <p className="mt-3 text-sm sm:text-base text-[#9BA3B0] max-w-2xl">
            A battle-tested stack of industry-standard creative suites, 3D engines,
            and computational generative pipelines.
          </p>
        </div>

        {/* Infinite Scrolling Marquee Ribbon */}
        <div className="relative w-full overflow-hidden py-4 mb-20 border-y border-[#00D9FF]/20 bg-[#0a0a14]/60 backdrop-blur-md">
          {/* Gradient fade edges */}
          <div className="absolute left-0 top-0 bottom-0 w-24 bg-gradient-to-r from-[#050508] to-transparent z-10 pointer-events-none" />
          <div className="absolute right-0 top-0 bottom-0 w-24 bg-gradient-to-l from-[#050508] to-transparent z-10 pointer-events-none" />

          <div className="animate-marquee flex items-center gap-8 whitespace-nowrap">
            {[...marqueeItems, ...marqueeItems].map((item, idx) => (
              <div key={idx} className="flex items-center gap-4 text-xs font-mono font-bold tracking-widest text-[#F2F4F8] hover:text-[#00D9FF] transition-colors select-none">
                <span className="w-1.5 h-1.5 rounded-full bg-[#00D9FF] shadow-[0_0_6px_#00D9FF]" />
                <span>{item}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Two-Column Grid: Tools Matrix (Left) + Domain Proficiency Bars (Right) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left: 6 Tool Cards (7 cols) */}
          <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-5">
            {tools.map((tool, idx) => {
              const Icon = tool.icon;
              return (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-20px" }}
                  transition={{ duration: 0.4, delay: idx * 0.08 }}
                  className="glass-panel p-5 rounded-2xl border border-[#00D9FF]/15 hover:border-[#00D9FF]/40 bg-[#0a0a14]/70 hover:bg-[#0e0e1e]/90 transition-all duration-300 group"
                  data-cursor="hover"
                >
                  <div className="flex items-center justify-between mb-4">
                    <div
                      className="w-10 h-10 rounded-xl flex items-center justify-center transition-all group-hover:scale-110"
                      style={{
                        backgroundColor: `${tool.accent}15`,
                        border: `1px solid ${tool.accent}40`,
                        color: tool.accent,
                      }}
                    >
                      <Icon size={18} />
                    </div>
                    <span className="text-xs font-mono font-bold text-[#F2F4F8]">
                      {tool.proficiency}%
                    </span>
                  </div>

                  <h3 className="text-base font-bold font-heading text-[#F2F4F8] group-hover:text-[#00D9FF] transition-colors">
                    {tool.name}
                  </h3>
                  <div className="text-[10px] font-mono text-[#00D9FF] tracking-wider uppercase mb-2">
                    {tool.role}
                  </div>
                  <p className="text-xs text-[#9BA3B0] leading-relaxed">
                    {tool.desc}
                  </p>

                  {/* Micro Progress Bar */}
                  <div className="w-full h-1 bg-[#050508] rounded-full mt-4 overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      whileInView={{ width: `${tool.proficiency}%` }}
                      viewport={{ once: true }}
                      transition={{ duration: 1, delay: 0.2 }}
                      className="h-full rounded-full"
                      style={{ backgroundColor: tool.accent }}
                    />
                  </div>
                </motion.div>
              );
            })}
          </div>

          {/* Right: Domain Specializations & Technical Capabilities (5 cols) */}
          <div className="lg:col-span-5 space-y-6">
            <div className="glass-panel p-6 rounded-2xl border border-[#00D9FF]/15 bg-[#0a0a14]/70">
              <h3 className="text-xs font-mono tracking-widest text-[#00D9FF] uppercase mb-6 flex items-center gap-2">
                <Sparkles size={14} />
                <span>DOMAIN COMPETENCY INDEX</span>
              </h3>

              <div className="space-y-5">
                {domains.map((dom, idx) => (
                  <div key={idx} className="space-y-1.5">
                    <div className="flex justify-between text-xs font-mono">
                      <span className="text-[#F2F4F8] font-medium">{dom.name}</span>
                      <span className="text-[#00D9FF]">{dom.level}%</span>
                    </div>
                    <div className="w-full h-1.5 bg-[#050508] rounded-full overflow-hidden border border-white/5">
                      <motion.div
                        initial={{ width: 0 }}
                        whileInView={{ width: `${dom.level}%` }}
                        viewport={{ once: true }}
                        transition={{ duration: 1.2, delay: idx * 0.1 }}
                        className="h-full bg-gradient-to-r from-[#0066FF] to-[#00D9FF] rounded-full shadow-[0_0_8px_rgba(0,217,255,0.5)]"
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Specialized badges box */}
            <div className="glass-panel p-6 rounded-2xl border border-[#00D9FF]/15 bg-[#0a0a14]/70">
              <h3 className="text-xs font-mono tracking-widest text-[#00D9FF] uppercase mb-4 flex items-center gap-2">
                <Code size={14} />
                <span>TECHNICAL CAPABILITIES</span>
              </h3>

              <div className="flex flex-wrap gap-2">
                {[
                  "Octane Render",
                  "Redshift 3D",
                  "GLSL Shaders",
                  "Bespoke Font Engineering",
                  "Precision Screenprint Separations",
                  "Dynamic AR Portals",
                  "VisionOS Spatial Systems",
                  "UV Foil Stamping Specs",
                  "Generative Algorithmic Art",
                ].map((badge, idx) => (
                  <span
                    key={idx}
                    className="px-2.5 py-1 rounded-md bg-[#050508] border border-[#00D9FF]/20 text-[10px] font-mono text-[#9BA3B0] hover:text-[#00D9FF] hover:border-[#00D9FF]/50 transition-colors"
                  >
                    {badge}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
