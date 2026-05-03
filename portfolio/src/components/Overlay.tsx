"use client";

import { motion, useScroll, useTransform } from "framer-motion";

export default function Overlay() {
  const { scrollYProgress } = useScroll();

  // Section 1: Intro (0% to 20%)
  const opacity1 = useTransform(scrollYProgress, [0, 0.1, 0.2], [1, 1, 0]);
  const y1 = useTransform(scrollYProgress, [0, 0.2], [0, -100]);

  // Section 2: About (25% to 45%)
  const opacity2 = useTransform(scrollYProgress, [0.25, 0.3, 0.4, 0.45], [0, 1, 1, 0]);
  const y2 = useTransform(scrollYProgress, [0.25, 0.45], [100, -100]);

  // Section 3: Skills (50% to 70%)
  const opacity3 = useTransform(scrollYProgress, [0.5, 0.55, 0.65, 0.7], [0, 1, 1, 0]);
  const y3 = useTransform(scrollYProgress, [0.5, 0.7], [100, -100]);

  // Section 4: Hobbies & Goal (75% to 95%)
  const opacity4 = useTransform(scrollYProgress, [0.75, 0.8, 0.9, 0.95], [0, 1, 1, 0]);
  const y4 = useTransform(scrollYProgress, [0.75, 0.95], [100, -100]);

  return (
    <div className="absolute inset-0 z-10 pointer-events-none flex flex-col justify-center">
      
      {/* Section 1: Intro */}
      <motion.div style={{ opacity: opacity1, y: y1 }} className="absolute inset-0 flex items-center justify-center text-center px-4">
        <div>
          <h1 className="text-5xl md:text-8xl font-bold tracking-tighter text-white drop-shadow-[0_4px_10px_rgba(0,0,0,0.8)]">
            Arghya Roy Chowdhury
          </h1>
          <p className="mt-6 text-xl md:text-3xl text-white font-light drop-shadow-[0_2px_8px_rgba(0,0,0,0.8)]">
            B.Tech IT Student | Web Developer | Cybersecurity Enthusiast
          </p>
        </div>
      </motion.div>

      {/* Section 2: About */}
      <motion.div style={{ opacity: opacity2, y: y2 }} className="absolute inset-0 flex items-center justify-start text-left px-[10%] md:px-[15%]">
        <div className="max-w-3xl bg-black/40 p-8 md:p-12 rounded-3xl backdrop-blur-md border border-white/10">
          <h2 className="text-4xl md:text-6xl font-bold tracking-tight text-white drop-shadow-[0_4px_10px_rgba(0,0,0,0.8)] mb-6">
            About Me
          </h2>
          <p className="text-xl md:text-2xl text-white font-light drop-shadow-[0_2px_8px_rgba(0,0,0,0.8)] leading-relaxed">
            Coming from a humble background, I’ve learned to stay consistent, self-driven, and focused on growth. 
            I believe in learning by building—from creating web applications to experimenting with cybersecurity tools, I enjoy turning ideas into real projects.
          </p>
        </div>
      </motion.div>

      {/* Section 3: Skills */}
      <motion.div style={{ opacity: opacity3, y: y3 }} className="absolute inset-0 flex items-center justify-end text-right px-[10%] md:px-[15%]">
        <div className="max-w-2xl bg-black/40 p-8 md:p-12 rounded-3xl backdrop-blur-md border border-white/10 ml-auto">
          <h2 className="text-4xl md:text-6xl font-bold tracking-tight text-white drop-shadow-[0_4px_10px_rgba(0,0,0,0.8)] mb-8">
            Technical Arsenal
          </h2>
          <div className="text-xl text-white font-light drop-shadow-[0_2px_8px_rgba(0,0,0,0.8)] leading-relaxed space-y-4">
            <p><strong className="font-semibold text-cyan-300">Programming:</strong> C, C++ (DSA), JavaScript</p>
            <p><strong className="font-semibold text-emerald-300">Web Dev:</strong> HTML5, CSS3, React, Vite</p>
            <p><strong className="font-semibold text-purple-300">Backend & Tools:</strong> Node.js, Express, FastAPI, SQLite, Linux, Git</p>
          </div>
        </div>
      </motion.div>

      {/* Section 4: Goal & Hobbies */}
      <motion.div style={{ opacity: opacity4, y: y4 }} className="absolute inset-0 flex items-center justify-center text-center px-[10%] md:px-[15%]">
        <div className="max-w-4xl bg-black/40 p-8 md:p-12 rounded-3xl backdrop-blur-md border border-white/10">
          <h2 className="text-4xl md:text-6xl font-bold tracking-tight text-white drop-shadow-[0_4px_10px_rgba(0,0,0,0.8)] mb-6">
            Beyond Code
          </h2>
          <p className="text-xl md:text-2xl text-white font-light drop-shadow-[0_2px_8px_rgba(0,0,0,0.8)] leading-relaxed mb-8">
            I love photography (especially macro & creative shots), writing poems and short stories, and playing the Tabla.
          </p>
          <div className="inline-block px-8 py-4 bg-white/10 rounded-2xl border border-white/20 backdrop-blur-md">
            <p className="text-lg md:text-xl font-medium text-pink-200 drop-shadow-md">
              "I don’t just want to write code — I want to create something meaningful that reflects both logic and emotion."
            </p>
          </div>
        </div>
      </motion.div>

    </div>
  );
}
