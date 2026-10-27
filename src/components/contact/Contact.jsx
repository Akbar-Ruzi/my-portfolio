"use client";

import { useEffect, useRef, useState } from "react";
import emailjs from "@emailjs/browser";
import contactData from "@/data/contact/contactData";
import socials from "@/data/contact/socials";

const fieldClass =
  "w-full rounded-xl border border-[#E6E3DA] bg-[#F5F4F0] px-3.5 py-[13px] text-base text-fg transition-colors placeholder:text-[#8C93A0] focus:border-cta focus:bg-white focus:ring-[3px] focus:ring-cta/20 focus:outline-none aria-invalid:border-[#C2410C] aria-invalid:bg-[#FFF7F3]";

const validateEmail = (value) =>
  /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value.trim());

const validateRequired = (value) => value.trim().length > 0;

// one check per field, in form order (the first failing field gets focus)
// object-based validation pattern
const checks = {
  user_email: validateEmail,
  subject: validateRequired,
  user_message: validateRequired,
};

// look of the status line for each status key (text comes from contactData.form.status)
const statusClass = {
  sending: "text-muted",
  sent: "rounded-xl border border-[#16A34A] bg-[#DCFCE7] px-4 py-3.5 text-base font-semibold text-[#166534]",
  failed: "rounded-xl border border-[#C2410C]/30 bg-[#FFF7F3] px-4 py-3 font-medium text-[#B3360B]",
};
const statusIcon = { sent: "✓ ", failed: "⚠ " };
const SENT_VISIBLE_MS = 3000; // the success box hides itself after this long

