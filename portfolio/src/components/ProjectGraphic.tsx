"use client";

import React from "react";

export default function ProjectGraphic({ id }: { id: string }) {
  switch (id) {
    case "neural-dynamics":
      return (
        <div className="relative w-full h-full bg-[#07090F] flex items-center justify-center overflow-hidden">
          {/* Cyber grid backdrop */}
          <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(0,217,255,0.06)_1px,transparent_1px),linear-gradient(to_bottom,rgba(0,217,255,0.06)_1px,transparent_1px)] bg-[size:24px_24px]" />
          <div className="absolute w-48 h-48 rounded-full bg-[#00D9FF]/20 blur-2xl" />

          {/* SVG Generative Neural Geometry */}
          <svg className="relative w-4/5 h-4/5" viewBox="0 0 400 300" fill="none">
            <defs>
              <linearGradient id="cyanGrad1" x1="0" y1="0" x2="1" y2="1">
                <stop offset="0%" stopColor="#00D9FF" stopOpacity="0.9" />
                <stop offset="100%" stopColor="#0066FF" stopOpacity="0.4" />
              </linearGradient>
              <linearGradient id="glowLine" x1="0" y1="0" x2="1" y2="0">
                <stop offset="0%" stopColor="#00D9FF" stopOpacity="0.1" />
                <stop offset="50%" stopColor="#00D9FF" stopOpacity="0.9" />
                <stop offset="100%" stopColor="#0066FF" stopOpacity="0.1" />
              </linearGradient>
            </defs>

            {/* Concentric harmonic rings */}
            <circle cx="200" cy="150" r="110" stroke="#00D9FF" strokeWidth="0.8" strokeDasharray="4 6" opacity="0.4" />
            <circle cx="200" cy="150" r="85" stroke="#0066FF" strokeWidth="1" strokeDasharray="12 4" opacity="0.6" />
            <circle cx="200" cy="150" r="55" stroke="#00D9FF" strokeWidth="1.5" opacity="0.8" />
            <circle cx="200" cy="150" r="28" stroke="url(#cyanGrad1)" strokeWidth="2" />

            {/* Neural connection filaments */}
            <line x1="80" y1="90" x2="200" y2="150" stroke="#00D9FF" strokeWidth="1.2" opacity="0.5" />
            <line x1="320" y1="80" x2="200" y2="150" stroke="#00D9FF" strokeWidth="1.2" opacity="0.5" />
            <line x1="100" y1="230" x2="200" y2="150" stroke="#0066FF" strokeWidth="1.2" opacity="0.6" />
            <line x1="300" y1="220" x2="200" y2="150" stroke="#0066FF" strokeWidth="1.2" opacity="0.6" />

            {/* Kinetic Wave Sine Path */}
            <path
              d="M 50 150 Q 125 70, 200 150 T 350 150"
              stroke="url(#glowLine)"
              strokeWidth="2.5"
              fill="none"
            />
            <path
              d="M 50 150 Q 125 230, 200 150 T 350 150"
              stroke="#00D9FF"
              strokeWidth="1.5"
              strokeDasharray="6 4"
              fill="none"
              opacity="0.7"
            />

            {/* Neural Nodes */}
            <circle cx="80" cy="90" r="5" fill="#00D9FF" filter="drop-shadow(0 0 6px #00D9FF)" />
            <circle cx="320" cy="80" r="5" fill="#00D9FF" filter="drop-shadow(0 0 6px #00D9FF)" />
            <circle cx="100" cy="230" r="4.5" fill="#0066FF" />
            <circle cx="300" cy="220" r="4.5" fill="#0066FF" />
            <circle cx="200" cy="150" r="8" fill="#F2F4F8" filter="drop-shadow(0 0 10px #00D9FF)" />

            {/* Cyber Telemetry Typography */}
            <text x="35" y="40" fill="#00D9FF" fontSize="10" fontFamily="monospace" opacity="0.8">
              NODE_ID // 0x99A7
            </text>
            <text x="280" y="40" fill="#9BA3B0" fontSize="9" fontFamily="monospace" opacity="0.6">
              FREQ: 144.8 MHZ
            </text>
            <text x="35" y="275" fill="#9BA3B0" fontSize="9" fontFamily="monospace" opacity="0.6">
              DIMENSIONAL_HARMONICS
            </text>
          </svg>
        </div>
      );

    case "chrono-voyager":
      return (
        <div className="relative w-full h-full bg-[#05060D] flex items-center justify-center overflow-hidden">
          <div className="absolute w-56 h-56 rounded-full bg-[#0066FF]/25 blur-3xl" />
          <div className="absolute top-1/3 right-1/4 w-32 h-32 rounded-full bg-[#00D9FF]/15 blur-2xl" />

          {/* Deep Space Trajectory SVG */}
          <svg className="relative w-4/5 h-4/5" viewBox="0 0 400 300" fill="none">
            {/* Celestial Grids & Constellation */}
            <ellipse cx="200" cy="150" rx="140" ry="60" stroke="#00D9FF" strokeWidth="1" strokeDasharray="3 5" opacity="0.4" transform="rotate(-20 200 150)" />
            <ellipse cx="200" cy="150" rx="110" ry="40" stroke="#0066FF" strokeWidth="1.2" opacity="0.6" transform="rotate(-20 200 150)" />
            <ellipse cx="200" cy="150" rx="70" ry="25" stroke="#00D9FF" strokeWidth="1.8" opacity="0.8" transform="rotate(-20 200 150)" />

            {/* Glowing Celestial Body / Planet Horizon */}
            <circle cx="200" cy="150" r="32" fill="#0A0F24" stroke="#00D9FF" strokeWidth="2" filter="drop-shadow(0 0 16px rgba(0,217,255,0.7))" />

            {/* Orbital Waypoint Crosshairs */}
            <g transform="translate(130, 110)">
              <line x1="-8" y1="0" x2="8" y2="0" stroke="#00D9FF" strokeWidth="1" />
              <line x1="0" y1="-8" x2="0" y2="8" stroke="#00D9FF" strokeWidth="1" />
              <circle cx="0" cy="0" r="3" stroke="#00D9FF" strokeWidth="1" fill="none" />
              <text x="12" y="4" fill="#00D9FF" fontSize="8" fontFamily="monospace">WP-01</text>
            </g>

            <g transform="translate(280, 180)">
              <line x1="-8" y1="0" x2="8" y2="0" stroke="#00D9FF" strokeWidth="1" />
              <line x1="0" y1="-8" x2="0" y2="8" stroke="#00D9FF" strokeWidth="1" />
              <circle cx="0" cy="0" r="3" stroke="#00D9FF" strokeWidth="1" fill="none" />
              <text x="12" y="4" fill="#00D9FF" fontSize="8" fontFamily="monospace">EVENT_HORIZON</text>
            </g>

            {/* Vector Decal Stencil */}
            <path d="M 40 40 L 80 40 L 90 50 L 40 50 Z" fill="#00D9FF" opacity="0.8" />
            <text x="98" y="48" fill="#F2F4F8" fontSize="9" fontFamily="monospace" fontWeight="bold">
              HYPERION // ORBITAL
            </text>
          </svg>
        </div>
      );

    case "synthetix-core":
      return (
        <div className="relative w-full h-full bg-[#05060A] flex items-center justify-center overflow-hidden">
          <div className="absolute w-52 h-52 rounded-full bg-[#00D9FF]/20 blur-3xl" />
          <svg className="relative w-4/5 h-4/5" viewBox="0 0 400 300" fill="none">
            {/* HUD Central Radar Gauge */}
            <circle cx="200" cy="150" r="95" stroke="#00D9FF" strokeWidth="1" strokeDasharray="2 4" opacity="0.4" />
            <circle cx="200" cy="150" r="80" stroke="#00D9FF" strokeWidth="1.5" strokeDasharray="16 8 4 8" opacity="0.8" />
            <circle cx="200" cy="150" r="60" stroke="#0066FF" strokeWidth="1" strokeDasharray="1 3" opacity="0.5" />
            
            {/* Target Reticle Crosshairs */}
            <line x1="70" y1="150" x2="120" y2="150" stroke="#00D9FF" strokeWidth="1.5" />
            <line x1="280" y1="150" x2="330" y2="150" stroke="#00D9FF" strokeWidth="1.5" />
            <line x1="200" y1="40" x2="200" y2="80" stroke="#00D9FF" strokeWidth="1.5" />
            <line x1="200" y1="220" x2="200" y2="260" stroke="#00D9FF" strokeWidth="1.5" />

            {/* Arc Segment Gauge */}
            <path
              d="M 140 150 A 60 60 0 0 1 260 150"
              stroke="#00D9FF"
              strokeWidth="4"
              strokeLinecap="round"
              filter="drop-shadow(0 0 8px #00D9FF)"
            />

            {/* Pitch & Roll HUD Ladder */}
            <line x1="175" y1="125" x2="190" y2="125" stroke="#00D9FF" strokeWidth="1" />
            <line x1="210" y1="125" x2="225" y2="125" stroke="#00D9FF" strokeWidth="1" />
            <line x1="180" y1="175" x2="190" y2="175" stroke="#00D9FF" strokeWidth="1" />
            <line x1="210" y1="175" x2="220" y2="175" stroke="#00D9FF" strokeWidth="1" />

            {/* Center Lock Dot */}
            <circle cx="200" cy="150" r="4" fill="#00D9FF" filter="drop-shadow(0 0 6px #00D9FF)" />

            {/* Live Readouts */}
            <text x="35" y="55" fill="#00D9FF" fontSize="10" fontFamily="monospace" fontWeight="bold">
              [HUD_CORE // ONLINE]
            </text>
            <text x="35" y="70" fill="#9BA3B0" fontSize="8" fontFamily="monospace">
              SYNC_RATE: 99.4%
            </text>
            <text x="290" y="260" fill="#00D9FF" fontSize="9" fontFamily="monospace">
              EXO_V5.2 // LOCK
            </text>
          </svg>
        </div>
      );

    case "hyperspace-2099":
      return (
        <div className="relative w-full h-full bg-[#06050C] flex items-center justify-center overflow-hidden">
          <div className="absolute w-48 h-48 rounded-full bg-[#7000FF]/25 blur-3xl" />
          <div className="absolute w-36 h-36 rounded-full bg-[#00D9FF]/20 blur-2xl" />

          {/* 3D Isometric Constructivist Geometry */}
          <svg className="relative w-4/5 h-4/5" viewBox="0 0 400 300" fill="none">
            {/* Isometric Wireframe Hypercube Lattice */}
            <g stroke="#00D9FF" strokeWidth="1.2" opacity="0.85">
              {/* Outer Cube */}
              <polygon points="200,60 290,110 290,210 200,260 110,210 110,110" fill="none" strokeWidth="1.5" />
              <line x1="200" y1="160" x2="200" y2="260" />
              <line x1="200" y1="160" x2="290" y2="110" />
              <line x1="200" y1="160" x2="110" y2="110" />

              {/* Inner Projected Core Cube */}
              <polygon points="200,105 245,130 245,185 200,210 155,185 155,130" stroke="#0066FF" strokeWidth="1.2" fill="rgba(0,102,255,0.1)" />
              <line x1="200" y1="60" x2="200" y2="105" strokeDasharray="3 3" />
              <line x1="290" y1="110" x2="245" y2="130" strokeDasharray="3 3" />
              <line x1="290" y1="210" x2="245" y2="185" strokeDasharray="3 3" />
              <line x1="200" y1="260" x2="200" y2="210" strokeDasharray="3 3" />
              <line x1="110" y1="210" x2="155" y2="185" strokeDasharray="3 3" />
              <line x1="110" y1="110" x2="155" y2="130" strokeDasharray="3 3" />
            </g>

            {/* Glowing Refraction Prisms */}
            <circle cx="200" cy="160" r="6" fill="#FFFFFF" filter="drop-shadow(0 0 10px #00D9FF)" />

            {/* Poster Header Stencil */}
            <text x="35" y="45" fill="#FFFFFF" fontSize="12" fontFamily="monospace" fontWeight="bold" letterSpacing="2">
              HYPERSPACE 2099
            </text>
            <text x="35" y="60" fill="#00D9FF" fontSize="8" fontFamily="monospace" letterSpacing="1">
              TOKYO BIENNALE // EXHIBIT 04
            </text>
          </svg>
        </div>
      );

    case "aether-os":
      return (
        <div className="relative w-full h-full bg-[#060812] flex items-center justify-center overflow-hidden">
          <div className="absolute w-56 h-56 rounded-full bg-[#0066FF]/20 blur-3xl" />
          <svg className="relative w-4/5 h-4/5" viewBox="0 0 400 300" fill="none">
            {/* Floating Spatial Window UI Panels */}
            {/* Back Panel */}
            <rect x="70" y="60" width="220" height="140" rx="10" fill="rgba(10,14,24,0.7)" stroke="#0066FF" strokeWidth="1" strokeDasharray="4 4" opacity="0.6" />
            
            {/* Front Frosted Glass Panel */}
            <rect x="110" y="90" width="230" height="150" rx="12" fill="rgba(14,20,36,0.85)" stroke="#00D9FF" strokeWidth="1.5" filter="drop-shadow(0 15px 30px rgba(0,0,0,0.8))" />

            {/* Window Title Bar */}
            <line x1="110" y1="125" x2="340" y2="125" stroke="#00D9FF" strokeWidth="0.8" opacity="0.3" />
            <circle cx="128" cy="108" r="4" fill="#00D9FF" />
            <circle cx="142" cy="108" r="4" fill="#0066FF" />
            <circle cx="156" cy="108" r="4" fill="#9BA3B0" opacity="0.6" />
            
            {/* Content Wireframe Blocks inside Spatial Window */}
            <rect x="130" y="145" width="80" height="60" rx="6" fill="rgba(0,217,255,0.08)" stroke="#00D9FF" strokeWidth="1" />
            <rect x="225" y="145" width="95" height="14" rx="4" fill="rgba(242,244,248,0.2)" />
            <rect x="225" y="168" width="80" height="10" rx="3" fill="rgba(155,163,176,0.2)" />
            <rect x="225" y="185" width="60" height="10" rx="3" fill="rgba(0,217,255,0.3)" />

            {/* Depth Z-axis Indicators */}
            <line x1="90" y1="200" x2="110" y2="240" stroke="#00D9FF" strokeWidth="1" opacity="0.5" />
            <text x="35" y="275" fill="#00D9FF" fontSize="8" fontFamily="monospace">
              SPATIAL_DEPTH: Z+180MM
            </text>
          </svg>
        </div>
      );

    case "neo-tokyo-apparel":
    default:
      return (
        <div className="relative w-full h-full bg-[#050508] flex items-center justify-center overflow-hidden">
          <div className="absolute w-48 h-48 rounded-full bg-[#00D9FF]/15 blur-3xl" />
          <svg className="relative w-4/5 h-4/5" viewBox="0 0 400 300" fill="none">
            {/* Techwear Hazard Stencil & Typography */}
            <pattern id="stripes" width="20" height="20" patternTransform="rotate(45 0 0)" patternUnits="userSpaceOnUse">
              <line x1="0" y1="0" x2="0" y2="20" stroke="#00D9FF" strokeWidth="4" opacity="0.3" />
            </pattern>
            <rect x="35" y="40" width="120" height="12" fill="url(#stripes)" />

            {/* Cyber Kanji & Minimalist Badge */}
            <rect x="120" y="80" width="160" height="140" fill="#0A0A14" stroke="#00D9FF" strokeWidth="1.5" />
            <text x="145" y="130" fill="#F2F4F8" fontSize="24" fontFamily="monospace" fontWeight="bold">
              第7区
            </text>
            <text x="145" y="155" fill="#00D9FF" fontSize="10" fontFamily="monospace" letterSpacing="3">
              SECTOR_07 // VGRD
            </text>
            <line x1="145" y1="170" x2="255" y2="170" stroke="#0066FF" strokeWidth="2" />
            
            {/* Barcode Graphic */}
            <g transform="translate(145, 185)" fill="#F2F4F8" opacity="0.8">
              <rect x="0" y="0" width="3" height="20" />
              <rect x="5" y="0" width="1" height="20" />
              <rect x="8" y="0" width="4" height="20" />
              <rect x="15" y="0" width="2" height="20" />
              <rect x="20" y="0" width="1" height="20" />
              <rect x="24" y="0" width="5" height="20" />
              <rect x="32" y="0" width="2" height="20" />
              <rect x="37" y="0" width="4" height="20" />
              <rect x="44" y="0" width="1" height="20" />
              <rect x="48" y="0" width="3" height="20" />
              <rect x="54" y="0" width="6" height="20" />
              <rect x="63" y="0" width="2" height="20" />
              <rect x="68" y="0" width="4" height="20" />
              <rect x="75" y="0" width="1" height="20" />
              <rect x="79" y="0" width="3" height="20" />
              <rect x="85" y="0" width="2" height="20" />
            </g>

            {/* Tech Specs */}
            <text x="35" y="270" fill="#9BA3B0" fontSize="8" fontFamily="monospace">
              MATERIAL: WATERPROOF RIPSTOP / SPEC-4
            </text>
          </svg>
        </div>
      );
  }
}
