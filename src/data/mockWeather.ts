import { WeatherData, Location } from '../types/weather';

export const mockLocations: Location[] = [
  { id: '1', name: '東京', country: 'JP', lat: 35.6762, lon: 139.6503 },
  { id: '2', name: '大阪', country: 'JP', lat: 34.6937, lon: 135.5023 },
  { id: '3', name: 'ニューヨーク', country: 'US', lat: 40.7128, lon: -74.0060 },
  { id: '4', name: 'ロンドン', country: 'GB', lat: 51.5074, lon: -0.1278 },
  { id: '5', name: 'パリ', country: 'FR', lat: 48.8566, lon: 2.3522 },
];

export const generateMockWeatherData = (location: Location): WeatherData => {
  const weatherTypes = [
    { main: 'Clear', description: '晴れ', icon: '☀️' },
    { main: 'Clouds', description: '曇り', icon: '☁️' },
    { main: 'Rain', description: '雨', icon: '🌧️' },
    { main: 'Snow', description: '雪', icon: '❄️' },
  ];

  const forecast = Array.from({ length: 7 }, (_, index) => {
    const date = new Date();
    date.setDate(date.getDate() + index);
    
    const weather = weatherTypes[Math.floor(Math.random() * weatherTypes.length)];
    const baseTemp = 20 + Math.random() * 15;
    
    return {
      date: date.toISOString().split('T')[0],
      temp: {
        day: Math.round(baseTemp),
        min: Math.round(baseTemp - 5 - Math.random() * 5),
        max: Math.round(baseTemp + 5 + Math.random() * 5),
      },
      weather: {
        id: weather.main.toLowerCase(),
        main: weather.main,
        description: weather.description,
        icon: weather.icon,
      },
      humidity: Math.round(40 + Math.random() * 40),
      windSpeed: Math.round(Math.random() * 20),
      precipitation: weather.main === 'Rain' ? Math.round(Math.random() * 10) : undefined,
    };
  });

  return {
    location,
    forecast,
    currentWeather: forecast[0],
  };
};