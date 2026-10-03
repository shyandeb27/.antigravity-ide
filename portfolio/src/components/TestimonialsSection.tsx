"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight, Quote, ShieldCheck, Star } from "lucide-react";
import { soundFx } from "@/utils/audio";

export default function TestimonialsSection() {
  const [currentIndex, setCurrentIndex] = useState(0);

  const testimonials = [
    {
      name: "Dr. Elena Vance",
      role: "VP of Brand & Spatial Systems",
      company: "Synthetix Robotics",
      avatarInitials: "EV",
      quote:
        "Valen Drake possesses a rare, supernatural gift for translating complex cybernetic concepts into visual languages that command global authority. The Synthetix HUD and brand identity transformed our entire perception in Silicon Valley.",
      tag: "SPATIAL UI / HUD SYSTEM",
      rating: 5,
    },
    {
      name: "Marcus Kane",
      role: "Game Director & Co-Founder",
      company: "Hyperion Interactive",
      avatarInitials: "MK",
      quote:
        "The worldbuilding visual bible, keyframe art, and hard-surface typography Valen created for Chrono Voyager set a benchmark our entire studio rallies behind. Seamless workflow, immense imagination, and impeccable precision.",
      tag: "3D CGI & WORLDBUILDING",
      rating: 5,
    },
    {
      name: "Sora Takahashi",
      role: "Chief Curator",
      company: "Tokyo Digital Biennale",
      avatarInitials: "ST",
      quote:
        "Hyperspace 2099 was universally celebrated as the crown jewel of our exhibition. The harmony between computational manifold math and museum-grade physical screenprint execution left attendees spellbound.",
      tag: "EXHIBITION ART & PRINT",
      rating: 5,
    },
    {
      name: "Aria Thorne",
      role: "Founder & CEO",
      company: "Apex AI Architecture",
      avatarInitials: "AT",
      quote:
        "From our kinetic monogram to our dynamic brand system, Valen propelled Apex from a research lab into an iconic tech benchmark. The deliverables exceeded every expectation we had set.",
      tag: "GENERATIVE BRAND ARCHITECTURE",
      rating: 5,
    },
  ];

  const handleNext = () => {
    soundFx.playClick();
    setCurrentIndex((prev) => (prev + 1) % testimonials.length);
  };

  const handlePrev = () => {
    soundFx.playClick();
    setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  const t = testimonials[currentIndex];

  return (
    <section id="reviews" className="relative py-28 px-4 sm:px-8 border-t border-[#00D9FF]/10 overflow-hidden">
      {/* Background glow */}
      <div className="absolute top-1/2 -right-48 w-96 h-96 bg-[#0066FF]/10 rounded-full blur-[140px] pointer-events-none" />

      <div className="w-full max-w-5xl mx-auto">
        {/* Section Header */}
        <div className="flex flex-col items-center text-center mb-16">
          <div className="flex items-center gap-2 px-3 py-1 rounded bg-[#0a0a14] border border-[#00D9FF]/20 text-[10px] font-mono text-[#00D9FF] mb-3">
            <span>// 04. TRANSMISSIONS & TESTIMONIALS</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-black font-heading tracking-tight text-[#F2F4F8]">
            VOICES OF <span className="text-[#00D9FF] glow-cyan-text">VISIONARIES</span>
          </h2>
          <p className="mt-3 text-sm sm:text-base text-[#9BA3B0] max-w-xl">
            Feedback from leaders, directors, and founders at the forefront of digital reality.
          </p>
        </div>

        {/* Testimonial Card Stage */}
        <div className="relative">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentIndex}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.4 }}
              className="glass-panel p-8 sm:p-12 rounded-3xl border border-[#00D9FF]/20 bg-[#0a0a14]/80 shadow-[0_0_50px_rgba(0,0,0,0.8)] relative"
            >
              {/* Glowing Quote Icon */}
              <div className="w-12 h-12 rounded-2xl bg-[#00D9FF]/10 border border-[#00D9FF]/30 flex items-center justify-center text-[#00D9FF] mb-6">
                <Quote size={22} />
              </div>

              {/* Tag & Stars */}
              <div className="flex flex-wrap items-center justify-between gap-3 mb-6">
                <span className="text-[10px] font-mono tracking-widest text-[#00D9FF] uppercase px-2.5 py-1 rounded bg-[#050508] border border-[#00D9FF]/20">
                  {t.tag}
                </span>

                <div className="flex items-center gap-1 text-[#00D9FF]">
                  {[...Array(t.rating)].map((_, i) => (
                    <Star key={i} size={14} fill="#00D9FF" />
                  ))}
                </div>
              </div>

              {/* Quote Text */}
              <p className="text-lg sm:text-2xl text-[#F2F4F8] font-heading font-normal leading-relaxed mb-8">
                &ldquo;{t.quote}&rdquo;
              </p>

              {/* Client Info */}
              <div className="flex items-center justify-between border-t border-[#00D9FF]/15 pt-6">
                <div className="flex items-center gap-4">
                  {/* Holographic Initials Avatar */}
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[#00D9FF]/20 to-[#0066FF]/20 border border-[#00D9FF]/40 flex items-center justify-center font-heading font-black text-sm text-[#00D9FF] shadow-[0_0_15px_rgba(0,217,255,0.2)]">
                    {t.avatarInitials}
                  </div>

                  <div>
                    <h4 className="text-base font-bold font-heading text-[#F2F4F8] flex items-center gap-1.5">
                      <span>{t.name}</span>
                      <ShieldCheck size={16} className="text-[#00D9FF]" aria-label="Verified Client" />
                    </h4>
                    <p className="text-xs font-mono text-[#9BA3B0]">
                      {t.role} // <span className="text-[#00D9FF]">{t.company}</span>
                    </p>
                  </div>
                </div>

                <div className="hidden sm:block text-[10px] font-mono text-[#9BA3B0]">
                  VERIFIED TRANSMISSION
                </div>
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Controls: Prev / Next Buttons */}
          <div className="flex items-center justify-between mt-8">
            <div className="flex items-center gap-2">
              {testimonials.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => {
                    soundFx.playClick();
                    setCurrentIndex(idx);
                  }}
                  className={`h-1.5 rounded-full transition-all cursor-pointer ${
                    currentIndex === idx
                      ? "w-8 bg-[#00D9FF] shadow-[0_0_8px_#00D9FF]"
                      : "w-2 bg-white/20 hover:bg-white/40"
                  }`}
                  aria-label={`Go to slide ${idx + 1}`}
                  data-cursor="hover"
                />
              ))}
            </div>

            <div className="flex items-center gap-3">
              <button
                onClick={handlePrev}
                className="w-10 h-10 rounded-full bg-[#0a0a14] border border-[#00D9FF]/25 hover:border-[#00D9FF] hover:bg-[#00D9FF]/10 text-[#9BA3B0] hover:text-[#00D9FF] flex items-center justify-center transition-all cursor-pointer"
                aria-label="Previous testimonial"
                data-cursor="hover"
                data-cursor-text="PREV"
              >
                <ChevronLeft size={18} />
              </button>
              <button
                onClick={handleNext}
                className="w-10 h-10 rounded-full bg-[#0a0a14] border border-[#00D9FF]/25 hover:border-[#00D9FF] hover:bg-[#00D9FF]/10 text-[#9BA3B0] hover:text-[#00D9FF] flex items-center justify-center transition-all cursor-pointer"
                aria-label="Next testimonial"
                data-cursor="hover"
                data-cursor-text="NEXT"
              >
                <ChevronRight size={18} />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
