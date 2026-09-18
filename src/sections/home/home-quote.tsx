// ----------------------------------------------------------------------

export default function HomeQuote() {
  return (
    <div className="w-full px-4 pt-32 md:pl-44 xl:pr-12">
      <h3 className="max-w-230 text-justify font-sans text-3xl xl:text-start xl:text-5xl [&_span]:text-gray-400">
        The beginning of wisdom is the statement&nbsp;
        <span>I do not know</span>. The person who cannot make that statement is
        one who will never <span>learn</span> anything.
      </h3>

      <p className="[&_span]:text-secondary mt-2 text-xs xl:mt-0">
        / Keith R.A. DeCandido <span>/ Cycle of Hatred</span>
      </p>
    </div>
  );
}
