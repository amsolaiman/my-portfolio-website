// components
import CursorEffect from '@/components/cursor-effect';
// sections
import ContactView from '@/sections/contact/view';
import HomeView from '@/sections/home/view';
import ProjectView from '@/sections/project/view';

// ----------------------------------------------------------------------

export default function App() {
  return (
    <main className="relative h-svh w-screen overflow-hidden xl:h-screen">
      <CursorEffect />

      <HomeView />

      <ProjectView />

      <ContactView />
    </main>
  );
}
