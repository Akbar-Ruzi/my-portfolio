// Scroll to a #section link's target (or the very top for "#top"), gliding unless the user prefers
// reduced motion, and landing below the sticky nav at the same spot every time (scroll-padding-top).
// Used by components/shared/PageTransition.jsx for every #section link on the site.
//
// Why not the browser's own #hash scroll: the scroll reveal (globals.css) shifts each section 20px down
// (transform) until it's on screen, and the browser counts that shift, so it landed ~20px too far.
// offsetTop ignores transforms, so the target is measured from the layout instead.
//
// While it glides, <html data-scroll-target="#about"> tells the nav's scroll-spy where it's going,
// so the underline moves straight there instead of flickering through every section on the way.

let run = 0; // the latest call; an older glide that is still watching stops when a new one starts

const targetY = (hash) => {
  const el = document.getElementById(decodeURIComponent(hash.slice(1)));
  if (!el) return hash === "#top" ? 0 : null; // no element has id="top": the browser's rule for "#top"
  let y = 0;
  for (let node = el; node; node = node.offsetParent) y += node.offsetTop;
  const html = document.documentElement;
  const pad = parseFloat(getComputedStyle(html).scrollPaddingTop) || 0;
  return Math.max(0, Math.min(y - pad, html.scrollHeight - window.innerHeight));
};

// lead: jump to this many px above the target first, then glide only the rest (after a page change,
// so the new page doesn't glide all the way down from the top). Returns false if there's no target.
const scrollToHash = (hash, { lead = 0 } = {}) => {
  const y = targetY(hash);
  if (y === null) return false;
  const html = document.documentElement;
  const id = ++run;

  if (matchMedia("(prefers-reduced-motion: reduce)").matches) {
    delete html.dataset.scrollTarget;
    window.scrollTo({ top: y, behavior: "instant" });
  } else {
    if (lead) window.scrollTo({ top: Math.max(0, y - lead), behavior: "instant" });
    html.dataset.scrollTarget = hash;
    window.scrollTo({ top: y, behavior: "smooth" });
    // done when it arrives, or when scrolling stops early (e.g. the user scrolled during the glide);
    // then the scroll-spy takes over again
    let last = -1;
    let still = 0;
    const watch = () => {
      if (id !== run) return;
      still = window.scrollY === last ? still + 1 : 0;
      last = window.scrollY;
      if (Math.abs(window.scrollY - y) < 1 || still > 8) {
        delete html.dataset.scrollTarget;
        window.dispatchEvent(new Event("scroll"));
        return;
      }
      requestAnimationFrame(watch);
    };
    requestAnimationFrame(watch);
  }

  // like the browser's #hash jump: keyboard users continue from the section (Tab goes to its first link)
  const el = document.getElementById(decodeURIComponent(hash.slice(1)));
  if (el) {
    if (!el.hasAttribute("tabindex")) el.setAttribute("tabindex", "-1");
    el.focus({ preventScroll: true });
  }
  return true;
};

export default scrollToHash;
