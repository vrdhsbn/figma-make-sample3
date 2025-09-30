import { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from './ui/dialog';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Location } from '../types/weather';
import { mockLocations } from '../data/mockWeather';
import { Plus } from 'lucide-react';

interface AddLocationDialogProps {
  onAddLocation: (location: Location) => void;
  maxReached: boolean;
}

export function AddLocationDialog({ onAddLocation, maxReached }: AddLocationDialogProps) {
  const [open, setOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');

  const filteredLocations = mockLocations.filter(location =>
    location.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleAddLocation = (location: Location) => {
    onAddLocation(location);
    setOpen(false);
    setSearchTerm('');
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button
          variant="outline"
          size="sm"
          disabled={maxReached}
          className="flex items-center gap-2"
        >
          <Plus className="h-4 w-4" />
          地点追加
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>お気に入り地点を追加</DialogTitle>
        </DialogHeader>
        <div className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="search">地点を検索</Label>
            <Input
              id="search"
              placeholder="都市名を入力..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          
          <div className="space-y-2 max-h-60 overflow-y-auto">
            {filteredLocations.length > 0 ? (
              filteredLocations.map((location) => (
                <Button
                  key={location.id}
                  variant="ghost"
                  className="w-full justify-start"
                  onClick={() => handleAddLocation(location)}
                >
                  {location.name}, {location.country}
                </Button>
              ))
            ) : (
              <p className="text-sm text-muted-foreground text-center py-4">
                該当する地点が見つかりません
              </p>
            )}
          </div>
          
          {maxReached && (
            <p className="text-sm text-destructive">
              お気に入り地点は最大5個まで登録できます
            </p>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}