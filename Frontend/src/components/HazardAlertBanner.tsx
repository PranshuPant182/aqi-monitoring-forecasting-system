import React, { useState } from 'react';
import { AlertTriangle, ShieldAlert, X, BellRing, Flame } from 'lucide-react';

interface HazardAlertBannerProps {
  currentAQI?: number;
  city: string;
}

export const HazardAlertBanner: React.FC<HazardAlertBannerProps> = ({ currentAQI = 0, city }) => {
  const [dismissed, setDismissed] = useState(false);

  // Threshold for hazardous warning
  const threshold = 200;
  const isHazardous = currentAQI > threshold;

  if (!isHazardous || dismissed) {
    // If not hazardous, show a subtle clean info banner or nothing
    return (
      <div className="bg-gradient-to-r from-emerald-50 to-teal-50 border border-emerald-200 rounded-2xl p-4 mb-6 flex items-center justify-between shadow-2xs">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-emerald-500 text-white flex items-center justify-center shadow-sm">
            <ShieldAlert className="w-4 h-4" />
          </div>
          <div>
            <h4 className="text-xs font-bold text-emerald-900">Air Quality is within Safe Operating Limits</h4>
            <p className="text-[11px] text-emerald-700 font-medium mt-0.5">Current AQI ({currentAQI}) in {city} is below the hazard warning threshold ({threshold}).</p>
          </div>
        </div>
        <span className="text-xs font-bold text-emerald-800 bg-emerald-200/60 px-2.5 py-1 rounded-lg border border-emerald-300">
          Status: Optimal
        </span>
      </div>
    );
  }

  return (
    <div className="relative bg-gradient-to-r from-rose-500 via-rose-600 to-red-600 text-white rounded-2xl p-6 mb-6 shadow-xl shadow-rose-500/20 border border-rose-400 animate-pulse overflow-hidden">
      {/* Absolute decorative background elements */}
      <div className="absolute -right-10 -bottom-10 w-40 h-40 bg-white/10 rounded-full blur-2xl pointer-events-none" />
      <div className="absolute left-1/3 -top-10 w-32 h-32 bg-amber-400/20 rounded-full blur-xl pointer-events-none" />

      <div className="relative z-10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        {/* Left side: Icon + Warning Text */}
        <div className="flex items-start sm:items-center gap-4">
          <div className="w-12 h-12 rounded-2xl bg-white text-rose-600 flex items-center justify-center shadow-lg flex-shrink-0 animate-bounce">
            <AlertTriangle className="w-7 h-7" />
          </div>

          <div>
            <div className="flex flex-wrap items-center gap-2">
              <h3 className="text-lg font-extrabold tracking-tight">⚠️ HAZARDOUS AIR QUALITY ALERT</h3>
              <span className="bg-amber-400 text-amber-950 text-xs font-black px-2.5 py-0.5 rounded-lg flex items-center gap-1 shadow-sm">
                <Flame className="w-3.5 h-3.5 fill-amber-950" /> SEVERE POLLUTION
              </span>
              <span className="bg-black/30 text-white text-xs font-bold px-2.5 py-0.5 rounded-lg backdrop-blur-xs">
                AQI: {currentAQI}
              </span>
            </div>

            <p className="text-xs text-rose-100 font-medium mt-1 leading-relaxed max-w-3xl">
              <strong className="text-white underline font-semibold">Immediate Action Required for {city}:</strong> Air pollution index has exceeded the critical safety threshold ({threshold}). Everyone, especially children, the elderly, and those with respiratory conditions, should avoid outdoor exertion and keep windows closed.
            </p>
          </div>
        </div>

        {/* Right side: Action Buttons */}
        <div className="flex items-center gap-3 w-full sm:w-auto justify-end flex-shrink-0">
          <button 
            onClick={() => alert(`Emergency Protocols Activated for ${city}. Local health advisories have been notified.`)}
            className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-white text-rose-600 font-bold text-xs shadow-md hover:bg-rose-50 transition-all duration-200 active:scale-95"
          >
            <BellRing className="w-4 h-4 animate-wiggle" /> Broadcast Protocol
          </button>
          
          <button 
            onClick={() => setDismissed(true)}
            className="w-9 h-9 rounded-xl bg-rose-700/50 hover:bg-rose-700 border border-rose-400 flex items-center justify-center text-white transition-all duration-200 active:scale-95"
            title="Dismiss Alert Banner"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Alert Cards Container */}
      <div className="mt-4 pt-4 border-t border-rose-400/40 grid grid-cols-1 sm:grid-cols-3 gap-3 relative z-10">
        <div className="bg-black/20 backdrop-blur-xs rounded-xl p-3 border border-white/10">
          <span className="text-[10px] uppercase font-bold text-rose-200 tracking-wider">Primary Risk</span>
          <p className="text-xs font-semibold text-white mt-0.5">PM2.5 & Particulate Inhalation</p>
        </div>
        <div className="bg-black/20 backdrop-blur-xs rounded-xl p-3 border border-white/10">
          <span className="text-[10px] uppercase font-bold text-rose-200 tracking-wider">Recommended Mask</span>
          <p className="text-xs font-semibold text-white mt-0.5">N95 or P100 Respirator</p>
        </div>
        <div className="bg-black/20 backdrop-blur-xs rounded-xl p-3 border border-white/10">
          <span className="text-[10px] uppercase font-bold text-rose-200 tracking-wider">Ventilation Status</span>
          <p className="text-xs font-semibold text-white mt-0.5">Activate Indoor Air Purifiers</p>
        </div>
      </div>
    </div>
  );
};
