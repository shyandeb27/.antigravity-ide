export interface Project {
  id: string;
  title: string;
  category: "BRAND IDENTITY" | "3D & MOTION" | "SPATIAL UI / HUD" | "CONCEPT ART";
  categoryTag: string;
  client: string;
  year: string;
  shortDesc: string;
  fullDesc: string;
  deliverables: string[];
  palette: string[];
  typography: string;
  accentColor: string;
  metrics: string;
}

export const PROJECTS: Project[] = [
  {
    id: "neural-dynamics",
    title: "NEURAL DYNAMICS",
    category: "BRAND IDENTITY",
    categoryTag: "BRAND IDENTITY // GENERATIVE",
    client: "Apex AI Architecture",
    year: "2026",
    shortDesc: "Generative visual identity system for next-gen neural interface foundation, featuring kinetic dimensional monograms and algorithmic typography.",
    fullDesc: "Created a comprehensive avant-garde visual language for a pioneering neurotechnology firm. The identity utilizes mathematical harmonic grids, reactive vector nodes, and procedural 3D motion to communicate unprecedented computational power with surgical luxury.",
    deliverables: [
      "Dynamic Generative Monogram",
      "Algorithmic Brand Guidelines",
      "Custom Kinetic Display Typeface",
      "Modular Packaging & Physical Collateral",
    ],
    palette: ["#00D9FF", "#0066FF", "#050508", "#F2F4F8"],
    typography: "Space Grotesk & Syne Mono",
    accentColor: "#00D9FF",
    metrics: "+340% Global Brand Engagement",
  },
  {
    id: "chrono-voyager",
    title: "CHRONO VOYAGER",
    category: "3D & MOTION",
    categoryTag: "3D & MOTION // SCI-FI ART",
    client: "Hyperion Interactive",
    year: "2026",
    shortDesc: "Keyframe concept art and worldbuilding visual bible for a deep-space exploration odyssey with volumetric nebula lighting.",
    fullDesc: "Commissioned to build the visual tone and key architectural motifs for an AAA sci-fi space simulation. Built over 40 distinct 3D environmental sets, spacecraft exterior decals, and chromatic refraction light passes.",
    deliverables: [
      "40+ High-Resolution Keyframes",
      "Hard-Surface Decal Language",
      "Volumetric Lighting Master Files",
      "Kinetic Spatial Trailer Titles",
    ],
    palette: ["#00D9FF", "#3A0088", "#0A0A12", "#E0E7FF"],
    typography: "Monument Extended & Inter",
    accentColor: "#0066FF",
    metrics: "Featured in ArtStation Best of 2026",
  },
  {
    id: "synthetix-core",
    title: "SYNTHETIX CORE",
    category: "SPATIAL UI / HUD",
    categoryTag: "SPATIAL UI // HOLOGRAPHIC HUD",
    client: "Synthetix Robotics",
    year: "2025",
    shortDesc: "Holographic telemetry HUD and spatial interface for autonomous cybernetic exo-suit operating systems with real-time vector telemetry.",
    fullDesc: "Engineered a high-density, diegetic HUD interface architecture calibrated for ultra-low latency cognitive recognition. Features circular vector dials, dynamic wireframe health readouts, and responsive data rings.",
    deliverables: [
      "Diegetic HUD Interface System",
      "120+ Modular Vector Telemetry Assets",
      "Dynamic Hologram Color Pipeline",
      "Spatial Depth Micro-Animation Specs",
    ],
    palette: ["#00F0FF", "#0044FF", "#050508", "#FFFFFF"],
    typography: "Rajdhani & JetBrains Mono",
    accentColor: "#00D9FF",
    metrics: "Design System Adopted by 4 Robotics Labs",
  },
  {
    id: "hyperspace-2099",
    title: "HYPERSPACE 2099",
    category: "CONCEPT ART",
    categoryTag: "GENERATIVE POSTERS // CGI & PRINT",
    client: "Tokyo Digital Biennale",
    year: "2025",
    shortDesc: "3D generative poster series investigating light refraction across hyper-dimensional manifold geometry and cyber-constructivist grids.",
    fullDesc: "An exploratory exhibition poster collection fusing mathematical parametric geometry with silk-screen UV ink aesthetics. Explores the tension between digital precision and tactile luminescence.",
    deliverables: [
      "12 Archival Museum Screenprints",
      "Generative Octane CGI Artwork Renders",
      "Augmented Reality (AR) Portal Interactive",
      "Collector Exhibition Art Catalog",
    ],
    palette: ["#00D9FF", "#7000FF", "#050508", "#D8E2DC"],
    typography: "Space Grotesk & Clash Display",
    accentColor: "#00D9FF",
    metrics: "Sold Out Limited Edition Print Run",
  },
  {
    id: "aether-os",
    title: "AETHER SPATIAL OS",
    category: "SPATIAL UI / HUD",
    categoryTag: "SPATIAL DESIGN SYSTEM // UI",
    client: "Loom Spatial Reality",
    year: "2025",
    shortDesc: "Volumetric design system for visionOS and spatial computing environments with frosted refractive materials and depth hierarchy.",
    fullDesc: "Architected a next-generation UI toolkit specifically intended for floating spatial windows. Integrates realistic chromatic light dispersion, responsive eye-tracking indicators, and tactile haptic feedback sounds.",
    deliverables: [
      "Volumetric 3D Component Library",
      "Z-Depth Hierarchy Specifications",
      "Translucent Refraction Shaders",
      "Spatial Gesture Micro-Interactions",
    ],
    palette: ["#00D9FF", "#0051FF", "#0A0A12", "#F4F6FB"],
    typography: "Inter & Sora",
    accentColor: "#0066FF",
    metrics: "Awwwards Mobile / Spatial Site of the Day",
  },
  {
    id: "neo-tokyo-apparel",
    title: "NEO-TOKYO SECTOR 7",
    category: "BRAND IDENTITY",
    categoryTag: "FASHION TECHWEAR // PACKAGING",
    client: "Vanguard Apparel Group",
    year: "2024",
    shortDesc: "Matte black high-performance technical apparel visual language, vacuum-sealed holographic packaging, and cybernetic garment markings.",
    fullDesc: "Forged an unapologetically cyberpunk identity for an avant-garde Japanese techwear label. Included vacuum-sealed Mylar packaging, reflective heat-transfer glyphs, and a bilingual futuristic typographic grid.",
    deliverables: [
      "Garment Typography & Vector Badges",
      "Vacuum-Sealed Structural Packaging",
      "Lookbook & Digital Campaign Art Direction",
      "Interactive 3D Apparel Showcase",
    ],
    palette: ["#00D9FF", "#0066FF", "#050508", "#8892B0"],
    typography: "Druk Wide & Space Grotesk",
    accentColor: "#00D9FF",
    metrics: "2.4M Social Impressions at Launch",
  },
];
