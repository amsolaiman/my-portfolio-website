'use client';

// contexts
import { ToggleProvider } from '@/contexts/use-toggle-context';

// ----------------------------------------------------------------------

export default function Home() {
  return (
    <ToggleProvider>
      <div className="flex min-h-screen items-center justify-center bg-zinc-50 font-sans">
        <main className="flex min-h-screen w-full max-w-3xl items-center justify-center bg-white px-16 py-32">
          <h1 className="text-5xl font-bold text-black sm:text-[5rem]">
            Hello World
          </h1>
        </main>
      </div>
    </ToggleProvider>
  );
}