const Contact = () => {
  const formRef = useRef(null);
  const [errors, setErrors] = useState({}); // { fieldName: true } for each invalid field
  const [status, setStatus] = useState(""); // "", "sending", "sent" or "failed"
  const sending = status === "sending";
  const { form } = contactData;

  // hide the success box after SENT_VISIBLE_MS; the failed box stays until the visitor acts
  useEffect(() => {
    if (status !== "sent") return;
    const timer = setTimeout(() => setStatus(""), SENT_VISIBLE_MS);
    return () => clearTimeout(timer); // cleanup if status changes first or the section unmounts
  }, [status]);

  // typing in a field clears its error and an old sent/failed message
  const handleInput = (e) => {
    if (status && !sending) setStatus("");
    const { name } = e.target;
    if (errors[name]) {
      setErrors((prev) => ({
        ...prev,
        [name]: false,
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const fields = formRef.current.elements;
    setStatus("");

    // VALIDATE: mark every invalid field, focus the first one
    const nextErrors = {};
    for (const name in checks) {
      // checks[name](fields[name].value) -- accessing an object property and calling a function at the same time.
      if (!checks[name](fields[name].value)) nextErrors[name] = true;
    }
    setErrors(nextErrors);
    // Focus the first invalid input
    const firstInvalid = Object.keys(nextErrors)[0];
    if (firstInvalid) {
      fields[firstInvalid].focus();
      return; // stops the function; no email is sent.
    }

    // HONEYPOT: only bots fill the hidden field; ignore them silently
    if (fields._gotcha.value) return;

    // SEND with EmailJS (ids come from .env)
    setStatus("sending");
    try {
      await emailjs.sendForm(
        process.env.NEXT_PUBLIC_SERVICE_ID,
        process.env.NEXT_PUBLIC_TEMPLATE_ID,
        formRef.current,
        { publicKey: process.env.NEXT_PUBLIC_PUBLIC_KEY },
      );
      formRef.current.reset();
      setStatus("sent");
    } catch {
      setStatus("failed"); // the typed message stays, so the visitor can just press Send again
    }
  };

  // label + input/textarea + error text, wired together for screen readers
  const field = (name, label, input) => (
    <div className="grid gap-2">
      <label htmlFor={`c-${name}`} className="text-sm font-medium">
        {label}
      </label>
      {input({
        id: `c-${name}`,
        name,
        required: true,
        onInput: handleInput,
        "aria-invalid": errors[name] || undefined,
        "aria-describedby": errors[name] ? `e-${name}` : undefined,
        suppressHydrationWarning: true, // Chrome on iOS adds an autofill attribute (__gcruniqueid) before React loads
      })}
      {errors[name] && (
        <small id={`e-${name}`} className="text-[13px] text-[#B3360B]">
          {form.errors[name]}
        </small>
      )}
    </div>
  );

  return (
    <section
      id="contact"
      aria-labelledby="contact-h"
      className="card-section rounded-[20px] bg-panel py-14"
    >
      {/* GRID: intro | form card, stacked below 1024px (tablets got two cramped columns). Below 640px the outer box and the form card
          drop their border, background and padding so the form uses the full width */}
      <div className="grid grid-cols-[minmax(0,.9fr)_minmax(0,1.1fr)] gap-[clamp(24px,5vw,56px)] rounded-2xl border border-line bg-surface p-[clamp(24px,5vw,48px)] max-lg:grid-cols-1 max-sm:border-0 max-sm:bg-transparent max-sm:p-0">
        {/* INTRO */}
        <div className="grid content-start gap-[18px]">
          <span className="font-mono text-xs leading-none font-medium tracking-[0.08em] text-muted uppercase">
            {contactData.label}
          </span>
          <h2 id="contact-h" className="text-[clamp(28px,4.5vw,44px)] font-extrabold">
            {contactData.title}
          </h2>
          <p className="max-w-[45ch] text-muted">{contactData.desc}</p>
          {/* SOCIAL PILLS: below 640px they split the full row 50/50 with less padding */}
          <div className="flex flex-wrap gap-3 max-sm:grid max-sm:grid-cols-2">
            {socials.map((social) => (
              <a
                key={social.name}
                href={social.url}
                target="_blank"
                rel="noopener"
                className={`inline-flex items-center justify-center rounded-full px-5 py-3 text-[15px] font-semibold text-white hover:brightness-115 max-sm:px-4 max-sm:py-2.5 ${social.bg}`}
              >
                {social.name}
                <span aria-hidden="true">&nbsp;↗</span>
                <span className="sr-only"> (opens in a new tab)</span>
              </a>
            ))}
          </div>
        </div>
        {/* FORM CARD: noValidate turns off the browser's own bubbles; handleSubmit validates instead */}
        <form
          ref={formRef}
          noValidate
          suppressHydrationWarning // Chrome on iOS adds __gcruniqueid here too (see the field helper)
          onSubmit={handleSubmit}
          className="grid min-w-0 gap-[18px] rounded-[20px] border border-line bg-panel p-[clamp(22px,4vw,36px)] shadow-[0_24px_50px_-24px_rgba(15,26,46,.30)] max-sm:border-0 max-sm:p-0 max-sm:shadow-none"
        >
          <div>
            <h3 className="text-[clamp(22px,2.6vw,28px)] leading-[1.2] font-extrabold">
              {form.title}
            </h3>
            <p className="mt-1.5 text-[15px] text-muted">{form.desc}</p>
          </div>
          {field("user_email", "Your email", (props) => (
            <input
              {...props}
              type="email"
              autoComplete="email"
              placeholder="you@example.com"
              className={fieldClass}
            />
          ))}
          {field("subject", "Subject", (props) => (
            <input
              {...props}
              type="text"
              placeholder="e.g. Software engineering role, project or idea"
              maxLength={120}
              className={fieldClass}
            />
          ))}
          {field("user_message", "Message", (props) => (
            <textarea
              {...props}
              rows={6}
              placeholder="Tell me about your project, role or idea."
              className={`min-h-[140px] resize-y ${fieldClass}`}
            />
          ))}
          {/* HONEYPOT: hidden from people; a bot that fills it gets ignored in handleSubmit */}
          <input
            type="text"
            name="_gotcha"
            suppressHydrationWarning
            tabIndex={-1}
            autoComplete="off"
            aria-hidden="true"
            className="absolute -left-[9999px] size-px opacity-0"
          />
          {/* FOOT: send button, privacy note, status line (hidden while empty) */}
          <div className="mt-1.5 grid justify-items-center gap-2.5">
            {/* while sending: disabled (no double send), spinner + "Sending…" */}
            <button
              type="submit"
              disabled={sending}
              aria-busy={sending || undefined}
              className="inline-flex w-full cursor-pointer items-center justify-center gap-2.5 rounded-xl bg-linear-135 from-[#2F7A6B] to-[#1F5249] px-5 py-[15px] font-semibold text-white shadow-[0_12px_26px_-12px_rgba(31,82,73,.7)] hover:brightness-108 disabled:cursor-wait disabled:opacity-75"
            >
              {sending && (
                <span
                  aria-hidden="true"
                  className="size-4 animate-spin rounded-full border-2 border-white/40 border-t-white motion-reduce:animate-none"
                />
              )}
              {sending ? form.button.sending : form.button.idle}
            </button>
            <p className="text-[13px] text-muted">{form.note}</p>
            {/* STATUS: solid green box when sent (fades in, hides after 3s), red box when failed;
                screen readers announce it */}
            <p
              role="status"
              className={`w-full text-center text-sm transition duration-300 empty:hidden starting:translate-y-1 starting:opacity-0 ${statusClass[status] || ""}`}
            >
              {statusIcon[status] && <span aria-hidden="true">{statusIcon[status]}</span>}
              {status && form.status[status]}
            </p>
          </div>
        </form>
      </div>
    </section>
  );
};

export default Contact;
