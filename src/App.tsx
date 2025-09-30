import { useState, useEffect } from 'react';
import { WeatherTabs } from './components/WeatherTabs';
import { Location } from './types/weather';
import { mockLocations, generateMockWeatherData } from './data/mockWeather';
import { useWeatherTheme } from './hooks/useWeatherTheme';

export default function App() {
  const [favoriteLocations, setFavoriteLocations] = useState<Location[]>([
    mockLocations[0] // 東京をデフォルトで追加
  ]);

  // Get current weather for theme
  const currentWeather = favoriteLocations.length > 0 
    ? generateMockWeatherData(favoriteLocations[0]).currentWeather
    : null;

  // Apply weather theme based on current weather
  useWeatherTheme(currentWeather?.weather.main || 'Clear');

  const handleAddLocation = (location: Location) => {
    if (favoriteLocations.length < 5 && !favoriteLocations.find(l => l.id === location.id)) {
      setFavoriteLocations(prev => [...prev, location]);
    }
  };

  const handleRemoveLocation = (locationId: string) => {
    setFavoriteLocations(prev => prev.filter(l => l.id !== locationId));
  };

  return (
    <div className="min-h-screen bg-background transition-colors duration-500">
      <div className="container mx-auto px-4 py-8">
        <WeatherTabs
          favoriteLocations={favoriteLocations}
          onAddLocation={handleAddLocation}
          onRemoveLocation={handleRemoveLocation}
        />
      </div>
    </div>
  );
}