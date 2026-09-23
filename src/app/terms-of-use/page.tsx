import { pageMetadata } from "@/lib/seo";
import { legalPagesApproved } from "@/lib/site-config";
import Link from "next/link";
import { LegalPage, Tbc, type LegalSection } from "@/components/legal/LegalPage";
import { legalInfo } from "@/data/legal";

export const metadata = pageMetadata({
  title: "Terms of Use",
  description:
    "The terms governing use of the LaundrySync marketing website and its informational content.",
  path: "/terms-of-use",
  /*
   * Draft pending Propelius legal approval, so noindex for now. Flips to
   * indexable automatically once legalLastUpdated is set in src/data/legal.ts.
   */
  noindex: !legalPagesApproved,
});

const sections: LegalSection[] = [
  { id: "about", title: "About these terms" },
  { id: "scope", title: "What these terms cover" },
  { id: "permitted", title: "Using this website" },
  { id: "prohibited", title: "Things you must not do" },
  { id: "content", title: "Website content" },
  { id: "brand", title: "Brand and intellectual property" },
  { id: "product-info", title: "Product information and demonstrations" },
  { id: "enquiries", title: "Business enquiries" },
  { id: "third-party", title: "Third-party services and links" },
  { id: "availability", title: "Availability and changes" },
  { id: "accuracy", title: "Accuracy of product descriptions" },
  { id: "liability", title: "Liability" },
  { id: "law", title: "Governing law" },
  { id: "changes", title: "Changes to these terms" },
  { id: "contact", title: "Contact" },
];

