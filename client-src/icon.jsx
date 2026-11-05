import React from "react";

/** Sidebar entry glyph: three ascending signal dots over a rising line. */
export function PanelIcon(props) {
  const size = props?.size ?? 16;
  return (
    <svg width={size} height={size} viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      <path d="M2.4 11.6 5.6 8.6l2 1.9 3.8-4.2 2.2 2.1" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
      <circle cx="2.6" cy="11.6" r="1.15" fill="currentColor" />
      <circle cx="7.6" cy="10.5" r="0.95" fill="currentColor" opacity="0.75" />
      <circle cx="13.4" cy="6.3" r="1.15" fill="currentColor" />
    </svg>
  );
}
