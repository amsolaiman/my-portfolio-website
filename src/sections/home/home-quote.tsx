// ----------------------------------------------------------------------

export default function HomeQuote() {
  return (
    <figure className="w-full px-4 pt-32 md:pl-44 xl:pr-12">
      <blockquote className="max-w-230 text-justify font-sans text-3xl xl:text-start xl:text-5xl [&_span]:text-gray-400">
        <p>
          The beginning of wisdom is the statement&nbsp;
          <span>I do not know</span>. The person who cannot make that statement
          is one who will never <span>learn</span> anything.
        </p>
      </blockquote>

      <figcaption className="[&_cite,span]:text-secondary mt-2 text-xs not-italic xl:mt-0">
        / Keith R.A. DeCandido <span aria-hidden>/</span>&nbsp;
        <cite className="not-italic">Cycle of Hatred</cite>
      </figcaption>
    </figure>
  );
}
