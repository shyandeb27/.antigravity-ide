"use client";

import React, { useRef, useState, useCallback } from "react";
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
  const [isTouched, setIsTouched] = useState(false);

  const calculateTilt = useCallback((clientX: number, clientY: number) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = clientX - rect.left;
    const y = clientY - rect.top;

    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    // Calculate tilt angles (capped at ~10 degrees)
    const rotX = ((y - centerY) / centerY) * -10;
    const rotY = ((x - centerX) / centerX) * 10;

    setRotateX(rotX);
    setRotateY(rotY);

    // Dynamic Glare position
    setGlarePos({
      x: (x / rect.width) * 100,
      y: (y / rect.height) * 100,
      opacity: 0.28,
    });
  }, []);

  // Desktop Mouse Handlers
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    calculateTilt(e.clientX, e.clientY);
  };

  const handleMouseEnter = () => {
    soundFx.playHover();
  };

  const handleMouseLeave = () => {
    setRotateX(0);
    setRotateY(0);
    setGlarePos((prev) => ({ ...prev, opacity: 0 }));
  };

  // Mobile Touch Handlers
  const handleTouchStart = (e: React.TouchEvent<HTMLDivElement>) => {
    setIsTouched(true);
    soundFx.playHover();
    if (e.touches.length > 0) {
      calculateTilt(e.touches[0].clientX, e.touches[0].clientY);
    }
  };

  const handleTouchMove = (e: React.TouchEvent<HTMLDivElement>) => {
    if (e.touches.length > 0) {
      calculateTilt(e.touches[0].clientX, e.touches[0].clientY);
    }
  };

  const handleTouchEnd = () => {
    setIsTouched(false);
    setTimeout(() => {
      setRotateX(0);
      setRotateY(0);
      setGlarePos((prev) => ({ ...prev, opacity: 0 }));
    }, 400);
  };

  const handleCardClick = () => {
    soundFx.playClick();
    onSelect(project);
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
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
        onClick={handleCardClick}
        style={{
          transform: `rotateX(${rotateX}deg) rotateY(${rotateY}deg)`,
          transformStyle: "preserve-3d",
          transition: "transform 0.15s ease-out",
        }}
        className="group relative rounded-2xl overflow-hidden glass-panel border border-[#00D9FF]/15 hover:border-[#00D9FF]/45 active:border-[#00D9FF]/60 bg-[#0a0a14]/85 shadow-[0_10px_30px_rgba(0,0,0,0.6)] hover:shadow-[0_0_35px_rgba(0,217,255,0.25)] transition-colors duration-300 cursor-pointer select-none"
        data-cursor="view"
        data-cursor-text="VIEW"
      >
        {/* Dynamic Spotlight Glare Layer (reacts to mouse and mobile touch) */}
        <div
          className="pointer-events-none absolute inset-0 z-20 transition-opacity duration-300"
          style={{
            opacity: glarePos.opacity,
            background: `radial-gradient(circle 280px at ${glarePos.x}% ${glarePos.y}%, rgba(0,217,255,0.25), transparent 70%)`,
          }}
        />

        {/* Thumbnail Graphic Area */}
        <div className="relative w-full h-52 sm:h-64 overflow-hidden border-b border-[#00D9FF]/10 bg-[#050508]">
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

          {/* Hover / Touch Active Overlay */}
          <div
            className={`absolute inset-0 bg-[#050508]/90 backdrop-blur-md transition-opacity duration-300 p-5 sm:p-6 flex flex-col justify-between z-10 ${
              isTouched ? "opacity-100" : "opacity-0 group-hover:opacity-100"
            }`}
          >
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
                <ArrowUpRight
                  size={14}
                  className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform"
                />
              </span>
              <span className="text-[9px] font-mono text-[#9BA3B0]">
                {project.client}
              </span>
            </div>
          </div>
        </div>

        {/* Card Info Footer */}
        <div className="p-4 sm:p-5 flex items-center justify-between bg-gradient-to-b from-transparent to-[#050508]/40">
          <div className="pr-2">
            <h4 className="text-base sm:text-lg font-bold font-heading text-[#F2F4F8] tracking-tight group-hover:text-[#00D9FF] transition-colors line-clamp-1">
              {project.title}
            </h4>
            <p className="text-[11px] sm:text-xs font-mono text-[#9BA3B0] mt-0.5 sm:mt-1 line-clamp-1">
              {project.client}
            </p>
          </div>

          <div className="shrink-0 w-8 sm:w-9 h-8 sm:h-9 rounded-full bg-[#050508] border border-[#00D9FF]/20 group-hover:border-[#00D9FF] group-hover:bg-[#00D9FF]/10 flex items-center justify-center text-[#9BA3B0] group-hover:text-[#00D9FF] transition-all">
            <ArrowUpRight size={15} />
          </div>
        </div>
      </motion.div>
    </div>
  );
}
