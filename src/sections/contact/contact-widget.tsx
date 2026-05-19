import { format } from 'date-fns-tz';

// utils
import { cn } from '@/utils/tw-merge';
// hooks
import { useBusinessTime } from '@/hooks/use-business-time';
// constants
import { BASE_LOCATION } from '@/constants/content';
import { BUSINESS_DAYS, BUSINESS_HOURS } from '@/constants/channel';
// components
import DigitalClock from '@/components/digital-clock';

// ----------------------------------------------------------------------

const DAY_LABELS = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

export default function ContactWidget() {
  const isBusinessTime = useBusinessTime();

  const formatHour = (hour: number) => {
    const date = new Date();

    date.setHours(hour, 0, 0, 0);
    return format(date, 'h:mm a');
  };

  const businessDaysLabel = `${DAY_LABELS[BUSINESS_DAYS.START]}-${DAY_LABELS[BUSINESS_DAYS.END]}`;
  const businessHoursLabel = `${formatHour(BUSINESS_HOURS.START)}-${formatHour(BUSINESS_HOURS.END)}`;

  return (
    <div className="flex flex-col">
      <p className="text-sm">
        <span
          className={cn(
            isBusinessTime ? 'text-foreground' : 'text-foreground/75'
          )}
        >
          ({isBusinessTime ? 'Online' : 'Offline'})&nbsp;
        </span>
        Now, <DigitalClock />
      </p>

      <p className="text-foreground/75 text-xs">
        {businessDaysLabel}, {businessHoursLabel}
        <br />
        Based in {BASE_LOCATION}
      </p>
    </div>
  );
}
