import type { ComponentType, SVGProps } from "react";
import { Bed, Droplet, Shirt, Shoe, Sparkle } from "@/components/ui/Icons";
import {
  BLANK,
  addDays,
  monthLabel,
  shortDateLabel,
  weekdayLabel,
} from "@/lib/sample-dates";

/**
 * Illustrative service and pricing content for the phone previews.
 *
 * The taxonomy (categories, service tiers, per-item pricing, starch options)
 * mirrors the real laundry product. Prices are sample figures for a marketing
 * illustration, not LaundrySync commercial pricing.
 */

type Icon = ComponentType<SVGProps<SVGSVGElement>>;

/** Screen A - the three service categories on the Services screen. */
export const serviceCategories: {
  id: string;
  title: string;
  description: string;
  icon: Icon;
}[] = [
  {
    id: "dry-cleaning",
    title: "Dry cleaning",
    description: "Careful treatment for suits, coats and delicates.",
    icon: Sparkle,
  },
  {
    id: "laundry-service",
    title: "Laundry service",
    description: "Everyday washing, drying and folding.",
    icon: Droplet,
  },
  {
    id: "blanket-service",
    title: "Blanket service",
    description: "Duvets, blankets and bulky household items.",
    icon: Bed,
  },
];

/** Screen B - the horizontal category selector along the top. */
export const serviceTiles: { id: string; label: string; from: string; icon: Icon }[] =
  [
    { id: "shirt", label: "Shirt", from: "from $2.00", icon: Shirt },
    { id: "dry", label: "Dry clean", from: "from $2.85", icon: Sparkle },
    { id: "duvet", label: "Duvet", from: "from $12.80", icon: Bed },
    { id: "shoe", label: "Shoe", from: "from $8.00", icon: Shoe },
  ];

/** Screen B - the expandable item groups. */
export const itemGroups: {
  id: string;
  label: string;
  items?: { name: string; tier: string; price: string; quantity: number }[];
}[] = [
  {
    id: "shirt",
    label: "Shirt",
    items: [
      { name: "Shirt hang", tier: "Diamond", price: "$2.85", quantity: 2 },
      { name: "Dress shirt", tier: "Luxury", price: "$3.40", quantity: 1 },
    ],
  },
  { id: "dry-cleaning", label: "Dry cleaning" },
  { id: "linen", label: "Linen" },
  { id: "other", label: "Other" },
];

export const starchOptions = ["No starch", "Medium", "Heavy"] as const;

/** Screen B and D - the illustrative order summary. */
export const orderSummary = {
  lines: [
    { label: "Shirt hang", detail: "Diamond x2", price: "$5.70" },
    { label: "Dress shirt", detail: "Luxury x1", price: "$3.40" },
    { label: "Duvet service", detail: "Single x1", price: "$12.80" },
  ],
  subtotal: "$21.90",
  discount: "-$5.00",
  total: "$16.90",
  voucherPlaceholder: "Voucher code",
};

/** Screen C - illustrative pickup slots. */

export const pickupSlots = [
  "09:00 - 11:00",
  "11:00 - 13:00",
  "14:00 - 16:00",
  "17:00 - 19:00",
];

export const pickupSelection = {
  selectedSlot: "11:00 - 13:00",
};

/** Five days starting tomorrow, with the third one selected. */
const PICKUP_DAY_COUNT = 5;
const SELECTED_PICKUP_DAY = 2;

export type PickupSchedule = {
  month: string;
  days: { day: string; date: string }[];
  selectedIndex: number;
  summary: string;
};

/**
 * The pickup date strip, relative to the visitor's today so it never goes
 * stale. `today` is null during server rendering (see useToday): the strip is
 * then date-neutral - blank labels that hold their space - and fills in right
 * after hydration.
 */
export function pickupSchedule(today: Date | null): PickupSchedule {
  if (!today) {
    return {
      month: BLANK,
      days: Array.from({ length: PICKUP_DAY_COUNT }, () => ({
        day: BLANK,
        date: BLANK,
      })),
      selectedIndex: SELECTED_PICKUP_DAY,
      summary: pickupSelection.selectedSlot,
    };
  }

  const dates = Array.from({ length: PICKUP_DAY_COUNT }, (_, index) =>
    addDays(today, index + 1),
  );
  const selected = dates[SELECTED_PICKUP_DAY];

  return {
    month: monthLabel(selected),
    days: dates.map((date) => ({
      day: weekdayLabel(date),
      date: String(date.getDate()),
    })),
    selectedIndex: SELECTED_PICKUP_DAY,
    summary: `${shortDateLabel(selected)}, ${pickupSelection.selectedSlot}`,
  };
}

/** Screen F - pricing groups, tiers and items. */
export const pricingGroups: {
  id: string;
  label: string;
  icon: Icon;
  tiers?: { name: string; items: { name: string; price: string }[] }[];
}[] = [
  {
    id: "shirt",
    label: "Shirt",
    icon: Shirt,
    tiers: [
      {
        name: "Budget service",
        items: [
          { name: "Shirt hang", price: "$2.00" },
          { name: "Shirt fold", price: "$2.20" },
        ],
      },
      {
        name: "Diamond service",
        items: [
          { name: "Shirt hang", price: "$2.85" },
          { name: "Dress shirt", price: "$3.40" },
        ],
      },
    ],
  },
  { id: "dry-cleaning", label: "Dry cleaning", icon: Sparkle },
  { id: "duvet", label: "Duvet services", icon: Bed },
  { id: "shoe", label: "Shoe services", icon: Shoe },
  { id: "other", label: "Other services", icon: Droplet },
];
