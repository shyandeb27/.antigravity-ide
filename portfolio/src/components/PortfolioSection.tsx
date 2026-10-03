"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { PROJECTS, Project } from "@/data/projects";
import ProjectCard from "./ProjectCard";
import CaseStudyModal from "./CaseStudyModal";
import { soundFx } from "@/utils/audio";

export default function PortfolioSection() {
  const [activeCategory, setActiveCategory] = useState<string>("ALL");
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  const categories = [
    "ALL",
    "BRAND IDENTITY",
    "3D & MOTION",
    "SPATIAL UI / HUD",
    "CONCEPT ART",
  ];

  const filteredProjects = activeCategory === "ALL"
    ? PROJECTS
    : PROJECTS.filter((p) => p.category === activeCategory);

  const handleFilterClick = (cat: string) => {
    soundFx.playClick();
    setActiveCategory(cat);
  };

  return (
    <section id="work" className="relative py-16 sm:py-28 px-4 sm:px-8 border-t border-[#00D9FF]/10 overflow-hidden">
      {/* Background glow orbs */}
      <div className="absolute top-1/3 -left-48 w-96 h-96 bg-[#00D9FF]/10 rounded-full blur-[140px] pointer-events-none" />

      <div className="w-full max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 sm:mb-12 gap-6">
          <div>
            <div className="flex items-center gap-2 px-3 py-1 rounded bg-[#0a0a14] border border-[#00D9FF]/20 text-[10px] font-mono text-[#00D9FF] mb-3 w-fit">
              <span>// 01. SELECTED WORKS ARCHIVE</span>
            </div>
            <h2 className="text-2xl sm:text-4xl md:text-5xl font-black font-heading tracking-tight text-[#F2F4F8]">
              SPECULATIVE <span className="text-[#00D9FF] glow-cyan-text">DIMENSIONS</span> & IDENTITIES
            </h2>
            <p className="mt-2 sm:mt-3 text-xs sm:text-base text-[#9BA3B0] max-w-xl">
              Curated portfolio of generative brand systems, spatial computing HUDs,
              and 3D CGI worldbuilding experiments.
            </p>
          </div>

          {/* Category Filter Pills (horizontally scrollable on mobile without ugly scrollbars) */}
          <div className="flex items-center gap-1.5 sm:gap-2 p-1 sm:p-1.5 rounded-xl bg-[#0a0a14]/90 border border-[#00D9FF]/15 backdrop-blur-md overflow-x-auto no-scrollbar max-w-full shrink-0">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => handleFilterClick(cat)}
                className={`px-3 py-1.5 rounded-lg text-[9px] sm:text-[10px] font-mono tracking-wider transition-all whitespace-nowrap cursor-pointer ${
                  activeCategory === cat
                    ? "bg-[#00D9FF] text-[#050508] font-bold shadow-[0_0_15px_rgba(0,217,255,0.4)]"
                    : "text-[#9BA3B0] hover:text-[#F2F4F8] hover:bg-white/5"
                }`}
                data-cursor="hover"
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Project Grid */}
        <motion.div
          layout
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-8"
        >
          <AnimatePresence>
            {filteredProjects.map((project) => (
              <motion.div
                key={project.id}
                layout
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.35 }}
              >
                <ProjectCard
                  project={project}
                  onSelect={(p) => setSelectedProject(p)}
                />
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

        {/* Case Study Detail Modal */}
        <CaseStudyModal
          project={selectedProject}
          onClose={() => setSelectedProject(null)}
        />
      </div>
    </section>
  );
}
