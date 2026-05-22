import React from 'react';
import { MapPin, Calendar as CalendarIcon, Clock } from 'lucide-react';
import type { FilterState } from '../types/airQuality';

interface HeaderProps {
  filters: FilterState;
  setFilters: React.Dispatch<React.SetStateAction<FilterState>>;
  currentAQI?: number;
}

export const Header: React.FC<HeaderProps> = ({ filters, setFilters, currentAQI }) => {
  const toggleMode = () => {
    setFilters(prev => ({
      ...prev,
      mode: prev.mode === 'realtime' ? 'historical' : 'realtime'
    }));
  };

  const getAQIStatus = (aqi?: number) => {
    if (!aqi) return { text: 'Calculating...', color: 'bg-slate-500', textCol: 'text-slate-500' };
    if (aqi <= 50) return { text: 'Good (Safe)', color: 'bg-emerald-500', textCol: 'text-emerald-600' };
    if (aqi <= 100) return { text: 'Satisfactory', color: 'bg-teal-500', textCol: 'text-teal-600' };
    if (aqi <= 200) return { text: 'Moderate', color: 'bg-amber-500', textCol: 'text-amber-600' };
    if (aqi <= 300) return { text: 'Poor', color: 'bg-orange-500', textCol: 'text-orange-600' };
    if (aqi <= 400) return { text: 'Very Poor', color: 'bg-purple-500', textCol: 'text-purple-600' };
    return { text: 'Severe / Hazardous', color: 'bg-rose-600', textCol: 'text-rose-600' };
  };

  const aqiStatus = getAQIStatus(currentAQI);

  return (
    <header className="bg-white border-b border-slate-200 px-6 py-4 shadow-sm flex flex-col md:flex-row items-start md:items-center justify-between gap-4 transition-all">
      {/* Title & Subtitle */}
      <div>
        <div className="flex items-center gap-2">
          <h1 className="text-2xl font-bold text-slate-800 tracking-tight">Air Quality Monitoring Dashboard</h1>
          <span className="bg-emerald-100 text-emerald-800 text-[10px] font-semibold px-2.5 py-0.5 rounded-full border border-emerald-300 flex items-center gap-1 shadow-sm">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-ping" /> Live AI Analytics
          </span>
        </div>
        <p className="text-xs text-slate-500 mt-0.5">Comprehensive real-time environmental intelligence, pollutant tracking & regional forecasting</p>
      </div>

      {/* Quick Status & Toggles */}
      <div className="flex flex-wrap items-center gap-3 w-full md:w-auto justify-end">
        {/* City Badge */}
        <div className="flex items-center gap-1.5 px-3 py-1.5 bg-slate-100 border border-slate-200 rounded-xl text-slate-700 shadow-sm hover:bg-slate-200/60 transition-colors">
          <MapPin className="w-4 h-4 text-emerald-600" />
          <span className="text-xs font-semibold">{filters.city || 'All Cities'}</span>
        </div>

        {/* Date Display */}
        <div className="flex items-center gap-1.5 px-3 py-1.5 bg-slate-100 border border-slate-200 rounded-xl text-slate-700 shadow-sm">
          <CalendarIcon className="w-4 h-4 text-indigo-600" />
          <span className="text-xs font-medium">
            {filters.startDate} to {filters.endDate}
          </span>
        </div>

        {/* Live Status Indicator */}
        {currentAQI && (
          <div className="flex items-center gap-2 px-3 py-1.5 bg-slate-50 border border-slate-200 rounded-xl shadow-sm">
            <span className={`w-2.5 h-2.5 rounded-full ${aqiStatus.color} shadow-sm`} />
            <span className="text-xs font-bold text-slate-700">AQI: {currentAQI}</span>
            <span className={`text-[11px] font-semibold ${aqiStatus.textCol}`}>({aqiStatus.text})</span>
          </div>
        )}

        {/* Real-time vs Historical Toggle Button */}
        <button
          onClick={toggleMode}
          className={`relative inline-flex items-center gap-2 px-4 py-1.5 rounded-xl text-xs font-bold shadow-sm transition-all duration-300 transform active:scale-95 ${
            filters.mode === 'realtime'
              ? 'bg-gradient-to-r from-emerald-500 to-teal-500 text-white shadow-emerald-500/20'
              : 'bg-gradient-to-r from-indigo-500 to-purple-500 text-white shadow-indigo-500/20'
          }`}
        >
          <Clock className={`w-3.5 h-3.5 ${filters.mode === 'realtime' ? 'animate-spin' : ''}`} />
          <span>{filters.mode === 'realtime' ? 'Real-Time Mode' : 'Historical Mode'}</span>
        </button>
      </div>
    </header>
  );
};
