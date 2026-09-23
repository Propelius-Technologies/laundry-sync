import type { BadgeTone } from "@/components/ui/Badge";

/**
 * Illustrative content for the business-administration preview.
 *
 * The module list and table structures mirror the real product's admin
 * workspace - service categories, types, pricing, tiers, areas, coupons,
 * orders and customers. Every record below is fictional sample data for a
 * marketing demonstration: no real customers, no commercial pricing, and no
 * analytics or metrics the product does not have.
 */

export type AdminColumnType = "id" | "text" | "muted" | "thumb" | "status";

export type AdminColumn = {
  key: string;
  label: string;
  type?: AdminColumnType;
  /**
   * Shown at every width. Non-primary columns are hidden on narrow screens
   * and surface in the row detail panel instead, so the table never shrinks
   * into unreadable type.
   */
  primary?: boolean;
};

export type AdminRecord = {
  id: string;
  [key: string]: string;
};

export type AdminModule = {
  id: string;
  /** Tab label. */
  label: string;
  heading: string;
  description: string;
  /** Illustrative primary action shown in the toolbar. */
  action: string;
  searchPlaceholder: string;
  columns: AdminColumn[];
  rows: AdminRecord[];
};

/** Status labels mapped onto the shared badge tones. */
export const adminStatusTone: Record<string, BadgeTone> = {
  Active: "success",
  Inactive: "neutral",
  Available: "success",
  "Not configured": "neutral",
  Scheduled: "blue",
  "Order placed": "navy",
  "Pickup scheduled": "blue",
  "In progress": "aqua",
  Ready: "success",
  Completed: "neutral",
};

