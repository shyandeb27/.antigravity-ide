"use client";

import React, { useRef, useState, useEffect } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";
import confetti from "canvas-confetti";
import { soundFx } from "@/utils/audio";

function InteractiveCrystal() {
  const meshRef = useRef<THREE.Group>(null!);
  const innerRef = useRef<THREE.Mesh>(null!);
  const ringRef = useRef<THREE.Mesh>(null!);
  const shockwaveRef = useRef<THREE.Mesh>(null!);

  const [hovered, setHovered] = useState(false);
  const [pulseTime, setPulseTime] = useState<number | null>(null);

  // Mouse normalized coordinates [-1, 1]
  const targetRot = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const x = (e.clientX / window.innerWidth) * 2 - 1;
      const y = -(e.clientY / window.innerHeight) * 2 + 1;
      targetRot.current.x = y * 0.75;
      targetRot.current.y = x * 0.75;
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  const handleClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    setPulseTime(performance.now());
    soundFx.playPulse();

    // Trigger subtle electric-blue confetti burst
    confetti({
      particleCount: 28,
      spread: 60,
      origin: {
        x: e.clientX / window.innerWidth,
        y: e.clientY / window.innerHeight,
      },
      colors: ["#00D9FF", "#0066FF", "#FFFFFF"],
      ticks: 120,
      gravity: 0.8,
      scalar: 0.7,
      shapes: ["circle", "square"],
    });
  };

  useFrame((state) => {
    const t = state.clock.getElapsedTime();

    if (meshRef.current) {
      // Smooth lerp tracking to mouse orientation
      const targetX = targetRot.current.x + Math.sin(t * 0.8) * 0.08;
      const targetY = targetRot.current.y + t * 0.15;

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

      // Base scale with hover expansion and pulse rebound
      let scale = hovered ? 1.2 : 1.0;

      if (pulseTime) {
        const elapsed = (performance.now() - pulseTime) / 1000;
        if (elapsed < 0.6) {
          // Damped spring pulse
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
      onClick={handleClick as unknown as (e: unknown) => void}
    >
      {/* Outer Glow Icosahedron (Electric Cyan) */}
      <mesh>
        <icosahedronGeometry args={[1.7, 0]} />
        <meshStandardMaterial
          wireframe
          color="#00D9FF"
          emissive="#00D9FF"
          emissiveIntensity={hovered ? 0.9 : 0.45}
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
          emissiveIntensity={hovered ? 1.0 : 0.6}
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
          opacity={hovered ? 0.6 : 0.3}
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
  return (
    <div
      className="relative w-full h-[380px] sm:h-[460px] lg:h-[540px] flex items-center justify-center cursor-pointer select-none"
      data-cursor="click"
      data-cursor-text="PULSE"
    >
      {/* Radial backlight glow */}
      <div className="absolute inset-0 bg-radial-glow pointer-events-none" />
      <div className="absolute w-56 h-56 rounded-full bg-[#00D9FF]/12 blur-3xl pointer-events-none animate-pulse-glow" />

      {/* Canvas */}
      <Canvas
        camera={{ position: [0, 0, 5.2], fov: 45 }}
        dpr={[1, 1.5]}
        gl={{
          antialias: true,
          alpha: true,
          powerPreference: "high-performance",
        }}
      >
        <ambientLight intensity={0.5} />
        <pointLight position={[5, 5, 5]} intensity={2.0} color="#00D9FF" />
        <pointLight position={[-5, -5, -3]} intensity={1.2} color="#0066FF" />
        <pointLight position={[0, 0, 4]} intensity={0.8} color="#FFFFFF" />

        <InteractiveCrystal />
      </Canvas>

      {/* Interactive HUD hint badge */}
      <div className="absolute bottom-2 left-1/2 -translate-x-1/2 flex items-center gap-2 px-3 py-1 rounded-full bg-[#0a0a12]/80 border border-[#00D9FF]/20 text-[10px] font-mono text-[#00D9FF] tracking-wider pointer-events-none backdrop-blur-md">
        <span className="w-1.5 h-1.5 rounded-full bg-[#00D9FF] animate-ping" />
        <span>TRACKING ACTIVE // CLICK TO PULSE</span>
      </div>
    </div>
  );
}
