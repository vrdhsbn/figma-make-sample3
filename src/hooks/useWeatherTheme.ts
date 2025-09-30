import { useEffect } from 'react';
import { WeatherTheme } from '../types/weather';

const themeColors = {
  sunny: {
    '--background': '#fff8e1',
    '--foreground': '#1a1a1a',
    '--card': '#fffbf0',
    '--primary': '#ff6f00',
    '--secondary': '#ffecb3',
    '--accent': '#ffe0b2',
  },
  rainy: {
    '--background': '#263238',
    '--foreground': '#eceff1',
    '--card': '#37474f',
    '--primary': '#29b6f6',
    '--secondary': '#455a64',
    '--accent': '#546e7a',
  },
  cloudy: {
    '--background': '#f5f5f5',
    '--foreground': '#212121',
    '--card': '#ffffff',
    '--primary': '#607d8b',
    '--secondary': '#e0e0e0',
    '--accent': '#eeeeee',
  },
  snowy: {
    '--background': '#fafafa',
    '--foreground': '#212121',
    '--card': '#ffffff',
    '--primary': '#0277bd',
    '--secondary': '#e1f5fe',
    '--accent': '#f0f8ff',
  },
};

export const useWeatherTheme = (weatherMain: string) => {
  useEffect(() => {
    let theme: WeatherTheme = 'cloudy';
    
    switch (weatherMain?.toLowerCase()) {
      case 'clear':
        theme = 'sunny';
        break;
      case 'rain':
      case 'drizzle':
      case 'thunderstorm':
        theme = 'rainy';
        break;
      case 'snow':
        theme = 'snowy';
        break;
      case 'clouds':
      default:
        theme = 'cloudy';
        break;
    }

    const root = document.documentElement;
    const colors = themeColors[theme];
    
    Object.entries(colors).forEach(([property, value]) => {
      root.style.setProperty(property, value);
    });

    return () => {
      // Reset to default theme
      Object.keys(colors).forEach(property => {
        root.style.removeProperty(property);
      });
    };
  }, [weatherMain]);
};