import { getUser } from '../data/users';

interface Props {
  ids: string[];
  capacity?: number;
  size?: 'sm' | 'md' | 'lg';
  showCount?: boolean;
  max?: number;
}

const sizeMap = {
  sm: 'w-6 h-6 text-[10px] -ml-1.5 first:ml-0 ring-2',
  md: 'w-8 h-8 text-xs -ml-2 first:ml-0 ring-2',
  lg: 'w-12 h-12 text-sm -ml-3 first:ml-0 ring-[3px]',
};

export function AttendeeAvatars({
  ids,
  capacity,
  size = 'md',
  showCount = true,
  max = 4,
}: Props) {
  const shown = ids.slice(0, max);
  const remaining = ids.length - shown.length;
  const cls = sizeMap[size];

  return (
    <div className="flex items-center gap-2">
      <div className="flex">
        {shown.map((id) => {
          const user = getUser(id);

          return (
            <img
              key={id}
              src={user.avatar}
              alt={user.name}
              className={`${cls} rounded-full object-cover ring-cream`}
              loading="lazy"
            />
          );
        })}
        {remaining > 0 && (
          <div
            className={`${cls} rounded-full bg-sage-200 text-sage-700 ring-cream flex items-center justify-center font-semibold`}
          >
            +{remaining}
          </div>
        )}
      </div>
      {showCount && capacity != null && (
        <span className="text-sm text-ink/70 font-medium">
          {ids.length}/{capacity} in circle
        </span>
      )}
    </div>
  );
}
