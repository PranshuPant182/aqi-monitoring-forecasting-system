import React, { useState } from 'react';
import PlotComponent from 'react-plotly.js';
import type { RegionalSummary } from '../types/airQuality';
import { Globe, Trophy, ArrowUpDown, Map } from 'lucide-react';

const Plot = (PlotComponent as any).default || PlotComponent;

interface RegionalComparisonProps {
  regionalData: RegionalSummary[];
}

export const RegionalComparison: React.FC<RegionalComparisonProps> = ({ regionalData }) => {
  const [viewMode, setViewMode] = useState<'table' | 'heatmap'>('table');

  const sortedData = [...regionalData].sort((a, b) => b.avg_aqi - a.avg_aqi);
  const mostPolluted = sortedData[0];
  const leastPolluted = sortedData[sortedData.length - 1];

  const cities = sortedData.map(d => d.city);
  const avgAqiValues = sortedData.map(d => d.avg_aqi);
  const maxAqiValues = sortedData.map(d => d.max_aqi);

  return (
    <section className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm mb-6 transition-all overflow-hidden">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between pb-4 mb-6 border-b border-slate-100 gap-4">
        <div className="flex items-center gap-2 text-slate-800">
          <Globe className="w-5 h-5 text-indigo-600" />
          <h2 className="text-base font-bold tracking-tight">Regional Air Quality Intelligence & Rankings</h2>
        </div>

        {/* View Mode Toggle */}
        <div className="flex items-center gap-1.5 bg-slate-100 p-1 rounded-xl border border-slate-200 shadow-2xs">
          <button
            onClick={() => setViewMode('table')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition-all duration-200 ${
              viewMode === 'table'
                ? 'bg-white text-indigo-600 shadow-sm'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <Trophy className="w-3.5 h-3.5" /> Table & Rankings
          </button>
          <button
            onClick={() => setViewMode('heatmap')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition-all duration-200 ${
              viewMode === 'heatmap'
                ? 'bg-white text-indigo-600 shadow-sm'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <Map className="w-3.5 h-3.5" /> Plotly Heatmap
          </button>
        </div>
      </div>

      {/* Regional Quick Summary Banners */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
        {mostPolluted && (
          <div className="p-4 bg-rose-50 border border-rose-200 rounded-2xl flex items-center justify-between shadow-2xs">
            <div>
              <span className="text-[10px] font-bold uppercase tracking-wider text-rose-600 bg-rose-100 px-2 py-0.5 rounded-md">Rank #1 Most Polluted</span>
              <h3 className="text-base font-extrabold text-slate-900 mt-1">{mostPolluted.city}</h3>
              <p className="text-xs text-slate-600 mt-0.5">Average AQI: <strong className="text-rose-600 font-bold">{mostPolluted.avg_aqi}</strong> (Peak: {mostPolluted.max_aqi})</p>
            </div>
            <div className="w-12 h-12 rounded-2xl bg-rose-500 text-white flex items-center justify-center font-black text-lg shadow-md shadow-rose-500/30">
              ⚠️
            </div>
          </div>
        )}

        {leastPolluted && (
          <div className="p-4 bg-emerald-50 border border-emerald-200 rounded-2xl flex items-center justify-between shadow-2xs">
            <div>
              <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-700 bg-emerald-100 px-2 py-0.5 rounded-md">Safest Region</span>
              <h3 className="text-base font-extrabold text-slate-900 mt-1">{leastPolluted.city}</h3>
              <p className="text-xs text-slate-600 mt-0.5">Average AQI: <strong className="text-emerald-600 font-bold">{leastPolluted.avg_aqi}</strong> (Cleanest)</p>
            </div>
            <div className="w-12 h-12 rounded-2xl bg-emerald-500 text-white flex items-center justify-center font-black text-lg shadow-md shadow-emerald-500/30">
              🌿
            </div>
          </div>
        )}
      </div>

      {/* Main Content Area */}
      {viewMode === 'table' ? (
        <div className="overflow-x-auto rounded-xl border border-slate-200 shadow-xs">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-100 border-b border-slate-200 text-slate-600 text-[11px] font-bold uppercase tracking-wider">
                <th className="py-3 px-4 flex items-center gap-1"><ArrowUpDown className="w-3 h-3" /> Rank</th>
                <th className="py-3 px-4">City / Region</th>
                <th className="py-3 px-4">Average AQI</th>
                <th className="py-3 px-4">Maximum Peak AQI</th>
                <th className="py-3 px-4">Minimum Clean AQI</th>
                <th className="py-3 px-4">Severity Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-xs font-medium text-slate-700">
              {sortedData.map((row, index) => {
                const getStatusBadge = (aqi: number) => {
                  if (aqi <= 50) return <span className="px-2.5 py-1 rounded-lg bg-emerald-100 text-emerald-800 font-bold text-[10px]">Good</span>;
                  if (aqi <= 100) return <span className="px-2.5 py-1 rounded-lg bg-teal-100 text-teal-800 font-bold text-[10px]">Satisfactory</span>;
                  if (aqi <= 200) return <span className="px-2.5 py-1 rounded-lg bg-amber-100 text-amber-800 font-bold text-[10px]">Moderate</span>;
                  if (aqi <= 300) return <span className="px-2.5 py-1 rounded-lg bg-orange-100 text-orange-800 font-bold text-[10px]">Poor</span>;
                  return <span className="px-2.5 py-1 rounded-lg bg-rose-100 text-rose-800 font-bold text-[10px]">Severe</span>;
                };

                return (
                  <tr key={row.city} className="hover:bg-slate-50/80 transition-colors">
                    <td className="py-3 px-4 font-bold text-slate-900">
                      <span className={`inline-flex items-center justify-center w-6 h-6 rounded-lg ${
                        index === 0 ? 'bg-rose-500 text-white font-black shadow-sm' : 
                        index === 1 ? 'bg-amber-500 text-white font-black shadow-sm' : 
                        index === 2 ? 'bg-orange-500 text-white font-black shadow-sm' : 'bg-slate-200 text-slate-700'
                      }`}>
                        #{index + 1}
                      </span>
                    </td>
                    <td className="py-3 px-4 font-bold text-slate-900">{row.city}</td>
                    <td className="py-3 px-4 font-mono font-bold text-slate-800">{row.avg_aqi}</td>
                    <td className="py-3 px-4 font-mono text-rose-600 font-semibold">{row.max_aqi}</td>
                    <td className="py-3 px-4 font-mono text-emerald-600 font-semibold">{row.min_aqi}</td>
                    <td className="py-3 px-4">{getStatusBadge(row.avg_aqi)}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      ) : (
        <div className="w-full h-[400px]">
          <Plot
            data={[
              {
                x: ['Average AQI', 'Max Peak AQI'],
                y: cities,
                z: cities.map((_, i) => [avgAqiValues[i], maxAqiValues[i]]),
                type: 'heatmap',
                colorscale: [
                  [0, '#10B981'],     // Green
                  [0.25, '#14B8A6'],  // Teal
                  [0.5, '#F59E0B'],   // Amber
                  [0.75, '#F97316'],  // Orange
                  [1, '#E11D48']      // Rose/Red
                ],
                hovertemplate: '<b>City</b>: %{y}<br><b>Metric</b>: %{x}<br><b>Value</b>: %{z}<extra></extra>'
              }
            ]}
            layout={{
              autosize: true,
              margin: { l: 120, r: 20, t: 20, b: 40 },
              paper_bgcolor: 'transparent',
              plot_bgcolor: 'transparent',
              xaxis: {
                tickfont: { size: 12, color: '#334155', weight: 'bold' }
              },
              yaxis: {
                tickfont: { size: 11, color: '#475569' },
                autorange: 'reversed'
              },
              font: { family: 'Inter, sans-serif' }
            }}
            config={{
              responsive: true,
              displayModeBar: false
            }}
            style={{ width: '100%', height: '100%' }}
          />
        </div>
      )}
    </section>
  );
};
