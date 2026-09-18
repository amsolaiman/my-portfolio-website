import { format } from 'date-fns-tz';

// context
import { useGlobalContent } from '@/contexts/use-global-content';
// utils
import { cn } from '@/utils/tw-merge';
// hooks
import {
  useBusinessTime,
  useBusinessTimeRange,
} from '@/hooks/use-business-time';
// constants
import { FALLBACK_BASE_LOCATION } from '@/constants/content';
// components
import DigitalClock from '@/components/digital-clock';

// ----------------------------------------------------------------------

const DAY_LABELS = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

export default function ContactWidget() {
  const isBusinessTime = useBusinessTime();

  const { startDay, endDay, startHour, endHour } = useBusinessTimeRange();

  const { city, country } = useGlobalContent();

  const formatHour = (hour: number) => {
    const date = new Date();

    date.setHours(hour, 0, 0, 0);
    return format(date, 'h:mm a');
  };

  const businessDaysLabel = `${DAY_LABELS[startDay]}-${DAY_LABELS[endDay]}`;
  const businessHoursLabel = `${formatHour(startHour)}-${formatHour(endHour)}`;

  const baseLocation =
    city && country ? `${city}, ${country}` : FALLBACK_BASE_LOCATION;

  return (
    <div className="flex flex-col">
      <p className="text-sm">
        <span
          className={cn(isBusinessTime ? 'text-foreground' : 'text-gray-300')}
        >
          ({isBusinessTime ? 'Online' : 'Offline'})&nbsp;
        </span>
        Now, <DigitalClock />
      </p>

      <p className="text-xs text-gray-300">
        {businessDaysLabel}, {businessHoursLabel}
        <br />
        Based in {baseLocation}
      </p>
    </div>
  );
}
