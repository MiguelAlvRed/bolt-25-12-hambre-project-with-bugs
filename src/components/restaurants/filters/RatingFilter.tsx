import { Star } from 'lucide-react';

interface RatingFilterProps {
  value: number;
  onChange: (rating: number) => void;
}

export function RatingFilter({ value, onChange }: RatingFilterProps) {
  return (
    <div className="space-y-2">
      <label className="text-sm font-medium">Valoración Mínima</label>
      <div className="flex items-center gap-4">
        <Star size={20} className="text-yellow-400" />
        <input
          type="range"
          min="0"
          max="5"
          step="0.5"
          value={value}
          onChange={(e) => onChange(Number(e.target.value))}
          className="w-full accent-primary"
        />
        <span className="text-sm font-medium">{value} ★</span>
      </div>
    </div>
  );
}