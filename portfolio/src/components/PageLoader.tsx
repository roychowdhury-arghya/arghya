"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

const cyberQuotes = [
  "Convincing pixels to behave...",
  "Decrypting creativity...",
  "Summoning the 3D magic...",
  "Compiling dreams and caffeine...",
  "Almost there, don't blink...",
  "Loading vibes securely..."
];

const terminalLogsSource = [
  "Initializing portfolio system...",
  "Loading WebP frames...",
  "Injecting creativity...",
  "Compiling projects...",
  "Syncing dreams with code...",
  "Access granted."
];

export default function PageLoader({ children }: { children: React.ReactNode }) {
  const [isLoading, setIsLoading] = useState(true);
  const [progress, setProgress] = useState(0);
  const [quoteIndex, setQuoteIndex] = useState(0);
  const [visibleLogs, setVisibleLogs] = useState<string[]>([terminalLogsSource[0]]);
  const [accessGranted, setAccessGranted] = useState(false);

  // Quote rotation
  useEffect(() => {
    if (!isLoading) return;
    const quoteInterval = setInterval(() => {
      setQuoteIndex((prev) => (prev + 1) % cyberQuotes.length);
    }, 2000);
    return () => clearInterval(quoteInterval);
  }, [isLoading]);

  // Terminal logs logic tied to progress
  useEffect(() => {
    const logsCount = terminalLogsSource.length;
    if (progress === 100) {
      setVisibleLogs(terminalLogsSource);
      setAccessGranted(true);
    } else {
      const index = Math.floor((progress / 100) * (logsCount - 1));
      setVisibleLogs(terminalLogsSource.slice(0, index + 1));
    }
  }, [progress]);

  // Preload assets
  useEffect(() => {
    if (!isLoading) return;

    const totalFrames = 120;
    let loadedAssets = 0;

    const frameUrls = Array.from({ length: totalFrames }, (_, i) => 
      `/sequence/frame_${i.toString().padStart(3, '0')}_delay-0.066s.webp`
    );

    const allAssets = [...frameUrls];
    const totalAssets = allAssets.length;

    if (totalAssets === 0) {
      setTimeout(() => setProgress(100), 0);
      setTimeout(() => setIsLoading(false), 1500); 
      return;
    }

    const handleAssetLoad = () => {
      loadedAssets++;
      const currentProgress = Math.floor((loadedAssets / totalAssets) * 100);
      setProgress(currentProgress);

      if (loadedAssets === totalAssets) {
        setTimeout(() => {
          setIsLoading(false);
        }, 1500); 
      }
    };

    allAssets.forEach(url => {
      const img = new window.Image();
      img.src = url;
      img.onload = handleAssetLoad;
      img.onerror = handleAssetLoad;
    });

    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = '';
    };
  }, [isLoading]);

  // Generate particles only on client to avoid hydration mismatch
  const [particles, setParticles] = useState<{ id: number; x: number; y: number; delay: number; duration: number; opacity: number }[]>([]);
  useEffect(() => {
    if (!isLoading) return;
    const newParticles = Array.from({ length: 20 }).map((_, i) => ({
      id: i,
      x: Math.random() * window.innerWidth,
      y: Math.random() * window.innerHeight,
      delay: Math.random() * 2,
      duration: Math.random() * 5 + 5,
      opacity: Math.random() * 0.5 + 0.2
    }));
    setTimeout(() => setParticles(newParticles), 0);
  }, [isLoading]);

  return (
    <>
      <AnimatePresence>
        {isLoading && (
          <motion.div
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.8, ease: "easeInOut" }}
            className="fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-[#050505] text-[#0f0] overflow-hidden font-mono"
          >
            {/* Cyberpunk Grid Background */}
            <div 
              className="absolute inset-0 opacity-20 pointer-events-none"
              style={{
                backgroundImage: `
                  linear-gradient(to right, rgba(0, 255, 255, 0.15) 1px, transparent 1px),
                  linear-gradient(to bottom, rgba(0, 255, 255, 0.15) 1px, transparent 1px)
                `,
                backgroundSize: '40px 40px',
                transform: 'perspective(500px) rotateX(60deg) scale(2.5) translateY(-10%)',
                transformOrigin: 'center top'
              }}
            />

            {/* Scanlines Overlay */}
            <div 
              className="absolute inset-0 opacity-20 pointer-events-none z-50"
              style={{
                background: 'linear-gradient(rgba(18, 16, 16, 0) 50%, rgba(0, 0, 0, 0.25) 50%), linear-gradient(90deg, rgba(255, 0, 0, 0.06), rgba(0, 255, 0, 0.02), rgba(0, 0, 255, 0.06))',
                backgroundSize: '100% 4px, 3px 100%'
              }}
            />

            {/* Glowing Orbs */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none mix-blend-screen">
              <motion.div 
                animate={{ scale: [1, 1.2, 1], opacity: [0.1, 0.2, 0.1] }}
                transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
                className="absolute top-1/4 left-1/4 w-[30vw] h-[30vw] rounded-full bg-cyan-500/30 blur-[120px]"
              />
              <motion.div 
                animate={{ scale: [1, 1.5, 1], opacity: [0.1, 0.3, 0.1] }}
                transition={{ duration: 10, repeat: Infinity, ease: "easeInOut", delay: 1 }}
                className="absolute bottom-1/4 right-1/4 w-[40vw] h-[40vw] rounded-full bg-purple-600/30 blur-[150px]"
              />
            </div>

            {/* Floating Particles */}
            {particles.map((p) => (
              <motion.div
                key={p.id}
                className="absolute w-1 h-1 bg-cyan-400 rounded-full blur-[1px]"
                initial={{
                  x: p.x,
                  y: p.y,
                  opacity: p.opacity
                }}
                animate={{
                  y: [null, p.y - 200],
                  opacity: [null, 0]
                }}
                transition={{
                  duration: p.duration,
                  delay: p.delay,
                  repeat: Infinity,
                  ease: "linear"
                }}
              />
            ))}

            {/* Terminal Card */}
            <div className="relative z-10 w-full max-w-2xl px-6">
              <div className="backdrop-blur-xl bg-black/60 border border-cyan-500/30 rounded-lg shadow-[0_0_40px_rgba(0,255,255,0.15)] overflow-hidden">
                {/* Terminal Header */}
                <div className="flex items-center px-4 py-3 border-b border-cyan-500/30 bg-cyan-950/30">
                  <div className="flex gap-2">
                    <div className="w-3 h-3 rounded-full bg-red-500/80 shadow-[0_0_8px_rgba(239,68,68,0.8)]" />
                    <div className="w-3 h-3 rounded-full bg-yellow-500/80 shadow-[0_0_8px_rgba(234,179,8,0.8)]" />
                    <div className="w-3 h-3 rounded-full bg-green-500/80 shadow-[0_0_8px_rgba(34,197,94,0.8)]" />
                  </div>
                  <div className="flex-1 text-center text-xs text-cyan-400/80 font-bold tracking-widest uppercase">
                    SYS.TERMINAL // SECURE_BOOT
                  </div>
                </div>

                {/* Terminal Body */}
                <div className="p-6 sm:p-10 flex flex-col min-h-[380px] relative">
                  {/* Glitch Name */}
                  <div className="relative text-center mb-10">
                    <motion.h1 
                      className="text-2xl sm:text-4xl font-black text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-white to-purple-500 uppercase tracking-widest drop-shadow-[0_0_15px_rgba(0,255,255,0.6)]"
                      animate={{
                        opacity: [1, 0.8, 1, 1, 0.9, 1, 0, 1],
                        x: [0, -2, 2, -1, 1, 0, 0, 0]
                      }}
                      transition={{
                        duration: 3,
                        repeat: Infinity,
                        repeatDelay: 2
                      }}
                    >
                      ARGHYA ROY CHOWDHURY
                    </motion.h1>
                    {/* Glitch overlays */}
                    <span className="absolute inset-0 flex justify-center items-center text-2xl sm:text-4xl font-black text-cyan-400 mix-blend-screen opacity-50 translate-x-[3px] animate-pulse pointer-events-none uppercase tracking-widest">ARGHYA ROY CHOWDHURY</span>
                    <span className="absolute inset-0 flex justify-center items-center text-2xl sm:text-4xl font-black text-purple-500 mix-blend-screen opacity-50 -translate-x-[3px] animate-pulse pointer-events-none uppercase tracking-widest" style={{ animationDelay: '0.1s' }}>ARGHYA ROY CHOWDHURY</span>
                  </div>

                  {/* Typing Logs */}
                  <div className="flex-1 space-y-3 text-sm sm:text-base text-cyan-400 drop-shadow-[0_0_8px_rgba(34,211,238,0.6)] font-semibold">
                    {visibleLogs.map((log, i) => (
                      <motion.div
                        key={i}
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        className={i === terminalLogsSource.length - 1 ? "text-green-400 font-bold mt-6 shadow-[0_0_10px_rgba(34,197,94,0.5)]" : ""}
                      >
                        <span className="mr-3 text-cyan-300 opacity-70">&gt;</span>
                        {log}
                      </motion.div>
                    ))}
                    {!accessGranted && (
                      <motion.div
                        animate={{ opacity: [1, 0] }}
                        transition={{ duration: 0.8, repeat: Infinity }}
                        className="inline-block w-2.5 h-5 bg-cyan-400 ml-2 translate-y-1 shadow-[0_0_10px_rgba(34,211,238,0.9)]"
                      />
                    )}
                  </div>

                  {/* Progress Section */}
                  <div className="mt-10">
                    <div className="flex justify-between items-end mb-3 text-xs sm:text-sm text-cyan-300">
                      <AnimatePresence mode="wait">
                        <motion.span
                          key={quoteIndex}
                          initial={{ opacity: 0, y: 5 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: -5 }}
                          className="italic opacity-80 font-light"
                        >
                          {cyberQuotes[quoteIndex]}
                        </motion.span>
                      </AnimatePresence>
                      <span className="font-bold text-cyan-400 drop-shadow-[0_0_8px_rgba(34,211,238,0.9)] text-lg">
                        {progress}%
                      </span>
                    </div>
                    
                    {/* Neon Progress Bar */}
                    <div className="h-2 w-full bg-cyan-950/60 rounded-full overflow-hidden border border-cyan-800/40 relative">
                      <motion.div 
                        className="absolute top-0 left-0 h-full rounded-full bg-cyan-400 shadow-[0_0_20px_rgba(34,211,238,1),0_0_10px_rgba(34,211,238,0.8)_inset]"
                        initial={{ width: 0 }}
                        animate={{ width: `${progress}%` }}
                        transition={{ ease: "easeOut", duration: 0.2 }}
                      />
                    </div>
                  </div>

                  {/* Access Granted Overlay Effect */}
                  <AnimatePresence>
                    {accessGranted && (
                      <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="absolute inset-0 z-20 flex items-center justify-center bg-black/85 backdrop-blur-md rounded-b-lg"
                      >
                        <motion.div 
                          className="text-3xl sm:text-5xl font-black text-green-500 tracking-[0.2em] border-4 border-green-500 p-6 sm:p-8 rounded shadow-[0_0_60px_rgba(34,197,94,0.5)] drop-shadow-[0_0_15px_rgba(34,197,94,0.9)] text-center"
                          animate={{ scale: [1, 1.02, 1] }}
                          transition={{ duration: 0.2, repeat: Infinity }}
                        >
                          ACCESS GRANTED
                        </motion.div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <motion.div
        initial={false}
        animate={{
          opacity: isLoading ? 0 : 1,
        }}
        transition={{ duration: 0.8, ease: "easeInOut", delay: 0.2 }}
        style={{ pointerEvents: isLoading ? "none" : "auto" }}
      >
        {children}
      </motion.div>
    </>
  );
}
