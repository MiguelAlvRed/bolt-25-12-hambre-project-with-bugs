import React from 'react';
import { X } from 'lucide-react';

interface FilterChipProps {
  label: string;
  onRemove: () => void;
}

export function FilterChip({ label, onRemove }: FilterChipProps) {
  return (
    <span className="inline-flex items-center px-3 py-1 rounded-full text-sm bg-blue-100 text-blue-800">
      {label}
      <button
        onClick={onRemove}
        className="ml-2 hover:text-blue-900"
        aria-label={`Remove ${label} filter`}
      >
        <X size={14} />
      </button>
    </span>
  );
}