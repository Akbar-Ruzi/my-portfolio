"use client";

// Caravan along the bottom of the hero (design: v14 "Uyghur elder walking with his donkey").
// An elder in a doppa leads a donkey carrying gourds across the strip every 34s; his speech bubble
// alternates the messages in heroData.caravan. Decorative only. The animations live in globals.css (.caravan);
// they pause while the strip is off screen or the tab is hidden, and are off with reduced motion
import { useEffect, useRef, useState } from "react";
import heroData from "@/utils/heroData";

// one pass: from 330px left of the strip to 20px past its right edge, in 34s
const WALK_SECONDS = 34;
const START_OFFSET = 330;

const Caravan = () => {
  const strip = useRef(null); // References the main caravan container
  const walker = useRef(null); // References the element that contains the walking character and donkey
  const bubble = useRef(null); // References the speech bubble element
  const [message, setMessage] = useState(0); // Stores the index of the current speech bubble message

  useEffect(() => {
    const c = strip.current;
    const w = walker.current;
    const b = bubble.current;

    // each pass starts with the first message; the bubble first shows once he's ~130px into the strip
    const restart = () => {
      setMessage(0);
      const speed = (c.offsetWidth + START_OFFSET + 20) / WALK_SECONDS;
      b.style.animation = "none";
      void b.offsetWidth; // reflow, so the bubble animation starts over
      b.style.animation = "";
      b.style.animationDelay = `${((START_OFFSET - 200) / speed).toFixed(2)}s`;
    };
    const onIteration = (e) => {
      if (e.target === w) restart();
      else if (e.target === b) setMessage((m) => (m + 1) % heroData.caravan.length);
    };
    restart();
    c.addEventListener("animationiteration", onIteration);

    // pause while off screen or while the tab is hidden, to save battery
    let offScreen = false;
    const update = () => {
      c.dataset.paused = offScreen || document.hidden ? "true" : "false";
    };
    const observer = new IntersectionObserver(([entry]) => {
      offScreen = !entry.isIntersecting;
      update();
    });
    observer.observe(c);
    document.addEventListener("visibilitychange", update);

    return () => {
      c.removeEventListener("animationiteration", onIteration);
      observer.disconnect();
      document.removeEventListener("visibilitychange", update);
    };
  }, []);

  return (
    // the strip spans the hero card edge to edge; dashed "ground" line near the bottom
    <div ref={strip} aria-hidden="true" className="caravan">
      <div className="caravan-ground" />
      <div ref={walker} className="walker">
        <div className="walker-inner">
          <div ref={bubble} className="bubble">
            {heroData.caravan[message]}
          </div>
          <svg viewBox="0 0 260 124" width="260" height="124" className="absolute bottom-0 left-0 block">
            {/* rope from the man's hand to the donkey's halter */}
            <path className="rope" d="M187 61 Q140 80 95 50" fill="none" stroke="#8A6A45" strokeWidth="1.6" />
            <g transform="translate(140 0)">
              {/* ELDER: legs, chapan (striped robe) with sash, head with white beard, black-and-white doppa, arms, a small gourd swinging from his hand */}
              <g className="man">
                <g className="bob">
                  <g className="leg l2">
                    <rect x="64" y="84" width="8" height="30" rx="3" fill="#241E1B" />
                    <path d="M62 112h13a3 3 0 0 1 3 3v4H62z" fill="#15110F" />
                  </g>
                  <g className="leg l1">
                    <rect x="70" y="84" width="8" height="30" rx="3" fill="#2E2622" />
                    <path d="M68 112h13a3 3 0 0 1 3 3v4H68z" fill="#1A1513" />
                  </g>
                  <path d="M57 40Q70 36 83 40L89 95H51Z" fill="#2E4A6E" />
                  <path d="M63 41L59 95M71 39V95M79 41L83 95" stroke="#4A6E9C" strokeWidth="2" fill="none" />
                  <path d="M53 62H87V67H53Z" fill="#C9A86A" />
                  <path d="M58 67l-2 9M61 67l0 9" stroke="#C9A86A" strokeWidth="1.6" />
                  <rect x="67" y="32" width="8" height="9" fill="#C9946C" />
                  <circle cx="71" cy="27" r="9" fill="#E0B088" />
                  <circle cx="63.5" cy="28" r="2" fill="#D59F78" />
                  <path d="M63 28Q63 45 72 48Q81 45 80 29Q76 34 71 33Q66 34 63 28Z" fill="#EFEEE8" />
                  <path d="M70 31Q75 29 80 31" stroke="#EFEEE8" strokeWidth="2" fill="none" strokeLinecap="round" />
                  <path d="M73 21.5h5" stroke="#EFEEE8" strokeWidth="1.6" strokeLinecap="round" />
                  <circle cx="76" cy="25" r="1.2" fill="#241E1B" />
                  <path d="M79 26q2 2 0 4" stroke="#C48E66" strokeWidth="1.4" fill="none" />
                  <path d="M60.5 22H81.5L80.5 11.5Q80 9.5 78 9.5H64Q62 9.5 61.5 11.5Z" fill="#141414" />
                  <path d="M71 9.5V22" stroke="#3A3A3A" strokeWidth="0.8" />
                  <path d="M63.5 20.5Q62 15.5 66 12.2Q69.6 11.6 69.2 14.4Q67.6 13.8 66.8 15.2Q66 17.4 67.6 20.5Z" fill="#F4F1EA" />
                  <path d="M64.6 19.6Q64.2 16.6 66.2 14.6" stroke="#141414" strokeWidth=".5" fill="none" />
                  <path d="M74.4 20.5Q72.9 15.5 76.9 12.2Q80.5 11.6 80.1 14.4Q78.5 13.8 77.7 15.2Q76.9 17.4 78.5 20.5Z" fill="#F4F1EA" />
                  <path d="M75.5 19.6Q75.1 16.6 77.1 14.6" stroke="#141414" strokeWidth=".5" fill="none" />
                  <path d="M70 13l1-1.4 1 1.4-1 1.4zM70 18l1-1.4 1 1.4-1 1.4z" fill="#F4F1EA" />
                  <path d="M60.5 22H81.5" stroke="#F4F1EA" strokeWidth="1.2" />
                  <path d="M60 45Q52 54 48 60" stroke="#27405F" strokeWidth="7" strokeLinecap="round" fill="none" />
                  <circle cx="47" cy="61" r="3.2" fill="#E0B088" />
                  <path d="M80 45Q86 51 88 56" stroke="#2E4A6E" strokeWidth="7" strokeLinecap="round" fill="none" />
                  <circle cx="88.5" cy="57" r="3" fill="#E0B088" />
                  {/* the gourd in his hand */}
                  <g className="hang">
                    <path d="M88 54V63" stroke="#4A2A1C" strokeWidth="1.2" />
                    <circle cx="88" cy="77" r="6.5" fill="#B9672F" />
                    <circle cx="88" cy="67.5" r="4.2" fill="#BE6B31" />
                    <rect x="86.6" y="62" width="2.8" height="2.6" fill="#2B2B2A" />
                    <ellipse cx="86" cy="75" rx="2" ry="1.5" fill="#E39A5E" opacity=".6" />
                  </g>
                </g>
              </g>
            </g>
            <g transform="translate(-110 0)">
              {/* DONKEY: far legs, tail, body, near legs, red saddle blanket, three gourds as cargo, neck, nodding head */}
              <g className="donkey">
                <g className="dbob">
                  <g className="dleg d2">
                    <rect x="135" y="72" width="7" height="42" rx="3" fill="#7A746E" />
                    <rect x="134" y="112" width="9" height="7" rx="1.5" fill="#3B3632" />
                  </g>
                  <g className="dleg d1">
                    <rect x="185" y="72" width="7" height="42" rx="3" fill="#7A746E" />
                    <rect x="184" y="112" width="9" height="7" rx="1.5" fill="#3B3632" />
                  </g>
                  <path d="M125 60Q113 70 117 88" stroke="#6E6863" strokeWidth="3" fill="none" strokeLinecap="round" />
                  <ellipse cx="117" cy="90" rx="3" ry="5" fill="#4D4844" />
                  <ellipse cx="162" cy="64" rx="40" ry="19" fill="#8E8882" />
                  <ellipse cx="162" cy="73" rx="30" ry="8" fill="#B3ADA6" />
                  <g className="dleg d1">
                    <rect x="143" y="72" width="7" height="42" rx="3" fill="#8E8882" />
                    <rect x="142" y="112" width="9" height="7" rx="1.5" fill="#46413D" />
                  </g>
                  <g className="dleg d2">
                    <rect x="192" y="72" width="7" height="42" rx="3" fill="#8E8882" />
                    <rect x="191" y="112" width="9" height="7" rx="1.5" fill="#46413D" />
                  </g>
                  <rect x="146" y="46" width="34" height="22" rx="4" fill="#A3392C" />
                  <rect x="146" y="60" width="34" height="3" fill="#F2E3C2" />
                  <path d="M151 51l4 4 4-4 4 4 4-4 4 4 4-4" stroke="#F2E3C2" strokeWidth="1.2" fill="none" />
                  {/* three gourds on the saddle, tied with a strap */}
                  <g className="cargo">
                    <circle cx="151" cy="42" r="7" fill="#B9672F" />
                    <circle cx="151" cy="33.8" r="4.2" fill="#B9672F" />
                    <ellipse cx="148.6" cy="39.9" rx="2.1" ry="1.5" fill="#E39A5E" opacity=".55" />
                    <rect x="149.6" y="27" width="2.8" height="3" fill="#2B2B2A" />
                    <rect x="149.2" y="29.6" width="3.6" height="1.2" fill="#C9A86A" />
                    <circle cx="175" cy="42.4" r="6.6" fill="#C98A4B" />
                    <circle cx="175" cy="34.8" r="4" fill="#C98A4B" />
                    <ellipse cx="172.7" cy="40.4" rx="2.0" ry="1.5" fill="#EDB98A" opacity=".55" />
                    <rect x="173.6" y="28.2" width="2.8" height="3" fill="#2B2B2A" />
                    <rect x="173.2" y="30.8" width="3.6" height="1.2" fill="#C9A86A" />
                    <circle cx="163" cy="39.5" r="8.5" fill="#BE6B31" />
                    <circle cx="163" cy="29.0" r="5" fill="#BE6B31" />
                    <ellipse cx="160.0" cy="37.0" rx="2.5" ry="1.9" fill="#E39A5E" opacity=".55" />
                    <rect x="161.6" y="21.4" width="2.8" height="3" fill="#2B2B2A" />
                    <rect x="161.2" y="24.0" width="3.6" height="1.2" fill="#C9A86A" />
                    <path d="M144 41Q163 47 182 41" stroke="#5A3220" strokeWidth="1.6" fill="none" />
                  </g>
                  <path d="M186 58Q194 40 205 31L214 39Q204 52 198 72Z" fill="#8E8882" />
                  <path d="M189 50Q196 37 205 29" stroke="#4D4844" strokeWidth="4" fill="none" strokeLinecap="round" />
                  {/* head: ears, muzzle, eye, halter */}
                  <g className="dhead">
                    <ellipse cx="203" cy="23" rx="3.4" ry="11" transform="rotate(-12 203 23)" fill="#7A746E" />
                    <ellipse cx="208" cy="22" rx="3.6" ry="11.5" transform="rotate(-4 208 22)" fill="#8E8882" />
                    <ellipse cx="208" cy="23" rx="1.6" ry="7.5" transform="rotate(-4 208 23)" fill="#D8C8BC" />
                    <ellipse cx="214" cy="43" rx="14" ry="9" transform="rotate(32 214 43)" fill="#8E8882" />
                    <ellipse cx="223" cy="52" rx="7.5" ry="6.2" fill="#CFC7BE" />
                    <circle cx="226" cy="52" r="1.1" fill="#4D4844" />
                    <circle cx="211" cy="38" r="1.4" fill="#241E1B" />
                    <path d="M206 46L219 47M205 48Q212 56 220 57" stroke="#5A3220" strokeWidth="1.6" fill="none" />
                  </g>
                </g>
              </g>
            </g>
          </svg>
        </div>
      </div>
    </div>
  );
};

export default Caravan;
