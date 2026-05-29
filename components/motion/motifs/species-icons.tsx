import type { ReactNode } from "react";

export type SpeciesIconProps = { className?: string };

function Svg({ className, children }: { className?: string; children: ReactNode }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden focusable="false">
      {children}
    </svg>
  );
}

/* ── Livestock ──────────────────────────────────────────────── */

export function ChickenIcon({ className }: SpeciesIconProps) {
  return (
    <Svg className={className}>
      {/* tail */}
      <path d="M2.5 8.5 8 13 4 15.5Z" />
      {/* body */}
      <ellipse cx="10.5" cy="14" rx="6.6" ry="5.2" />
      {/* legs */}
      <rect x="8.4" y="18.4" width="1.1" height="3.4" rx="0.55" />
      <rect x="11.6" y="18.4" width="1.1" height="3.4" rx="0.55" />
      {/* head */}
      <circle cx="16.6" cy="8.4" r="3.3" />
      {/* comb */}
      <circle cx="15" cy="5" r="1.1" />
      <circle cx="16.7" cy="4.4" r="1.1" />
      <circle cx="18.2" cy="5.3" r="1" />
      {/* wattle */}
      <circle cx="16.8" cy="11.4" r="1" />
      {/* beak */}
      <path d="M19.5 7.7 22.4 7 19.5 9.6Z" />
    </Svg>
  );
}

export function CowIcon({ className }: SpeciesIconProps) {
  return (
    <Svg className={className}>
      {/* horns */}
      <path d="M6.5 6.2C4.2 4.3 3 5.2 3.4 7.2 4.6 6.3 5.6 6.4 6.8 7.1Z" />
      <path d="M17.5 6.2C19.8 4.3 21 5.2 20.6 7.2 19.4 6.3 18.4 6.4 17.2 7.1Z" />
      {/* ears */}
      <ellipse cx="4.6" cy="10.2" rx="2.4" ry="1.4" transform="rotate(-28 4.6 10.2)" />
      <ellipse cx="19.4" cy="10.2" rx="2.4" ry="1.4" transform="rotate(28 19.4 10.2)" />
      {/* head */}
      <path d="M6 9.2C6 6.7 8.4 5.6 12 5.6s6 1.1 6 3.6v2.4c0 1.9-1.3 3-2.8 3.6 0 2.3-1.4 3.6-3.2 3.6s-3.2-1.3-3.2-3.6C7.3 14.6 6 13.5 6 11.6Z" />
      {/* muzzle with nostrils */}
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M12 12.4c2.2 0 3.9 1.2 3.9 2.8S14.2 18 12 18s-3.9-1.2-3.9-2.8S9.8 12.4 12 12.4Zm-1.4 1.9a.7.7 0 100 1.4.7.7 0 000-1.4Zm2.8 0a.7.7 0 100 1.4.7.7 0 000-1.4Z"
      />
    </Svg>
  );
}

export function GoatIcon({ className }: SpeciesIconProps) {
  return (
    <Svg className={className}>
      {/* long horns swept up and back */}
      <path d="M8.8 7.6C7 5 5 2.4 3.7 3.3c.3 2.1 1.8 4.3 4.1 6.1Z" />
      <path d="M15.2 7.6C17 5 19 2.4 20.3 3.3c-.3 2.1-1.8 4.3-4.1 6.1Z" />
      {/* floppy ears */}
      <ellipse cx="5.8" cy="11.6" rx="2.5" ry="1.3" transform="rotate(22 5.8 11.6)" />
      <ellipse cx="18.2" cy="11.6" rx="2.5" ry="1.3" transform="rotate(-22 18.2 11.6)" />
      {/* head: wide brow tapering to chin */}
      <path d="M7.6 9.2C7.6 7.8 9.5 7.1 12 7.1s4.4 .7 4.4 2.1v3.1c0 2.4-1.8 4.4-4.4 5.8-2.6-1.4-4.4-3.4-4.4-5.8Z" />
      {/* beard */}
      <path d="M10.5 16.6 12 21.6 13.5 16.6Z" />
    </Svg>
  );
}

