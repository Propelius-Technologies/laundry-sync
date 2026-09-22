import type { Metadata } from "next";
import Link from "next/link";
import { Section } from "@/components/ui/Section";
import { ArrowRight } from "@/components/ui/Icons";

export const metadata: Metadata = {
  title: "Contact us",
  description:
    "Talk to the LaundrySync team about bringing your laundry or dry-cleaning business online.",
};

/**
 * Stopgap destination so every "Contact us" / "Talk to our team" CTA resolves.
 * Replace with the real contact page (form + verified contact details) - see
 * the handover notes.
 */
export default function ContactPage() {
  return (
    <Section space="lg">
      <div className="max-w-[36rem]">
        <h1 className="ls-display">Talk to our team</h1>
        <p className="ls-body-lg mt-6">
          Tell us about your laundry or dry-cleaning business and we will show
          you how LaundrySync handles services, pickups and order tracking for
          your customers and your team.
        </p>
        <p className="ls-body-sm mt-8">
          This page is a placeholder. The contact form and details are still to
          be added.
        </p>
        <Link
          href="/"
          className="mt-8 inline-flex items-center gap-2 text-button font-semibold text-ls-navy transition-colors hover:text-ls-navy-600"
        >
          Back to home
          <ArrowRight className="size-4" />
        </Link>
      </div>
    </Section>
  );
}
