"use client";

import React, { useEffect, useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";
import { soundFx } from "@/utils/audio";

interface CursorState {
  isHovered: boolean;
  text: string;
  variant: "default" | "hover" | "view" | "drag" | "project";
}

export default function CustomCursor() {
  const [mounted, setMounted] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [isClicking, setIsClicking] = useState(false);
  const [cursorState, setCursorState] = useState<CursorState>({
    isHovered: false,
    text: "",
    variant: "default",
  });

  const mouseX = useMotionValue(-100);
  const mouseY = useMotionValue(-100);

  // Smooth spring physics for trailing ring
  const springConfig = { damping: 25, stiffness: 250, mass: 0.5 };
  const smoothX = useSpring(mouseX, springConfig);
  const smoothY = useSpring(mouseY, springConfig);

  useEffect(() => {
    // Check if pointer device supports fine movement
    if (window.matchMedia("(pointer: coarse)").matches) {
      return;
    }

    setMounted(true);
    document.body.classList.add("custom-cursor-active");

    const handleMouseMove = (e: MouseEvent) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
      if (!isVisible) setIsVisible(true);
    };

    const handleMouseEnter = () => setIsVisible(true);
    const handleMouseLeave = () => setIsVisible(false);

    const handleMouseDown = () => {
      setIsClicking(true);
      soundFx.playClick();
    };

    const handleMouseUp = () => {
      setIsClicking(false);
    };

    // Global listener for interactive hover targets
    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement | null;
      if (!target) return;

      const interactiveEl = target.closest(
        "button, a, input, textarea, select, [role='button'], [data-cursor]"
      ) as HTMLElement | null;

      if (interactiveEl) {
        soundFx.playHover();
        const customText = interactiveEl.getAttribute("data-cursor-text") || "";
        const customVariant = (interactiveEl.getAttribute("data-cursor") as CursorState["variant"]) || "hover";

        setCursorState({
          isHovered: true,
          text: customText,
          variant: customVariant,
        });
      } else {
        setCursorState({
          isHovered: false,
          text: "",
          variant: "default",
        });
      }
    };

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mouseenter", handleMouseEnter);
    window.addEventListener("mouseleave", handleMouseLeave);
    window.addEventListener("mousedown", handleMouseDown);
    window.addEventListener("mouseup", handleMouseUp);
    document.addEventListener("mouseover", handleMouseOver);

    return () => {
      document.body.classList.remove("custom-cursor-active");
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseenter", handleMouseEnter);
      window.removeEventListener("mouseleave", handleMouseLeave);
      window.removeEventListener("mousedown", handleMouseDown);
      window.removeEventListener("mouseup", handleMouseUp);
      document.removeEventListener("mouseover", handleMouseOver);
    };
  }, [mouseX, mouseY, isVisible]);

  if (!mounted || !isVisible) return null;

  return (
    <div className="pointer-events-none fixed inset-0 z-9999 overflow-hidden">
      {/* Small Glowing Center Dot (instant 1:1 position) */}
      <motion.div
        className="fixed top-0 left-0 w-2.5 h-2.5 rounded-full bg-[#00D9FF] shadow-[0_0_10px_#00D9FF,0_0_20px_#00D9FF]"
        style={{
          x: mouseX,
          y: mouseY,
          translateX: "-50%",
          translateY: "-50%",
        }}
        animate={{
          scale: isClicking ? 0.6 : cursorState.isHovered ? 0 : 1,
          opacity: cursorState.isHovered ? 0 : 1,
        }}
        transition={{ duration: 0.15 }}
      />

      {/* Trailing Eased Ring */}
      <motion.div
        className="fixed top-0 left-0 rounded-full flex items-center justify-center font-mono text-[9px] font-bold tracking-widest uppercase"
        style={{
          x: smoothX,
          y: smoothY,
          translateX: "-50%",
          translateY: "-50%",
        }}
        animate={{
          width: cursorState.isHovered
            ? cursorState.text
              ? 76
              : 50
            : isClicking
            ? 28
            : 36,
          height: cursorState.isHovered
            ? cursorState.text
              ? 76
              : 50
            : isClicking
            ? 28
            : 36,
          backgroundColor: cursorState.isHovered
            ? "rgba(0, 217, 255, 0.18)"
            : "rgba(0, 217, 255, 0.03)",
          borderColor: cursorState.isHovered
            ? "rgba(0, 217, 255, 0.9)"
            : "rgba(0, 217, 255, 0.35)",
          borderWidth: cursorState.isHovered ? "1.5px" : "1px",
          backdropFilter: cursorState.isHovered ? "blur(4px)" : "blur(0px)",
          boxShadow: cursorState.isHovered
            ? "0 0 20px rgba(0, 217, 255, 0.5), inset 0 0 10px rgba(0, 217, 255, 0.2)"
            : "0 0 10px rgba(0, 217, 255, 0.15)",
          scale: isClicking ? 0.9 : 1,
        }}
        transition={{
          type: "spring",
          stiffness: 300,
          damping: 24,
        }}
      >
        {cursorState.text && (
          <motion.span
            initial={{ opacity: 0, scale: 0.6 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.6 }}
            className="text-[#00D9FF] drop-shadow-[0_0_8px_#00D9FF] text-center select-none"
          >
            {cursorState.text}
          </motion.span>
        )}
      </motion.div>

      {/* Click ripple shockwave ring */}
      {isClicking && (
        <motion.div
          initial={{ scale: 0.8, opacity: 1 }}
          animate={{ scale: 2.2, opacity: 0 }}
          transition={{ duration: 0.4, ease: "easeOut" }}
          className="fixed top-0 left-0 w-10 h-10 -ml-5 -mt-5 rounded-full border border-[#00D9FF] shadow-[0_0_15px_#00D9FF]"
          style={{
            x: mouseX,
            y: mouseY,
          }}
        />
      )}
    </div>
  );
}
