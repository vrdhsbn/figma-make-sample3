export interface WeatherCondition {
  id: string;
  main: string; // 'Clear', 'Rain', 'Clouds', 'Snow', etc.
  description: string;
  icon: string;
}

export interface DayForecast {
  date: string;
  temp: {
    day: number;
    min: number;
    max: number;
  };
  weather: WeatherCondition;
  humidity: number;
  windSpeed: number;
  precipitation?: number;
}

export interface Location {
  id: string;
  name: string;
  country: string;
  lat: number;
  lon: number;
}

export interface WeatherData {
  location: Location;
  forecast: DayForecast[];
  currentWeather: DayForecast;
}

export type WeatherTheme = 'sunny' | 'rainy' | 'cloudy' | 'snowy';