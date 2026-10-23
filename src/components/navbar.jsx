"use client";
import { useEffect, useRef, useState } from "react";
import links from "@/utils/links";

const Navbar = () => {
  const navRef = useRef(null);
  const [stuck, setStuck] = useState(false);// Changes Navbar appearance after scrolling 40px
  const [active, setActive] = useState(null); // Highlights the navigation link for the current section

  // Scroll-spy: highlight the section just below the nav
  /**
   * Here, useEffect handles three things:
      1. Setup: Register the scroll listener after the component mounts.
      2. Execution: Let the browser call update() whenever scrolling occurs.
      3. Cleanup: Remove the listener when the component unmounts.
    */
  useEffect(() => {
    // update() calculates scroll position and active section
    const update = () => {
      // when the user scrolls more than 40px, stuck becomes true, React re-renders the Navbar, and the CSS classes change.
      setStuck(window.scrollY > 40);
      if (!navRef.current) return;
      // getBoundingClientRect calculates the element's current position each time you call it. 
      const mark = navRef.current.getBoundingClientRect().bottom + 120;
      let current = null;
      links.forEach((link) => {
        const section = document.querySelector(link.url);
        if (!section) return;
        const { top, bottom } = section.getBoundingClientRect();
        // top <= mark checks whether the section begins above or at the detection line.
        // bottom > mark checks whether the section extends below that line.
        if (top <= mark && bottom > mark) {
          current = link.url;
        }
      });
      // at the very bottom the contact section is in view, so no link is active
      if (
        window.innerHeight + window.scrollY >=
        document.documentElement.scrollHeight - 4
      )
        current = null;
      setActive(current);
    };
    // Because the user might refresh the page while already halfway down.
    update();
    // Scroll listener: Whenever the user scrolls, JavaScript calls update().
    window.addEventListener("scroll", update, { passive: true });
    // Resize listener: When the browser window changes size, section positions and layout may change.
    window.addEventListener("resize", update);
    return () => {
      // This removes listeners when the effect cleans up, preventing old listeners from accumulating.
      window.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
    };
  }, []);

  return (
    <nav
      ref={navRef}
      aria-label="Main"
      className={`card-section sticky top-[calc(env(safe-area-inset-top,0px)+10px)] z-50 -mb-[var(--outer)] border-b bg-panel transition-shadow ${
        stuck
          ? "rounded-[20px] border-transparent shadow-[0_8px_24px_-12px_rgba(15,26,46,.28)]"
          : "rounded-t-[20px] border-line shadow-[0_6px_18px_-12px_rgba(120,70,0,.35)]"
      }`}
    >
      <div className="flex flex-wrap items-center justify-between gap-4 py-3.5 max-[640px]:gap-y-1.5 max-[640px]:py-2.5">
        {/* LOGO */}
        <a
          href="#top"
          className="font-display text-xl leading-none font-extrabold"
        >
          Wolf<span className="text-accent">.dev</span>
        </a>
        {/* LINKS */}
        <ul className="flex flex-wrap gap-1 max-[640px]:order-3 max-[640px]:w-full max-[640px]:justify-center">
          {links.map((link) => (
            <li key={link.title}>
              <a
                href={link.url}
                aria-current={active === link.url ? "true" : undefined}
                className={`nav-link relative block rounded-md px-3 py-2 text-[15px] font-medium text-muted transition-colors hover:bg-cta/10 hover:text-cta max-[640px]:px-2.5 max-[640px]:py-1.5 ${
                  active === link.url ? "active" : ""
                }`}
              >
                {link.title}
              </a>
            </li>
          ))}
        </ul>
        {/* CONTACT BUTTON */}
        <a
          href="#contact"
          className="rounded-full bg-cta px-5 py-2.5 text-[15px] font-semibold text-white hover:brightness-110 max-[640px]:px-4 max-[640px]:py-2 max-[640px]:text-sm"
        >
          Contact Me
        </a>
      </div>
    </nav>
  );
};

export default Navbar;
