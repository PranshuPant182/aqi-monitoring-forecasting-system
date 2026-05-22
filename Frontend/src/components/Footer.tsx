import React from 'react';
import { Code2, BookOpen } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-white border-t border-slate-200 mt-auto py-8 px-6 transition-all">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6 text-slate-600 text-xs font-medium">
        {/* Platform Info */}
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-emerald-500 to-teal-500 text-white flex items-center justify-center shadow-md shadow-emerald-500/20 font-bold text-xs">
            🌍
          </div>
          <div>
            <p className="font-bold text-slate-800 text-sm tracking-tight">Air Quality Monitoring Dashboard</p>
            <p className="text-slate-500 text-[11px] mt-0.5">Advanced Environmental Intelligence & Real-Time Analytics Platform</p>
          </div>
        </div>

        {/* Tech Stack Tags */}
        <div className="flex flex-wrap items-center gap-2 justify-center">
          <span className="px-3 py-1 rounded-lg bg-slate-100 border border-slate-200 text-slate-700 font-semibold text-[11px]">React 19</span>
          <span className="px-3 py-1 rounded-lg bg-slate-100 border border-slate-200 text-slate-700 font-semibold text-[11px]">TypeScript</span>
          <span className="px-3 py-1 rounded-lg bg-slate-100 border border-slate-200 text-slate-700 font-semibold text-[11px]">Vite</span>
          <span className="px-3 py-1 rounded-lg bg-slate-100 border border-slate-200 text-slate-700 font-semibold text-[11px]">Plotly.js</span>
          <span className="px-3 py-1 rounded-lg bg-slate-100 border border-slate-200 text-slate-700 font-semibold text-[11px]">Tailwind CSS</span>
        </div>

        {/* Links & Copyright */}
        <div className="flex items-center gap-4 text-slate-500">
          <a href="#" className="hover:text-emerald-600 transition-colors flex items-center gap-1">
            <BookOpen className="w-3.5 h-3.5" /> API Docs
          </a>
          <a href="#" className="hover:text-emerald-600 transition-colors flex items-center gap-1">
            <Code2 className="w-3.5 h-3.5" /> Source Code
          </a>
          <span className="text-slate-300">|</span>
          <span>© 2026 AQIPulse Enterprise</span>
        </div>
      </div>
    </footer>
  );
};
