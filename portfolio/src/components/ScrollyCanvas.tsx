"use client";

import { useEffect, useRef, useState } from "react";
import { useScroll, useMotionValueEvent } from "framer-motion";

const frameCount = 120;

function getCurrentFrame(index: number) {
  return `/sequence/frame_${index.toString().padStart(3, "0")}_delay-0.066s.png`;
}

export default function ScrollyCanvas({ children }: { children: React.ReactNode }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });
  
  const [images, setImages] = useState<HTMLImageElement[]>([]);
  
  useEffect(() => {
    const loadedImages: HTMLImageElement[] = [];
    let loadedCount = 0;

    for (let i = 0; i < frameCount; i++) {
      const img = new Image();
      img.src = getCurrentFrame(i);
      img.onload = () => {
        loadedCount++;
        if (loadedCount === frameCount) {
          setImages(loadedImages);
          renderFrame(0, loadedImages);
        }
      };
      loadedImages.push(img);
    }
  }, []);

  const renderFrame = (index: number, imgs: HTMLImageElement[]) => {
    if (!canvasRef.current || !imgs[index]) return;

    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const img = imgs[index];
    
    // Ensure we account for device pixel ratio for sharp rendering
    const dpr = window.devicePixelRatio || 1;
    const rect = canvas.getBoundingClientRect();
    
    // Set actual size in memory (scaled for retina displays)
    canvas.width = rect.width * dpr;
    canvas.height = rect.height * dpr;
    
    // Normalize coordinate system to use css pixels
    ctx.scale(dpr, dpr);

    // object-fit: cover logic
    const imgRatio = img.width / img.height;
    const canvasRatio = rect.width / rect.height;
    
    let renderWidth, renderHeight, offsetX, offsetY;

    if (canvasRatio > imgRatio) {
      renderWidth = rect.width;
      renderHeight = rect.width / imgRatio;
      offsetX = 0;
      offsetY = (rect.height - renderHeight) / 2;
    } else {
      renderWidth = rect.height * imgRatio;
      renderHeight = rect.height;
      offsetX = (rect.width - renderWidth) / 2;
      offsetY = 0;
    }

    ctx.clearRect(0, 0, rect.width, rect.height);
    // Add a slight dark overlay to make text pop more
    ctx.drawImage(img, offsetX, offsetY, renderWidth, renderHeight);
    ctx.fillStyle = "rgba(18, 18, 18, 0.4)";
    ctx.fillRect(0, 0, rect.width, rect.height);
  };

  useMotionValueEvent(scrollYProgress, "change", (latest) => {
    if (images.length === frameCount) {
      const frameIndex = Math.min(
        frameCount - 1,
        Math.floor(latest * frameCount)
      );
      requestAnimationFrame(() => renderFrame(frameIndex, images));
    }
  });

  useEffect(() => {
    const handleResize = () => {
      if (images.length === frameCount) {
        const frameIndex = Math.min(
          frameCount - 1,
          Math.floor(scrollYProgress.get() * frameCount)
        );
        renderFrame(frameIndex, images);
      }
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [images, scrollYProgress]);

  return (
    <div ref={containerRef} className="h-[500vh] relative w-full bg-background">
      <div className="sticky top-0 h-screen w-full overflow-hidden">
        <canvas
          ref={canvasRef}
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 z-10">
          {children}
        </div>
      </div>
    </div>
  );
}
