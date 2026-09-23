import { Hero } from "@/components/home/Hero";
import { CapabilitiesStrip } from "@/components/home/CapabilitiesStrip";
import { OpportunitySection } from "@/components/home/OpportunitySection";
import { CustomerExperienceSection } from "@/components/home/customer-experience/CustomerExperienceSection";
import { ProductCapabilitiesSection } from "@/components/home/product-capabilities/ProductCapabilitiesSection";
import { BusinessExperienceSection } from "@/components/home/business-experience/BusinessExperienceSection";
import { MakeItYoursSection } from "@/components/home/make-it-yours/MakeItYoursSection";
import { WhoItsForSection } from "@/components/home/who-its-for/WhoItsForSection";
import { FAQSection } from "@/components/home/faq/FAQSection";
import { sectionIds } from "@/data/navigation";
import { pageMetadata } from "@/lib/seo";

/*
 * The homepage previously exported no metadata at all, so it had no canonical
 * URL and fell back to the layout defaults. Title and description target the
 * B2B buyer - a laundry owner shopping for software - not a consumer looking
 * for a laundry service.
 */
export const metadata = pageMetadata({
  title: "Laundry Business Software & Online Ordering",
  description:
    "Give your laundry or dry-cleaning business a branded online ordering experience. LaundrySync supports service selection, pickup scheduling, order updates and business administration.",
  path: "/",
});

/** Nav anchors now owned by a real section, so they need no placeholder. */
const implementedSectionIds = new Set([
  "how-it-works",
  "features",
  "for-businesses",
  "faq",
]);

export default function Home() {
  return (
    <>
      <Hero />
      <CapabilitiesStrip />
      <OpportunitySection />
      <CustomerExperienceSection />
      <ProductCapabilitiesSection />
      <BusinessExperienceSection />
      <MakeItYoursSection />
      <WhoItsForSection />
      <FAQSection />

      {/*
        Scroll anchors for the sections that are not built yet, derived from the
        nav so the ids cannot drift. Each upcoming section should take over its
        own id and add it to the set above.
      */}
      {sectionIds
        .filter((id) => !implementedSectionIds.has(id))
        .map((id) => (
          <div key={id} id={id} aria-hidden="true" />
        ))}
    </>
  );
}
