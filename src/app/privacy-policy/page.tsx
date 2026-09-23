import { pageMetadata } from "@/lib/seo";
import { legalPagesApproved } from "@/lib/site-config";
import Link from "next/link";
import { LegalPage, Tbc, type LegalSection } from "@/components/legal/LegalPage";
import { legalInfo, verifiedProcessors } from "@/data/legal";

export const metadata = pageMetadata({
  title: "Privacy Policy",
  description:
    "How the LaundrySync website collects, uses and handles information submitted through its contact form and other website services.",
  path: "/privacy-policy",
  /*
   * Draft pending Propelius legal approval, so noindex for now. Flips to
   * indexable automatically once legalLastUpdated is set in src/data/legal.ts.
   */
  noindex: !legalPagesApproved,
});

const sections: LegalSection[] = [
  { id: "scope", title: "Introduction and scope" },
  { id: "operator", title: "Who operates this website" },
  { id: "contact-form", title: "Information you give us" },
  { id: "technical", title: "Technical information" },
  { id: "purposes", title: "How we use information" },
  { id: "grounds", title: "Our grounds for using it" },
  { id: "web3forms", title: "Contact-form processing" },
  { id: "hosting", title: "Hosting and service providers" },
  { id: "analytics", title: "Analytics" },
  { id: "cookies", title: "Cookies and similar storage" },
  { id: "sharing", title: "Sharing information" },
  { id: "transfers", title: "International processing" },
  { id: "retention", title: "How long we keep information" },
  { id: "security", title: "Security" },
  { id: "rights", title: "Your rights" },
  { id: "contact", title: "Contacting us about privacy" },
  { id: "changes", title: "Changes to this policy" },
];

