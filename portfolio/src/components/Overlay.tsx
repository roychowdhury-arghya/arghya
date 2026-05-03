"use client";

import { motion, useScroll, useTransform, MotionValue } from "framer-motion";

export default function Overlay({ scrollYProgress }: { scrollYProgress?: MotionValue<number> }) {
  const { scrollYProgress: globalScroll } = useScroll();
  const progress = scrollYProgress || globalScroll;

  // Section 1: Intro (0% to 15%)
  const opacity1 = useTransform(progress, [0, 0.05, 0.15], [1, 1, 0]);
  const y1 = useTransform(progress, [0, 0.15], [0, -50]);
  const visibility1 = useTransform(progress, [0, 0.15, 0.16, 1], ["visible", "visible", "hidden", "hidden"]);

  // Section 2: About (15% to 50%)
  const opacity2 = useTransform(progress, [0.15, 0.25, 0.45, 0.5], [0, 1, 1, 0]);
  const y2 = useTransform(progress, [0.15, 0.5], [50, -50]);

  // Section 3: Skills (50% to 90%)
  const opacity3 = useTransform(progress, [0.5, 0.6, 0.85, 0.9], [0, 1, 1, 0]);
  const y3 = useTransform(progress, [0.5, 0.9], [50, -50]);

  return (
    <div className="absolute inset-0 z-10 pointer-events-none flex flex-col justify-center">
      
      {/* Section 1: Intro */}
      <motion.div style={{ opacity: opacity1, y: y1, visibility: visibility1 }} className="absolute inset-0 flex items-center justify-center text-center px-4">
        <div>
          <h1 className="text-5xl md:text-7xl font-bold tracking-tighter text-white drop-shadow-[0_4px_10px_rgba(0,0,0,0.8)]">
            Arghya Roy Chowdhury
          </h1>
          <p className="mt-4 text-lg md:text-2xl text-white font-light drop-shadow-[0_2px_8px_rgba(0,0,0,0.8)]">
            B.Tech IT Student | Web Developer | Future Cybersecurity Enthusiast
          </p>
        </div>
      </motion.div>

      {/* Section 2: About */}
      <motion.div style={{ opacity: opacity2, y: y2 }} className="absolute inset-0 flex items-center justify-start text-left px-8 md:px-[10%] lg:px-[15%]">
        <div className="max-w-xl bg-black/40 p-6 md:p-8 rounded-3xl backdrop-blur-md border border-white/10">
          <h2 className="text-3xl md:text-5xl font-bold tracking-tight text-white drop-shadow-[0_4px_10px_rgba(0,0,0,0.8)] mb-4">
            About Me
          </h2>
          <p className="text-lg md:text-xl text-white font-light drop-shadow-[0_2px_8px_rgba(0,0,0,0.8)] leading-relaxed">
            Coming from a humble background, I’ve learned to stay consistent, self-driven, and focused on growth. 
            I believe in learning by building—from creating web applications to experimenting with cybersecurity tools, I enjoy turning ideas into real projects.
          </p>
        </div>
      </motion.div>

      {/* Section 3: Skills */}
      <motion.div style={{ opacity: opacity3, y: y3 }} className="absolute inset-0 flex items-center justify-end text-right px-8 md:px-[10%] lg:px-[15%]">
        <div className="max-w-xl bg-black/40 p-6 md:p-8 rounded-3xl backdrop-blur-md border border-white/10 ml-auto">
          <h2 className="text-3xl md:text-5xl font-bold tracking-tight text-white drop-shadow-[0_4px_10px_rgba(0,0,0,0.8)] mb-6">
            Technical Arsenal
          </h2>
          <div className="text-lg md:text-xl text-white font-light drop-shadow-[0_2px_8px_rgba(0,0,0,0.8)] leading-relaxed space-y-3">
            <p><strong className="font-semibold text-cyan-300">Programming:</strong> C, C++ (DSA), JavaScript</p>
            <p><strong className="font-semibold text-emerald-300">Web Dev:</strong> HTML5, CSS3, React, Vite</p>
            <p><strong className="font-semibold text-purple-300">Backend:</strong> Node.js, Express, FastAPI</p>
            <p><strong className="font-semibold text-pink-300">Tools:</strong> SQLite, Linux, Git, Netlify</p>
          </div>
        </div>
      </motion.div>

    </div>
  );
}
