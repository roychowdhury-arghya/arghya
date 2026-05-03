"use client";

import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Volume2, VolumeX } from "lucide-react";

const hackerQuotes = [
  "Convincing pixels to behave...",
  "Compiling dreams and caffeine...",
  "Decrypting creativity...",
  "Almost there...",
  "Loading brilliance..."
];

const terminalLines = [
  "Initializing system...",
  "Loading assets...",
  "Loading WebP frames...",
  "Injecting creativity...",
  "Compiling projects...",
  "Syncing data..."
];

// Helper to smooth fade HTML audio volume
const fadeAudio = (audio: HTMLAudioElement, targetVolume: number, duration: number) => {
  // Clear any existing fade interval on this audio object to prevent overlapping commands
  if ((audio as any)._fadeInterval) {
    clearInterval((audio as any)._fadeInterval);
  }

  const steps = 20;
  const stepTime = duration / steps;
  const startVolume = audio.volume;
  const volumeStep = (targetVolume - startVolume) / steps;
  
  let currentStep = 0;
  const interval = setInterval(() => {
    currentStep++;
    let newVolume = startVolume + (volumeStep * currentStep);
    // Clamp to valid range [0, 1]
    newVolume = Math.max(0, Math.min(1, newVolume));
    audio.volume = newVolume;
    
    if (currentStep >= steps || Math.abs(newVolume - targetVolume) < 0.01) {
      clearInterval(interval);
      audio.volume = targetVolume;
      if (targetVolume === 0) {
        audio.pause();
      }
    }
  }, stepTime);

  (audio as any)._fadeInterval = interval;
};

