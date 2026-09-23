/**
 * Content for homepage section 07 - FAQ.
 *
 * Answers are deliberately scoped to what the product does today. Where scope
 * has to be confirmed with a customer, the answer says so rather than
 * implying a capability.
 */

export type FaqEntry = {
  id: string;
  question: string;
  answer: string;
};

export const faqEntries: FaqEntry[] = [
  {
    id: "what-is-it",
    question: "Is LaundrySync a laundry service or software for businesses?",
    answer:
      "It's software for laundry and dry-cleaning businesses. It helps your customers place orders digitally and gives your team tools to manage the associated workflows.",
  },
  {
    id: "pickup-and-status",
    question: "Can customers book a pickup and check order status?",
    answer:
      "The existing customer journey includes pickup scheduling and order-status viewing. Available pickup windows and status updates depend on your configured service and order workflow; this is not live GPS tracking.",
  },
  {
    id: "branding",
    question: "Can LaundrySync use my business branding?",
    answer:
      "We are positioning LaundrySync for branded deployments. The exact branding options, deployment requirements and implementation scope are confirmed with your team before a commitment.",
  },
  {
    id: "pos-billing",
    question: "Does it replace my existing POS or billing system?",
    answer:
      "LaundrySync's current focus is customer ordering, scheduling, order visibility and business administration. It should not be treated as a full POS or billing replacement without a specific capability review.",
  },
  {
    id: "getting-started",
    question: "How do we get started?",
    answer:
      "Tell us a little about your laundry business and current process. We can walk through the existing product, discuss fit and clarify setup requirements together.",
  },
];

export const faqAside = {
  supporting:
    "Have a more specific question about your existing process? We can discuss it with your team.",
  ctaLabel: "Ask us directly",
  ctaHref: "/contact",
};
