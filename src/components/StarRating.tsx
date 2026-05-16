import { Star } from 'lucide-react';

interface Props {
  rating: number;
  count?: number;
  size?: number;
}

export default function StarRating({ rating, count, size = 14 }: Props) {
  const r = Math.round(Number(rating));
  return (
    <div className="flex items-center gap-1.5">
      <div className="flex items-center gap-0.5">
        {[1, 2, 3, 4, 5].map((s) => (
          <Star
            key={s}
            size={size}
            fill={s <= r ? '#d4a853' : 'none'}
            style={{ color: s <= r ? '#d4a853' : '#d1d5db' }}
          />
        ))}
      </div>
      {count !== undefined && (
        <span className="text-sm text-gray-500">
          {Number(rating).toFixed(1)} ({count} avis)
        </span>
      )}
    </div>
  );
}
