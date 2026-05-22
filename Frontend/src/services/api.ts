import axios from 'axios';
import type { PollutantSummary, RegionalSummary } from '../types/airQuality';

const API = axios.create({
    baseURL: 'https://aqi-monitoring-forecasting-system.onrender.com',
});

export const fetchCities = () => API.get('/cities');
export const fetchAQI = (city: string) => API.get(`/aqi?city=${city}`);
export const fetchKPI = (city: string) => API.get(`/kpi?city=${city}`);
export const fetchTrend = (city: string, pollutant: string) =>
    API.get(`/trend?city=${city}&pollutant=${pollutant}`);

export const fetchAllPollutants = async (city: string): Promise<PollutantSummary> => {
    try {
        const pollutants = ['pm25', 'pm10', 'co', 'no2', 'so2', 'o3'];
        const responses = await Promise.all(
            pollutants.map(p => fetchTrend(city, p).catch(() => ({ data: [] })))
        );

        const summary: any = {};
        pollutants.forEach((p, index) => {
            const data = responses[index].data;
            if (data && data.length > 0) {
                const validValues = data.map((d: any) => d[p]).filter((val: any) => val != null && !isNaN(val));
                if (validValues.length > 0) {
                    const avg = validValues.reduce((a: number, b: number) => a + b, 0) / validValues.length;
                    summary[p] = Math.round(avg * 100) / 100;
                } else {
                    summary[p] = 0;
                }
            } else {
                summary[p] = 0;
            }
        });
        return summary as PollutantSummary;
    } catch (error) {
        console.error("Error fetching all pollutants:", error);
        return { pm25: 45.5, pm10: 95.2, co: 1.1, no2: 24.3, so2: 18.6, o3: 35.4 };
    }
};

export const fetchRegionalSummary = async (cities: string[]): Promise<RegionalSummary[]> => {
    try {
        const responses = await Promise.all(
            cities.map(city => fetchKPI(city).then(res => ({ city, data: res.data })).catch(() => ({ city, data: null })))
        );

        const regionalData: RegionalSummary[] = responses
            .filter(r => r.data && r.data.avg_aqi != null)
            .map(r => ({
                city: r.city,
                avg_aqi: Math.round(r.data.avg_aqi),
                max_aqi: Math.round(r.data.max_aqi),
                min_aqi: Math.round(r.data.min_aqi),
            }));

        regionalData.sort((a, b) => b.avg_aqi - a.avg_aqi);
        regionalData.forEach((item, idx) => {
            item.rank = idx + 1;
        });

        return regionalData;
    } catch (error) {
        console.error("Error fetching regional summary:", error);
        return [];
    }
};
