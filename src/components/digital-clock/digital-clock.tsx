'use client';

import { useEffect, useState } from 'react';
import { formatInTimeZone } from 'date-fns-tz';

// constants
import { DEFAULT_TIMEZONE } from '@/constants/content';

// ----------------------------------------------------------------------

export default function DigitalClock() {
  const [time, setTime] = useState<string>('');

  useEffect(() => {
    const updateClock = () => {
      const now = new Date();

      const formatted = formatInTimeZone(now, DEFAULT_TIMEZONE, 'h:mm:ss a');

      setTime(`${formatted} PHT`);
    };

    updateClock();

    const interval = setInterval(updateClock, 1000);

    return () => clearInterval(interval);
  }, []);

  return time;
}
