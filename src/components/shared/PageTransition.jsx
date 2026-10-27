"use client";

// Page switch, as in the new design: a click on a link to another page (/, /experience, /projects)
// slides the page out while a thin green bar fills the top, then the new page slides in.
// The new page starts loading at the click, during the slide-out, so the animation adds as little
// waiting as possible. Lives in the root layout, so it stays mounted while the pages change.
// The CSS is in globals.css (html.leaving / html.entering / .route-bar); off with reduced motion
import { useEffect, useLayoutEffect, useRef } from "react";
import { usePathname, useRouter } from "next/navigation";

const ENTER_MS = 500; // the slide-in (0.35s + the footer's 0.1s delay), then the class goes
const STUCK_MS = 5000; // if the new page never arrives, show the old one again

const PageTransition = () => {
  const pathname = usePathname();
  const router = useRouter();
  const leaving = useRef(false); // true from our click until the new page has rendered

  // CLICK: capture phase on window, so it runs before next/link's own click handler
  useEffect(() => {
    const html = document.documentElement;
    let timer;

    const onClick = (e) => {
      const a = e.target.closest?.("a[href]");
      if (!a || e.defaultPrevented || e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;
      if (a.target === "_blank" || a.hasAttribute("download")) return;
      const url = new URL(a.href, location.href);
      // only another page of this site; #section links on the same page just scroll
      if (url.origin !== location.origin || url.pathname === location.pathname) return;
      if (matchMedia("(prefers-reduced-motion: reduce)").matches) return;

      e.preventDefault(); // next/link sees this and doesn't navigate; we do it ourselves
      leaving.current = true;
      html.classList.add("leaving");
      // navigate right away: the old page stays on screen (sliding out) until the new one is ready
      router.push(url.pathname + url.search + url.hash);
      clearTimeout(timer);
      timer = setTimeout(() => {
        leaving.current = false;
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
    const timer = setTimeout(() => html.classList.remove("entering"), ENTER_MS);
    return () => {
      clearTimeout(timer);
      html.classList.remove("entering");
    };
  }, [pathname]);

  return <div className="route-bar" aria-hidden="true" />;
};

export default PageTransition;
