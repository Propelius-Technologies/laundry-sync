/**
 * Illustrative content for the hero product preview.
 *
 * NOTE: this is sample data for a marketing illustration, not product data.
 * Names and order numbers are fictional. The shape of the data follows the
 * real laundry product this white-label is based on - services with per-item
 * quantities, pickup slots, service areas and an order status track - but
 * carries no revenue, analytics or performance figures.
 */

export type OrderStatus =
  | "pickup-scheduled"
  | "in-progress"
  | "ready"
  | "completed";

export const orderStatusLabels: Record<OrderStatus, string> = {
  "pickup-scheduled": "Pickup scheduled",
  "in-progress": "In progress",
  ready: "Ready",
  completed: "Completed",
};

export type DemoOrder = {
  id: string;
  customer: string;
  service: string;
  items: number;
  pickup: string;
  status: OrderStatus;
};

/** Rows already present in the business order list before the demo runs. */
export const baseOrders: DemoOrder[] = [
  {
    id: "LS-1041",
    customer: "Priya Nair",
    service: "Shirt service",
    items: 6,
    pickup: "Today, 10:00 AM",
    status: "ready",
  },
  {
    id: "LS-1040",
    customer: "Marco Ruiz",
    service: "Dry cleaning",
    items: 3,
    pickup: "Today, 2:00 PM",
    status: "in-progress",
  },
  {
    id: "LS-1039",
    customer: "Hannah Cole",
    service: "Wash & iron",
    items: 9,
    pickup: "Tomorrow, 9:00 AM",
    status: "pickup-scheduled",
  },
  {
    id: "LS-1038",
    customer: "Dev Patel",
    service: "Duvet service",
    items: 2,
    pickup: "Yesterday, 4:00 PM",
    status: "completed",
  },
  {
    id: "LS-1037",
    customer: "Leah Brennan",
    service: "Shoe service",
    items: 1,
    pickup: "Yesterday, 11:00 AM",
    status: "completed",
  },
  {
    id: "LS-1036",
    customer: "Tomas Vieira",
    service: "Wash & fold",
    items: 7,
    pickup: "Yesterday, 9:30 AM",
    status: "completed",
  },
];

/** The order the customer places during the demo loop. */
export const incomingOrder: DemoOrder = {
  id: "LS-1042",
  customer: "Amara Okafor",
  service: "Shirt service",
  items: 4,
  pickup: "Tomorrow, 11:30 AM",
  status: "pickup-scheduled",
};

/** Laundry operations navigation, not a generic SaaS dashboard. */
export const dashboardNav = [
  "Orders",
  "Customers",
  "Services",
  "Pricing",
  "Schedule",
  "Service areas",
  "Vouchers",
] as const;

export const orderFilters = [
  "All",
  "Pickup scheduled",
  "In progress",
  "Ready",
] as const;

/**
 * Three-state demo showing a customer order flowing into the business order
 * list and back out as a status update. Scripted illustration - nothing is
 * fetched or processed.
 */
export const demoSteps = ["schedule", "confirmed", "ready"] as const;
export type DemoStep = (typeof demoSteps)[number];

export const DEMO_STEP_MS = 3200;

/** Items the demo customer picked, echoing the real per-item basket. */
export const basketLines = [
  { label: "Shirt service", detail: "Hang finish", quantity: 2 },
  { label: "Duvet service", detail: "Single", quantity: 1 },
  { label: "Wash & fold", detail: "Standard", quantity: 1 },
];

export const pickupArea = "Shoreditch, E1";

/** Customer-side progress track, matching the approved status sequence. */
export const customerTimeline: {
  label: string;
  detail: string;
  completedFrom: DemoStep | null;
}[] = [
  {
    label: "Pickup scheduled",
    detail: "Tomorrow, 11:30 AM",
    completedFrom: "confirmed",
  },
  { label: "In progress", detail: "Cleaning your items", completedFrom: "ready" },
  { label: "Ready", detail: "Out for delivery soon", completedFrom: "ready" },
  { label: "Completed", detail: "Order closed", completedFrom: null },
];

export const notificationCards = {
  pickup: {
    title: "Pickup confirmed",
    body: "Your pickup has been scheduled.",
    activeFrom: "confirmed" as DemoStep,
  },
  ready: {
    title: "Order ready",
    body: "Your items are ready for delivery.",
    activeFrom: "ready" as DemoStep,
  },
};

/** Accessible description of the whole illustration. */
export const productVisualDescription =
  "Illustrative preview of LaundrySync: a laptop showing the business order list with pickup, in-progress and ready statuses, and a phone showing a customer scheduling a pickup and following their order.";
