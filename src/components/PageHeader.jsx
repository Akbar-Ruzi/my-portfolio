import Link from "next/link";

// Sub-page header: a cream band joined to the nav like the Hero,
// with a "Back to home" link to the section the user came from, the page h1 and one intro line
const PageHeader = ({ back, title, intro }) => {
  return (
    <header className="card-section rounded-b-[20px] bg-cream pt-[clamp(40px,6vw,72px)] pb-[clamp(36px,5vw,56px)]">
      <div className="grid gap-3.5">
        <Link
          href={back}
          className="inline-flex items-center gap-1.5 justify-self-start text-[15px] font-semibold text-cta hover:underline"
        >
          <span aria-hidden="true">←</span> Back to home
        </Link>
        <h1 className="text-[clamp(40px,6vw,68px)] font-extrabold tracking-[-.02em]">
          {title}
        </h1>
        <p className="max-w-[58ch] text-[clamp(16px,1.8vw,18px)] text-muted">
          {intro}
        </p>
      </div>
    </header>
  );
};

export default PageHeader;