export default function PrivacyPolicyPage() {
  return (
    <LegalPage
      eyebrow="Privacy"
      title="Privacy Policy"
      summary="This policy explains what personal information the LaundrySync marketing website collects, why, and who it is shared with."
      sections={sections}
    >
      <h2 id="scope">Introduction and scope</h2>
      <p>
        This policy applies to the public {legalInfo.brand} marketing website
        only. It explains how personal information is handled when you browse
        the site or send us a business enquiry.
      </p>
      <p>This policy does <strong>not</strong> cover:</p>
      <ul>
        <li>
          The customer-facing ordering application or the business
          administration portal that a laundry business may operate using
          LaundrySync.
        </li>
        <li>
          How an individual laundry or dry-cleaning business handles its own
          customers&rsquo; information. That business is responsible for its own
          privacy notice.
        </li>
        <li>
          Garment collection, cleaning or delivery, or any payment for laundry
          services.
        </li>
        <li>
          Software licensing, subscription or implementation arrangements, which
          are governed by any separate agreement we enter into with you.
        </li>
      </ul>
      <p>
        The product previews on this website are illustrations built with sample
        data. They are not connected to a live account, and interacting with
        them does not send anything to us.
      </p>

      <h2 id="operator">Who operates this website</h2>
      <p>
        This website is operated by <Tbc>registered legal entity name</Tbc>,
        trading as {legalInfo.parentBrand}, at{" "}
        <Tbc>registered business address</Tbc>. {legalInfo.brand} is a product
        of {legalInfo.parentBrand}.
      </p>
      <p>
        Where data protection law applies to our activities, the entity named
        above is the controller of the personal information described in this
        policy. Which data protection regime applies depends on the operating
        jurisdiction, which is <Tbc>operating jurisdiction</Tbc>, and requires
        legal confirmation.
      </p>

      <h2 id="contact-form">Information you give us</h2>
      <p>
        The contact form on this website collects the following, matching the
        fields actually present on the form:
      </p>
      <ul>
        <li>Full name (required)</li>
        <li>Business name (required)</li>
        <li>Work email address (required)</li>
        <li>Phone number (optional)</li>
        <li>Country or region (required)</li>
        <li>Business type (required)</li>
        <li>Your message (required)</li>
      </ul>
      <p>
        We use this to reply to your enquiry and to discuss whether LaundrySync
        suits your business. Submitting the form does{" "}
        <strong>not</strong> add you to a marketing mailing list, create an
        account, or start a subscription.
      </p>
      <p>
        Please do not include special category information, customer records, or
        anything confidential in your message.
      </p>

      <h2 id="technical">Technical information</h2>
      <p>
        Like most websites, requests to this site are handled by our hosting
        provider, which may process technical information such as your IP
        address, browser type and the pages requested in order to deliver the
        site and keep it secure. The specific logs retained are controlled by
        that provider; see{" "}
        <Link href="#hosting">Hosting and service providers</Link>.
      </p>
      <p>
        The website does not build advertising profiles, and no advertising or
        remarketing tags are installed.
      </p>

      <h2 id="purposes">How we use information</h2>
      <ul>
        <li>To respond to and follow up on business enquiries you send us.</li>
        <li>To provide, secure and maintain this website.</li>
        <li>To remember your cookie choice on this device.</li>
        <li>
          If you opt in, to measure how visitors use the site so we can improve
          it.
        </li>
        <li>To comply with legal obligations that apply to us.</li>
      </ul>
      <p>
        We do not sell personal information, and we do not use it for automated
        decision-making that produces legal or similarly significant effects.
      </p>

      <h2 id="grounds">Our grounds for using it</h2>
      <p>
        Where a data protection regime such as the UK or EU GDPR applies, we
        expect to rely on our legitimate interest in responding to business
        enquiries and operating our website, and on your consent for optional
        analytics. Under India&rsquo;s Digital Personal Data Protection
        framework the analysis differs and generally turns on notice and
        consent.
      </p>
      <p>
        <strong>
          The applicable regime and the final basis for each purpose require
          legal confirmation before this policy is published.
        </strong>
      </p>

      <h2 id="web3forms">Contact-form processing</h2>
      <p>
        The contact form is processed by <strong>Web3Forms</strong>, a
        third-party form-processing service. When you submit the form, your
        browser sends the form contents directly to Web3Forms, which then
        forwards the enquiry to our notification inbox. This means Web3Forms
        receives the information you enter.
      </p>
      <p>
        Because the form is handled by a third party, we cannot say that your
        submission is never shared outside our organisation.
      </p>
      <p>
        Web3Forms&rsquo; published developer documentation does not state how
        long submissions are retained, where its servers are located, or which
        sub-processors it uses, and its privacy page could not be retrieved for
        review. We have therefore not asserted any of those details here. They
        must be obtained directly from Web3Forms before publication:{" "}
        <Tbc>Web3Forms retention period, data location, sub-processors and data processing terms</Tbc>
        .
      </p>

      <h2 id="hosting">Hosting and service providers</h2>
      <p>This website relies on the following third parties:</p>
      <ul>
        {verifiedProcessors.map((processor) => (
          <li key={processor.name}>
            <strong>{processor.name}</strong> &mdash; {processor.role}.{" "}
            {processor.detail} ({processor.when.toLowerCase()}).
          </li>
        ))}
        <li>
          <strong>Website hosting</strong> &mdash; provided by{" "}
          <Tbc>hosting provider and region</Tbc>.
        </li>
      </ul>
      <p>
        The Inter typeface used on this site is served from our own domain, so
        viewing the site does not send a request to a third-party font service.
      </p>

      <h2 id="analytics">Analytics</h2>
      <p>
        This website uses <strong>Microsoft Clarity</strong>, an optional
        website analytics and behaviour-analysis tool provided by Microsoft. It
        helps us see how visitors use the site &mdash; which sections they read
        and where they run into difficulty &mdash; so we can improve it.
        Clarity collects interaction data such as page views, clicks, scrolling
        and mouse movement, and can replay a visit as a session recording.
      </p>
      <p>
        <strong>
          Clarity runs only if you opt in to optional analytics.
        </strong>{" "}
        Until then no Clarity script is requested and no Clarity cookie is set.
        Declining, or simply not answering, means it never loads. You can
        withdraw at any time through the Cookie preferences panel, linked in the
        footer and described in our{" "}
        <Link href="/cookie-policy">Cookie Policy</Link>.
      </p>
      <p>
        No Google Analytics, tag manager or advertising script is loaded on any
        page.
      </p>
      <p>
        <strong>
          Your contact-form entries are excluded from analytics.
        </strong>{" "}
        The form is masked so that its contents are not captured in session
        recordings, and we do not include your name, email address, phone
        number or message content in any analytics event.
      </p>

      <h2 id="cookies">Cookies and similar storage</h2>
      <p>
        This website currently sets no cookies. It stores one item in your
        browser&rsquo;s local storage to remember your cookie choice. Full
        details, including how to change or withdraw your choice, are in our{" "}
        <Link href="/cookie-policy">Cookie Policy</Link>.
      </p>

      <h2 id="sharing">Sharing information</h2>
      <p>We share personal information only:</p>
      <ul>
        <li>
          With the service providers listed above, so they can perform their
          function for us.
        </li>
        <li>
          Where we are required to do so by law, or to establish, exercise or
          defend legal claims.
        </li>
        <li>
          With professional advisers, or in connection with a business
          reorganisation, where relevant.
        </li>
      </ul>

      <h2 id="transfers">International processing</h2>
      <p>
        Our service providers may process information outside the country you
        are in. The countries involved, and the safeguards relied on for those
        transfers, depend on our hosting provider and on Web3Forms, and are{" "}
        <Tbc>transfer destinations and safeguards for each provider</Tbc>.
      </p>

      <h2 id="retention">How long we keep information</h2>
      <p>
        We keep enquiry correspondence for as long as needed to deal with your
        enquiry and for any follow-up business discussion, after which it is
        deleted or archived.
      </p>
      <p>
        <strong>
          A specific retention period has not yet been set. This is a business
          decision for {legalInfo.parentBrand}
        </strong>{" "}
        (<Tbc>contact enquiry retention period</Tbc>), and the published policy
        must state a period we actually follow. Information held by Web3Forms is
        retained according to their schedule, not ours.
      </p>

      <h2 id="security">Security</h2>
      <p>
        The website is served over HTTPS, and access to our enquiry inbox is
        limited to people who need it. Our service providers apply their own
        security measures.
      </p>
      <p>
        No website or transmission method is completely secure, and we do not
        guarantee that information sent to us over the internet cannot be
        intercepted.
      </p>

      <h2 id="rights">Your rights</h2>
      <p>
        Depending on where you live and which law applies, you may have rights
        to request access to your personal information, to have it corrected or
        deleted, to object to or restrict how we use it, to receive it in a
        portable form, and to withdraw consent for anything you previously
        agreed to.
      </p>
      <p>
        You can withdraw your cookie choice at any time through{" "}
        <Link href="/cookie-policy">Cookie preferences</Link>, without affecting
        anything you did before.
      </p>
      <p>
        These rights are not identical in every jurisdiction, and some do not
        apply in all circumstances.{" "}
        <strong>
          The specific rights, any statutory response period, and the relevant
          supervisory authority for complaints require legal confirmation
        </strong>{" "}
        before this policy is published.
      </p>

      <h2 id="contact">Contacting us about privacy</h2>
      <p>
        For any privacy question or request, contact us at{" "}
        <Tbc>privacy contact email address</Tbc>, or write to us at{" "}
        <Tbc>registered business address</Tbc>. You can also reach us through
        our <Link href="/contact">contact form</Link>.
      </p>
      <p>
        Whether we are required to appoint a data protection officer or a local
        representative is <Tbc>DPO / representative requirement</Tbc>.
      </p>

      <h2 id="changes">Changes to this policy</h2>
      <p>
        We may update this policy as the website changes. When we do, we will
        revise the date shown at the top of the page. If we start using a new
        category of optional technology, we will ask for your consent again
        before it is used.
      </p>
    </LegalPage>
  );
}
