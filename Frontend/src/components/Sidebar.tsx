import React from 'react';
import { 
  LayoutDashboard, 
  Wind, 
  AlertTriangle, 
  BarChart2, 
  Calendar, 
  FileText
} from 'lucide-react';

interface SidebarProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

export const Sidebar: React.FC<SidebarProps> = ({ activeTab, setActiveTab }) => {
  const navItems = [
    { id: 'dashboard', label: 'Dashboard Overview', icon: LayoutDashboard },
    { id: 'analytics', label: 'Pollutant Analytics', icon: BarChart2 },
    { id: 'alerts', label: 'Hazard Alerts', icon: AlertTriangle },
    { id: 'regional', label: 'Regional Ranking', icon: Wind },
    { id: 'forecast', label: 'AQI Forecasting', icon: Calendar },
    { id: 'insights', label: 'AI Insights & Health', icon: FileText },
  ];

  return (
    <aside className="w-64 bg-slate-900 text-slate-300 flex flex-col h-full shadow-2xl border-r border-slate-800 hidden lg:flex flex-shrink-0">
      {/* Brand Header */}
      <div className="p-6 border-b border-slate-800 flex items-center gap-3">
        <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-emerald-500 to-teal-400 flex items-center justify-center shadow-lg shadow-emerald-500/30">
          <Wind className="w-6 h-6 text-white animate-pulse" />
        </div>
        <div>
          <h1 className="font-bold text-white text-lg tracking-wide">AQI<span className="text-emerald-400">Pulse</span></h1>
          <p className="text-xs text-slate-400">Environmental Analytics</p>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 px-4 py-6 space-y-1.5 overflow-y-auto">
        <p className="px-3 text-xs font-semibold text-slate-500 uppercase tracking-wider mb-3">Main Menu</p>
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = activeTab === item.id;
          return (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all duration-200 group ${
                isActive 
                  ? 'bg-gradient-to-r from-emerald-600 to-teal-600 text-white shadow-lg shadow-emerald-600/25 font-semibold' 
                  : 'text-slate-400 hover:bg-slate-800/60 hover:text-slate-200'
              }`}
            >
              <Icon className={`w-5 h-5 transition-transform duration-200 group-hover:scale-110 ${isActive ? 'text-white' : 'text-slate-400 group-hover:text-emerald-400'}`} />
              {item.label}
              {isActive && (
                <div className="ml-auto w-1.5 h-4 bg-white rounded-full" />
              )}
            </button>
          );
        })}

        <div className="pt-8 mb-3">
          <p className="px-3 text-xs font-semibold text-slate-500 uppercase tracking-wider mb-3">System Status</p>
          <div className="mx-2 p-4 rounded-xl bg-slate-800/50 border border-slate-700/50 flex flex-col gap-2">
            <div className="flex items-center justify-between">
              <span className="text-xs text-slate-400">Sensors</span>
              <span className="text-xs font-semibold text-emerald-400 flex items-center gap-1">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" /> Online
              </span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-xs text-slate-400">Data Sync</span>
              <span className="text-xs font-semibold text-slate-300">Live API</span>
            </div>
          </div>
        </div>
      </nav>

      {/* Footer Profile / Enterprise Info */}
      <div className="p-4 border-t border-slate-800 bg-slate-950/40">
        <div className="flex items-center gap-3 p-2 rounded-lg bg-slate-800/40 border border-slate-800">
          <div className="w-8 h-8 rounded-lg bg-emerald-500/20 border border-emerald-500/30 flex items-center justify-center text-emerald-400 font-bold text-xs">
            ⚡
          </div>
          <div className="overflow-hidden">
            <p className="text-xs font-medium text-slate-200 truncate">Enterprise Edition</p>
            <p className="text-[10px] text-slate-400 truncate">v2.4.0-production</p>
          </div>
        </div>
      </div>
    </aside>
  );
};
