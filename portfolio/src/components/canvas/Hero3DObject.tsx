"use client";

import React, { useRef, useState, useEffect, useCallback } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";
import confetti from "canvas-confetti";
import { soundFx } from "@/utils/audio";

function InteractiveCrystal({
  onInteraction,
}: {
  onInteraction?: () => void;
}) {
  const meshRef = useRef<THREE.Group>(null!);
  const innerRef = useRef<THREE.Mesh>(null!);
  const ringRef = useRef<THREE.Mesh>(null!);
  const shockwaveRef = useRef<THREE.Mesh>(null!);

  const [hovered, setHovered] = useState(false);
  const [pulseTime, setPulseTime] = useState<number | null>(null);

  // Normalized coordinates [-1, 1]
  const targetRot = useRef({ x: 0, y: 0 });
  const touchTracking = useRef(false);

  useEffect(() => {
    // 1. Mouse movement (Desktop)
    const handleMouseMove = (e: MouseEvent) => {
      const x = (e.clientX / window.innerWidth) * 2 - 1;
      const y = -(e.clientY / window.innerHeight) * 2 + 1;
      targetRot.current.x = y * 0.75;
      targetRot.current.y = x * 0.75;
    };

    // 2. Touch movement (Mobile / Tablet)
    const handleTouchMove = (e: TouchEvent) => {
      if (e.touches.length > 0) {
        touchTracking.current = true;
        const touch = e.touches[0];
        const x = (touch.clientX / window.innerWidth) * 2 - 1;
        const y = -(touch.clientY / window.innerHeight) * 2 + 1;
        targetRot.current.x = y * 0.85;
        targetRot.current.y = x * 0.85;
      }
    };

    // 3. Device Orientation / Gyroscope (Mobile tilt)
    const handleOrientation = (e: DeviceOrientationEvent) => {
      if (e.gamma !== null && e.beta !== null) {
        // gamma: left-to-right tilt in [-90, 90]
        // beta: front-to-back tilt in [-180, 180]
        const tiltX = THREE.MathUtils.clamp(e.beta - 45, -35, 35) / 35;
        const tiltY = THREE.MathUtils.clamp(e.gamma, -35, 35) / 35;
        targetRot.current.x = tiltX * 0.6;
        targetRot.current.y = tiltY * 0.6;
      }
    };

    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    window.addEventListener("touchmove", handleTouchMove, { passive: true });

    if (typeof window !== "undefined" && "DeviceOrientationEvent" in window) {
      window.addEventListener("deviceorientation", handleOrientation, { passive: true });
    }

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("touchmove", handleTouchMove);
      if (typeof window !== "undefined" && "DeviceOrientationEvent" in window) {
        window.removeEventListener("deviceorientation", handleOrientation);
      }
    };
  }, []);

  const triggerPulse = useCallback((originX?: number, originY?: number) => {
    setPulseTime(performance.now());
    soundFx.playPulse();
    if (onInteraction) onInteraction();

    const x = originX !== undefined ? originX / window.innerWidth : 0.5;
    const y = originY !== undefined ? originY / window.innerHeight : 0.45;

    // Trigger electric-cyan cybernetic burst
    confetti({
      particleCount: 32,
      spread: 70,
      origin: { x, y },
      colors: ["#00D9FF", "#0066FF", "#FFFFFF"],
      ticks: 120,
      gravity: 0.8,
      scalar: 0.75,
      shapes: ["circle", "square"],
    });
  }, [onInteraction]);

  useFrame((state) => {
    const t = state.clock.getElapsedTime();

    if (meshRef.current) {
      // Smooth lerp tracking to mouse / touch / tilt orientation with breathing wave
      const targetX = targetRot.current.x + Math.sin(t * 0.8) * 0.1;
      const targetY = targetRot.current.y + Math.cos(t * 0.6) * 0.12 + t * 0.15;

      meshRef.current.rotation.x = THREE.MathUtils.lerp(
        meshRef.current.rotation.x,
        targetX,
        0.08
      );
      meshRef.current.rotation.y = THREE.MathUtils.lerp(
        meshRef.current.rotation.y,
        targetY,
        0.08
      );

      // Base scale with hover/touch expansion and damped pulse rebound
      let scale = hovered ? 1.18 : 1.0;

      if (pulseTime) {
        const elapsed = (performance.now() - pulseTime) / 1000;
        if (elapsed < 0.6) {
          const pulse = Math.sin(elapsed * Math.PI * 4) * Math.exp(-elapsed * 5) * 0.35;
          scale += pulse;
        }
      }

      meshRef.current.scale.lerp(new THREE.Vector3(scale, scale, scale), 0.12);
    }

    // Inner core counter-rotation
    if (innerRef.current) {
      innerRef.current.rotation.x = -t * 0.4;
      innerRef.current.rotation.z = t * 0.5;
    }

    // Orbital ring rotation
    if (ringRef.current) {
      ringRef.current.rotation.z = t * 0.3;
      ringRef.current.rotation.x = Math.PI / 3 + Math.sin(t * 0.5) * 0.2;
    }

    // Expanding shockwave pulse ring
    if (shockwaveRef.current && pulseTime) {
      const elapsed = (performance.now() - pulseTime) / 1000;
      if (elapsed < 0.8) {
        const swScale = 1.0 + elapsed * 3.5;
        shockwaveRef.current.scale.set(swScale, swScale, swScale);
        (shockwaveRef.current.material as THREE.MeshBasicMaterial).opacity =
          Math.max(0, 1 - elapsed / 0.8) * 0.8;
        shockwaveRef.current.visible = true;
      } else {
        shockwaveRef.current.visible = false;
      }
    }
  });

  return (
    <group
      ref={meshRef}
      onPointerOver={() => setHovered(true)}
      onPointerOut={() => setHovered(false)}
      onClick={(e) => {
        e.stopPropagation();
        triggerPulse(e.clientX, e.clientY);
      }}
      onPointerDown={(e) => {
        // Immediate touch responsiveness
        triggerPulse(e.clientX, e.clientY);
      }}
    >
      {/* Outer Glow Icosahedron (Electric Cyan) */}
      <mesh>
        <icosahedronGeometry args={[1.7, 0]} />
        <meshStandardMaterial
          wireframe
          color="#00D9FF"
          emissive="#00D9FF"
          emissiveIntensity={hovered ? 0.95 : 0.5}
          roughness={0.2}
          metalness={0.9}
        />
      </mesh>

      {/* Vertex Highlight Spheres */}
      <mesh>
        <icosahedronGeometry args={[1.72, 0]} />
        <pointsMaterial
          size={0.12}
          color="#FFFFFF"
          blending={THREE.AdditiveBlending}
        />
      </mesh>

      {/* Inner Geodesic Core (Deep Blue) */}
      <mesh ref={innerRef}>
        <octahedronGeometry args={[0.95, 0]} />
        <meshStandardMaterial
          wireframe
          color="#0066FF"
          emissive="#0066FF"
          emissiveIntensity={hovered ? 1.0 : 0.65}
          roughness={0.3}
          metalness={0.8}
        />
      </mesh>

      {/* Dense Center Core */}
      <mesh>
        <sphereGeometry args={[0.35, 16, 16]} />
        <meshBasicMaterial color="#00D9FF" />
      </mesh>

      {/* Surrounding Orbital Ring */}
      <mesh ref={ringRef}>
        <ringGeometry args={[2.2, 2.25, 64]} />
        <meshBasicMaterial
          color="#00D9FF"
          side={THREE.DoubleSide}
          transparent
          opacity={hovered ? 0.65 : 0.35}
        />
      </mesh>

      {/* Pulsing Shockwave Ring */}
      <mesh ref={shockwaveRef} visible={false}>
        <ringGeometry args={[1.8, 1.88, 48]} />
        <meshBasicMaterial
          color="#00D9FF"
          side={THREE.DoubleSide}
          transparent
          opacity={0.8}
          blending={THREE.AdditiveBlending}
        />
      </mesh>
    </group>
  );
}

