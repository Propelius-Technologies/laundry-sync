import type { SVGProps } from "react";

type IconProps = SVGProps<SVGSVGElement>;

/**
 * Inline icon set. Stroke-based, 24x24 viewBox, currentColor throughout so a
 * single component works at every size and tone in the design system.
 */

function Base({ children, ...props }: IconProps & { children: React.ReactNode }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      focusable="false"
      {...props}
    >
      {children}
    </svg>
  );
}

export const ArrowUpRight = (props: IconProps) => (
  <Base {...props}>
    <path d="M7 17 17 7" />
    <path d="M8 7h9v9" />
  </Base>
);

export const ArrowRight = (props: IconProps) => (
  <Base {...props}>
    <path d="M4 12h15" />
    <path d="m13 6 6 6-6 6" />
  </Base>
);

export const Check = (props: IconProps) => (
  <Base {...props}>
    <path d="m4.5 12.5 5 5L19.5 7" />
  </Base>
);

export const CheckCircle = (props: IconProps) => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    aria-hidden="true"
    focusable="false"
    {...props}
  >
    <circle cx="12" cy="12" r="10" fill="currentColor" />
    <path
      d="m7.8 12.3 2.8 2.8 5.6-5.8"
      stroke="var(--color-text-on-brand)"
      strokeWidth={2.1}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

export const Truck = (props: IconProps) => (
  <Base {...props}>
    <path d="M3 7.5A1.5 1.5 0 0 1 4.5 6H14v10H3z" />
    <path d="M14 10h3.2l2.8 3v3h-6z" />
    <circle cx="7" cy="18" r="1.8" />
    <circle cx="17" cy="18" r="1.8" />
  </Base>
);

export const Menu = (props: IconProps) => (
  <Base {...props}>
    <path d="M4 7h16" />
    <path d="M4 12h16" />
    <path d="M4 17h16" />
  </Base>
);

export const Close = (props: IconProps) => (
  <Base {...props}>
    <path d="M6 6 18 18" />
    <path d="M18 6 6 18" />
  </Base>
);

export const Search = (props: IconProps) => (
  <Base {...props}>
    <circle cx="11" cy="11" r="6.5" />
    <path d="m16 16 4 4" />
  </Base>
);

export const Bell = (props: IconProps) => (
  <Base {...props}>
    <path d="M18 9a6 6 0 1 0-12 0c0 5-2 6-2 6h16s-2-1-2-6" />
    <path d="M10.5 20a2 2 0 0 0 3 0" />
  </Base>
);

export const ListIcon = (props: IconProps) => (
  <Base {...props}>
    <path d="M9 7h11" />
    <path d="M9 12h11" />
    <path d="M9 17h11" />
    <path d="M4.5 7h.01" />
    <path d="M4.5 12h.01" />
    <path d="M4.5 17h.01" />
  </Base>
);

export const Users = (props: IconProps) => (
  <Base {...props}>
    <circle cx="9.5" cy="9" r="3.2" />
    <path d="M4 19a5.5 5.5 0 0 1 11 0" />
    <path d="M16 6.5a3 3 0 0 1 0 5.2" />
    <path d="M17.5 14.4A5.2 5.2 0 0 1 20.5 19" />
  </Base>
);

export const Tag = (props: IconProps) => (
  <Base {...props}>
    <path d="M4 11.2V5a1 1 0 0 1 1-1h6.2a1 1 0 0 1 .7.3l7.6 7.6a1 1 0 0 1 0 1.4l-6.2 6.2a1 1 0 0 1-1.4 0L4.3 11.9a1 1 0 0 1-.3-.7z" />
    <path d="M8 8h.01" />
  </Base>
);

export const MapPin = (props: IconProps) => (
  <Base {...props}>
    <path d="M12 21s6.5-5.6 6.5-10.5a6.5 6.5 0 0 0-13 0C5.5 15.4 12 21 12 21Z" />
    <circle cx="12" cy="10.5" r="2.4" />
  </Base>
);

export const Ticket = (props: IconProps) => (
  <Base {...props}>
    <path d="M3 8.5A1.5 1.5 0 0 1 4.5 7h15A1.5 1.5 0 0 1 21 8.5v1.9a2 2 0 0 0 0 3.2v1.9a1.5 1.5 0 0 1-1.5 1.5h-15A1.5 1.5 0 0 1 3 15.5v-1.9a2 2 0 0 0 0-3.2z" />
    <path d="M13 7v10" />
  </Base>
);

export const Shirt = (props: IconProps) => (
  <Base {...props}>
    <path d="M9 3.5 12 6l3-2.5 4.2 2.1a1 1 0 0 1 .5 1.1l-.8 3.4-2.4-.6V20a1 1 0 0 1-1 1H8.5a1 1 0 0 1-1-1V9.5l-2.4.6-.8-3.4a1 1 0 0 1 .5-1.1z" />
  </Base>
);

