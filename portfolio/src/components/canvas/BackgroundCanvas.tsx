"use client";

import React, { useRef, useMemo, useEffect } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";

// Field of drifting sci-fi particles
function ParticleField({ count = 2000 }: { count?: number }) {
  const pointsRef = useRef<THREE.Points>(null!);

  const [positions, colors] = useMemo(() => {
    const pos = new Float32Array(count * 3);
    const col = new Float32Array(count * 3);
    const cyan = new THREE.Color("#00D9FF");
    const deepBlue = new THREE.Color("#0044CC");
    const mixed = new THREE.Color();

    for (let i = 0; i < count; i++) {
      // Cylindrical/spherical spread
      const radius = 8 + Math.random() * 22;
      const theta = Math.random() * Math.PI * 2;
      const y = (Math.random() - 0.5) * 36;

      pos[i * 3] = radius * Math.cos(theta);
      pos[i * 3 + 1] = y;
      pos[i * 3 + 2] = radius * Math.sin(theta) - 5;

      // Color variation between cyan and deep blue
      const ratio = Math.random();
      mixed.copy(cyan).lerp(deepBlue, ratio);
      col[i * 3] = mixed.r;
      col[i * 3 + 1] = mixed.g;
      col[i * 3 + 2] = mixed.b;
    }
    return [pos, col];
  }, [count]);

  useFrame((state, delta) => {
    if (pointsRef.current) {
      pointsRef.current.rotation.y += delta * 0.025;
      pointsRef.current.rotation.x += delta * 0.008;
    }
  });

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          args={[positions, 3]}
        />
        <bufferAttribute
          attach="attributes-color"
          args={[colors, 3]}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.065}
        vertexColors
        transparent
        opacity={0.55}
        blending={THREE.AdditiveBlending}
        depthWrite={false}
      />
    </points>
  );
}

// Floating abstract geometric shapes
function FloatingObjects() {
  const icoRef = useRef<THREE.Mesh>(null!);
  const torusRef = useRef<THREE.Mesh>(null!);
  const sphereRef = useRef<THREE.Mesh>(null!);

  useFrame((state) => {
    const t = state.clock.getElapsedTime();

    // 1. Icosahedron bobbing and rotating
    if (icoRef.current) {
      icoRef.current.rotation.x = t * 0.12;
      icoRef.current.rotation.y = t * 0.16;
      icoRef.current.position.y = 2.2 + Math.sin(t * 0.7) * 0.35;
      icoRef.current.position.x = -4.2 + Math.cos(t * 0.5) * 0.2;
    }

    // 2. Torus knot twisting and bobbing
    if (torusRef.current) {
      torusRef.current.rotation.x = t * 0.14;
      torusRef.current.rotation.y = -t * 0.2;
      torusRef.current.position.y = -2.5 + Math.sin(t * 0.6 + 1.5) * 0.4;
      torusRef.current.position.x = 4.5 + Math.cos(t * 0.45) * 0.25;
    }

    // 3. Geodesic Sphere
    if (sphereRef.current) {
      sphereRef.current.rotation.y = t * 0.09;
      sphereRef.current.rotation.z = t * 0.05;
      sphereRef.current.position.y = -5.5 + Math.sin(t * 0.5 + 3) * 0.3;
    }
  });

  return (
    <group>
      {/* Floating Wireframe Icosahedron (Top-Left) */}
      <mesh ref={icoRef} position={[-4.2, 2.2, -6]}>
        <icosahedronGeometry args={[1.5, 0]} />
        <meshStandardMaterial
          wireframe
          color="#00D9FF"
          emissive="#00D9FF"
          emissiveIntensity={0.25}
          transparent
          opacity={0.35}
        />
      </mesh>

      {/* Floating Wireframe Torus Knot (Mid-Right) */}
      <mesh ref={torusRef} position={[4.5, -2.5, -7]}>
        <torusKnotGeometry args={[1.2, 0.32, 64, 16]} />
        <meshStandardMaterial
          wireframe
          color="#0066FF"
          emissive="#0066FF"
          emissiveIntensity={0.3}
          transparent
          opacity={0.3}
        />
      </mesh>

      {/* Floating Low-Poly Sphere (Lower-Center) */}
      <mesh ref={sphereRef} position={[0.5, -5.5, -8]}>
        <octahedronGeometry args={[2.0, 2]} />
        <meshStandardMaterial
          wireframe
          color="#00D9FF"
          emissive="#0044CC"
          emissiveIntensity={0.2}
          transparent
          opacity={0.22}
        />
      </mesh>
    </group>
  );
}

// Camera controller reacting gently to scroll
function ScrollController() {
  const scrollYRef = useRef(0);

  useEffect(() => {
    const handleScroll = () => {
      scrollYRef.current = window.scrollY;
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useFrame((state) => {
    // Smooth camera pan based on scroll percentage
    const maxScroll = Math.max(
      1,
      typeof document !== "undefined"
        ? document.documentElement.scrollHeight - window.innerHeight
        : 1000
    );
    const scrollProgress = Math.min(1, Math.max(0, scrollYRef.current / maxScroll));

    // Target camera positions
    const targetY = -scrollProgress * 6;
    const targetRotX = scrollProgress * 0.15;
    const targetRotY = scrollProgress * 0.2;

    // Smooth damping
    state.camera.position.y = THREE.MathUtils.lerp(state.camera.position.y, targetY, 0.05);
    state.camera.rotation.x = THREE.MathUtils.lerp(state.camera.rotation.x, targetRotX, 0.05);
    state.camera.rotation.y = THREE.MathUtils.lerp(state.camera.rotation.y, targetRotY, 0.05);
  });

  return null;
}

export default function BackgroundCanvas() {
  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden bg-[#050508]">
      {/* Background Gradient Orbs for extra depth and atmosphere */}
      <div className="absolute top-1/4 -left-48 w-96 h-96 bg-[#0066FF]/10 rounded-full blur-[130px]" />
      <div className="absolute top-3/4 -right-48 w-96 h-96 bg-[#00D9FF]/8 rounded-full blur-[140px]" />
      <div className="absolute top-1/2 left-1/3 w-[500px] h-[500px] bg-[#003399]/6 rounded-full blur-[160px]" />

      <Canvas
        camera={{ position: [0, 0, 7], fov: 60 }}
        dpr={[1, 1.5]}
        gl={{
          antialias: true,
          powerPreference: "high-performance",
          alpha: true,
        }}
      >
        <ambientLight intensity={0.4} />
        <pointLight position={[10, 10, 10]} intensity={1.2} color="#00D9FF" />
        <pointLight position={[-10, -10, -5]} intensity={0.8} color="#0066FF" />

        <ScrollController />
        <ParticleField count={2200} />
        <FloatingObjects />
      </Canvas>

      {/* Subtle vignette overlay to keep edges dark and text readable */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse at center, transparent 40%, rgba(5,5,8,0.7) 85%, #050508 100%)",
        }}
      />
    </div>
  );
}
