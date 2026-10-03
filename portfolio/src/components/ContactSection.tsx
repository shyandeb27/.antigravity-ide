"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { Send, CheckCircle2, Shield, Mail, MessageSquare, Terminal } from "lucide-react";
import confetti from "canvas-confetti";
import { soundFx } from "@/utils/audio";

export default function ContactSection() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    service: "Brand Identity Architecture",
    budget: "$15k - $30k",
    message: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    soundFx.playClick();
    setIsSubmitting(true);

    // Simulate cybernetic transmission handshake
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);
      soundFx.playPulse();

      confetti({
        particleCount: 50,
        spread: 80,
        origin: { y: 0.6 },
        colors: ["#00D9FF", "#0066FF", "#FFFFFF"],
      });
    }, 1200);
  };

  const socials = [
    { name: "Behance", url: "https://behance.net", label: "BE" },
    { name: "Dribbble", url: "https://dribbble.com", label: "DR" },
    { name: "ArtStation", url: "https://artstation.com", label: "AS" },
    { name: "Instagram", url: "https://instagram.com", label: "IG" },
    { name: "LinkedIn", url: "https://linkedin.com", label: "IN" },
    { name: "X (Twitter)", url: "https://x.com", label: "X" },
  ];

  return (
    <section id="contact" className="relative py-28 px-4 sm:px-8 border-t border-[#00D9FF]/10 overflow-hidden">
      {/* Background glow orbs */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-radial-glow pointer-events-none" />

      <div className="w-full max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="flex flex-col items-start mb-16">
          <div className="flex items-center gap-2 px-3 py-1 rounded bg-[#0a0a14] border border-[#00D9FF]/20 text-[10px] font-mono text-[#00D9FF] mb-3">
            <Terminal size={12} className="text-[#00D9FF]" />
            <span>// 05. INITIATE TRANSMISSION</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-black font-heading tracking-tight text-[#F2F4F8]">
            LET&apos;S FORGE THE <span className="text-[#00D9FF] glow-cyan-text">NEXT REALITY</span>
          </h2>
          <p className="mt-3 text-sm sm:text-base text-[#9BA3B0] max-w-2xl">
            Currently accepting select commissions and advisory partnerships for Q2/Q3.
            Dispatch your project parameters below to initiate encrypted comms.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          {/* Form (7 cols) */}
          <div className="lg:col-span-7 glass-panel p-6 sm:p-10 rounded-3xl border border-[#00D9FF]/20 bg-[#0a0a14]/85 shadow-[0_0_50px_rgba(0,0,0,0.8)] relative">
            {isSubmitted ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="py-12 flex flex-col items-center text-center space-y-4"
              >
                <div className="w-16 h-16 rounded-full bg-[#00D9FF]/15 border border-[#00D9FF] flex items-center justify-center text-[#00D9FF] shadow-[0_0_25px_rgba(0,217,255,0.5)]">
                  <CheckCircle2 size={32} />
                </div>
                <h3 className="text-2xl font-bold font-heading text-[#F2F4F8]">
                  TRANSMISSION ACKNOWLEDGED
                </h3>
                <p className="text-sm text-[#9BA3B0] max-w-md">
                  Your parameters have been logged into the queue. Expect an encrypted response within 24 standard earth hours.
                </p>
                <button
                  onClick={() => setIsSubmitted(false)}
                  className="mt-4 px-6 py-2.5 rounded-xl border border-[#00D9FF]/30 text-xs font-mono text-[#00D9FF] hover:bg-[#00D9FF]/10 transition-colors cursor-pointer"
                >
                  DISPATCH ANOTHER PACKET
                </button>
              </motion.div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  {/* Name Input */}
                  <div className="space-y-2">
                    <label className="text-xs font-mono tracking-wider text-[#9BA3B0] uppercase">
                      NAME / ENTITY *
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      placeholder="e.g. Elena Vance"
                      className="w-full px-4 py-3 rounded-xl bg-[#050508]/80 border border-[#00D9FF]/20 text-[#F2F4F8] placeholder-[#9BA3B0]/40 text-sm font-sans focus:outline-none focus:border-[#00D9FF] focus:shadow-[0_0_15px_rgba(0,217,255,0.25)] transition-all"
                    />
                  </div>

                  {/* Email Input */}
                  <div className="space-y-2">
                    <label className="text-xs font-mono tracking-wider text-[#9BA3B0] uppercase">
                      COMMS EMAIL *
                    </label>
                    <input
                      type="email"
                      required
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      placeholder="elena@synthetix.ai"
                      className="w-full px-4 py-3 rounded-xl bg-[#050508]/80 border border-[#00D9FF]/20 text-[#F2F4F8] placeholder-[#9BA3B0]/40 text-sm font-sans focus:outline-none focus:border-[#00D9FF] focus:shadow-[0_0_15px_rgba(0,217,255,0.25)] transition-all"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  {/* Service Scope Select */}
                  <div className="space-y-2">
                    <label className="text-xs font-mono tracking-wider text-[#9BA3B0] uppercase">
                      SERVICE SCOPE
                    </label>
                    <select
                      value={formData.service}
                      onChange={(e) => setFormData({ ...formData, service: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl bg-[#050508]/80 border border-[#00D9FF]/20 text-[#F2F4F8] text-sm font-sans focus:outline-none focus:border-[#00D9FF] transition-all cursor-pointer"
                    >
                      <option className="bg-[#0a0a14]">Brand Identity Architecture</option>
                      <option className="bg-[#0a0a14]">3D CGI & Spatial Sets</option>
                      <option className="bg-[#0a0a14]">Holographic HUD & Spatial UI</option>
                      <option className="bg-[#0a0a14]">Full Creative Direction</option>
                    </select>
                  </div>

                  {/* Budget Allocation */}
                  <div className="space-y-2">
                    <label className="text-xs font-mono tracking-wider text-[#9BA3B0] uppercase">
                      CAPITAL ALLOCATION
                    </label>
                    <select
                      value={formData.budget}
                      onChange={(e) => setFormData({ ...formData, budget: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl bg-[#050508]/80 border border-[#00D9FF]/20 text-[#F2F4F8] text-sm font-sans focus:outline-none focus:border-[#00D9FF] transition-all cursor-pointer"
                    >
                      <option className="bg-[#0a0a14]">$10k - $20k</option>
                      <option className="bg-[#0a0a14]">$20k - $40k</option>
                      <option className="bg-[#0a0a14]">$40k - $80k</option>
                      <option className="bg-[#0a0a14]">$80k+ (Enterprise/Studio)</option>
                    </select>
                  </div>
                </div>

                {/* Message Brief */}
                <div className="space-y-2">
                  <label className="text-xs font-mono tracking-wider text-[#9BA3B0] uppercase">
                    PROJECT PARAMETERS / BRIEF *
                  </label>
                  <textarea
                    required
                    rows={4}
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    placeholder="Outline your timeline, goals, aesthetic aspirations, and core deliverables..."
                    className="w-full px-4 py-3 rounded-xl bg-[#050508]/80 border border-[#00D9FF]/20 text-[#F2F4F8] placeholder-[#9BA3B0]/40 text-sm font-sans focus:outline-none focus:border-[#00D9FF] focus:shadow-[0_0_15px_rgba(0,217,255,0.25)] transition-all resize-none"
                  />
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-4 rounded-xl bg-[#00D9FF] hover:bg-[#00D9FF]/90 text-[#050508] font-mono text-xs font-bold tracking-widest uppercase flex items-center justify-center gap-2 shadow-[0_0_25px_rgba(0,217,255,0.4)] hover:shadow-[0_0_40px_rgba(0,217,255,0.7)] transition-all cursor-pointer disabled:opacity-50"
                  data-cursor="hover"
                  data-cursor-text="SEND"
                >
                  {isSubmitting ? (
                    <span className="flex items-center gap-2">
                      <span className="w-4 h-4 border-2 border-[#050508] border-t-transparent rounded-full animate-spin" />
                      <span>ENCRYPTING PACKET...</span>
                    </span>
                  ) : (
                    <span className="flex items-center gap-2">
                      <span>TRANSMIT DISPATCH</span>
                      <Send size={14} />
                    </span>
                  )}
                </button>
              </form>
            )}
          </div>

          {/* Direct Comms & Social Channels (5 cols) */}
          <div className="lg:col-span-5 space-y-6">
            {/* Direct Comms Card */}
            <div className="glass-panel p-6 sm:p-8 rounded-3xl border border-[#00D9FF]/15 bg-[#0a0a14]/75 space-y-6">
              <h3 className="text-xs font-mono tracking-widest text-[#00D9FF] uppercase flex items-center gap-2">
                <Shield size={14} />
                <span>DIRECT PROTOCOLS</span>
              </h3>

              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-lg bg-[#00D9FF]/10 border border-[#00D9FF]/20 flex items-center justify-center text-[#00D9FF] shrink-0 mt-0.5">
                    <Mail size={16} />
                  </div>
                  <div>
                    <div className="text-[10px] font-mono text-[#9BA3B0] uppercase">
                      ELECTRONIC COMM
                    </div>
                    <a
                      href="mailto:valen@drake.dimension"
                      className="text-sm font-mono text-[#F2F4F8] hover:text-[#00D9FF] transition-colors"
                      data-cursor="hover"
                    >
                      valen@drake.dimension
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-lg bg-[#00D9FF]/10 border border-[#00D9FF]/20 flex items-center justify-center text-[#00D9FF] shrink-0 mt-0.5">
                    <MessageSquare size={16} />
                  </div>
                  <div>
                    <div className="text-[10px] font-mono text-[#9BA3B0] uppercase">
                      DISCORD FREQUENCY
                    </div>
                    <span className="text-sm font-mono text-[#F2F4F8]">
                      @valendrake.dimension
                    </span>
                  </div>
                </div>

                <div className="border-t border-[#00D9FF]/10 pt-4">
                  <div className="text-[10px] font-mono text-[#9BA3B0] uppercase mb-1">
                    PGP KEY FINGERPRINT
                  </div>
                  <div className="text-[11px] font-mono text-[#00D9FF] break-all">
                    9F82 C410 7A9D 30B5 2C09 E18F 4D92 88B1
                  </div>
                </div>
              </div>
            </div>

            {/* Glowing Social Buttons */}
            <div className="glass-panel p-6 sm:p-8 rounded-3xl border border-[#00D9FF]/15 bg-[#0a0a14]/75">
              <h3 className="text-xs font-mono tracking-widest text-[#00D9FF] uppercase mb-4">
                // EXTERNAL FREQUENCIES
              </h3>

              <div className="grid grid-cols-3 gap-3">
                {socials.map((s, idx) => (
                  <a
                    key={idx}
                    href={s.url}
                    target="_blank"
                    rel="noreferrer"
                    className="p-3 rounded-xl bg-[#050508] border border-[#00D9FF]/20 hover:border-[#00D9FF] hover:bg-[#00D9FF]/10 flex flex-col items-center justify-center gap-1 group transition-all cursor-pointer hover:shadow-[0_0_15px_rgba(0,217,255,0.3)]"
                    data-cursor="hover"
                    data-cursor-text={s.label}
                  >
                    <span className="font-heading font-black text-sm text-[#F2F4F8] group-hover:text-[#00D9FF] transition-colors">
                      {s.label}
                    </span>
                    <span className="text-[9px] font-mono text-[#9BA3B0] group-hover:text-[#F2F4F8]">
                      {s.name}
                    </span>
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
