'use client';

import { useEffect, useState } from 'react';
import { formatInTimeZone } from 'date-fns-tz';

// constants
import { DEFAULT_TIMEZONE } from '@/constants/content';

// ----------------------------------------------------------------------

export default function DigitalClock() {
  const [time, setTime] = useState<string>('');

  useEffect(() => {
    let timeout: ReturnType<typeof setTimeout>;

    const tick = () => {
      setTime(
        `${formatInTimeZone(new Date(), DEFAULT_TIMEZONE, 'h:mm:ss a')} PHT`
      );
      timeout = setTimeout(tick, 1000 - (Date.now() % 1000));
    };

    tick();
    return () => clearTimeout(timeout);
  }, []);

  return (
    <span className="tabular-nums" suppressHydrationWarning>
      {time}
    </span>
  );
}
