"use client";

import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, ExternalLink, Check, Copy } from "lucide-react";
import { Project } from "@/data/projects";
import ProjectGraphic from "./ProjectGraphic";
import { soundFx } from "@/utils/audio";

interface CaseStudyModalProps {
  project: Project | null;
  onClose: () => void;
}

export default function CaseStudyModal({ project, onClose }: CaseStudyModalProps) {
  const [copiedColor, setCopiedColor] = useState<string | null>(null);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
      }
    };
    if (project) {
      document.body.style.overflow = "hidden";
      window.addEventListener("keydown", handleKeyDown);
    }
    return () => {
      document.body.style.overflow = "unset";
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [project, onClose]);

  const copyColor = (hex: string) => {
    navigator.clipboard.writeText(hex);
    setCopiedColor(hex);
    soundFx.playClick();
    setTimeout(() => setCopiedColor(null), 2000);
  };

  return (
    <AnimatePresence>
      {project && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 md:p-10">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => {
              soundFx.playClick();
              onClose();
            }}
            className="fixed inset-0 bg-black/80 backdrop-blur-xl"
          />

          {/* Modal Container */}
          <motion.div
            initial={{ scale: 0.92, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.94, opacity: 0, y: 15 }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
            className="relative w-full max-w-4xl max-h-[90vh] overflow-y-auto rounded-2xl bg-[#0a0a14]/95 border border-[#00D9FF]/25 shadow-[0_0_60px_rgba(0,217,255,0.2)] p-6 sm:p-8 z-10 custom-scrollbar"
          >
            {/* Header Cyber Accents */}
            <div className="flex items-center justify-between border-b border-[#00D9FF]/15 pb-5">
              <div>
                <span className="inline-block text-[11px] font-mono tracking-widest text-[#00D9FF] uppercase mb-1">
                  {project.categoryTag}
                </span>
                <h3 className="text-2xl sm:text-3xl font-bold font-heading text-[#F2F4F8] tracking-tight">
                  {project.title}
                </h3>
                <div className="flex items-center gap-3 text-xs font-mono text-[#9BA3B0] mt-1">
                  <span>CLIENT: {project.client}</span>
                  <span>•</span>
                  <span>YEAR: {project.year}</span>
                </div>
              </div>

              {/* Close Button */}
              <button
                onClick={() => {
                  soundFx.playClick();
                  onClose();
                }}
                className="w-10 h-10 rounded-full bg-[#050508] border border-[#00D9FF]/30 flex items-center justify-center text-[#9BA3B0] hover:text-[#00D9FF] hover:border-[#00D9FF] hover:shadow-[0_0_15px_rgba(0,217,255,0.3)] transition-all cursor-pointer"
                data-cursor="hover"
                data-cursor-text="CLOSE"
              >
                <X size={18} />
              </button>
            </div>

            {/* Visual Artwork Showcase */}
            <div className="my-6 w-full h-64 sm:h-80 rounded-xl overflow-hidden border border-[#00D9FF]/20 relative shadow-[0_0_30px_rgba(0,0,0,0.8)]">
              <ProjectGraphic id={project.id} />
              <div className="absolute top-3 right-3 px-3 py-1 rounded bg-[#050508]/80 border border-[#00D9FF]/20 text-[10px] font-mono text-[#00D9FF] backdrop-blur-md">
                DIRECTOR CUT // MASTER SPEC
              </div>
            </div>

            {/* Content Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-2">
              {/* Left Column: Narrative */}
              <div className="md:col-span-2 space-y-4">
                <div>
                  <h4 className="text-xs font-mono tracking-widest text-[#00D9FF] uppercase mb-2">
                    // ART DIRECTION & ARCHITECTURE
                  </h4>
                  <p className="text-sm sm:text-base text-[#9BA3B0] leading-relaxed">
                    {project.fullDesc}
                  </p>
                </div>

                <div>
                  <h4 className="text-xs font-mono tracking-widest text-[#00D9FF] uppercase mb-2">
                    // KEY DELIVERABLES
                  </h4>
                  <ul className="space-y-2">
                    {project.deliverables.map((item, idx) => (
                      <li key={idx} className="flex items-center gap-2 text-xs sm:text-sm text-[#F2F4F8]">
                        <span className="w-1.5 h-1.5 rounded-full bg-[#00D9FF] shadow-[0_0_6px_#00D9FF]" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Right Column: Specifications */}
              <div className="space-y-5 rounded-xl bg-[#050508]/60 border border-[#00D9FF]/15 p-4 sm:p-5">
                {/* Color Palette */}
                <div>
                  <h5 className="text-[11px] font-mono tracking-wider text-[#9BA3B0] mb-2 uppercase">
                    Color Architecture
                  </h5>
                  <div className="grid grid-cols-4 gap-2">
                    {project.palette.map((color, idx) => (
                      <button
                        key={idx}
                        onClick={() => copyColor(color)}
                        className="group relative flex flex-col items-center cursor-pointer"
                        title={`Copy ${color}`}
                      >
                        <div
                          className="w-full h-10 rounded-md border border-white/10 group-hover:scale-105 transition-transform flex items-center justify-center"
                          style={{ backgroundColor: color }}
                        >
                          {copiedColor === color && (
                            <Check size={14} className="text-white drop-shadow" />
                          )}
                        </div>
                        <span className="text-[9px] font-mono text-[#9BA3B0] mt-1 group-hover:text-[#00D9FF]">
                          {color}
                        </span>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Typography Spec */}
                <div className="border-t border-[#00D9FF]/10 pt-3">
                  <h5 className="text-[11px] font-mono tracking-wider text-[#9BA3B0] uppercase mb-1">
                    Primary Typography
                  </h5>
                  <p className="text-xs font-mono text-[#00D9FF]">
                    {project.typography}
                  </p>
                </div>

                {/* Impact Metric */}
                <div className="border-t border-[#00D9FF]/10 pt-3">
                  <h5 className="text-[11px] font-mono tracking-wider text-[#9BA3B0] uppercase mb-1">
                    Validation Index
                  </h5>
                  <p className="text-xs font-mono font-bold text-[#F2F4F8] flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-[#00D9FF] animate-pulse" />
                    {project.metrics}
                  </p>
                </div>

                {/* Action button */}
                <a
                  href="#contact"
                  onClick={() => {
                    soundFx.playClick();
                    onClose();
                  }}
                  className="w-full py-2.5 rounded-lg bg-[#00D9FF]/10 hover:bg-[#00D9FF] border border-[#00D9FF]/30 hover:border-[#00D9FF] text-[#00D9FF] hover:text-[#050508] font-mono text-xs tracking-wider uppercase font-semibold flex items-center justify-center gap-2 transition-all cursor-pointer"
                  data-cursor="hover"
                >
                  <span>Inquire Similar Scope</span>
                  <ExternalLink size={13} />
                </a>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
