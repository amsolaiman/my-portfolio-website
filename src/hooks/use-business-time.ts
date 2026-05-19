'use client';

import { useEffect, useState } from 'react';
import { toZonedTime } from 'date-fns-tz';

// contexts
import { useGlobalContent } from '@/contexts/use-global-content';
// constants
import {
  FALLBACK_BUSINESS_DAYS,
  FALLBACK_BUSINESS_HOURS,
} from '@/constants/channel';
import { DEFAULT_TIMEZONE } from '@/constants/content';

// ----------------------------------------------------------------------

const ONE_MINUTE_IN_MS = 60_000;

interface BusinessTimeType {
  startDay: number;
  endDay: number;
  startHour: number;
  endHour: number;
}

// ----------------------------------------------------------------------

function isBusinessDay(day: number, range: BusinessTimeType) {
  return day >= range.startDay && day <= range.endDay;
}

function getNextCheckDelay(time: Date, range: BusinessTimeType) {
  const year = time.getFullYear();
  const month = time.getMonth();
  const date = time.getDate();

  const day = time.getDay();
  const hours = time.getHours();

  const makeTime = (h: number) => new Date(year, month, date, h, 0, 0, 0);

  // During business hours → next change is closing
  if (
    isBusinessDay(day, range) &&
    hours >= range.startHour &&
    hours < range.endHour
  ) {
    return makeTime(range.endHour).getTime() - time.getTime();
  }

  // Before opening → next change is opening today
  if (isBusinessDay(day, range) && hours < range.startHour) {
    return makeTime(range.startHour).getTime() - time.getTime();
  }

  // Otherwise → find next business day open
  for (let i = 1; i <= 7; i++) {
    const next = new Date(
      time.getFullYear(),
      time.getMonth(),
      time.getDate() + i
    );

    const nextDay = next.getDay();

    if (isBusinessDay(nextDay, range)) {
      const open = new Date(
        next.getFullYear(),
        next.getMonth(),
        next.getDate(),
        range.startHour,
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

export function useBusinessTimeRange(): BusinessTimeType {
  const { businessDays, businessHours } = useGlobalContent();

  return {
    startDay: businessDays?.start || FALLBACK_BUSINESS_DAYS.START,
    endDay: businessDays?.end || FALLBACK_BUSINESS_DAYS.END,
    startHour: businessHours?.start || FALLBACK_BUSINESS_HOURS.START,
    endHour: businessHours?.end || FALLBACK_BUSINESS_HOURS.END,
  };
}

export function useBusinessTime() {
  const range = useBusinessTimeRange();

  const [isOnline, setIsOnline] = useState(false);

  useEffect(
    () => {
      let timeout: ReturnType<typeof setTimeout>;

      const check = () => {
        const now = new Date();
        const phTime = toZonedTime(now, DEFAULT_TIMEZONE);

        const day = phTime.getDay();
        const hours = phTime.getHours();

        const online =
          isBusinessDay(day, range) &&
          hours >= range.startHour &&
          hours < range.endHour;

        setIsOnline(online);

        const delay = getNextCheckDelay(phTime, range);
        timeout = setTimeout(check, delay);
      };

      check();

      return () => clearTimeout(timeout);
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    []
  );

  return isOnline;
}