export default function TermsOfUsePage() {
  return (
    <LegalPage
      eyebrow="Terms"
      title="Terms of Use"
      summary="These terms apply to your use of the LaundrySync marketing website. They do not create a software agreement."
      sections={sections}
    >
      <h2 id="about">About these terms</h2>
      <p>
        This website is operated by <Tbc>registered legal entity name</Tbc>,
        trading as {legalInfo.parentBrand}. By using it, you accept these terms.
        If you do not accept them, please do not use the website.
      </p>

      <h2 id="scope">What these terms cover</h2>
      <p>
        These terms cover the public {legalInfo.brand} marketing website: the
        information published on it, the illustrative product demonstrations,
        and the contact form.
      </p>
      <p>They do <strong>not</strong> cover, and do not create:</p>
      <ul>
        <li>
          Any licence, subscription or right to use the LaundrySync software.
        </li>
        <li>
          The customer ordering application or the business administration
          portal.
        </li>
        <li>
          Laundry services themselves &mdash; collection, cleaning, delivery, or
          any loss of or damage to garments.
        </li>
        <li>
          Payments between a laundry business and its own customers.
        </li>
        <li>
          Implementation, support or service levels of any kind.
        </li>
      </ul>
      <p>
        Those matters are dealt with in a separate written agreement if and when
        we enter into one.
      </p>

      <h2 id="permitted">Using this website</h2>
      <p>
        You may browse the website, interact with the demonstrations, and
        contact us about LaundrySync for your own business purposes. You may
        print or save pages for your own reference.
      </p>

      <h2 id="prohibited">Things you must not do</h2>
      <ul>
        <li>
          Use the website unlawfully, or in a way that damages it or interferes
          with anyone else&rsquo;s use of it.
        </li>
        <li>
          Attempt to gain unauthorised access to the website, its server, or any
          connected system.
        </li>
        <li>
          Introduce malicious code, or attempt to probe, scan or test the
          website&rsquo;s security.
        </li>
        <li>
          Systematically scrape or copy the website&rsquo;s content for reuse,
          or use automated means to place a disproportionate load on it.
        </li>
        <li>
          Submit false information through the contact form, or use it to send
          unsolicited or abusive messages.
        </li>
        <li>
          Reproduce our content or branding except as permitted below or by law.
        </li>
      </ul>

      <h2 id="content">Website content</h2>
      <p>
        We publish the content of this website in good faith and try to keep it
        accurate and current. It is general information about our product, not
        advice you should rely on for a specific decision without checking it
        with us first.
      </p>

      <h2 id="brand">Brand and intellectual property</h2>
      <p>
        Unless stated otherwise, the content, design, layout, graphics and code
        of this website are owned by, or licensed to,{" "}
        <Tbc>registered legal entity name</Tbc>. The {legalInfo.brand} and{" "}
        {legalInfo.parentBrand} names, logos and brand materials belong to us
        and may not be used without our permission.
      </p>
      <p>
        Any third-party names or marks mentioned on the website belong to their
        respective owners and are used only to identify those products or
        services.
      </p>

      <h2 id="product-info">Product information and demonstrations</h2>
      <p>This is important, so it is set out plainly:</p>
      <ul>
        <li>
          The product previews on this website are{" "}
          <strong>illustrations built with sample data</strong>. Names, order
          numbers, prices, service areas and statuses shown in them are
          fictional examples, not real records or real commercial pricing.
        </li>
        <li>
          Entering a business name or choosing a colour in the branding preview
          is a <strong>local visual preview only</strong>. It does not create,
          configure, publish or deploy anything, and nothing you type there is
          sent to us.
        </li>
        <li>
          Features shown or described may vary by configuration, and some may
          require work to implement for your business.
        </li>
      </ul>
      <p>
        Browsing this website, interacting with a demonstration, clicking a call
        to action, or submitting the contact form does{" "}
        <strong>
          not create a subscription, a purchase, a licence or any binding
          commitment
        </strong>{" "}
        on either side.
      </p>

      <h2 id="enquiries">Business enquiries</h2>
      <p>
        When you send an enquiry, you confirm the information you provide is
        accurate and that you are entitled to provide it. We use it as described
        in our <Link href="/privacy-policy">Privacy Policy</Link>.
      </p>
      <p>
        We do not guarantee that we will respond to every enquiry, or that we
        will be able to offer our product to every business that contacts us.
        Any commercial terms would be agreed separately in writing.
      </p>

      <h2 id="third-party">Third-party services and links</h2>
      <p>
        The contact form is processed by Web3Forms, a third-party service. Your
        use of the form is also subject to that provider&rsquo;s terms.
      </p>
      <p>
        Where the website links to a third-party site, we do not control it and
        are not responsible for its content or practices.
      </p>

      <h2 id="availability">Availability and changes</h2>
      <p>
        We do not guarantee that the website will always be available or
        uninterrupted. We may change, suspend or withdraw any part of it, and
        may update the content at any time, without notice.
      </p>

      <h2 id="accuracy">Accuracy of product descriptions</h2>
      <p>
        We try to describe LaundrySync accurately, but descriptions on a
        marketing website are necessarily summaries. Functionality,
        customisation options, implementation scope, timelines and commercial
        arrangements are confirmed through a direct discussion with us and, if
        we proceed, in a written agreement. Please do not make a business
        decision on the basis of this website alone.
      </p>

      <h2 id="liability">Liability</h2>
      <p>
        We provide this website and its content on an &ldquo;as is&rdquo; basis.
        To the extent permitted by the applicable law, we do not accept
        liability for loss arising from reliance on the website&rsquo;s general
        information.
      </p>
      <p>
        Nothing in these terms excludes or limits liability that cannot lawfully
        be excluded or limited, such as liability for death or personal injury
        caused by negligence, or for fraud.
      </p>
      <p>
        <strong>
          The scope and wording of this section, including any cap on liability
          and any indemnity, must be settled by a legal adviser
        </strong>{" "}
        before publication. No aggressive exclusion or indemnity has been
        inserted here without that review.
      </p>

      <h2 id="law">Governing law</h2>
      <p>
        These terms are governed by the laws of{" "}
        <Tbc>governing law and jurisdiction for disputes</Tbc>, and the courts
        of that jurisdiction have exclusive jurisdiction over disputes arising
        from them.
      </p>
      <p>
        <strong>
          This clause is a placeholder and must be confirmed by{" "}
          {legalInfo.parentBrand} and its legal adviser,
        </strong>{" "}
        including whether any mandatory consumer protections apply.
      </p>

      <h2 id="changes">Changes to these terms</h2>
      <p>
        We may update these terms from time to time. The version published on
        this page is the one that applies, and the date shown at the top
        indicates when it last changed.
      </p>

      <h2 id="contact">Contact</h2>
      <p>
        Questions about these terms can be sent to{" "}
        <Tbc>general business contact email</Tbc> or through our{" "}
        <Link href="/contact">contact form</Link>.
      </p>
    </LegalPage>
  );
}
