// _sanity
import { getYearsOfExperience } from '@/_sanity/utils/experience';

//
import HomeServices from './home-services';

// ----------------------------------------------------------------------

export default async function HomeAbout() {
  const expYears = (await getYearsOfExperience()) || 0;

  return (
    <div className="w-full p-4 pt-32 xl:px-12">
      <h3 className="text-justify font-sans text-3xl xl:max-w-7xl xl:text-start xl:text-5xl [&_span]:text-gray-400">
        Web developer<span>+</span>designer based in the Philippines with&nbsp;
        {expYears}+ years of experience. The focus:
        <span>
          &nbsp;fast & clear frontend experiences. No complexity.&nbsp;
        </span>
        For established brands, startups and everthing in between.
      </h3>

      <div className="mt-32 grid grid-cols-1 md:grid-cols-2">
        <p className="text-secondary mb-8 text-xs">/ Who I am</p>

        <HomeServices />
      </div>
    </div>
  );
}
