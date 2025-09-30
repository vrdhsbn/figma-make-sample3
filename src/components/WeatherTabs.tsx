import { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { Button } from './ui/button';
import { ScrollArea } from './ui/scroll-area';
import { WeatherForecast } from './WeatherForecast';
import { AddLocationDialog } from './AddLocationDialog';
import { DeleteLocationDialog } from './DeleteLocationDialog';
import { Location, WeatherData } from '../types/weather';
import { generateMockWeatherData } from '../data/mockWeather';
import { X } from 'lucide-react';

interface WeatherTabsProps {
  favoriteLocations: Location[];
  onAddLocation: (location: Location) => void;
  onRemoveLocation: (locationId: string) => void;
}

export function WeatherTabs({ 
  favoriteLocations, 
  onAddLocation, 
  onRemoveLocation 
}: WeatherTabsProps) {
  const [activeTab, setActiveTab] = useState(favoriteLocations[0]?.id || '');
  const [deleteDialog, setDeleteDialog] = useState<{
    open: boolean;
    locationId: string;
    locationName: string;
  }>({
    open: false,
    locationId: '',
    locationName: '',
  });

  // Generate weather data for all locations
  const weatherDataMap = favoriteLocations.reduce((acc, location) => {
    acc[location.id] = generateMockWeatherData(location);
    return acc;
  }, {} as Record<string, WeatherData>);

  const handleDeleteClick = (locationId: string, locationName: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setDeleteDialog({
      open: true,
      locationId,
      locationName,
    });
  };

  const handleDeleteConfirm = () => {
    onRemoveLocation(deleteDialog.locationId);
    if (activeTab === deleteDialog.locationId) {
      const remainingLocations = favoriteLocations.filter(l => l.id !== deleteDialog.locationId);
      setActiveTab(remainingLocations[0]?.id || '');
    }
    setDeleteDialog({ open: false, locationId: '', locationName: '' });
  };

  if (favoriteLocations.length === 0) {
    return (
      <div className="text-center space-y-4 py-12">
        <p className="text-muted-foreground">
          お気に入り地点を追加して天気予報を確認しましょう
        </p>
        <AddLocationDialog 
          onAddLocation={onAddLocation}
          maxReached={false}
        />
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">天気予報</h1>
        <AddLocationDialog 
          onAddLocation={onAddLocation}
          maxReached={favoriteLocations.length >= 5}
        />
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <ScrollArea className="w-full">
          <TabsList className="inline-flex h-10 items-center justify-center rounded-md bg-muted p-1 text-muted-foreground w-max">
            {favoriteLocations.map((location) => (
              <div key={location.id} className="relative">
                <TabsTrigger 
                  value={location.id}
                  className="inline-flex items-center justify-center whitespace-nowrap rounded-sm px-3 py-1.5 text-sm font-medium ring-offset-background transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 data-[state=active]:bg-background data-[state=active]:text-foreground data-[state=active]:shadow-sm pr-8"
                >
                  {location.name}
                </TabsTrigger>
                {favoriteLocations.length > 1 && (
                  <Button
                    variant="ghost"
                    size="sm"
                    className="absolute right-1 top-1/2 transform -translate-y-1/2 h-5 w-5 p-0 hover:bg-destructive hover:text-destructive-foreground rounded-full"
                    onClick={(e) => handleDeleteClick(location.id, location.name, e)}
                  >
                    <X className="h-3 w-3" />
                  </Button>
                )}
              </div>
            ))}
          </TabsList>
        </ScrollArea>

        {favoriteLocations.map((location) => (
          <TabsContent key={location.id} value={location.id}>
            <WeatherForecast weatherData={weatherDataMap[location.id]} />
          </TabsContent>
        ))}
      </Tabs>

      <DeleteLocationDialog
        open={deleteDialog.open}
        onOpenChange={(open) => setDeleteDialog(prev => ({ ...prev, open }))}
        locationName={deleteDialog.locationName}
        onConfirm={handleDeleteConfirm}
      />
    </div>
  );
}