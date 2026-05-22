'use client';

import { SplashScreen } from '@/components/loading-screen';

// ----------------------------------------------------------------------

export default function Loading() {
  return (
    <div className="fixed inset-0 z-100">
      <SplashScreen />
    </div>
  );
}
