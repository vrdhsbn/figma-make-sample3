import { DayForecast } from '../types/weather';
import { Card } from './ui/card';

interface WeatherCardProps {
  forecast: DayForecast;
  isToday?: boolean;
}

export function WeatherCard({ forecast, isToday = false }: WeatherCardProps) {
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const today = new Date();
    
    if (isToday) {
      return '今日';
    }
    
    const tomorrow = new Date(today);
    tomorrow.setDate(today.getDate() + 1);
    
    if (date.toDateString() === tomorrow.toDateString()) {
      return '明日';
    }
    
    return `${date.getMonth() + 1}/${date.getDate()}`;
  };

  return (
    <Card className={`p-3 ${isToday ? 'ring-2 ring-primary' : ''}`}>
      <div className="text-center space-y-1.5">
        <p className="text-xs font-medium">
          {formatDate(forecast.date)}
        </p>
        <div className="text-2xl">
          {forecast.weather.icon}
        </div>
        <p className="text-xs text-muted-foreground">
          {forecast.weather.description}
        </p>
        <div className="space-y-0.5">
          <p className="font-medium">
            {forecast.temp.day}°C
          </p>
          <p className="text-xs text-muted-foreground">
            {forecast.temp.min}° / {forecast.temp.max}°
          </p>
        </div>
        <div className="text-xs text-muted-foreground space-y-0.5">
          <p>湿度: {forecast.humidity}%</p>
          <p>風速: {forecast.windSpeed}m/s</p>
          {forecast.precipitation && (
            <p>降水量: {forecast.precipitation}mm</p>
          )}
        </div>
      </div>
    </Card>
  );
}