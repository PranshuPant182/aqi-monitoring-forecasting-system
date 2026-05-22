export interface AQIData {
    date: string;
    aqi: number;
}

export interface KPIData {
    avg_aqi: number;
    max_aqi: number;
    min_aqi: number;
    hazardous_days?: number;
    safe_days?: number;
    peak_hour?: string;
    most_polluted_city?: string;
}

export interface City {
    city: string;
}

export interface PollutantData {
    date: string;
    [pollutant: string]: any;
}

export interface PollutantSummary {
    pm25: number;
    pm10: number;
    co: number;
    no2: number;
    so2: number;
    o3: number;
}

export interface RegionalSummary {
    city: string;
    avg_aqi: number;
    max_aqi: number;
    min_aqi: number;
    rank?: number;
}

export interface ForecastItem {
    day: string;
    date: string;
    aqi: number;
    category: string;
    trend: 'up' | 'down' | 'stable';
}

export interface InsightItem {
    id: string;
    category: 'observation' | 'trend' | 'health' | 'policy';
    title: string;
    description: string;
    impact: 'positive' | 'warning' | 'danger' | 'info';
}

export interface FilterState {
    city: string;
    startDate: string;
    endDate: string;
    pollutantType: string;
    aqiCategory: string;
    mode: 'realtime' | 'historical';
}