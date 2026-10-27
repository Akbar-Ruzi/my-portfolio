import Link from "next/link";

// Centered outlined green pill under a home preview ("View full experience →"), linking to its full page
const MoreLink = ({ href, children }) => {
  return (
    <div className="mt-6 flex justify-center">
      <Link
        href={href}
        className="inline-flex items-center gap-2 rounded-full border border-cta px-[22px] py-3 text-[15px] font-semibold text-cta transition-colors hover:bg-cta hover:text-white"
      >
        {children} <span aria-hidden="true">→</span>
      </Link>
    </div>
  );
};

export default MoreLink;
