import { pageMetadata } from "@/lib/seo";
import { Section } from "@/components/ui/Section";
import { ContactIntro } from "@/components/contact/ContactIntro";
import { ContactForm } from "@/components/contact/ContactForm";

export const metadata = pageMetadata({
  title: "Contact Us & Request a Demo",
  description:
    "Talk to the LaundrySync team about online ordering, pickup scheduling and a branded digital experience for your laundry or dry-cleaning business.",
  path: "/contact",
});

/**
 * Contact page. Server component so the metadata stays static - only the
 * intro (entrance motion) and the form itself are client components.
 */
export default function ContactPage() {
  return (
    <Section space="page">
      <div className="grid gap-12 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.1fr)] lg:gap-16 xl:gap-20">
        <ContactIntro />
        <ContactForm />
      </div>
    </Section>
  );
}