export function PigIcon({ className }: SpeciesIconProps) {
  return (
    <Svg className={className}>
      {/* ears */}
      <path d="M5.5 5 9.9 6.6 7.1 10.6Z" />
      <path d="M18.5 5 14.1 6.6 16.9 10.6Z" />
      {/* head */}
      <circle cx="12" cy="11" r="7" />
      {/* snout protruding below the chin, with nostrils cut out */}
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M12 13.6c2.2 0 3.9 1.6 3.9 3.6S14.2 20.8 12 20.8s-3.9-1.6-3.9-3.6S9.8 13.6 12 13.6Zm-1.6 2.5a.9.9 0 100 1.8.9.9 0 000-1.8Zm3.2 0a.9.9 0 100 1.8.9.9 0 000-1.8Z"
      />
    </Svg>
  );
}

export function FishIcon({ className }: SpeciesIconProps) {
  return (
    <Svg className={className}>
      {/* body with eye cut out */}
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M21.5 12c-2.4 3.4-6.3 5.4-10.2 5.4-1.6 0-3.1-.3-4.5-1l-3.1 2.4 1-3.8C3.6 14.1 3 13.1 3 12s.6-2.1 1.7-2.9l-1-3.8 3.1 2.4c1.4-.7 2.9-1 4.5-1 3.9 0 7.8 2 10.2 5.4ZM16 10.6a1.1 1.1 0 100 2.2 1.1 1.1 0 000-2.2Z"
      />
    </Svg>
  );
}

/* ── Crops ──────────────────────────────────────────────────── */

export function MaizeIcon({ className }: SpeciesIconProps) {
  return (
    <Svg className={className}>
      {/* husk leaves */}
      <path d="M12 22C8.5 21 6.5 18.5 6.5 15c2.6.4 4.4 2.1 5.5 4.6 1.1-2.5 2.9-4.2 5.5-4.6 0 3.5-2 6-5.5 7Z" />
      {/* cob */}
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M12 2c2.5 0 4.4 2.4 4.4 6.3S14.5 16 12 16s-4.4-3.8-4.4-7.7S9.5 2 12 2Zm-1.7 3.6a.85.85 0 100 1.7.85.85 0 000-1.7Zm3.4 0a.85.85 0 100 1.7.85.85 0 000-1.7Zm-3.4 3.3a.85.85 0 100 1.7.85.85 0 000-1.7Zm3.4 0a.85.85 0 100 1.7.85.85 0 000-1.7Zm-1.7-1.7a.85.85 0 100 1.7.85.85 0 000-1.7Zm0 3.3a.85.85 0 100 1.7.85.85 0 000-1.7Z"
      />
    </Svg>
  );
}

export function WheatIcon({ className }: SpeciesIconProps) {
  return (
    <Svg className={className}>
      {/* stalk */}
      <rect x="11.3" y="11" width="1.4" height="11" rx="0.7" />
      {/* tip */}
      <path d="M12 2.2c1 1.2 1 3 0 4.2-1-1.2-1-3 0-4.2Z" />
      {/* grain pairs */}
      <path d="M12 5.4c1.7.3 2.9 1.6 3 3.4-1.7-.3-2.9-1.6-3-3.4Z" />
      <path d="M12 5.4c-1.7.3-2.9 1.6-3 3.4 1.7-.3 2.9-1.6 3-3.4Z" />
      <path d="M12 8.6c1.7.3 2.9 1.6 3 3.4-1.7-.3-2.9-1.6-3-3.4Z" />
      <path d="M12 8.6c-1.7.3-2.9 1.6-3 3.4 1.7-.3 2.9-1.6 3-3.4Z" />
      <path d="M12 11.8c1.7.3 2.9 1.6 3 3.4-1.7-.3-2.9-1.6-3-3.4Z" />
      <path d="M12 11.8c-1.7.3-2.9 1.6-3 3.4 1.7-.3 2.9-1.6 3-3.4Z" />
    </Svg>
  );
}

export function LeafyIcon({ className }: SpeciesIconProps) {
  return (
    <Svg className={className}>
      {/* base */}
      <path d="M9.5 20h5l-.7-4h-3.6Z" opacity="0.8" />
      {/* leaves */}
      <path d="M12 16C7 14 4 10 5 4c5 1 8 4 7 12Z" />
      <path d="M12 16c5-2 8-6 7-12-5 1-8 4-7 12Z" />
      <path d="M12 16c1.5-2.5 1.7-6 0-10-1.7 4-1.5 7.5 0 10Z" />
    </Svg>
  );
}
