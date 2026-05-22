import React from 'react';
import PlotComponent from 'react-plotly.js';
import { Gauge, ShieldAlert } from 'lucide-react';

const Plot = (PlotComponent as any).default || PlotComponent;

interface AQIGaugeProps {
  currentAQI?: number;
  city: string;
}

export const AQIGauge: React.FC<AQIGaugeProps> = ({ currentAQI = 0, city }) => {
  const getCategory = (aqi: number) => {
    if (aqi <= 50) return { text: 'Good', color: '#10B981', desc: 'Air quality is considered satisfactory, and air pollution poses little or no risk.' };
    if (aqi <= 100) return { text: 'Satisfactory', color: '#14B8A6', desc: 'Air quality is acceptable; however, there may be a moderate health concern for a very small number of people.' };
    if (aqi <= 200) return { text: 'Moderate', color: '#F59E0B', desc: 'Members of sensitive groups may experience health effects. The general public is not likely to be affected.' };
    if (aqi <= 300) return { text: 'Poor', color: '#F97316', desc: 'Everyone may begin to experience health effects; members of sensitive groups may experience more serious health effects.' };
    if (aqi <= 400) return { text: 'Very Poor', color: '#8B5CF6', desc: 'Health warnings of emergency conditions. The entire population is more likely to be affected.' };
    return { text: 'Severe / Hazardous', color: '#E11D48', desc: 'Health alert: everyone may experience more serious health effects. Avoid outdoor activities.' };
  };

  const category = getCategory(currentAQI);

  return (
    <section className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm mb-6 transition-all overflow-hidden flex flex-col justify-between">
      <div className="flex items-center justify-between pb-4 mb-2 border-b border-slate-100">
        <div className="flex items-center gap-2">
          <Gauge className="w-5 h-5 text-teal-600" />
          <h2 className="text-base font-bold text-slate-800 tracking-tight">
            Live AQI Radial Gauge: <span className="text-teal-600">{city}</span>
          </h2>
        </div>
        <span className="text-xs font-bold px-2.5 py-1 rounded-xl bg-slate-100 text-slate-700 border border-slate-200 shadow-2xs">
          Max Scale: 500
        </span>
      </div>

      <div className="w-full h-[280px] flex items-center justify-center relative">
        <Plot
          data={[
            {
              type: 'indicator',
              mode: 'gauge+number+delta',
              value: currentAQI,
              title: { text: `<span style="font-size:16px;font-weight:bold;color:${category.color}">${category.text}</span>`, font: { size: 18 } },
              delta: { reference: 100, increasing: { color: '#EF4444' }, decreasing: { color: '#10B981' } },
              gauge: {
                axis: { range: [0, 500], tickwidth: 1, tickcolor: '#cbd5e1' },
                bar: { color: category.color, thickness: 0.25 },
                bgcolor: '#f8fafc',
                borderwidth: 2,
                bordercolor: '#e2e8f0',
                steps: [
                  { range: [0, 50], color: 'rgba(16, 185, 129, 0.15)' },     // Green
                  { range: [50, 100], color: 'rgba(20, 184, 166, 0.15)' },   // Yellow/Teal
                  { range: [100, 200], color: 'rgba(245, 158, 11, 0.15)' },  // Orange
                  { range: [200, 300], color: 'rgba(249, 115, 22, 0.15)' },  // Red/Orange
                  { range: [300, 400], color: 'rgba(139, 92, 246, 0.15)' },  // Purple
                  { range: [400, 500], color: 'rgba(225, 29, 72, 0.15)' }    // Severe Red
                ],
                threshold: {
                  line: { color: '#EF4444', width: 4 },
                  thickness: 0.75,
                  value: currentAQI
                }
              }
            }
          ]}
          layout={{
            autosize: true,
            margin: { l: 30, r: 30, t: 30, b: 30 },
            paper_bgcolor: 'transparent',
            font: { family: 'Inter, sans-serif' }
          }}
          config={{
            responsive: true,
            displayModeBar: false,
          }}
          style={{ width: '100%', height: '100%' }}
        />
      </div>

      <div className="mt-2 p-3 bg-slate-50 border border-slate-200 rounded-xl flex items-start gap-2.5 shadow-2xs">
        <ShieldAlert className="w-4 h-4 text-slate-500 flex-shrink-0 mt-0.5" />
        <p className="text-xs text-slate-600 font-medium leading-relaxed">
          <strong className="text-slate-800">Health Recommendation:</strong> {category.desc}
        </p>
      </div>
    </section>
  );
};
