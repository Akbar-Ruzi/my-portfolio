"use client";

// Page switch, as in the new design: a click on a link to another page (/, /experience, /projects)
// slides the page out while a thin green bar fills the top, then the new page slides in.
// The new page starts loading at the click, during the slide-out, so the animation adds as little
// waiting as possible. Lives in the root layout, so it stays mounted while the pages change.
// The CSS is in globals.css (html.leaving / html.entering / .route-bar); off with reduced motion.
// It also handles #section links (nav, hero buttons, "← Back to home"), with utils/scrollToHash.js:
// on the same page they glide to the section; after a page change the new page jumps to just above
// the section and glides the rest, instead of gliding all the way down from the top
import { useEffect, useLayoutEffect, useRef } from "react";
import { usePathname, useRouter } from "next/navigation";
import scrollToHash from "@/utils/scrollToHash";

const ENTER_MS = 500; // the slide-in (0.35s + the footer's 0.1s delay), then the class goes
const STUCK_MS = 5000; // if the new page never arrives, show the old one again
const LEAD_PX = 200; // after a page change, the length of the glide into the #section

const PageTransition = () => {
  const pathname = usePathname();
  const router = useRouter();
  const leaving = useRef(false); // true from our click until the new page has rendered
  const hash = useRef(""); // the #section to scroll to once the new page has rendered

  // CLICK: capture phase on window, so it runs before next/link's own click handler
  useEffect(() => {
    const html = document.documentElement;
    let timer;

    const onClick = (e) => {
      const a = e.target.closest?.("a[href]");
      if (!a || e.defaultPrevented || e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;
      if (a.target === "_blank" || a.hasAttribute("download")) return;
      const url = new URL(a.href, location.href);
      if (url.origin !== location.origin) return;
      // same page: a #section link glides there (and the address bar gets the #section)
      if (url.pathname === location.pathname) {
        if (!url.hash || !scrollToHash(url.hash)) return;
        e.preventDefault();
        if (url.hash !== location.hash) history.pushState(null, "", url.hash);
        return;
      }
      // another page; with reduced motion next/link navigates and jumps to the #section as usual
      if (matchMedia("(prefers-reduced-motion: reduce)").matches) return;

      e.preventDefault(); // next/link sees this and doesn't navigate; we do it ourselves
      leaving.current = true;
      hash.current = url.hash;
      html.classList.add("leaving");
      // navigate right away: the old page stays on screen (sliding out) until the new one is ready.
      // With a #section, Next must not scroll (it would jump); the new page scrolls below instead
      router.push(url.pathname + url.search + url.hash, { scroll: !url.hash });
      clearTimeout(timer);
      timer = setTimeout(() => {
        leaving.current = false;
        hash.current = "";
        html.classList.remove("leaving");
      }, STUCK_MS);
    };

    window.addEventListener("click", onClick, true);
    return () => {
      window.removeEventListener("click", onClick, true);
      clearTimeout(timer);
    };
  }, [router]);

  // NEW PAGE: swap "leaving" for "entering" before the browser paints it, so it never flashes in
  useLayoutEffect(() => {
    if (!leaving.current) return; // first load, or the browser's back/forward: no animation
    leaving.current = false;
    const html = document.documentElement;
    html.classList.remove("leaving");
    html.classList.add("entering");
    if (hash.current) scrollToHash(hash.current, { lead: LEAD_PX });
    hash.current = "";
    const timer = setTimeout(() => html.classList.remove("entering"), ENTER_MS);
    return () => {
      clearTimeout(timer);
      html.classList.remove("entering");
    };
  }, [pathname]);

  return <div className="route-bar" aria-hidden="true" />;
};

export default PageTransition;
