import { Hero } from "@/components/home/Hero";
import { CapabilitiesStrip } from "@/components/home/CapabilitiesStrip";
import { OpportunitySection } from "@/components/home/OpportunitySection";
import { CustomerExperienceSection } from "@/components/home/customer-experience/CustomerExperienceSection";
import { sectionIds } from "@/data/navigation";

/** Nav anchors now owned by a real section, so they need no placeholder. */
const implementedSectionIds = new Set(["how-it-works"]);

export default function Home() {
  return (
    <>
      <Hero />
      <CapabilitiesStrip />
      <OpportunitySection />
      <CustomerExperienceSection />

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