export const adminModules: AdminModule[] = [
  {
    id: "service-categories",
    label: "Service categories",
    heading: "Service categories",
    description: "The catalogue customers browse when they start an order.",
    action: "Add service category",
    searchPlaceholder: "Search service categories",
    columns: [
      { key: "id", label: "ID", type: "id", primary: true },
      { key: "name", label: "Name", primary: true },
      { key: "priority", label: "Priority", type: "muted" },
      { key: "image", label: "Image", type: "thumb" },
      { key: "icon", label: "Icon", type: "thumb" },
      { key: "title", label: "Title", type: "muted" },
      { key: "description", label: "Description", type: "muted" },
    ],
    rows: [
      {
        id: "1",
        name: "Shirt Service",
        priority: "3",
        title: "Service pricing starts",
        description: "Pressed, folded or hung, finished the way you prefer.",
      },
      {
        id: "2",
        name: "Dry Cleaning",
        priority: "1",
        title: "Service pricing starts",
        description: "Careful treatment for suits, coats and delicate pieces.",
      },
      {
        id: "3",
        name: "Wedding Dresses and Bridal",
        priority: "4",
        title: "Service pricing starts",
        description: "Specialist cleaning and boxing for bridal garments.",
      },
      {
        id: "4",
        name: "Shoe Repairs",
        priority: "7",
        title: "Service pricing starts",
        description: "Resoling, stitching and finishing for everyday wear.",
      },
      {
        id: "6",
        name: "Laundry Service",
        priority: "2",
        title: "Service pricing starts",
        description: "Everyday washing, drying and folding by weight or item.",
      },
      {
        id: "10",
        name: "Suede and Leathers",
        priority: "6",
        title: "Service pricing starts",
        description: "Conditioning and cleaning for jackets and accessories.",
      },
      {
        id: "11",
        name: "Repairs and Alterations",
        priority: "5",
        title: "Service pricing starts",
        description: "In-house tailoring for adjustments and repairs.",
      },
    ],
  },
  {
    id: "service-types",
    label: "Service types",
    heading: "Service types",
    description: "The individual items available inside each category.",
    action: "Add service type",
    searchPlaceholder: "Search service types",
    columns: [
      { key: "id", label: "ID", type: "id", primary: true },
      { key: "name", label: "Service type", primary: true },
      { key: "category", label: "Category", type: "muted" },
      { key: "priority", label: "Priority", type: "muted" },
      { key: "status", label: "Status", type: "status", primary: true },
    ],
    rows: [
      { id: "12", name: "Shirt hang", category: "Shirt Service", priority: "1", status: "Active" },
      { id: "13", name: "Shirt fold", category: "Shirt Service", priority: "2", status: "Active" },
      { id: "18", name: "Two-piece suit", category: "Dry Cleaning", priority: "1", status: "Active" },
      { id: "22", name: "Duvet - single", category: "Laundry Service", priority: "3", status: "Active" },
      { id: "27", name: "Leather jacket", category: "Suede and Leathers", priority: "2", status: "Inactive" },
      { id: "31", name: "Hem adjustment", category: "Repairs and Alterations", priority: "1", status: "Active" },
    ],
  },
  {
    id: "service-pricing",
    label: "Service pricing",
    heading: "Service pricing",
    description: "Prices per item, set against each pricing tier.",
    action: "Add price",
    searchPlaceholder: "Search pricing",
    columns: [
      { key: "id", label: "ID", type: "id" },
      { key: "item", label: "Item", primary: true },
      { key: "category", label: "Category", type: "muted" },
      { key: "tier", label: "Pricing tier", type: "muted", primary: true },
      { key: "price", label: "Price", primary: true },
    ],
    rows: [
      { id: "41", item: "Shirt hang", category: "Shirt Service", tier: "Budget", price: "£2.00" },
      { id: "42", item: "Shirt hang", category: "Shirt Service", tier: "Luxury", price: "£2.45" },
      { id: "43", item: "Shirt hang", category: "Shirt Service", tier: "Diamond", price: "£2.85" },
      { id: "51", item: "Two-piece suit", category: "Dry Cleaning", tier: "Luxury", price: "£12.80" },
      { id: "52", item: "Two-piece suit", category: "Dry Cleaning", tier: "Diamond", price: "£15.40" },
      { id: "63", item: "Duvet - single", category: "Laundry Service", tier: "Budget", price: "£10.50" },
    ],
  },
  {
    id: "pricing-tiers",
    label: "Pricing tiers",
    heading: "Pricing tiers",
    description: "The tiers each service price is attached to.",
    action: "Add pricing tier",
    searchPlaceholder: "Search pricing tiers",
    columns: [
      { key: "id", label: "ID", type: "id" },
      { key: "tier", label: "Tier", primary: true },
      { key: "description", label: "Description", type: "muted" },
      { key: "items", label: "Items priced", type: "muted", primary: true },
      { key: "status", label: "Status", type: "status", primary: true },
    ],
    rows: [
      { id: "1", tier: "Budget", description: "Everyday care at the standard finish.", items: "48", status: "Active" },
      { id: "2", tier: "Luxury", description: "Extra finishing and hand attention.", items: "48", status: "Active" },
      { id: "3", tier: "Diamond", description: "The most thorough treatment offered.", items: "46", status: "Active" },
    ],
  },
  {
    id: "service-areas",
    label: "Service areas",
    heading: "Service areas",
    description: "The postcodes your team collects from and delivers to.",
    action: "Add service area",
    searchPlaceholder: "Search areas and postcodes",
    columns: [
      { key: "id", label: "ID", type: "id" },
      { key: "area", label: "Area", primary: true },
      { key: "postcode", label: "Postcode", type: "muted", primary: true },
      { key: "slots", label: "Pickup windows", type: "muted" },
      { key: "status", label: "Status", type: "status", primary: true },
    ],
    rows: [
      { id: "1", area: "Shoreditch", postcode: "E1", slots: "4 configured", status: "Available" },
      { id: "2", area: "Islington", postcode: "N1", slots: "4 configured", status: "Available" },
      { id: "3", area: "Hackney Central", postcode: "E8", slots: "3 configured", status: "Available" },
      { id: "4", area: "Camden Town", postcode: "NW1", slots: "2 configured", status: "Available" },
      { id: "5", area: "Walthamstow", postcode: "E17", slots: "None yet", status: "Not configured" },
    ],
  },
  {
    id: "coupons",
    label: "Coupons",
    heading: "Coupons",
    description: "Voucher codes customers can apply at checkout.",
    action: "Add coupon",
    searchPlaceholder: "Search coupons",
    columns: [
      { key: "id", label: "ID", type: "id" },
      { key: "code", label: "Code", primary: true },
      { key: "discount", label: "Discount", primary: true },
      { key: "applies", label: "Applies to", type: "muted" },
      { key: "status", label: "Status", type: "status", primary: true },
    ],
    rows: [
      { id: "1", code: "FIRST15", discount: "£15 off", applies: "First order", status: "Active" },
      { id: "2", code: "SHIRT10", discount: "10% off", applies: "Shirt Service", status: "Active" },
      { id: "3", code: "WINTERCOAT", discount: "£5 off", applies: "Dry Cleaning", status: "Inactive" },
    ],
  },
  {
    id: "orders",
    label: "Orders",
    heading: "Orders",
    description: "Incoming and active orders across every service area.",
    action: "Add order",
    searchPlaceholder: "Search orders and customers",
    columns: [
      { key: "id", label: "Order ID", type: "id", primary: true },
      { key: "customer", label: "Customer", primary: true },
      { key: "service", label: "Service", type: "muted" },
      { key: "pickup", label: "Pickup", type: "muted" },
      { key: "status", label: "Status", type: "status", primary: true },
    ],
    rows: [
      { id: "LS-1042", customer: "Amara Okafor", service: "Shirt Service", pickup: "14 May, 11:30 AM", status: "Pickup scheduled" },
      { id: "LS-1041", customer: "Priya Nair", service: "Laundry Service", pickup: "14 May, 10:00 AM", status: "Ready" },
      { id: "LS-1040", customer: "Marco Ruiz", service: "Dry Cleaning", pickup: "14 May, 2:00 PM", status: "In progress" },
      { id: "LS-1039", customer: "Hannah Cole", service: "Shirt Service", pickup: "15 May, 9:00 AM", status: "Order placed" },
      { id: "LS-1038", customer: "Dev Patel", service: "Laundry Service", pickup: "13 May, 4:00 PM", status: "Completed" },
    ],
  },
  {
    id: "customers",
    label: "Customers",
    heading: "Customer records",
    description: "The account details your team works from.",
    action: "Add customer",
    searchPlaceholder: "Search customers",
    columns: [
      { key: "id", label: "ID", type: "id" },
      { key: "name", label: "Customer", primary: true },
      { key: "contact", label: "Contact", type: "muted" },
      { key: "area", label: "Service area", type: "muted", primary: true },
      { key: "orders", label: "Orders", type: "muted", primary: true },
      { key: "latest", label: "Latest order", type: "muted" },
    ],
    rows: [
      { id: "204", name: "Amara Okafor", contact: "a.okafor@example.com", area: "Shoreditch, E1", orders: "12", latest: "LS-1042" },
      { id: "198", name: "Priya Nair", contact: "p.nair@example.com", area: "Islington, N1", orders: "9", latest: "LS-1041" },
      { id: "191", name: "Marco Ruiz", contact: "m.ruiz@example.com", area: "Hackney Central, E8", orders: "6", latest: "LS-1040" },
      { id: "187", name: "Hannah Cole", contact: "h.cole@example.com", area: "Camden Town, NW1", orders: "4", latest: "LS-1039" },
      { id: "180", name: "Dev Patel", contact: "d.patel@example.com", area: "Shoreditch, E1", orders: "17", latest: "LS-1038" },
    ],
  },
];

/** Three supporting statements below the preview. */
export const businessCapabilities = [
  {
    id: "service-pricing-setup",
    title: "Service & pricing setup",
    description: "Keep your service catalogue and pricing options organized.",
  },
  {
    id: "order-route-views",
    title: "Order & route views",
    description: "Work with customer orders and the associated route information.",
  },
  {
    id: "customer-records",
    title: "Customer records",
    description:
      "Access the details your team needs to manage customer relationships.",
  },
];
