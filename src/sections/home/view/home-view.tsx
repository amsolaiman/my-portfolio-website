// sections
import HomeAbout from '../home-about';
import HomeCareer from '../home-career';
import HomeFooter from '../home-footer';
import HomeHero from '../home-hero';
import HomeQuote from '../home-quote';

//
import HomeClient from './home-client';

// ----------------------------------------------------------------------

export default function HomeView() {
  return (
    <HomeClient>
      <HomeHero />

      <HomeAbout />

      <HomeCareer />

      <HomeQuote />

      <HomeFooter />
    </HomeClient>
  );
}
