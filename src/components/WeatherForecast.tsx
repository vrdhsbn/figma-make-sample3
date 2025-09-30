import { WeatherData } from '../types/weather';
import { WeatherCard } from './WeatherCard';

interface WeatherForecastProps {
  weatherData: WeatherData;
}

export function WeatherForecast({ weatherData }: WeatherForecastProps) {
  return (
    <div className="space-y-4">
      <div className="text-center space-y-1">
        <h2 className="text-xl font-semibold">
          {weatherData.location.name}
        </h2>
        <p className="text-sm text-muted-foreground">
          7日間の天気予報
        </p>
      </div>
      
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-7 gap-3">
        {weatherData.forecast.map((forecast, index) => (
          <WeatherCard 
            key={forecast.date}
            forecast={forecast}
            isToday={index === 0}
          />
        ))}
      </div>
    </div>
  );
}