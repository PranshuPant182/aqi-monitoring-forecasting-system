import React from 'react';
import PlotComponent from 'react-plotly.js';
import type { PollutantSummary } from '../types/airQuality';
import { BarChart3, HelpCircle } from 'lucide-react';

const Plot = (PlotComponent as any).default || PlotComponent;

interface PollutantComparisonChartProps {
  pollutantSummary: PollutantSummary;
  city: string;
}

export const PollutantComparisonChart: React.FC<PollutantComparisonChartProps> = ({ pollutantSummary, city }) => {
  const pollutants = ['PM2.5', 'PM10', 'CO', 'NO₂', 'SO₂', 'O₃'];
  const values = [
    pollutantSummary.pm25 || 0,
    pollutantSummary.pm10 || 0,
    pollutantSummary.co || 0,
    pollutantSummary.no2 || 0,
    pollutantSummary.so2 || 0,
    pollutantSummary.o3 || 0,
  ];

  // Specific color coding for each pollutant
  const colors = [
    '#3B82F6', // PM2.5 Blue
    '#8B5CF6', // PM10 Purple
    '#F59E0B', // CO Amber
    '#EF4444', // NO2 Red
    '#10B981', // SO2 Emerald
    '#06B6D4', // O3 Cyan
  ];

  return (
    <section className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm mb-6 transition-all overflow-hidden">
      <div className="flex items-center justify-between pb-4 mb-4 border-b border-slate-100">
        <div className="flex items-center gap-2">
          <BarChart3 className="w-5 h-5 text-indigo-600" />
          <h2 className="text-base font-bold text-slate-800 tracking-tight">
            Multi-Pollutant Concentration Comparison: <span className="text-indigo-600">{city}</span>
          </h2>
        </div>
        <div className="flex items-center gap-1.5 text-xs text-slate-500 bg-slate-50 px-3 py-1 rounded-xl border border-slate-200 shadow-2xs">
          <HelpCircle className="w-3.5 h-3.5 text-slate-400" />
          <span>Measured in µg/m³ (CO in mg/m³)</span>
        </div>
      </div>

      <div className="w-full h-[360px]">
        <Plot
          data={[
            {
              x: pollutants,
              y: values,
              type: 'bar',
              marker: {
                color: colors,
                line: { width: 1, color: colors.map(c => `${c}AA`) }
              },
              hovertemplate: '<b>Pollutant</b>: %{x}<br><b>Concentration</b>: %{y} µg/m³<extra></extra>',
            }
          ]}
          layout={{
            autosize: true,
            margin: { l: 50, r: 20, t: 20, b: 40 },
            paper_bgcolor: 'transparent',
            plot_bgcolor: 'transparent',
            xaxis: {
              title: { text: 'Pollutant Species', font: { size: 12, color: '#64748b' } },
              gridcolor: '#f1f5f9',
              tickfont: { size: 12, color: '#334155', weight: 'bold' },
            },
            yaxis: {
              title: { text: 'Concentration (µg/m³)', font: { size: 12, color: '#64748b' } },
              gridcolor: '#f1f5f9',
              zerolinecolor: '#f1f5f9',
              tickfont: { size: 11, color: '#64748b' },
            },
            font: { family: 'Inter, sans-serif' },
            hovermode: 'closest'
          }}
          config={{
            responsive: true,
            displayModeBar: false,
            displaylogo: false,
          }}
          style={{ width: '100%', height: '100%' }}
        />
      </div>
    </section>
  );
};