export default function PageLoader({ children }: { children: React.ReactNode }) {
  const [isLoading, setIsLoading] = useState(true);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [progress, setProgress] = useState(0);
  const [quoteIndex, setQuoteIndex] = useState(0);
  const [timePassed, setTimePassed] = useState(false);
  const [assetsLoaded, setAssetsLoaded] = useState(false);
  const [accessGrantedSequence, setAccessGrantedSequence] = useState(false);

  // Global Audio State
  const [isSoundOn, setIsSoundOn] = useState(false);
  const [isAudioAllowed, setIsAudioAllowed] = useState(false);

  const loaderAudioRef = useRef<HTMLAudioElement>(null);
  const mainAudioRef = useRef<HTMLAudioElement>(null);



  // 1. Handle Global Interaction for Browser Autoplay Policies
  useEffect(() => {
    const handleFirstInteraction = () => {
      // Synchronously unlock audio within the user interaction event
      if (isSoundOn && !isAudioAllowed) {
        if (loaderAudioRef.current && isLoading) {
          loaderAudioRef.current.volume = 0;
          loaderAudioRef.current.play().catch(() => {});
        }
        if (mainAudioRef.current) {
          // Play and immediately pause to unlock the element for future use
          mainAudioRef.current.volume = 0;
          mainAudioRef.current.play().then(() => {
            if (isLoading && mainAudioRef.current) {
              mainAudioRef.current.pause();
            }
          }).catch(() => {});
        }
      }

      setIsAudioAllowed(true);
      window.removeEventListener('click', handleFirstInteraction);
      window.removeEventListener('keydown', handleFirstInteraction);
      window.removeEventListener('touchstart', handleFirstInteraction);
    };

    window.addEventListener('click', handleFirstInteraction);
    window.addEventListener('keydown', handleFirstInteraction);
    window.addEventListener('touchstart', handleFirstInteraction);

    return () => {
      window.removeEventListener('click', handleFirstInteraction);
      window.removeEventListener('keydown', handleFirstInteraction);
      window.removeEventListener('touchstart', handleFirstInteraction);
    };
  }, [isSoundOn, isLoading, isAudioAllowed]);

  // 2. Global Audio Controller
  useEffect(() => {
    const loaderAudio = loaderAudioRef.current;
    const mainAudio = mainAudioRef.current;

    if (!loaderAudio || !mainAudio) return;

    if (!isSoundOn || !isAudioAllowed) {
      // Fade out both if sound turned off or not allowed yet
      fadeAudio(loaderAudio, 0, 500);
      fadeAudio(mainAudio, 0, 500);
      return;
    }

    // Sound is ON and user has interacted
    if (isLoading && !isTransitioning) {
      // Loader Phase: play loader audio at medium volume
      if (loaderAudio.paused) {
        loaderAudio.volume = 0; 
        loaderAudio.play().catch(() => {});
      }
      fadeAudio(loaderAudio, 0.5, 800); // target 0.5
      fadeAudio(mainAudio, 0, 500);
    } else {
      // Transition / Main Phase: fade out loader, play main audio low
      fadeAudio(loaderAudio, 0, 1000);
      if (mainAudio.paused) {
        mainAudio.volume = 0;
        mainAudio.play().catch(() => {});
      }
      fadeAudio(mainAudio, 0.15, 2000); // Smooth fade in to 0.15 over 2 seconds
    }
  }, [isSoundOn, isAudioAllowed, isLoading, isTransitioning]);

  const toggleMute = () => {
    setIsSoundOn((prev) => !prev);
    // If turning sound ON directly through the button, also consider it an interaction
    if (!isAudioAllowed) {
      setIsAudioAllowed(true);
    }
  };

  // Rotating Quotes
  useEffect(() => {
    if (!isLoading || isTransitioning) return;
    const interval = setInterval(() => {
      setQuoteIndex((prev) => (prev + 1) % hackerQuotes.length);
    }, 2500);
    return () => clearInterval(interval);
  }, [isLoading, isTransitioning]);

  // Minimum 4s Timer
  useEffect(() => {
    const timer = setTimeout(() => {
      setTimePassed(true);
    }, 4000);
    return () => clearTimeout(timer);
  }, []);

  // Preload Logic
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
      setTimeout(() => setAssetsLoaded(true), 0);
      return;
    }

    const handleAssetLoad = () => {
      loadedAssets++;
      const currentProgress = Math.floor((loadedAssets / totalAssets) * 100);
      setProgress(currentProgress);

      if (loadedAssets === totalAssets) {
        setAssetsLoaded(true);
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

  // Transition & End Sequence Trigger
  useEffect(() => {
    if (timePassed && assetsLoaded && !isTransitioning) {
      setAccessGrantedSequence(true);
      // Brief pause for the access granted glitch effect, then fade out
      setTimeout(() => {
        setIsTransitioning(true);
        setTimeout(() => setIsLoading(false), 800);
      }, 1000);
    }
  }, [timePassed, assetsLoaded, isTransitioning]);

  // Typing Effect Logic
  const [typedLines, setTypedLines] = useState<string[]>([]);
  const [currentLineIndex, setCurrentLineIndex] = useState(0);
  const [currentCharIndex, setCurrentCharIndex] = useState(0);

  useEffect(() => {
    if (accessGrantedSequence) {
      // Auto-fill lines if access granted happens before typing finishes
      setTypedLines(terminalLines);
      return;
    }

    if (currentLineIndex < terminalLines.length) {
      const currentFullText = terminalLines[currentLineIndex];
      if (currentCharIndex < currentFullText.length) {
        const timeout = setTimeout(() => {
          setTypedLines((prev) => {
            const newLines = [...prev];
            if (newLines[currentLineIndex] === undefined) {
              newLines[currentLineIndex] = currentFullText[currentCharIndex];
            } else {
              newLines[currentLineIndex] += currentFullText[currentCharIndex];
            }
            return newLines;
          });
          setCurrentCharIndex((prev) => prev + 1);
        }, Math.random() * 30 + 15); // Fast realistic typing speed
        return () => clearTimeout(timeout);
      } else {
        const timeout = setTimeout(() => {
          setCurrentLineIndex((prev) => prev + 1);
          setCurrentCharIndex(0);
        }, 300); // pause between lines
        return () => clearTimeout(timeout);
      }
    }
  }, [currentCharIndex, currentLineIndex, accessGrantedSequence]);

  return (
    <>
      {/* Global Audio Elements - These stay mounted even after loader finishes */}
      <audio ref={loaderAudioRef} src="/sounds/page_loader" loop playsInline preload="auto" />
      <audio ref={mainAudioRef} src="/sounds/main_page" loop playsInline preload="auto" />

      {/* Global Sound Toggle Button */}
      <button 
        onClick={toggleMute}
        className="fixed bottom-8 right-8 z-[10000] p-3 rounded-full bg-black/40 backdrop-blur-md border border-white/10 hover:bg-white/10 transition-colors text-white/50 hover:text-white group shadow-lg"
        aria-label="Toggle global sound"
      >
        {!isSoundOn ? <VolumeX size={20} /> : <Volume2 size={20} />}
      </button>

      <AnimatePresence>
        {isLoading && (
          <motion.div
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.8, ease: "easeInOut" }}
            className="fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-[#030705] font-mono text-[#00ffa3] overflow-hidden"
          >
            {/* Subtle Gradient & Grid Background */}
            <div className="absolute inset-0 bg-gradient-to-br from-[#020403] to-[#07130e] pointer-events-none z-0" />
            <div 
              className="absolute inset-0 opacity-[0.02] pointer-events-none z-0"
              style={{
                backgroundImage: 'linear-gradient(#00ffa3 1px, transparent 1px), linear-gradient(90deg, #00ffa3 1px, transparent 1px)',
                backgroundSize: '40px 40px'
              }}
            />

            {/* Terminal Container */}
            <motion.div 
              className="relative z-10 w-full max-w-2xl px-6"
              animate={isTransitioning ? { opacity: 0, scale: 0.98, y: -10 } : { opacity: 1, scale: 1, y: 0 }}
              transition={{ duration: 0.8, ease: "easeInOut" }}
            >
              <div className="backdrop-blur-sm bg-black/60 border border-[#00ffa3]/20 rounded-md shadow-[0_0_40px_rgba(0,255,163,0.03)] overflow-hidden">
                {/* Terminal Header */}
                <div className="flex items-center px-4 py-3 border-b border-[#00ffa3]/20 bg-[#00ffa3]/5">
                  <div className="flex gap-2.5">
                    <div className="w-2.5 h-2.5 rounded-full bg-white/10" />
                    <div className="w-2.5 h-2.5 rounded-full bg-white/10" />
                    <div className="w-2.5 h-2.5 rounded-full bg-white/10" />
                  </div>
                  <div className="flex-1 text-center text-[11px] text-[#00ffa3]/40 uppercase tracking-widest font-semibold">
                    init_sequence.sh
                  </div>
                </div>

                {/* Terminal Body */}
                <div className="p-6 sm:p-10 flex flex-col min-h-[360px]">
                  {/* Typing Logs */}
                  <div className="flex-1 space-y-3 text-xs sm:text-sm text-[#00ffa3]/80 tracking-wide">
                    {typedLines.map((line, i) => (
                      <div key={i}>
                        <span className="opacity-40 mr-3">&gt;</span>
                        {line}
                      </div>
                    ))}
                    
                    {/* Blinking Cursor while typing */}
                    {(!accessGrantedSequence) && (
                      <motion.div
                        animate={{ opacity: [1, 0] }}
                        transition={{ duration: 0.8, repeat: Infinity, ease: "linear" }}
                        className="inline-block w-2 h-3.5 bg-[#00ffa3]/80 ml-1 translate-y-0.5"
                      />
                    )}
                  </div>

                  {/* End Sequence Access Granted */}
                  <AnimatePresence>
                    {accessGrantedSequence && (
                      <motion.div
                        initial={{ opacity: 0, x: -5 }}
                        animate={{ opacity: [0, 1, 0.3, 1, 0.8, 1], x: 0 }}
                        transition={{ duration: 0.4 }}
                        className="mt-6 font-bold text-[#00ffa3] text-lg sm:text-xl tracking-widest drop-shadow-[0_0_8px_rgba(0,255,163,0.4)]"
                      >
                        <span className="opacity-40 mr-3 text-sm">&gt;</span>
                        ACCESS GRANTED ✔
                        <motion.div
                          animate={{ opacity: [1, 0] }}
                          transition={{ duration: 0.4, repeat: Infinity, ease: "linear" }}
                          className="inline-block w-2.5 h-5 bg-[#00ffa3] ml-2 translate-y-1 shadow-[0_0_8px_rgba(0,255,163,0.6)]"
                        />
                      </motion.div>
                    )}
                  </AnimatePresence>

                  {/* Bottom Section */}
                  <div className="mt-12 pt-6 border-t border-[#00ffa3]/10">
                    <div className="flex justify-between items-end mb-4">
                      {/* Rotating Quotes */}
                      <div className="h-4">
                        <AnimatePresence mode="wait">
                          <motion.p
                            key={quoteIndex}
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            transition={{ duration: 0.5 }}
                            className="text-[11px] sm:text-xs text-[#00ffa3]/40 font-light"
                          >
                            // {hackerQuotes[quoteIndex]}
                          </motion.p>
                        </AnimatePresence>
                      </div>
                      
                      {/* Percentage */}
                      <span className="text-xs text-[#00ffa3]/60 font-mono tracking-widest">
                        {progress}%
                      </span>
                    </div>
                    
                    {/* Thin Linear Progress Bar */}
                    <div className="w-full h-[2px] bg-[#00ffa3]/10 rounded-full overflow-hidden">
                      <motion.div 
                        className="h-full bg-[#00ffa3]/80 shadow-[0_0_8px_rgba(0,255,163,0.5)] rounded-full"
                        initial={{ width: "0%" }}
                        animate={{ width: `${progress}%` }}
                        transition={{ ease: "linear", duration: 0.2 }}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <motion.div
        initial={false}
        animate={{ opacity: isLoading ? 0 : 1 }}
        transition={{ duration: 0.8, ease: "easeInOut", delay: 0.2 }}
        style={{ pointerEvents: isLoading ? "none" : "auto" }}
      >
        {children}
      </motion.div>
    </>
  );
}
