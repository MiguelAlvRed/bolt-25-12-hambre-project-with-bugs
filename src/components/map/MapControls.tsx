import { Button } from '../ui/button';
import { MapPin } from 'lucide-react';
import type { Location } from '../../lib/types';

interface MapControlsProps {
  onCenterChange: (center: Location) => void;
  onZoomChange: (zoom: number) => void;
  onReset: () => void;
}

export function MapControls({ onReset }: MapControlsProps) {
  return (
    <div className="absolute bottom-4 right-4 z-[400] flex gap-2">
      <Button
        variant="secondary"
        size="sm"
        onClick={onReset}
        className="shadow-md"
      >
        <MapPin className="h-4 w-4 mr-2" />
        Centrar mapa
      </Button>
    </div>
  );
}