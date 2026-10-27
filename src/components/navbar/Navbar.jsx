"use client";
import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import links from "@/data/navbar/links";

const Navbar = () => {
  // On a sub-page (/experience, /projects) the home sections aren't there,
  // so each link goes back to the home page first: "#about" becomes "/#about".
  // next/link swaps the page without a full reload; on home the links stay plain <a>.
  const isHome = usePathname() === "/";
  const Anchor = isHome ? "a" : Link;
  const to = (hash) => (isHome ? hash : `/${hash}`);
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
      // scroll-spy only on home: /experience and /projects reuse the ids #experience / #work,
      // and their nav links lead back to home, so nothing should be underlined there
      if (!navRef.current || !isHome) return;
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
  }, [isHome]);

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
      <div className="flex flex-wrap items-center justify-between gap-4 py-3.5 max-[670px]:gap-y-1.5 max-[670px]:py-2.5">
        {/* LOGO */}
        {/* home: #top (the Hero); sub-page: "/" opens the home page at the top */}
        <Anchor
          href={isHome ? "#top" : "/"}
          className="inline-flex items-center gap-2 font-display text-xl leading-none font-extrabold"
        >
          {/* small gourd icon: the hero gourd's shapes and colors (HeroGourd.jsx), without the handle
              string, which would be thinner than a pixel at this size; decorative, the text is the name.
              Hidden below 360px, so "Contact Me" still fits on the same row on the narrowest phones */}
          <svg viewBox="8 10 344 510" className="h-7 w-auto shrink-0 max-[359px]:hidden" aria-hidden="true">
            <ellipse cx="180" cy="362" rx="170" ry="155" fill="#B9672F" />
            <circle cx="180" cy="165" r="100" fill="#BE6B31" />
            <ellipse cx="180" cy="248" rx="52" ry="18" fill="#A85A27" />
            <ellipse cx="148" cy="112" rx="26" ry="16" fill="#E39A5E" opacity=".5" />
            <rect x="164" y="58" width="32" height="12" rx="2" fill="#C9A86A" />
            <path d="M160 18 L200 18 L193 36 L193 60 L167 60 L167 36 Z" fill="#2B2B2A" />
            <rect x="157" y="12" width="46" height="9" rx="3" fill="#3A3A38" />
          </svg>
          <span>
            Magic <span className="text-accent">Gourd</span>
          </span>
        </Anchor>
        {/* LINKS: below 670px their own row under the logo (above that, logo + gourd icon, links and
            Contact Me no longer fit on one row), split into three equal columns,
            so each link is a third of the row wide (bigger tap area); the active underline sits on
            the word (.nav-label), so it stays under the word however wide the link is */}
        <ul className="flex flex-wrap gap-1 max-[670px]:order-3 max-[670px]:grid max-[670px]:w-full max-[670px]:grid-cols-3">
          {links.map((link) => (
            <li key={link.title}>
              <Anchor
                href={to(link.url)}
                aria-current={active === link.url ? "true" : undefined}
                className={`nav-link block rounded-md px-3 py-2 text-[15px] font-medium text-muted transition-colors hover:bg-cta/10 hover:text-cta max-[670px]:px-2.5 max-[670px]:py-1.5 max-[670px]:text-center ${
                  active === link.url ? "active" : ""
                }`}
              >
                <span className="nav-label relative inline-block">{link.title}</span>
              </Anchor>
            </li>
          ))}
        </ul>
        {/* CONTACT BUTTON */}
        <Anchor
          href={to("#contact")}
          className="rounded-full bg-cta px-5 py-2.5 text-[15px] font-semibold text-white hover:brightness-110 max-[670px]:px-4 max-[670px]:py-2 max-[670px]:text-sm"
        >
          Contact Me
        </Anchor>
      </div>
    </nav>
  );
};

export default Navbar;