export const Filter = (props: IconProps) => (
  <Base {...props}>
    <path d="M3.5 5.5h17l-6.6 7.6v5.3l-3.8 2v-7.3z" />
  </Base>
);

export const Lock = (props: IconProps) => (
  <Base {...props}>
    <rect x="4.5" y="10.5" width="15" height="9.5" rx="2" />
    <path d="M8 10.5V7.8a4 4 0 0 1 8 0v2.7" />
  </Base>
);

/* ---- Product previews ---- */

export const ChevronLeft = (props: IconProps) => (
  <Base {...props}>
    <path d="m14.5 6-6 6 6 6" />
  </Base>
);

export const ChevronRight = (props: IconProps) => (
  <Base {...props}>
    <path d="m9.5 6 6 6-6 6" />
  </Base>
);

export const ChevronDown = (props: IconProps) => (
  <Base {...props}>
    <path d="m6 9.5 6 6 6-6" />
  </Base>
);

export const Eye = (props: IconProps) => (
  <Base {...props}>
    <path d="M2.5 12S6 5.5 12 5.5 21.5 12 21.5 12 18 18.5 12 18.5 2.5 12 2.5 12Z" />
    <circle cx="12" cy="12" r="2.8" />
  </Base>
);

export const Reorder = (props: IconProps) => (
  <Base {...props}>
    <path d="M20 11a8 8 0 1 0-.6 4" />
    <path d="M20 5.5V11h-5.5" />
  </Base>
);

export const Plus = (props: IconProps) => (
  <Base {...props}>
    <path d="M12 6v12" />
    <path d="M6 12h12" />
  </Base>
);

export const Minus = (props: IconProps) => (
  <Base {...props}>
    <path d="M6 12h12" />
  </Base>
);

export const Droplet = (props: IconProps) => (
  <Base {...props}>
    <path d="M12 3.5S6.5 9.6 6.5 13.5a5.5 5.5 0 0 0 11 0C17.5 9.6 12 3.5 12 3.5Z" />
  </Base>
);

export const Shoe = (props: IconProps) => (
  <Base {...props}>
    <path d="M3 16.5V10h3.5l2.2 2.2h4.1c3.3 0 6.2 1.5 7.2 3.3v1a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1Z" />
    <path d="M6.5 10V8" />
  </Base>
);

export const Bed = (props: IconProps) => (
  <Base {...props}>
    <path d="M3 18v-7h13.5a4.5 4.5 0 0 1 4.5 4.5V18" />
    <path d="M3 18h18" />
    <path d="M3 11V7" />
    <circle cx="7.5" cy="13.5" r="1.6" />
  </Base>
);

export const Sparkle = (props: IconProps) => (
  <Base {...props}>
    <path d="M12 3v18" />
    <path d="M3 12h18" />
    <path d="m5.6 5.6 12.8 12.8" />
    <path d="m18.4 5.6-12.8 12.8" />
  </Base>
);

/* ---- Capabilities strip ---- */

export const Basket = (props: IconProps) => (
  <Base {...props}>
    <path d="M4 9h16l-1.4 9.2a2 2 0 0 1-2 1.8H7.4a2 2 0 0 1-2-1.8z" />
    <path d="m8 9 2.4-4.5" />
    <path d="m16 9-2.4-4.5" />
    <path d="M10 13v3" />
    <path d="M14 13v3" />
  </Base>
);

export const Clock = (props: IconProps) => (
  <Base {...props}>
    <circle cx="12" cy="12" r="8.5" />
    <path d="M12 7.5V12l3 1.8" />
  </Base>
);

export const Gauge = (props: IconProps) => (
  <Base {...props}>
    <circle cx="12" cy="12" r="8.5" />
    <circle cx="12" cy="12" r="3.2" />
  </Base>
);

export const Grid = (props: IconProps) => (
  <Base {...props}>
    <rect x="4" y="4" width="7" height="7" rx="1.5" />
    <rect x="13" y="4" width="7" height="7" rx="1.5" />
    <rect x="4" y="13" width="7" height="7" rx="1.5" />
    <rect x="13" y="13" width="7" height="7" rx="1.5" />
  </Base>
);

export const Home = (props: IconProps) => (
  <Base {...props}>
    <path d="M4 10.5 12 4l8 6.5V19a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1z" />
  </Base>
);

export const Calendar = (props: IconProps) => (
  <Base {...props}>
    <rect x="3.5" y="5" width="17" height="15" rx="2" />
    <path d="M3.5 10h17" />
    <path d="M8 3.5v3" />
    <path d="M16 3.5v3" />
  </Base>
);

export const Dots = (props: IconProps) => (
  <Base {...props}>
    <circle cx="5" cy="12" r="1" />
    <circle cx="12" cy="12" r="1" />
    <circle cx="19" cy="12" r="1" />
  </Base>
);
