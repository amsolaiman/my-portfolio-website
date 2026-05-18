//
import HomeServices from './home-services';

// ----------------------------------------------------------------------

export default function HomeAbout() {
  return (
    <div className="w-full px-12 pt-32">
      <h3 className="max-w-7xl font-sans text-5xl [&_span]:opacity-50">
        Web developer<span>+</span>designer based in the Philippines with 3+
        years of experience. The focus:
        <span>
          &nbsp;fast & clear frontend experiences. No complexity.&nbsp;
        </span>
        For established brands, startups and everthing in between.
      </h3>

      <div className="mt-32 grid grid-cols-2">
        <p className="text-secondary text-xs">/ Who I am</p>

        <HomeServices />
      </div>
    </div>
  );
}
