"use client";

import React, { useRef, useState } from "react";
import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { Project } from "@/data/projects";
import ProjectGraphic from "./ProjectGraphic";
import { soundFx } from "@/utils/audio";

interface ProjectCardProps {
  project: Project;
  onSelect: (project: Project) => void;
}

export default function ProjectCard({ project, onSelect }: ProjectCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [rotateX, setRotateX] = useState(0);
  const [rotateY, setRotateY] = useState(0);
  const [glarePos, setGlarePos] = useState({ x: 50, y: 50, opacity: 0 });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    // Calculate tilt angles (capped at ~12 degrees)
    const rotX = ((y - centerY) / centerY) * -10;
    const rotY = ((x - centerX) / centerX) * 10;

    setRotateX(rotX);
    setRotateY(rotY);

    // Glare position
    setGlarePos({
      x: (x / rect.width) * 100,
      y: (y / rect.height) * 100,
      opacity: 0.22,
    });
  };

  const handleMouseEnter = () => {
    soundFx.playHover();
  };

  const handleMouseLeave = () => {
    setRotateX(0);
    setRotateY(0);
    setGlarePos((prev) => ({ ...prev, opacity: 0 }));
  };

  return (
    <div
      style={{ perspective: 1000 }}
      className="w-full"
    >
      <motion.div
        ref={cardRef}
        onMouseMove={handleMouseMove}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        onClick={() => {
          soundFx.playClick();
          onSelect(project);
        }}
        style={{
          transform: `rotateX(${rotateX}deg) rotateY(${rotateY}deg)`,
          transformStyle: "preserve-3d",
          transition: "transform 0.15s ease-out",
        }}
        className="group relative rounded-2xl overflow-hidden glass-panel border border-[#00D9FF]/15 hover:border-[#00D9FF]/45 bg-[#0a0a14]/80 shadow-[0_10px_30px_rgba(0,0,0,0.6)] hover:shadow-[0_0_35px_rgba(0,217,255,0.2)] transition-colors duration-300 cursor-pointer select-none"
        data-cursor="view"
        data-cursor-text="VIEW"
      >
        {/* Dynamic Spotlight Glare Layer */}
        <div
          className="pointer-events-none absolute inset-0 z-20 transition-opacity duration-300"
          style={{
            opacity: glarePos.opacity,
            background: `radial-gradient(circle 280px at ${glarePos.x}% ${glarePos.y}%, rgba(0,217,255,0.22), transparent 70%)`,
          }}
        />

        {/* Thumbnail Graphic Area */}
        <div className="relative w-full h-56 sm:h-64 overflow-hidden border-b border-[#00D9FF]/10 bg-[#050508]">
          <ProjectGraphic id={project.id} />

          {/* Category Pill */}
          <div className="absolute top-3.5 left-3.5 z-10 px-2.5 py-1 rounded-md bg-[#050508]/85 border border-[#00D9FF]/25 backdrop-blur-md">
            <span className="text-[10px] font-mono tracking-wider font-semibold text-[#00D9FF] uppercase">
              {project.category}
            </span>
          </div>

          {/* Year Badge */}
          <div className="absolute top-3.5 right-3.5 z-10 px-2 py-0.5 rounded bg-[#050508]/85 border border-white/10 text-[10px] font-mono text-[#9BA3B0]">
            {project.year}
          </div>

          {/* Hover Overlay with Short Description & Quick View */}
          <div className="absolute inset-0 bg-[#050508]/90 backdrop-blur-md opacity-0 group-hover:opacity-100 transition-opacity duration-300 p-6 flex flex-col justify-between z-10">
            <div>
              <span className="text-[10px] font-mono text-[#00D9FF] tracking-widest uppercase">
                // SYNOPSIS
              </span>
              <p className="text-xs sm:text-sm text-[#F2F4F8] mt-2 line-clamp-3 leading-relaxed">
                {project.shortDesc}
              </p>
            </div>

            <div className="flex items-center justify-between pt-3 border-t border-[#00D9FF]/15">
              <span className="text-[10px] font-mono text-[#00D9FF] tracking-wider uppercase font-semibold flex items-center gap-1.5">
                <span>VIEW CASE STUDY</span>
                <ArrowUpRight size={14} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
              </span>
              <span className="text-[9px] font-mono text-[#9BA3B0]">
                {project.client}
              </span>
            </div>
          </div>
        </div>

        {/* Card Info Footer */}
        <div className="p-5 flex items-center justify-between bg-gradient-to-b from-transparent to-[#050508]/40">
          <div>
            <h4 className="text-lg font-bold font-heading text-[#F2F4F8] tracking-tight group-hover:text-[#00D9FF] transition-colors">
              {project.title}
            </h4>
            <p className="text-xs font-mono text-[#9BA3B0] mt-1">
              {project.client}
            </p>
          </div>

          <div className="w-9 h-9 rounded-full bg-[#050508] border border-[#00D9FF]/20 group-hover:border-[#00D9FF] group-hover:bg-[#00D9FF]/10 flex items-center justify-center text-[#9BA3B0] group-hover:text-[#00D9FF] transition-all">
            <ArrowUpRight size={16} />
          </div>
        </div>
      </motion.div>
    </div>
  );
}
