import { format } from 'date-fns-tz';

// constants
import { FALLBACK_BASE_CITY, FALLBACK_BASE_COUNTRY } from '@/constants/content';
// context
import { useWebsiteConfig } from '@/contexts/use-website-config';
// components
import DigitalClock from '@/components/digital-clock';
// hooks
import {
  useBusinessTime,
  useBusinessTimeRange,
} from '@/hooks/use-business-time';
// utils
import { cn } from '@/utils/tw-merge';

// ----------------------------------------------------------------------

const DAY_LABELS = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

export default function ContactWidget() {
  const isBusinessTime = useBusinessTime();

  const { startDay, endDay, startHour, endHour } = useBusinessTimeRange();

  const websiteConfig = useWebsiteConfig();
  const { city, country } = websiteConfig ?? {};

  const formatHour = (hour: number) => {
    const date = new Date();

    date.setHours(hour, 0, 0, 0);
    return format(date, 'h:mm a');
  };

  const businessDaysLabel = `${DAY_LABELS[startDay]}-${DAY_LABELS[endDay]}`;
  const businessHoursLabel = `${formatHour(startHour)}-${formatHour(endHour)}`;

  const baseCity = city ?? FALLBACK_BASE_CITY;
  const baseCountry = country ?? FALLBACK_BASE_COUNTRY;
  const baseLocation = `${baseCity}, ${baseCountry}`;

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
