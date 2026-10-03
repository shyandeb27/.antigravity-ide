"use client";

import React, { useEffect, useState, useRef } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";
import { soundFx } from "@/utils/audio";

interface CursorState {
  isHovered: boolean;
  text: string;
  variant: "default" | "hover" | "view" | "drag" | "project";
}

interface TouchRipple {
  id: number;
  x: number;
  y: number;
}

export default function CustomCursor() {
  const [mounted, setMounted] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [isClicking, setIsClicking] = useState(false);
  const [isTouching, setIsTouching] = useState(false);
  const [touchRipples, setTouchRipples] = useState<TouchRipple[]>([]);
  const rippleIdRef = useRef(0);

  const [cursorState, setCursorState] = useState<CursorState>({
    isHovered: false,
    text: "",
    variant: "default",
  });

  const mouseX = useMotionValue(-100);
  const mouseY = useMotionValue(-100);

  // Smooth spring physics for trailing ring
  const springConfig = { damping: 24, stiffness: 280, mass: 0.45 };
  const smoothX = useSpring(mouseX, springConfig);
  const smoothY = useSpring(mouseY, springConfig);

  useEffect(() => {
    setMounted(true);

    const updateInteractiveTarget = (clientX: number, clientY: number) => {
      const element = document.elementFromPoint(clientX, clientY) as HTMLElement | null;
      if (!element) return;

      const interactiveEl = element.closest(
        "button, a, input, textarea, select, [role='button'], [data-cursor]"
      ) as HTMLElement | null;

      if (interactiveEl) {
        const customText = interactiveEl.getAttribute("data-cursor-text") || "";
        const customVariant =
          (interactiveEl.getAttribute("data-cursor") as CursorState["variant"]) || "hover";

        setCursorState((prev) => {
          if (!prev.isHovered || prev.text !== customText) {
            soundFx.playHover();
          }
          return {
            isHovered: true,
            text: customText,
            variant: customVariant,
          };
        });
      } else {
        setCursorState({
          isHovered: false,
          text: "",
          variant: "default",
        });
      }
    };

    // --- Mouse & Pointer Events (Desktop / Fine Pointer) ---
    const handleMouseMove = (e: MouseEvent) => {
      // Activate desktop custom cursor styles
      if (!document.body.classList.contains("custom-cursor-active")) {
        document.body.classList.add("custom-cursor-active");
      }
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
      if (!isVisible) setIsVisible(true);
      updateInteractiveTarget(e.clientX, e.clientY);
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

    // --- Touch Events (Mobile / Coarse Pointer) ---
    const handleTouchStart = (e: TouchEvent) => {
      if (e.touches.length === 0) return;
      const touch = e.touches[0];
      mouseX.set(touch.clientX);
      mouseY.set(touch.clientY);
      setIsTouching(true);
      setIsVisible(true);

      // Create a cybernetic ripple at touch point
      const newRipple: TouchRipple = {
        id: rippleIdRef.current++,
        x: touch.clientX,
        y: touch.clientY,
      };
      setTouchRipples((prev) => [...prev.slice(-3), newRipple]);

      // Sound feedback on mobile tap
      soundFx.playClick();
      updateInteractiveTarget(touch.clientX, touch.clientY);
    };

    const handleTouchMove = (e: TouchEvent) => {
      if (e.touches.length === 0) return;
      const touch = e.touches[0];
      mouseX.set(touch.clientX);
      mouseY.set(touch.clientY);
      setIsTouching(true);
      setIsVisible(true);
      updateInteractiveTarget(touch.clientX, touch.clientY);
    };

    const handleTouchEnd = () => {
      setIsTouching(false);
      // Fade out cursor ring slightly after finger lifts
      setTimeout(() => {
        setIsVisible(false);
        setCursorState({
          isHovered: false,
          text: "",
          variant: "default",
        });
      }, 350);
    };

    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    window.addEventListener("mouseenter", handleMouseEnter);
    window.addEventListener("mouseleave", handleMouseLeave);
    window.addEventListener("mousedown", handleMouseDown);
    window.addEventListener("mouseup", handleMouseUp);

    // Touch listeners
    window.addEventListener("touchstart", handleTouchStart, { passive: true });
    window.addEventListener("touchmove", handleTouchMove, { passive: true });
    window.addEventListener("touchend", handleTouchEnd, { passive: true });
    window.addEventListener("touchcancel", handleTouchEnd, { passive: true });

    return () => {
      document.body.classList.remove("custom-cursor-active");
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseenter", handleMouseEnter);
      window.removeEventListener("mouseleave", handleMouseLeave);
      window.removeEventListener("mousedown", handleMouseDown);
      window.removeEventListener("mouseup", handleMouseUp);

      window.removeEventListener("touchstart", handleTouchStart);
      window.removeEventListener("touchmove", handleTouchMove);
      window.removeEventListener("touchend", handleTouchEnd);
      window.removeEventListener("touchcancel", handleTouchEnd);
    };
  }, [mouseX, mouseY, isVisible]);

  if (!mounted || !isVisible) return null;

  return (
    <div className="pointer-events-none fixed inset-0 z-[9999] overflow-hidden select-none">
      {/* 1. Small Glowing Center Dot (instant 1:1 position) */}
      <motion.div
        className="fixed top-0 left-0 w-2.5 h-2.5 rounded-full bg-[#00D9FF] shadow-[0_0_10px_#00D9FF,0_0_20px_#00D9FF]"
        style={{
          x: mouseX,
          y: mouseY,
          translateX: "-50%",
          translateY: "-50%",
        }}
        animate={{
          scale: isClicking || isTouching ? 0.7 : cursorState.isHovered ? 0 : 1,
          opacity: cursorState.isHovered ? 0 : 1,
        }}
        transition={{ duration: 0.12 }}
      />

      {/* 2. Trailing Eased Cybernetic Ring */}
      <motion.div
        className="fixed top-0 left-0 rounded-full flex items-center justify-center font-mono text-[9px] font-bold tracking-widest uppercase transition-colors"
        style={{
          x: smoothX,
          y: smoothY,
          translateX: "-50%",
          translateY: "-50%",
        }}
        animate={{
          width: cursorState.isHovered
            ? cursorState.text
              ? 80
              : 52
            : isTouching
            ? 44
            : isClicking
            ? 28
            : 36,
          height: cursorState.isHovered
            ? cursorState.text
              ? 80
              : 52
            : isTouching
            ? 44
            : isClicking
            ? 28
            : 36,
          backgroundColor: cursorState.isHovered
            ? "rgba(0, 217, 255, 0.2)"
            : isTouching
            ? "rgba(0, 217, 255, 0.12)"
            : "rgba(0, 217, 255, 0.03)",
          borderColor: cursorState.isHovered
            ? "rgba(0, 217, 255, 0.95)"
            : isTouching
            ? "rgba(0, 217, 255, 0.75)"
            : "rgba(0, 217, 255, 0.4)",
          borderWidth: cursorState.isHovered ? "1.5px" : "1px",
          backdropFilter: cursorState.isHovered || isTouching ? "blur(4px)" : "blur(0px)",
          boxShadow: cursorState.isHovered
            ? "0 0 25px rgba(0, 217, 255, 0.6), inset 0 0 10px rgba(0, 217, 255, 0.25)"
            : isTouching
            ? "0 0 20px rgba(0, 217, 255, 0.45), inset 0 0 8px rgba(0, 217, 255, 0.2)"
            : "0 0 10px rgba(0, 217, 255, 0.15)",
          scale: isClicking ? 0.9 : 1,
        }}
        transition={{
          type: "spring",
          stiffness: 320,
          damping: 24,
        }}
      >
        {/* Floating crosshair corner accents when touching or hovering */}
        {(isTouching || cursorState.isHovered) && (
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
            <span className="absolute -top-1 w-2 h-0.5 bg-[#00D9FF]" />
            <span className="absolute -bottom-1 w-2 h-0.5 bg-[#00D9FF]" />
            <span className="absolute -left-1 h-2 w-0.5 bg-[#00D9FF]" />
            <span className="absolute -right-1 h-2 w-0.5 bg-[#00D9FF]" />
          </div>
        )}

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

      {/* 3. Mouse Click Ripple Shockwave */}
      {isClicking && (
        <motion.div
          initial={{ scale: 0.8, opacity: 1 }}
          animate={{ scale: 2.4, opacity: 0 }}
          transition={{ duration: 0.4, ease: "easeOut" }}
          className="fixed top-0 left-0 w-10 h-10 -ml-5 -mt-5 rounded-full border border-[#00D9FF] shadow-[0_0_20px_#00D9FF]"
          style={{
            x: mouseX,
            y: mouseY,
          }}
        />
      )}

      {/* 4. Mobile Touch Dynamic Shockwave Ripples */}
      {touchRipples.map((ripple) => (
        <motion.div
          key={ripple.id}
          initial={{ scale: 0.4, opacity: 0.9 }}
          animate={{ scale: 2.8, opacity: 0 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="fixed top-0 left-0 w-12 h-12 -ml-6 -mt-6 rounded-full border-2 border-[#00D9FF] shadow-[0_0_20px_#00D9FF,inset_0_0_10px_#00D9FF]"
          style={{
            left: ripple.x,
            top: ripple.y,
          }}
        />
      ))}
    </div>
  );
}