export default function Hero3DObject() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isMobileDevice, setIsMobileDevice] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobileDevice(
        window.innerWidth < 768 || window.matchMedia("(pointer: coarse)").matches
      );
    };
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  const handleContainerClick = (e: React.MouseEvent) => {
    // Also trigger if clicked outside the exact 3D wireframe mesh
    const rect = containerRef.current?.getBoundingClientRect();
    if (!rect) return;
    const clientX = e.clientX;
    const clientY = e.clientY;

    confetti({
      particleCount: 24,
      spread: 60,
      origin: {
        x: clientX / window.innerWidth,
        y: clientY / window.innerHeight,
      },
      colors: ["#00D9FF", "#0066FF", "#FFFFFF"],
      ticks: 100,
      gravity: 0.8,
      scalar: 0.7,
    });
    soundFx.playPulse();
  };

  return (
    <div
      ref={containerRef}
      onClick={handleContainerClick}
      className="relative w-full h-[320px] sm:h-[420px] lg:h-[520px] flex items-center justify-center cursor-pointer select-none touch-pan-y"
      data-cursor="click"
      data-cursor-text="PULSE"
    >
      {/* Radial backlight glow */}
      <div className="absolute inset-0 bg-radial-glow pointer-events-none" />
      <div className="absolute w-48 sm:w-64 h-48 sm:h-64 rounded-full bg-[#00D9FF]/15 blur-3xl pointer-events-none animate-pulse-glow" />

      {/* Three.js Canvas */}
      <Canvas
        camera={{ position: [0, 0, 5.2], fov: 45 }}
        dpr={[1, 1.5]}
        gl={{
          antialias: true,
          alpha: true,
          powerPreference: "high-performance",
        }}
        style={{ touchAction: "pan-y" }}
      >
        <ambientLight intensity={0.5} />
        <pointLight position={[5, 5, 5]} intensity={2.0} color="#00D9FF" />
        <pointLight position={[-5, -5, -3]} intensity={1.2} color="#0066FF" />
        <pointLight position={[0, 0, 4]} intensity={0.8} color="#FFFFFF" />

        <InteractiveCrystal />
      </Canvas>

      {/* Interactive HUD hint badge — adaptive mobile & desktop text */}
      <div className="absolute bottom-2 left-1/2 -translate-x-1/2 flex items-center gap-2 px-3 py-1 rounded-full bg-[#0a0a12]/85 border border-[#00D9FF]/25 text-[10px] font-mono text-[#00D9FF] tracking-wider pointer-events-none backdrop-blur-md whitespace-nowrap shadow-[0_0_15px_rgba(0,0,0,0.6)]">
        <span className="w-1.5 h-1.5 rounded-full bg-[#00D9FF] animate-ping" />
        <span>
          {isMobileDevice
            ? "TOUCH / TILT ACTIVE // TAP TO PULSE"
            : "CURSOR TRACKING ACTIVE // CLICK TO PULSE"}
        </span>
      </div>
    </div>
  );
}
