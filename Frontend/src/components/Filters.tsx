import React from 'react';
import type { FilterState, City } from '../types/airQuality';
import { Filter, RotateCcw, MapPin, Calendar, Activity, SlidersHorizontal } from 'lucide-react';

interface FiltersPanelProps {
  filters: FilterState;
  setFilters: React.Dispatch<React.SetStateAction<FilterState>>;
  cities: City[];
}

export const FiltersPanel: React.FC<FiltersPanelProps> = ({ filters, setFilters, cities }) => {
  const handleChange = (e: React.ChangeEvent<HTMLSelectElement | HTMLInputElement>) => {
    const { name, value } = e.target;
    setFilters(prev => ({ ...prev, [name]: value }));
  };

  const handleReset = () => {
    setFilters({
      city: cities.length > 0 ? cities[0].city : 'Ahmedabad',
      startDate: '2015-01-01',
      endDate: '2017-03-01',
      pollutantType: 'pm25',
      aqiCategory: 'ALL',
      mode: 'realtime'
    });
  };

  const pollutantOptions = [
    { id: 'pm25', label: 'PM2.5 (Fine Particulate Matter)' },
    { id: 'pm10', label: 'PM10 (Coarse Particulates)' },
    { id: 'co', label: 'CO (Carbon Monoxide)' },
    { id: 'no2', label: 'NO₂ (Nitrogen Dioxide)' },
    { id: 'so2', label: 'SO₂ (Sulfur Dioxide)' },
    { id: 'o3', label: 'O₃ (Ozone)' },
  ];

  const aqiCategories = [
    { id: 'ALL', label: 'All Categories' },
    { id: 'Good', label: 'Good (0-50)' },
    { id: 'Moderate', label: 'Moderate (51-200)' },
    { id: 'Poor', label: 'Poor (201-300)' },
    { id: 'Very Poor', label: 'Very Poor (301-400)' },
    { id: 'Severe', label: 'Severe (401+)' },
  ];

  return (
    <section className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm mb-6 transition-all">
      <div className="flex items-center justify-between pb-4 mb-4 border-b border-slate-100">
        <div className="flex items-center gap-2 text-slate-800">
          <Filter className="w-5 h-5 text-emerald-600" />
          <h2 className="text-base font-bold tracking-tight">Interactive Analytics Filter Panel</h2>
        </div>
        <button
          onClick={handleReset}
          className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl text-xs font-semibold text-slate-600 bg-slate-100 hover:bg-slate-200 hover:text-slate-900 transition-all duration-200 active:scale-95 shadow-sm"
        >
          <RotateCcw className="w-3.5 h-3.5" />
          Reset Filters
        </button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-5 items-end">
        {/* City Selector */}
        <div className="flex flex-col gap-1.5">
          <label className="text-xs font-semibold text-slate-600 flex items-center gap-1">
            <MapPin className="w-3.5 h-3.5 text-emerald-600" /> City Location
          </label>
          <select
            name="city"
            value={filters.city}
            onChange={handleChange}
            className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 text-xs font-medium text-slate-800 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:bg-white transition-all shadow-sm"
          >
            {cities.map((c) => (
              <option key={c.city} value={c.city}>
                {c.city}
              </option>
            ))}
          </select>
        </div>

        {/* Start Date */}
        <div className="flex flex-col gap-1.5">
          <label className="text-xs font-semibold text-slate-600 flex items-center gap-1">
            <Calendar className="w-3.5 h-3.5 text-indigo-600" /> Start Date
          </label>
          <input
            type="date"
            name="startDate"
            value={filters.startDate}
            onChange={handleChange}
            className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 text-xs font-medium text-slate-800 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:bg-white transition-all shadow-sm"
          />
        </div>

        {/* End Date */}
        <div className="flex flex-col gap-1.5">
          <label className="text-xs font-semibold text-slate-600 flex items-center gap-1">
            <Calendar className="w-3.5 h-3.5 text-indigo-600" /> End Date
          </label>
          <input
            type="date"
            name="endDate"
            value={filters.endDate}
            onChange={handleChange}
            className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 text-xs font-medium text-slate-800 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:bg-white transition-all shadow-sm"
          />
        </div>

        {/* Pollutant Type */}
        <div className="flex flex-col gap-1.5">
          <label className="text-xs font-semibold text-slate-600 flex items-center gap-1">
            <Activity className="w-3.5 h-3.5 text-amber-600" /> Target Pollutant
          </label>
          <select
            name="pollutantType"
            value={filters.pollutantType}
            onChange={handleChange}
            className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 text-xs font-medium text-slate-800 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:bg-white transition-all shadow-sm"
          >
            {pollutantOptions.map((p) => (
              <option key={p.id} value={p.id}>
                {p.label}
              </option>
            ))}
          </select>
        </div>

        {/* AQI Category Selector */}
        <div className="flex flex-col gap-1.5">
          <label className="text-xs font-semibold text-slate-600 flex items-center gap-1">
            <SlidersHorizontal className="w-3.5 h-3.5 text-rose-600" /> AQI Severity
          </label>
          <select
            name="aqiCategory"
            value={filters.aqiCategory}
            onChange={handleChange}
            className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 text-xs font-medium text-slate-800 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:bg-white transition-all shadow-sm"
          >
            {aqiCategories.map((cat) => (
              <option key={cat.id} value={cat.id}>
                {cat.label}
              </option>
            ))}
          </select>
        </div>
      </div>
    </section>
  );
};
