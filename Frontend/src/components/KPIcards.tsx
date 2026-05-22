import React, { useState, useEffect } from 'react';
import type { KPIData } from '../types/airQuality';
import { 
  Activity, 
  TrendingUp, 
  TrendingDown, 
  AlertOctagon, 
  ShieldCheck, 
  Clock, 
  MapPin 
} from 'lucide-react';

interface KPIcardsProps {
  kpiData: KPIData;
  isLoading?: boolean;
}

// Helper component for animated counter
const AnimatedCounter: React.FC<{ value: number; suffix?: string; prefix?: string }> = ({ value, suffix = '', prefix = '' }) => {
  const [displayValue, setDisplayValue] = useState(0);

  useEffect(() => {
    let start = 0;
    const end = value || 0;
    if (end === 0) {
      setDisplayValue(0);
      return;
    }
    const duration = 1000;
    const increment = end / (duration / 16);

    const timer = setInterval(() => {
      start += increment;
      if (start >= end) {
        clearInterval(timer);
        setDisplayValue(end);
      } else {
        setDisplayValue(Math.round(start));
      }
    }, 16);

    return () => clearInterval(timer);
  }, [value]);

  return (
    <span className="font-mono tracking-tight">
      {prefix}{displayValue}{suffix}
    </span>
  );
};

export const KPIcards: React.FC<KPIcardsProps> = ({ kpiData, isLoading = false }) => {
  const cards = [
    {
      title: 'Average AQI',
      value: Math.round(kpiData.avg_aqi || 0),
      icon: Activity,
      color: 'bg-emerald-500/10 text-emerald-600 border-emerald-200',
      iconBg: 'bg-emerald-500 text-white',
      desc: 'Overall mean air quality index',
      indicator: kpiData.avg_aqi > 200 ? 'Poor' : kpiData.avg_aqi > 100 ? 'Moderate' : 'Good'
    },
    {
      title: 'Maximum Peak AQI',
      value: Math.round(kpiData.max_aqi || 0),
      icon: TrendingUp,
      color: 'bg-rose-500/10 text-rose-600 border-rose-200',
      iconBg: 'bg-rose-500 text-white',
      desc: 'Highest recorded pollution level',
      indicator: kpiData.max_aqi > 400 ? 'Severe' : 'Very Poor'
    },
    {
      title: 'Minimum Clean AQI',
      value: Math.round(kpiData.min_aqi || 0),
      icon: TrendingDown,
      color: 'bg-teal-500/10 text-teal-600 border-teal-200',
      iconBg: 'bg-teal-500 text-white',
      desc: 'Lowest recorded pollution level',
      indicator: 'Safe Level'
    },
    {
      title: 'Hazardous Days Count',
      value: kpiData.hazardous_days || 0,
      icon: AlertOctagon,
      color: 'bg-amber-500/10 text-amber-600 border-amber-200',
      iconBg: 'bg-amber-500 text-white',
      desc: 'Days exceeding safe thresholds',
      indicator: `${kpiData.hazardous_days || 0} Days`
    },
    {
      title: 'Safe / Clean Days Count',
      value: kpiData.safe_days || 0,
      icon: ShieldCheck,
      color: 'bg-indigo-500/10 text-indigo-600 border-indigo-200',
      iconBg: 'bg-indigo-500 text-white',
      desc: 'Days within healthy limits',
      indicator: `${kpiData.safe_days || 0} Days`
    },
    {
      title: 'Peak Pollution Hour',
      value: kpiData.peak_hour || '08:00 AM',
      icon: Clock,
      color: 'bg-purple-500/10 text-purple-600 border-purple-200',
      iconBg: 'bg-purple-500 text-white',
      desc: 'Historical daily high traffic hour',
      isString: true,
      indicator: 'High Traffic'
    },
    {
      title: 'Most Polluted City',
      value: kpiData.most_polluted_city || 'Ahmedabad',
      icon: MapPin,
      color: 'bg-orange-500/10 text-orange-600 border-orange-200',
      iconBg: 'bg-orange-500 text-white',
      desc: 'Highest regional average AQI',
      isString: true,
      indicator: 'Regional Max'
    },
  ];

  if (isLoading) {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-6">
        {[1, 2, 3, 4, 5, 6, 7].map(n => (
          <div key={n} className="bg-white border border-slate-200 rounded-2xl p-6 h-36 animate-pulse flex flex-col justify-between shadow-sm">
            <div className="w-1/2 h-4 bg-slate-200 rounded" />
            <div className="w-3/4 h-8 bg-slate-200 rounded" />
            <div className="w-1/3 h-3 bg-slate-200 rounded" />
          </div>
        ))}
      </div>
    );
  }

  return (
    <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-6">
      {cards.map((card, idx) => {
        const Icon = card.icon;
        return (
          <div
            key={idx}
            className="group bg-white border border-slate-200 rounded-2xl p-5 hover:shadow-xl hover:border-emerald-300 transition-all duration-300 transform hover:-translate-y-1 relative overflow-hidden flex flex-col justify-between shadow-sm"
          >
            {/* Top row: Title & Icon */}
            <div className="flex items-center justify-between gap-3 mb-3">
              <span className="text-xs font-bold text-slate-500 tracking-wider uppercase">{card.title}</span>
              <div className={`w-9 h-9 rounded-xl flex items-center justify-center shadow-md transition-transform duration-300 group-hover:rotate-12 ${card.iconBg}`}>
                <Icon className="w-4 h-4" />
              </div>
            </div>

            {/* Main Value */}
            <div className="my-1">
              <div className="text-3xl font-extrabold text-slate-800 tracking-tight">
                {card.isString ? (
                  <span className="font-sans text-xl font-bold text-slate-800">{card.value}</span>
                ) : (
                  <AnimatedCounter value={card.value as number} />
                )}
              </div>
            </div>

            {/* Bottom row: Description & Indicator Badge */}
            <div className="flex items-center justify-between pt-3 mt-2 border-t border-slate-100">
              <span className="text-[11px] text-slate-400 font-medium truncate pr-2">{card.desc}</span>
              <span className={`text-[10px] font-bold px-2 py-0.5 rounded-lg border shadow-2xs ${card.color}`}>
                {card.indicator}
              </span>
            </div>

            {/* Decorative background glow on hover */}
            <div className="absolute -right-10 -bottom-10 w-24 h-24 bg-gradient-to-br from-emerald-500/5 to-teal-500/5 rounded-full blur-xl group-hover:scale-150 transition-transform duration-500 pointer-events-none" />
          </div>
        );
      })}
    </section>
  );
};
