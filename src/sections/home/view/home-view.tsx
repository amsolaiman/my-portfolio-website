//
import HomeAbout from '../home-about';
import HomeHero from '../home-hero';

// ----------------------------------------------------------------------

export default function HomeView() {
  return (
    <section className="bg-background relative flex h-full w-screen grow flex-col overflow-y-scroll pr-32">
      <HomeHero />

      <HomeAbout />
    </section>
  );
}
