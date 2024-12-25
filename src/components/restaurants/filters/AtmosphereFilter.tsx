import { Button } from '../../ui/button';
import { ATMOSPHERE_TYPES } from '../../../lib/constants';

interface AtmosphereFilterProps {
  selected: string[];
  onChange: (types: string[]) => void;
}

export function AtmosphereFilter({ selected = [], onChange }: AtmosphereFilterProps) {
  return (
    <div className="space-y-2">
      <label className="text-sm font-medium">Ambiente</label>
      <div className="flex flex-wrap gap-2">
        {ATMOSPHERE_TYPES.map((type) => (
          <Button
            key={type}
            variant={selected.includes(type) ? 'secondary' : 'outline'}
            size="sm"
            onClick={() => {
              const newTypes = selected.includes(type)
                ? selected.filter((t) => t !== type)
                : [...selected, type];
              onChange(newTypes);
            }}
          >
            {type}
          </Button>
        ))}
      </div>
    </div>
  );
}