import { Mail, Code, Camera } from "lucide-react";

export default function Footer() {
  return (
    <footer id="contact" className="relative z-20 bg-[#0a0a0a] text-white py-20 px-6 md:px-20 border-t border-white/10">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-start gap-12">
        <div className="max-w-md">
          <h2 className="text-3xl font-bold tracking-tight mb-4">Let's Connect</h2>
          <p className="text-gray-400 font-light mb-8 italic leading-relaxed">
            “I don’t just want to write code — I want to create something meaningful that reflects both logic and emotion.”
          </p>
          <div className="flex gap-4">
            <a href="mailto:arghyarancho@gmail.com" className="p-3 bg-white/5 rounded-full hover:bg-white/10 transition-colors border border-white/5 text-gray-400 hover:text-white">
              <Mail size={20} />
            </a>
            <a href="https://github.com/roychowdhury-arghya" target="_blank" rel="noreferrer" className="p-3 bg-white/5 rounded-full hover:bg-white/10 transition-colors border border-white/5 text-gray-400 hover:text-white">
              <Code size={20} />
            </a>
            <a href="#" className="p-3 bg-white/5 rounded-full hover:bg-white/10 transition-colors border border-white/5 text-gray-400 hover:text-white">
              <Camera size={20} />
            </a>
          </div>
        </div>
        
        <div className="text-left md:text-right">
          <p className="text-gray-300 font-medium">Arghya Roy Chowdhury</p>
          <p className="text-gray-500 font-light text-sm mt-2">B.Tech IT Student</p>
          <p className="text-gray-500 font-light text-sm">Maulana Abul Kalam Azad University of Technology</p>
          <p className="text-white/20 font-light text-xs mt-8">© {new Date().getFullYear()} All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
