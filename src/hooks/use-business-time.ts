'use client';

import { useEffect, useState } from 'react';
import { toZonedTime } from 'date-fns-tz';

// constants
import { DEFAULT_TIMEZONE } from '@/constants/content';
import { BUSINESS_DAYS, BUSINESS_HOURS } from '@/constants/channel';

// ----------------------------------------------------------------------

const ONE_MINUTE_IN_MS = 60_000;

function isBusinessDay(day: number) {
  return day >= BUSINESS_DAYS.START && day <= BUSINESS_DAYS.END;
}

function getNextCheckDelay(time: Date) {
  const year = time.getFullYear();
  const month = time.getMonth();
  const date = time.getDate();

  const day = time.getDay();
  const hours = time.getHours();

  const makeTime = (h: number) => new Date(year, month, date, h, 0, 0, 0);

  // During business hours → next change is closing
  if (
    isBusinessDay(day) &&
    hours >= BUSINESS_HOURS.START &&
    hours < BUSINESS_HOURS.END
  ) {
    return makeTime(BUSINESS_HOURS.END).getTime() - time.getTime();
  }

  // Before opening → next change is opening today
  if (isBusinessDay(day) && hours < BUSINESS_HOURS.START) {
    return makeTime(BUSINESS_HOURS.START).getTime() - time.getTime();
  }

  // Otherwise → find next business day open
  for (let i = 1; i <= 7; i++) {
    const next = new Date(
      time.getFullYear(),
      time.getMonth(),
      time.getDate() + i
    );

    const nextDay = next.getDay();

    if (isBusinessDay(nextDay)) {
      const open = new Date(
        next.getFullYear(),
        next.getMonth(),
        next.getDate(),
        BUSINESS_HOURS.START,
        0,
        0,
        0
      );

      return open.getTime() - time.getTime();
    }
  }

  // fallback safety
  return ONE_MINUTE_IN_MS;
}

export function useBusinessTime() {
  const [isOnline, setIsOnline] = useState(false);

  useEffect(() => {
    let timeout: ReturnType<typeof setTimeout>;

    const check = () => {
      const now = new Date();
      const phTime = toZonedTime(now, DEFAULT_TIMEZONE);

      const day = phTime.getDay();
      const hours = phTime.getHours();

      const online =
        isBusinessDay(day) &&
        hours >= BUSINESS_HOURS.START &&
        hours < BUSINESS_HOURS.END;

      setIsOnline(online);

      const delay = getNextCheckDelay(phTime);
      timeout = setTimeout(check, delay);
    };

    check();

    return () => clearTimeout(timeout);
  }, []);

  return isOnline;
}
