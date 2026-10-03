"use client";

import React, { useRef, useState, useEffect, useCallback } from "react";
import Image from "next/image";
import { motion, useMotionValue, useSpring, useTransform, AnimatePresence } from "framer-motion";
import confetti from "canvas-confetti";
import { soundFx } from "@/utils/audio";
import { Sparkles, Heart, Zap } from "lucide-react";

export default function InteractiveBear() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);
  const [isBouncing, setIsBouncing] = useState(false);
  const [clickCount, setClickCount] = useState(0);
  const [speechText, setSpeechText] = useState("✨ HELLO VISIONARY!");
  const [showSpeech, setShowSpeech] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  // Normalized mouse/touch values [-1, 1]
  const rawX = useMotionValue(0);
  const rawY = useMotionValue(0);

  // Smooth spring physics for organic cursor/touch tracking
  const springConfig = { damping: 22, stiffness: 240, mass: 0.55 };
  const smoothX = useSpring(rawX, springConfig);
  const smoothY = useSpring(rawY, springConfig);

  // Transform values to 3D rotation, translation, and subtle perspective skew
  const rotateY = useTransform(smoothX, [-1, 1], [-20, 20]);
  const rotateX = useTransform(smoothY, [-1, 1], [16, -16]);
  const translateX = useTransform(smoothX, [-1, 1], [-18, 18]);
  const translateY = useTransform(smoothY, [-1, 1], [-14, 14]);
  const auraX = useTransform(smoothX, [-1, 1], [-35, 35]);
  const auraY = useTransform(smoothY, [-1, 1], [-30, 30]);

  const speechQuotes = [
    "✨ HELLO VISIONARY!",
    "🚀 READY TO FORGE THE FUTURE!",
    "🐻 FLUFFIEST CREATIVE COMPANION!",
    "💎 100% PRODUCTION READY!",
    "🌟 DELIGHTFUL TO MEET YOU!",
    "🎉 HIGH-ENERGY SYSTEM ACTIVE!",
    "⚡ PIXEL-PERFECT ARCHITECTURE!",
    "💖 CLICK TO BOOP!",
  ];

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(
        window.innerWidth < 768 || window.matchMedia("(pointer: coarse)").matches
      );
    };
    checkMobile();
    window.addEventListener("resize", checkMobile);

    // Desktop Mouse Move listener
    const handleMouseMove = (e: MouseEvent) => {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;

      const normX = Math.max(-1, Math.min(1, (e.clientX - centerX) / (window.innerWidth / 2)));
      const normY = Math.max(-1, Math.min(1, (e.clientY - centerY) / (window.innerHeight / 2)));

      rawX.set(normX);
      rawY.set(normY);
    };

    // Mobile Touch Move listener
    const handleTouchMove = (e: TouchEvent) => {
      if (!containerRef.current || e.touches.length === 0) return;
      const rect = containerRef.current.getBoundingClientRect();
      const touch = e.touches[0];
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;

      const normX = Math.max(-1, Math.min(1, (touch.clientX - centerX) / (window.innerWidth / 2)));
      const normY = Math.max(-1, Math.min(1, (touch.clientY - centerY) / (window.innerHeight / 2)));

      rawX.set(normX);
      rawY.set(normY);
    };

    // Mobile Gyroscope / Device Orientation
    const handleOrientation = (e: DeviceOrientationEvent) => {
      if (e.gamma !== null && e.beta !== null) {
        const tiltX = Math.max(-1, Math.min(1, e.gamma / 30));
        const tiltY = Math.max(-1, Math.min(1, (e.beta - 40) / 30));
        rawX.set(tiltX);
        rawY.set(tiltY);
      }
    };

    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    window.addEventListener("touchmove", handleTouchMove, { passive: true });

    if (typeof window !== "undefined" && "DeviceOrientationEvent" in window) {
      window.addEventListener("deviceorientation", handleOrientation, { passive: true });
    }

    return () => {
      window.removeEventListener("resize", checkMobile);
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("touchmove", handleTouchMove);
      if (typeof window !== "undefined" && "DeviceOrientationEvent" in window) {
        window.removeEventListener("deviceorientation", handleOrientation);
      }
    };
  }, [rawX, rawY]);

  // Click / Tap Reaction with sound, confetti burst, and quote cycle
  const handleBearClick = useCallback((e?: React.MouseEvent) => {
    soundFx.playPulse();
    setIsBouncing(true);
    setTimeout(() => setIsBouncing(false), 650);

    const nextCount = clickCount + 1;
    setClickCount(nextCount);
    setSpeechText(speechQuotes[nextCount % speechQuotes.length]);
    setShowSpeech(true);

    // Calculate origin for confetti burst from the bear center
    let originX = 0.65;
    let originY = 0.45;
    if (e) {
      originX = e.clientX / window.innerWidth;
      originY = e.clientY / window.innerHeight;
    } else if (containerRef.current) {
      const rect = containerRef.current.getBoundingClientRect();
      originX = (rect.left + rect.width / 2) / window.innerWidth;
      originY = (rect.top + rect.height * 0.4) / window.innerHeight;
    }

    confetti({
      particleCount: 40,
      spread: 80,
      origin: { x: originX, y: originY },
      colors: ["#00D9FF", "#0066FF", "#FFB703", "#FF6B6B", "#FFFFFF"],
      ticks: 120,
      gravity: 0.8,
      scalar: 0.85,
      shapes: ["circle", "square"],
    });

    // Auto dismiss speech bubble after 3.2 seconds
    setTimeout(() => {
      setShowSpeech(false);
    }, 3200);
  }, [clickCount, speechQuotes]);

  return (
    <div
      ref={containerRef}
      style={{ perspective: 1200 }}
      className="relative w-full max-w-[440px] h-[380px] sm:h-[480px] lg:h-[540px] flex items-center justify-center select-none cursor-pointer group"
      onClick={handleBearClick}
      onMouseEnter={() => {
        setIsHovered(true);
        setShowSpeech(true);
        soundFx.playHover();
      }}
      onMouseLeave={() => {
        setIsHovered(false);
      }}
      data-cursor="hover"
      data-cursor-text="BOOP BEAR"
    >
      {/* 1. Cybernetic Ambient Radial Backlight Glow */}
      <motion.div
        style={{ x: auraX, y: auraY }}
        className="absolute w-72 sm:w-96 h-72 sm:h-96 rounded-full bg-gradient-to-tr from-[#00D9FF]/25 via-[#0066FF]/20 to-transparent blur-3xl pointer-events-none"
      />

      {/* 2. Holographic Ground Projection Ring Plate */}
      <div className="absolute bottom-4 sm:bottom-8 w-64 sm:w-84 h-16 rounded-[100%] border border-[#00D9FF]/35 bg-[#00D9FF]/5 backdrop-blur-sm pointer-events-none flex items-center justify-center shadow-[0_0_35px_rgba(0,217,255,0.3)]">
        {/* Inner rotating concentric ring */}
        <div className="w-52 sm:w-68 h-12 rounded-[100%] border border-dashed border-[#00D9FF]/45 animate-[spin_24s_linear_infinite]" />
        {/* Core glow light beam */}
        <div className="absolute inset-x-8 top-0 h-0.5 bg-gradient-to-r from-transparent via-[#00D9FF] to-transparent shadow-[0_0_15px_#00D9FF]" />
      </div>

      {/* 3. The 3D Cursor-Sensitive Bear Canvas */}
      <motion.div
        style={{
          rotateX,
          rotateY,
          x: translateX,
          y: translateY,
          transformStyle: "preserve-3d",
        }}
        animate={{
          scale: isBouncing ? [1, 1.16, 0.94, 1.06, 1] : isHovered ? 1.05 : 1,
        }}
        transition={{
          duration: isBouncing ? 0.65 : 0.25,
          ease: "easeOut",
        }}
        className="relative z-10 flex flex-col items-center justify-center filter drop-shadow-[0_20px_45px_rgba(0,0,0,0.85)]"
      >
        {/* Animated Cyber Badge */}
        <div className="absolute -top-3 -right-2 z-20 flex items-center gap-1 px-2.5 py-1 rounded-full bg-[#0a0a14]/90 border border-[#00D9FF]/45 shadow-[0_0_15px_rgba(0,217,255,0.4)] backdrop-blur-md">
          <Sparkles size={12} className="text-[#00D9FF] animate-pulse" />
          <span className="text-[10px] font-mono font-bold text-[#00D9FF] tracking-wider">
            3D COMPANION
          </span>
        </div>

        {/* Floating Interactive Speech Bubble */}
        <AnimatePresence>
          {showSpeech && (
            <motion.div
              initial={{ opacity: 0, y: 12, scale: 0.8 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -10, scale: 0.85 }}
              transition={{ type: "spring", damping: 20, stiffness: 300 }}
              className="absolute -top-14 sm:-top-16 left-1/2 -translate-x-1/2 z-30 px-4 py-2 rounded-2xl bg-[#0a0a14]/95 border border-[#00D9FF]/60 shadow-[0_0_30px_rgba(0,217,255,0.5)] backdrop-blur-xl whitespace-nowrap pointer-events-none"
            >
              <div className="flex items-center gap-2">
                <Heart size={13} className="text-[#00D9FF] fill-[#00D9FF]/30" />
                <span className="text-xs font-mono font-bold text-[#F2F4F8] tracking-tight">
                  {speechText}
                </span>
              </div>
              {/* Little speech tail pointing down */}
              <div className="absolute -bottom-1.5 left-1/2 -translate-x-1/2 w-3 h-3 bg-[#0a0a14] border-r border-b border-[#00D9FF]/60 rotate-45" />
            </motion.div>
          )}
        </AnimatePresence>

        {/* Continuous organic breathing & floating motion */}
        <motion.div
          animate={{
            y: [-5, 7, -5],
            rotateZ: [-1, 1.2, -1],
          }}
          transition={{
            duration: 4.8,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="relative w-[260px] sm:w-[320px] lg:w-[370px] aspect-[534/575]"
        >
          {/* Bear Image with subtle reactive cyber glow */}
          <Image
            src="/bear-3d.png"
            alt="3D Animated Bear Companion"
            width={534}
            height={575}
            priority
            className="w-full h-full object-contain pointer-events-none select-none transition-all duration-300 drop-shadow-[0_0_25px_rgba(0,217,255,0.3)]"
          />

          {/* Floating Energy Aura Orbit */}
          <motion.div
            animate={{
              rotate: 360,
            }}
            transition={{
              duration: 12,
              repeat: Infinity,
              ease: "linear",
            }}
            className="absolute inset-0 pointer-events-none"
          >
            <div className="absolute top-2 right-4 w-2 h-2 rounded-full bg-[#00D9FF] shadow-[0_0_10px_#00D9FF]" />
            <div className="absolute bottom-8 left-4 w-1.5 h-1.5 rounded-full bg-[#0066FF] shadow-[0_0_8px_#0066FF]" />
          </motion.div>
        </motion.div>
      </motion.div>

      {/* 4. Interactive HUD Telemetry Badge at Bottom */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#0a0a12]/90 border border-[#00D9FF]/30 text-[10px] font-mono text-[#00D9FF] tracking-wider pointer-events-none backdrop-blur-md whitespace-nowrap shadow-[0_0_20px_rgba(0,0,0,0.8)] z-20">
        <span className="w-1.5 h-1.5 rounded-full bg-[#00D9FF] animate-ping" />
        <span>
          {isMobile
            ? "3D BEAR TRACKING ACTIVE // TAP TO BOOP"
            : "CURSOR TRACKING ACTIVE // CLICK TO BOOP"}
        </span>
      </div>
    </div>
  );
}
