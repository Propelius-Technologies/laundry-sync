/**
 * Content for homepage section 06 - Who It's For.
 *
 * Each audience is paired with a miniature interface drawn from the customer
 * journey already shown in section 02, so a business owner recognises the part
 * of the product that matters to them.
 */

export const audienceIds = [
  "independent-laundries",
  "dry-cleaning",
  "pickup-delivery",
] as const;

export type AudienceId = (typeof audienceIds)[number];

export type Audience = {
  id: AudienceId;
  number: string;
  title: string;
  description: string;
  /** What the miniature interface demonstrates, for assistive tech. */
  previewLabel: string;
};

export const audiences: Audience[] = [
  {
    id: "independent-laundries",
    number: "01",
    title: "Independent laundries",
    description:
      "Give regular customers a direct digital way to browse services and place orders.",
    previewLabel:
      "Illustrative service selection showing wash and fold and dry cleaning with a quantity picker.",
  },
  {
    id: "dry-cleaning",
    number: "02",
    title: "Dry-cleaning businesses",
    description:
      "Present garment-care services, service options and pricing in a clear customer experience.",
    previewLabel:
      "Illustrative garment-care list with a service tier and its price.",
  },
  {
    id: "pickup-delivery",
    number: "03",
    title: "Pickup & delivery services",
    description:
      "Make it easier for customers to select pickup windows and follow an order's status.",
    previewLabel:
      "Illustrative pickup window and order status moving from in progress to ready.",
  },
];
