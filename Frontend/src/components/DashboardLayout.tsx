import React, { useState, useEffect } from 'react';
import { Sidebar } from './Sidebar';
import { Header } from './Header';
import { FiltersPanel } from './Filters';
import { KPIcards } from './KPIcards';
import { AQITrendChart } from './AQITrendChart';
import { PollutantComparisonChart } from './PollutantComparisonChart';
import { AQIGauge } from './AQIGauge';
import { HazardAlertBanner } from './HazardAlertBanner';
import { RegionalComparison } from './RegionalComparison';
import { ForecastSection } from './ForecastSection';
import { InsightsPanel } from './InsightsPanel';
import { Footer } from './Footer';

import { 
  fetchCities, 
  fetchAQI, 
  fetchKPI, 
  fetchAllPollutants, 
  fetchRegionalSummary 
} from '../services/api';
import type { 
  City, 
  AQIData, 
  KPIData, 
  PollutantSummary, 
  RegionalSummary, 
  FilterState 
} from '../types/airQuality';

export const DashboardLayout: React.FC = () => {
  const [activeTab, setActiveTab] = useState<string>('dashboard');
  const [cities, setCities] = useState<City[]>([]);
  const [rawAqiData, setRawAqiData] = useState<AQIData[]>([]);
  const [kpiData, setKpiData] = useState<KPIData>({ avg_aqi: 120, max_aqi: 310, min_aqi: 45 });
  const [pollutantSummary, setPollutantSummary] = useState<PollutantSummary>({ pm25: 45, pm10: 95, co: 1.2, no2: 25, so2: 18, o3: 35 });
  const [regionalData, setRegionalData] = useState<RegionalSummary[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const [filters, setFilters] = useState<FilterState>({
    city: 'Ahmedabad',
    startDate: '2015-01-01',
    endDate: '2017-03-01',
    pollutantType: 'pm25',
    aqiCategory: 'ALL',
    mode: 'realtime'
  });

  // Fetch initial cities list
  useEffect(() => {
    const loadCities = async () => {
      try {
        const res = await fetchCities();
        if (res.data && res.data.length > 0) {
          setCities(res.data);
          if (!filters.city) {
            setFilters(prev => ({ ...prev, city: res.data[0].city }));
          }
        }
      } catch (err) {
        console.error("Error loading cities:", err);
        // Fallback cities if backend is unreachable
        setCities([{ city: 'Ahmedabad' }, { city: 'Bengaluru' }, { city: 'Delhi' }, { city: 'Mumbai' }]);
      }
    };
    loadCities();
  }, []);

  // Fetch main dashboard data when city changes
  useEffect(() => {
    const loadDashboardData = async () => {
      if (!filters.city) return;
      setIsLoading(true);
      try {
        const [aqiRes, kpiRes, pollutantsRes, regionalRes] = await Promise.all([
          fetchAQI(filters.city).catch(() => ({ data: [] })),
          fetchKPI(filters.city).catch(() => ({ data: { avg_aqi: 118, max_aqi: 782, min_aqi: 30 } })),
          fetchAllPollutants(filters.city),
          fetchRegionalSummary(cities.length > 0 ? cities.map(c => c.city) : ['Ahmedabad', 'Bengaluru', 'Delhi', 'Mumbai'])
        ]);

        if (aqiRes.data && aqiRes.data.length > 0) {
          setRawAqiData(aqiRes.data);
        } else {
          // Mock realistic fallback data for demonstration if empty
          setRawAqiData([
            { date: '2015-01-01', aqi: 118 },
            { date: '2015-01-02', aqi: 125 },
            { date: '2015-01-03', aqi: 140 },
            { date: '2015-01-04', aqi: 190 },
            { date: '2015-01-05', aqi: 210 },
            { date: '2015-01-06', aqi: 310 },
            { date: '2015-01-07', aqi: 150 },
          ]);
        }

        if (kpiRes.data) {
          setKpiData(kpiRes.data);
        }
        setPollutantSummary(pollutantsRes);
        if (regionalRes.length > 0) {
          setRegionalData(regionalRes);
        } else {
          setRegionalData([
            { city: 'Delhi', avg_aqi: 245, max_aqi: 850, min_aqi: 90, rank: 1 },
            { city: 'Ahmedabad', avg_aqi: 185, max_aqi: 782, min_aqi: 30, rank: 2 },
            { city: 'Mumbai', avg_aqi: 142, max_aqi: 450, min_aqi: 40, rank: 3 },
            { city: 'Bengaluru', avg_aqi: 95, max_aqi: 280, min_aqi: 20, rank: 4 },
          ]);
        }
      } catch (err) {
        console.error("Error loading dashboard data:", err);
      } finally {
        setIsLoading(false);
      }
    };

    loadDashboardData();
  }, [filters.city, cities]);

  // Apply client-side date & category filters
  const filteredAqi = rawAqiData.filter(item => {
    const isAfterStart = !filters.startDate || item.date >= filters.startDate;
    const isBeforeEnd = !filters.endDate || item.date <= filters.endDate;
    let matchesCategory = true;
    if (filters.aqiCategory !== 'ALL') {
      if (filters.aqiCategory === 'Good') matchesCategory = item.aqi <= 50;
      else if (filters.aqiCategory === 'Moderate') matchesCategory = item.aqi > 50 && item.aqi <= 200;
      else if (filters.aqiCategory === 'Poor') matchesCategory = item.aqi > 200 && item.aqi <= 300;
      else if (filters.aqiCategory === 'Very Poor') matchesCategory = item.aqi > 300 && item.aqi <= 400;
      else if (filters.aqiCategory === 'Severe') matchesCategory = item.aqi > 400;
    }
    return isAfterStart && isBeforeEnd && matchesCategory;
  });

  // Calculate dynamic KPIs based on filtered data
  const aqiValues = filteredAqi.map(d => d.aqi);
  const dynamicAvg = aqiValues.length > 0 ? Math.round(aqiValues.reduce((a, b) => a + b, 0) / aqiValues.length) : kpiData.avg_aqi;
  const dynamicMax = aqiValues.length > 0 ? Math.max(...aqiValues) : kpiData.max_aqi;
  const dynamicMin = aqiValues.length > 0 ? Math.min(...aqiValues) : kpiData.min_aqi;
  const hazardousDays = filteredAqi.filter(d => d.aqi > 200).length;
  const safeDays = filteredAqi.filter(d => d.aqi <= 100).length;

  const enrichedKpiData: KPIData = {
    avg_aqi: dynamicAvg,
    max_aqi: dynamicMax,
    min_aqi: dynamicMin,
    hazardous_days: hazardousDays,
    safe_days: safeDays,
    peak_hour: '09:00 AM',
    most_polluted_city: regionalData.length > 0 ? regionalData[0].city : 'Ahmedabad'
  };

  const currentLatestAQI = filteredAqi.length > 0 ? filteredAqi[filteredAqi.length - 1].aqi : dynamicAvg;

  return (
    <div className="flex h-screen bg-slate-100 overflow-hidden font-sans">
      {/* Sidebar */}
      <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} />

      {/* Main Content Container */}
      <div className="flex-1 flex flex-col h-full overflow-y-auto">
        {/* Header */}
        <Header filters={filters} setFilters={setFilters} currentAQI={currentLatestAQI} />

        {/* Dashboard Body */}
        <main className="p-6 max-w-7xl mx-auto w-full flex-1">
          {/* Hazard Alert Banner */}
          <HazardAlertBanner currentAQI={currentLatestAQI} city={filters.city} />

          {/* Interactive Filters Panel */}
          <FiltersPanel filters={filters} setFilters={setFilters} cities={cities} />

          {/* Conditional Rendering based on Active Sidebar Tab */}
          {activeTab === 'dashboard' && (
            <>
              {/* KPI Summary Cards */}
              <KPIcards kpiData={enrichedKpiData} isLoading={isLoading} />

              {/* Main Charts Grid */}
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
                <div className="lg:col-span-2">
                  <AQITrendChart aqiData={filteredAqi} city={filters.city} />
                </div>
                <div className="lg:col-span-1 flex flex-col">
                  <AQIGauge currentAQI={currentLatestAQI} city={filters.city} />
                </div>
              </div>

              {/* Secondary Charts Grid */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
                <PollutantComparisonChart pollutantSummary={pollutantSummary} city={filters.city} />
                <ForecastSection currentAQI={currentLatestAQI} city={filters.city} />
              </div>

              {/* Regional Comparison & Insights */}
              <RegionalComparison regionalData={regionalData} />
              <InsightsPanel currentAQI={currentLatestAQI} city={filters.city} />
            </>
          )}

          {activeTab === 'analytics' && (
            <div className="space-y-6">
              <PollutantComparisonChart pollutantSummary={pollutantSummary} city={filters.city} />
              <AQITrendChart aqiData={filteredAqi} city={filters.city} />
            </div>
          )}

          {activeTab === 'alerts' && (
            <div className="space-y-6">
              <HazardAlertBanner currentAQI={currentLatestAQI > 200 ? currentLatestAQI : 320} city={filters.city} />
              <AQIGauge currentAQI={currentLatestAQI} city={filters.city} />
            </div>
          )}

          {activeTab === 'regional' && (
            <div className="space-y-6">
              <RegionalComparison regionalData={regionalData} />
            </div>
          )}

          {activeTab === 'forecast' && (
            <div className="space-y-6">
              <ForecastSection currentAQI={currentLatestAQI} city={filters.city} />
              <AQITrendChart aqiData={filteredAqi} city={filters.city} />
            </div>
          )}

          {activeTab === 'insights' && (
            <div className="space-y-6">
              <InsightsPanel currentAQI={currentLatestAQI} city={filters.city} />
            </div>
          )}
        </main>

        {/* Footer */}
        <Footer />
      </div>
    </div>
  );
};
