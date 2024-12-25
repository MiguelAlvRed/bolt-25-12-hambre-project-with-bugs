import { Button } from '../../ui/button';

interface PriceFilterProps {
  selected: number[];
  onChange: (prices: number[]) => void;
}

export function PriceFilter({ selected, onChange }: PriceFilterProps) {
  return (
    <div className="space-y-2">
      <label className="text-sm font-medium">Precio</label>
      <div className="flex gap-2">
        {[1, 2, 3].map((price) => (
          <Button
            key={price}
            variant={selected.includes(price) ? 'secondary' : 'outline'}
            size="sm"
            onClick={() => {
              const newPrices = selected.includes(price)
                ? selected.filter((p) => p !== price)
                : [...selected, price];
              onChange(newPrices);
            }}
          >
            {'€'.repeat(price)}
          </Button>
        ))}
      </div>
    </div>
  );
}