"use client";

import { useId, useRef } from "react";

// Temporary: stands in for a project's Live demo / Code link while its url is still "".
// Remove this file once every project in utils/projects.js has both links (see plan.md, Future plan).
const Dialog = ({ label, what, project, className }) => {
  const dialogRef = useRef(null);
  const titleId = useId();

  return (
    <>
      <button
        type="button"
        onClick={() => dialogRef.current.showModal()}
        className={`cursor-pointer ${className}`}
      >
        {label}
      </button>
      {/* native <dialog>: showModal() gives the backdrop, Esc to close, and focus handling;
          a click on the backdrop (the dialog element itself, outside the card) closes it too */}
      <dialog
        ref={dialogRef}
        aria-labelledby={titleId}
        onClick={(e) => e.target === e.currentTarget && dialogRef.current.close()}
        className="m-auto w-[min(100%-32px,440px)] scale-95 rounded-[20px] bg-panel p-0 text-fg opacity-0 transition duration-200 backdrop:bg-fg/50 open:scale-100 open:opacity-100 starting:open:scale-95 starting:open:opacity-0"
      >
        <div className="grid gap-3 p-7 text-left">
          <h2 id={titleId} className="text-2xl">
            Not ready yet
          </h2>
          <p className="text-muted">
            The {what} for <strong className="font-semibold text-fg">{project}</strong> isn&apos;t
            available yet. I&apos;m getting it ready, so please check back soon.
          </p>
          <button
            type="button"
            autoFocus
            onClick={() => dialogRef.current.close()}
            className="mt-2 cursor-pointer justify-self-end rounded-full bg-cta px-5 py-2 text-sm font-semibold text-white hover:brightness-110"
          >
            Got it
          </button>
        </div>
      </dialog>
    </>
  );
};

export default Dialog;
