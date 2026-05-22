import React from 'react';
import PlotComponent from 'react-plotly.js';
import type { AQIData } from '../types/airQuality';
import { LineChart, Calendar } from 'lucide-react';

const Plot = (PlotComponent as any).default || PlotComponent;

interface AQITrendChartProps {
  aqiData: AQIData[];
  city: string;
}

export const AQITrendChart: React.FC<AQITrendChartProps> = ({ aqiData, city }) => {
  const dates = aqiData.map(d => d.date);
  const aqiValues = aqiData.map(d => d.aqi);

  // Calculate moving average or threshold line for rich visualization
  const thresholdLine = aqiValues.map(() => 100); // 100 is satisfactory limit

  return (
    <section className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm mb-6 transition-all overflow-hidden">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between pb-4 mb-4 border-b border-slate-100 gap-2">
        <div className="flex items-center gap-2">
          <LineChart className="w-5 h-5 text-emerald-600" />
          <h2 className="text-base font-bold text-slate-800 tracking-tight">
            AQI Historical & Real-Time Trend Analysis: <span className="text-emerald-600">{city}</span>
          </h2>
        </div>
        <div className="flex items-center gap-2 bg-slate-50 px-3 py-1.5 rounded-xl border border-slate-200 text-xs text-slate-600 font-medium shadow-2xs">
          <Calendar className="w-3.5 h-3.5 text-slate-500" />
          <span>{dates.length} Data Points Recorded</span>
        </div>
      </div>

      <div className="w-full h-[400px]">
        {aqiData.length === 0 ? (
          <div className="w-full h-full flex items-center justify-center bg-slate-50 rounded-xl border border-dashed border-slate-200 text-slate-400 font-medium text-sm">
            No AQI data available for the selected filters. Please adjust date range or city.
          </div>
        ) : (
          <Plot
            data={[
              {
                x: dates,
                y: aqiValues,
                type: 'scatter',
                mode: 'lines+markers',
                name: 'Recorded AQI',
                line: { color: '#10B981', width: 3, shape: 'spline' },
                marker: { size: 5, color: '#047857' },
                fill: 'tozeroy',
                fillcolor: 'rgba(16, 185, 129, 0.1)',
                hovertemplate: '<b>Date</b>: %{x}<br><b>AQI Level</b>: %{y}<extra></extra>',
              },
              {
                x: dates,
                y: thresholdLine,
                type: 'scatter',
                mode: 'lines',
                name: 'Safe Limit (100)',
                line: { color: '#EF4444', width: 2, dash: 'dash' },
                hovertemplate: '<b>Safe Threshold</b>: 100<extra></extra>',
              }
            ]}
            layout={{
              autosize: true,
              margin: { l: 50, r: 20, t: 20, b: 40 },
              paper_bgcolor: 'transparent',
              plot_bgcolor: 'transparent',
              xaxis: {
                title: { text: 'Timeline', font: { size: 12, color: '#64748b' } },
                gridcolor: '#f1f5f9',
                zerolinecolor: '#f1f5f9',
                tickfont: { size: 11, color: '#64748b' },
              },
              yaxis: {
                title: { text: 'Air Quality Index (AQI)', font: { size: 12, color: '#64748b' } },
                gridcolor: '#f1f5f9',
                zerolinecolor: '#f1f5f9',
                tickfont: { size: 11, color: '#64748b' },
              },
              hovermode: 'x unified',
              legend: { orientation: 'h', y: 1.1, x: 0.5, xanchor: 'center' },
              font: { family: 'Inter, sans-serif' }
            }}
            config={{
              responsive: true,
              displayModeBar: true,
              displaylogo: false,
              modeBarButtonsToRemove: ['lasso2d', 'select2d'],
            }}
            style={{ width: '100%', height: '100%' }}
          />
        )}
      </div>
    </section>
  );
};
