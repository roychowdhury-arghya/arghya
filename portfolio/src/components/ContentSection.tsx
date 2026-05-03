"use client";

import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { ExternalLink, Code, Camera, BookOpen, PenTool, Music, Code2, Database, Shield } from "lucide-react";
import React from "react";

// Interactive 3D Card component with vibrant glowing borders
const TiltCard = ({ children, className, borderGradient, glowGradient }: { children: React.ReactNode, className?: string, borderGradient: string, glowGradient: string }) => {
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const mouseXSpring = useSpring(x, { stiffness: 300, damping: 20 });
  const mouseYSpring = useSpring(y, { stiffness: 300, damping: 20 });

  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["10deg", "-10deg"]);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-10deg", "10deg"]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;
    const xPct = mouseX / width - 0.5;
    const yPct = mouseY / height - 0.5;
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
      {/* The colorful border background */}
      <div className={`absolute inset-0 bg-gradient-to-br ${borderGradient} opacity-50 group-hover:opacity-100 transition-opacity duration-700`} />
      
      {/* The inner dark card */}
      <div className="absolute inset-[2px] rounded-3xl bg-[#121212] z-0" />
      
      {/* The intense colorful glow on hover */}
      <div className={`absolute inset-0 opacity-0 group-hover:opacity-30 transition-opacity duration-700 bg-gradient-to-br ${glowGradient} blur-2xl z-0 pointer-events-none`} />

      <div style={{ transform: "translateZ(50px)" }} className="relative z-10 h-full p-8 md:p-10 flex flex-col">
        {children}
      </div>
    </motion.div>
  );
};

export default function ContentSection() {
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
    <section className="relative z-20 bg-transparent text-white pt-24 pb-32 px-6 md:px-20 border-t border-white/10">
      <div className="max-w-7xl mx-auto space-y-32">
        
        {/* About Section */}
        <div id="about" className="pt-20">
          <h2 className="text-5xl md:text-7xl font-bold mb-8 tracking-tighter bg-clip-text text-transparent bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400">About Me</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            <p className="text-gray-300 font-light text-xl leading-relaxed">
              I’m an Information Technology student at Maulana Abul Kalam Azad University of Technology, currently in my academic journey of building strong foundations in software development and cybersecurity.
              <br/><br/>
              Coming from a humble background, I’ve learned to stay consistent, self-driven, and focused on growth. My goal is to build impactful tech solutions while continuously improving my skills.
            </p>
            <div className="p-8 rounded-3xl bg-gradient-to-br from-purple-900/40 to-blue-900/40 border border-purple-500/30 backdrop-blur-md relative overflow-hidden shadow-[0_0_40px_rgba(168,85,247,0.15)]">
              <h3 className="text-3xl font-bold mb-4 text-white">My Career Goal</h3>
              <p className="text-purple-100 font-medium text-lg leading-relaxed">
                To become a Cybersecurity Specialist while also mastering full-stack development — building secure, scalable, and impactful digital solutions.
              </p>
            </div>
          </div>
        </div>

        {/* Skills Section */}
        <div id="skills" className="pt-10">
          <h2 className="text-5xl md:text-7xl font-bold mb-12 tracking-tighter bg-clip-text text-transparent bg-gradient-to-r from-emerald-400 to-cyan-400">Technical Arsenal</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            <TiltCard borderGradient="from-pink-500 to-rose-500" glowGradient="from-pink-500 to-rose-500">
              <div className="p-4 bg-pink-500/20 rounded-full w-fit mb-6">
                <Code2 className="text-pink-400" size={32} />
              </div>
              <h3 className="text-2xl font-bold mb-4 text-white">Programming</h3>
              <ul className="space-y-3 text-pink-100/80 font-medium">
                <li>C & C++ (DSA Focus)</li>
                <li>JavaScript (DOM, APIs)</li>
                <li>HTML5 & CSS3</li>
              </ul>
            </TiltCard>
            <TiltCard borderGradient="from-cyan-400 to-blue-500" glowGradient="from-cyan-400 to-blue-500">
              <div className="p-4 bg-cyan-500/20 rounded-full w-fit mb-6">
                <Database className="text-cyan-400" size={32} />
              </div>
              <h3 className="text-2xl font-bold mb-4 text-white">Frameworks & Backend</h3>
              <ul className="space-y-3 text-cyan-100/80 font-medium">
                <li>React & Vite</li>
                <li>Node.js & Express.js</li>
                <li>FastAPI & SQLite</li>
              </ul>
            </TiltCard>
            <TiltCard borderGradient="from-emerald-400 to-green-500" glowGradient="from-emerald-400 to-green-500">
              <div className="p-4 bg-emerald-500/20 rounded-full w-fit mb-6">
                <Shield className="text-emerald-400" size={32} />
              </div>
              <h3 className="text-2xl font-bold mb-4 text-white">Tools & Platforms</h3>
              <ul className="space-y-3 text-emerald-100/80 font-medium">
                <li>Linux (Ubuntu, Kali, Parrot)</li>
                <li>Git & GitHub</li>
                <li>Netlify Deployment</li>
              </ul>
            </TiltCard>
          </div>
        </div>

        {/* Projects Section */}
        <div id="projects" className="pt-10">
          <h2 className="text-5xl md:text-7xl font-bold mb-12 tracking-tighter bg-clip-text text-transparent bg-gradient-to-r from-orange-400 via-red-400 to-rose-400">Selected Works</h2>
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

        {/* Hobbies Section */}
        <div className="pt-10">
          <h2 className="text-5xl md:text-7xl font-bold mb-12 tracking-tighter bg-clip-text text-transparent bg-gradient-to-r from-yellow-400 to-orange-500">Beyond Code</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            <div className="flex flex-col items-center justify-center p-8 rounded-3xl bg-gradient-to-br from-yellow-500/10 to-orange-500/10 border border-yellow-500/30 hover:border-yellow-400 transition-colors text-center gap-4 group shadow-[0_0_20px_rgba(234,179,8,0.1)]">
              <Camera size={36} className="text-yellow-400 group-hover:scale-110 transition-transform" />
              <span className="font-medium text-sm text-yellow-100">Macro Photography</span>
            </div>
            <div className="flex flex-col items-center justify-center p-8 rounded-3xl bg-gradient-to-br from-rose-500/10 to-pink-500/10 border border-rose-500/30 hover:border-rose-400 transition-colors text-center gap-4 group shadow-[0_0_20px_rgba(244,63,94,0.1)]">
              <PenTool size={36} className="text-rose-400 group-hover:scale-110 transition-transform" />
              <span className="font-medium text-sm text-rose-100">Writing Poems</span>
            </div>
            <div className="flex flex-col items-center justify-center p-8 rounded-3xl bg-gradient-to-br from-indigo-500/10 to-purple-500/10 border border-indigo-500/30 hover:border-indigo-400 transition-colors text-center gap-4 group shadow-[0_0_20px_rgba(99,102,241,0.1)]">
              <Music size={36} className="text-indigo-400 group-hover:scale-110 transition-transform" />
              <span className="font-medium text-sm text-indigo-100">Playing Tabla</span>
            </div>
            <div className="flex flex-col items-center justify-center p-8 rounded-3xl bg-gradient-to-br from-emerald-500/10 to-green-500/10 border border-emerald-500/30 hover:border-emerald-400 transition-colors text-center gap-4 group shadow-[0_0_20px_rgba(16,185,129,0.1)]">
              <BookOpen size={36} className="text-emerald-400 group-hover:scale-110 transition-transform" />
              <span className="font-medium text-sm text-emerald-100">Exploring Nature</span>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
