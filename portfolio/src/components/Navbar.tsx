"use client";

import { motion } from "framer-motion";
import Link from "next/link";

export default function Navbar() {
  return (
    <motion.nav 
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-6 py-4 md:px-12 backdrop-blur-md bg-[#121212]/50 border-b border-white/5"
    >
      <div className="font-bold text-xl tracking-tighter text-white">
        Arghya RC.
      </div>
      <div className="hidden md:flex items-center gap-8 text-sm font-medium text-gray-300">
        <Link href="#about" className="hover:text-white transition-colors">About</Link>
        <Link href="#skills" className="hover:text-white transition-colors">Skills</Link>
        <Link href="#projects" className="hover:text-white transition-colors">Projects</Link>
        <Link href="#contact" className="hover:text-white transition-colors">Contact</Link>
      </div>
      <button className="md:hidden text-white">
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="3" y1="12" x2="21" y2="12"></line><line x1="3" y1="6" x2="21" y2="6"></line><line x1="3" y1="18" x2="21" y2="18"></line></svg>
      </button>
    </motion.nav>
  );
}
