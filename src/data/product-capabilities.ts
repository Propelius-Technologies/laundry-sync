import { BLANK, addDays, monthLabel, startOfWeek } from "@/lib/sample-dates";

/**
 * Content for homepage section 03 - Product Capabilities.
 *
 * Copy and illustration mapping live here; each card's motion lives in its own
 * illustration component under components/home/product-capabilities.
 */

export const productCapabilityIds = [
  "customer-experience",
  "scheduling",
  "order-visibility",
  "business-admin",
] as const;

export type ProductCapabilityId = (typeof productCapabilityIds)[number];

/** Two approved surface treatments, alternated by row - not four palettes. */
export type CardTone = "sky" | "plain";

/**
 * How the miniature interface sits in its card.
 *
 * "bleed" anchors it lower-right and lets it run past the card edge, with the
 * copy inset to keep clear of it. "inline" keeps it fully inside, stacked
 * under the copy, so it can never cover the title or description.
 */
export type CardLayout = "bleed" | "inline";

export type ProductCapability = {
  id: ProductCapabilityId;
  number: string;
  category: string;
  title: string;
  description: string;
  tone: CardTone;
  layout: CardLayout;
  /** Announced to assistive tech in place of the decorative mini UI. */
  illustrationLabel: string;
};

export const productCapabilities: ProductCapability[] = [
  {
    id: "customer-experience",
    number: "01",
    category: "Customer experience",
    title: "An easy way to book.",
    description:
      "A branded service catalog, garment selection and order summary — available whenever customers want to arrange their next clean.",
    tone: "sky",
    layout: "bleed",
    illustrationLabel:
      "Illustrative new-order panel listing wash and fold and dry cleaning with a review-your-order action.",
  },
  {
    id: "scheduling",
    number: "02",
    category: "Scheduling",
    title: "Pickup, planned.",
    description: "Let customers choose from configured pickup windows.",
    tone: "sky",
    layout: "inline",
    illustrationLabel:
      "Illustrative pickup calendar for the current month with today selected and a 10:00 AM pickup window.",
  },
  {
    id: "order-visibility",
    number: "03",
    category: "Order visibility",
    title: "Know what's next.",
    description: "Clear order status and history keep customers informed.",
    tone: "plain",
    layout: "inline",
    illustrationLabel:
      "Illustrative order status for LS-1042 moving along a placed, in progress, completed track.",
  },
  {
    id: "business-admin",
    number: "04",
    category: "Business admin",
    title: "Details in your hands.",
    description:
      "Manage orders, service pricing, customer records, vouchers and areas from the admin interface.",
    tone: "plain",
    layout: "inline",
    illustrationLabel:
      "Illustrative admin order-management panel revealing the details of order LS-1042.",
  },
];

/** Fictional sample data shown inside the miniature interfaces. */
export const capabilitySample = {
  orderId: "LS-1042",
  services: [
    { name: "Wash & fold", detail: "4 items selected" },
    { name: "Dry cleaning", detail: "2 items selected" },
  ],
  /** The month, weeks and selected day come from sampleCalendar(). */
  calendar: {
    weekdays: ["M", "T", "W", "T", "F", "S", "S"],
    slot: "Pickup · 10:00 AM",
  },
  statusTrack: ["Placed", "In progress", "Completed"],
  admin: {
    panel: "Order management",
    caption: "Workspace preview",
    detailStatus: "Pickup scheduled",
  },
};

export type SampleCalendar = {
  month: string;
  /** Two weeks of day numbers, Monday first. */
  days: string[];
  /** Index into `days`, or -1 while no date is known. */
  selectedIndex: number;
};

/**
 * The capability card's calendar: this week and next, with today selected,
 * under the current month's name. `today` is null during server rendering
 * (see useToday), when it renders date-neutral - blank cells that hold their
 * space - and fills in right after hydration.
 */
export function sampleCalendar(today: Date | null): SampleCalendar {
  if (!today) {
    return { month: BLANK, days: Array(14).fill(BLANK), selectedIndex: -1 };
  }

  const monday = startOfWeek(today);
  return {
    month: monthLabel(today),
    days: Array.from({ length: 14 }, (_, index) =>
      String(addDays(monday, index).getDate()),
    ),
    selectedIndex: (today.getDay() + 6) % 7,
  };
}

/** Bottom CTA. The for-businesses section is not built yet; the id is reserved. */
export const capabilitiesCta = {
  lead: "Looking for the business-side view?",
  label: "Explore the admin experience",
  href: "/#for-businesses",
};
