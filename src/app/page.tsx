// contexts
import { ToggleProvider } from '@/contexts/use-toggle-context';
// sections
import ContactView from '@/sections/contact/view';
import HomeView from '@/sections/home/view';
import ProjectView from '@/sections/project/view';

// ----------------------------------------------------------------------

export default function App() {
  return (
    <ToggleProvider>
      <main className="relative h-svh w-screen overflow-hidden xl:h-screen">
        <HomeView />

        <ProjectView />

        <ContactView />
      </main>
    </ToggleProvider>
  );
}
