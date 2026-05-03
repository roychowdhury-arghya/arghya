"use client";

import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { ExternalLink, Code } from "lucide-react";
import React from "react";

const TiltCard = ({ children, className, borderGradient, glowGradient }: { children: React.ReactNode, className?: string, borderGradient: string, glowGradient: string }) => {
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const mouseXSpring = useSpring(x, { stiffness: 300, damping: 20 });
  const mouseYSpring = useSpring(y, { stiffness: 300, damping: 20 });

  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["10deg", "-10deg"]);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-10deg", "10deg"]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    const mX = e.clientX - rect.left;
    const mY = e.clientY - rect.top;
    
    mouseX.set(mX);
    mouseY.set(mY);

    const xPct = mX / width - 0.5;
    const yPct = mY / height - 0.5;
    x.set(xPct);
    y.set(yPct);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div
      style={{
        rotateX,
        rotateY,
        transformStyle: "preserve-3d",
      }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className={`relative rounded-3xl bg-[#121212] overflow-hidden group p-[2px] ${className}`}
    >
      <div className={`absolute inset-0 bg-gradient-to-br ${borderGradient} opacity-50 group-hover:opacity-100 transition-opacity duration-700`} />
      
      <div className="absolute inset-[2px] rounded-3xl bg-[#121212] z-0 overflow-hidden">
        {/* Animated Spotlight that follows the mouse inside the card */}
        <motion.div 
          className={`absolute pointer-events-none opacity-0 group-hover:opacity-30 transition-opacity duration-500 z-0 bg-gradient-to-br ${glowGradient}`}
          style={{
            x: useTransform(mouseX, (val) => val - 200),
            y: useTransform(mouseY, (val) => val - 200),
            width: 400,
            height: 400,
            filter: "blur(60px)",
            borderRadius: "50%"
          }}
        />
      </div>
      
      <div className={`absolute inset-0 opacity-0 group-hover:opacity-30 transition-opacity duration-700 bg-gradient-to-br ${glowGradient} blur-2xl z-0 pointer-events-none`} />

      <div style={{ transform: "translateZ(50px)" }} className="relative z-10 h-full p-8 md:p-10 flex flex-col">
        {children}
      </div>
    </motion.div>
  );
};

export default function Projects() {
  const projects = [
    {
      title: "CalmCast – Weather App",
      description: "A dynamic weather app with multiple themes (sunny, rainy, cloudy), real-time API integration, sound effects, and smooth UI animations.",
      tags: ["React", "Weather API", "Netlify"],
      borderGradient: "from-blue-500 to-cyan-400",
      glowGradient: "from-blue-600 to-cyan-500",
    },
    {
      title: "SwachTrack",
      description: "Civic Issue Reporting System featuring location tracking, issue categorization, and an admin dashboard.",
      tags: ["React", "Leaflet", "Maps"],
      borderGradient: "from-emerald-400 to-teal-500",
      glowGradient: "from-emerald-500 to-teal-600",
    },
    {
      title: "Instant-BI",
      description: "Hackathon project that converts CSV data into insights automatically. Uses AI to generate SQL queries and charts.",
      tags: ["React", "FastAPI", "AI"],
      borderGradient: "from-purple-500 to-pink-500",
      glowGradient: "from-purple-600 to-pink-600",
    },
    {
      title: "Court Judgment to Action Plan",
      description: "InnovateX project. Extracts directives, deadlines, and responsibilities from legal PDFs.",
      tags: ["AI", "Node.js", "PDF parsing"],
      borderGradient: "from-orange-400 to-red-500",
      glowGradient: "from-orange-500 to-red-600",
    },
  ];

  return (
    <section id="projects" className="relative z-20 bg-[#0a0a0a] text-white pt-24 pb-32 px-6 md:px-20 border-t border-white/10 overflow-hidden">
      
      {/* Animated Colorful Background */}
      <div className="absolute inset-0 pointer-events-none z-0 opacity-50">
        <motion.div 
          animate={{ 
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.6, 0.3],
            x: [0, 100, 0],
            y: [0, -50, 0]
          }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
          className="absolute -top-[20%] -right-[10%] w-[50vw] h-[50vw] rounded-full bg-purple-600/40 blur-[120px]"
        />
        <motion.div 
          animate={{ 
            scale: [1, 1.3, 1],
            opacity: [0.2, 0.5, 0.2],
            x: [0, -100, 0],
            y: [0, 50, 0]
          }}
          transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-[20%] -left-[10%] w-[60vw] h-[60vw] rounded-full bg-blue-600/30 blur-[120px]"
        />
        <motion.div 
          animate={{ 
            scale: [1, 1.1, 1],
            opacity: [0.2, 0.5, 0.2],
            x: [0, 50, 0],
            y: [0, 100, 0]
          }}
          transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
          className="absolute -bottom-[20%] right-[20%] w-[40vw] h-[40vw] rounded-full bg-orange-600/30 blur-[120px]"
        />
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        <h2 className="text-5xl md:text-7xl font-bold mb-16 tracking-tighter bg-clip-text text-transparent bg-gradient-to-r from-orange-400 via-red-400 to-rose-400">Selected Works</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {projects.map((project, i) => (
            <TiltCard key={i} className="min-h-[350px]" borderGradient={project.borderGradient} glowGradient={project.glowGradient}>
              <h3 className={`text-3xl font-bold mb-4 tracking-tight bg-clip-text text-transparent bg-gradient-to-r ${project.borderGradient}`}>{project.title}</h3>
              <p className="text-gray-300 mb-8 font-light text-lg leading-relaxed flex-grow">{project.description}</p>
              <div className="flex flex-wrap gap-3 mb-8">
                {project.tags.map(tag => (
                  <span key={tag} className="text-sm font-semibold px-4 py-1.5 rounded-full bg-white/10 text-white border border-white/20 shadow-sm">
                    {tag}
                  </span>
                ))}
              </div>
              <div className="flex gap-6 mt-auto">
                <button className="flex items-center gap-2 text-sm font-bold text-white hover:opacity-80 transition-opacity">
                  <ExternalLink size={18} /> Live Demo
                </button>
                <button className="flex items-center gap-2 text-sm font-bold text-white/70 hover:text-white transition-opacity">
                  <Code size={18} /> Source
                </button>
              </div>
            </TiltCard>
          ))}
        </div>
      </div>
    </section>
  );
}
