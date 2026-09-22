/**
 * The five-step customer journey told by the Customer Experience section, plus
 * the two additional product screens that sit outside the journey.
 *
 * Display text lives here; the animation and layout logic lives in the
 * components under src/components/home/customer-experience/.
 */

export const journeyScreens = [
  "services",
  "select-services",
  "pickup",
  "review",
  "status",
] as const;

export const extraScreens = ["pricing", "history"] as const;

export type PreviewScreen =
  | (typeof journeyScreens)[number]
  | (typeof extraScreens)[number];

export type JourneyStep = {
  id: (typeof journeyScreens)[number];
  number: string;
  title: string;
  description: string;
};

export const journeySteps: JourneyStep[] = [
  {
    id: "services",
    number: "01",
    title: "Explore services",
    description: "Find the care that fits each garment.",
  },
  {
    id: "select-services",
    number: "02",
    title: "Choose what goes in",
    description: "Pick items, quantities and available service options.",
  },
  {
    id: "pickup",
    number: "03",
    title: "Schedule a pickup",
    description: "Choose an available pickup date and time.",
  },
  {
    id: "review",
    number: "04",
    title: "Place the order",
    description: "Review order details before confirming.",
  },
  {
    id: "status",
    number: "05",
    title: "Follow its progress",
    description: "Check the order's current status.",
  },
];

export type ExtraPreview = {
  id: (typeof extraScreens)[number];
  label: string;
};

/**
 * Additional product screens. Deliberately kept out of the numbered journey -
 * they are places in the app, not steps in a single order.
 */
export const extraPreviews: ExtraPreview[] = [
  { id: "pricing", label: "Pricing" },
  { id: "history", label: "Order history" },
];

/** Copy for the floating card, per screen. */
export const previewCardLabels: Record<
  PreviewScreen,
  { eyebrow: string; title: string; caption: string }
> = {
  services: {
    eyebrow: "01",
    title: "Explore services",
    caption: "Customer view",
  },
  "select-services": {
    eyebrow: "02",
    title: "Choose what goes in",
    caption: "Customer view",
  },
  pickup: { eyebrow: "03", title: "Schedule a pickup", caption: "Customer view" },
  review: { eyebrow: "04", title: "Place the order", caption: "Customer view" },
  status: {
    eyebrow: "05",
    title: "Follow its progress",
    caption: "Customer view",
  },
  pricing: { eyebrow: "", title: "Pricing", caption: "Additional screen" },
  history: { eyebrow: "", title: "Order history", caption: "Additional screen" },
};

/** Accessible description of the phone illustration, per screen. */
export const previewDescriptions: Record<PreviewScreen, string> = {
  services:
    "Illustrative phone preview: the LaundrySync services screen listing dry cleaning, laundry service and blanket service.",
  "select-services":
    "Illustrative phone preview: choosing laundry items, service tiers and quantities, with an order summary.",
  pickup:
    "Illustrative phone preview: picking a pickup date and an available time slot.",
  review:
    "Illustrative phone preview: reviewing the order items, pickup slot and total before confirming.",
  status:
    "Illustrative phone preview: the customer order list showing each order's current status.",
  pricing:
    "Illustrative phone preview: service pricing grouped by category and service tier.",
  history:
    "Illustrative phone preview: previous orders with date, total, payment method and status.",
};
