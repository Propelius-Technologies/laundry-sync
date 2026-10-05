import { pageMetadata } from "@/lib/seo";
import { legalPagesApproved } from "@/lib/site-config";
import Link from "next/link";
import { LegalPage, Fact, type LegalSection } from "@/components/legal/LegalPage";
import { legalInfo, verifiedProcessors } from "@/data/legal";

export const metadata = pageMetadata({
  title: "Privacy Policy",
  description:
    "How the LaundrySync website collects, uses and handles information submitted through its contact form and other website services.",
  path: "/privacy-policy",
  /* Indexable once legalLastUpdated is set in src/data/legal.ts. */
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
        This website is operated by <Fact value={legalInfo.legalEntityName} label="registered legal entity name" />,
        trading as {legalInfo.parentBrand}, at{" "}
        <Fact value={legalInfo.registeredAddress} label="registered business address" />. {legalInfo.brand} is a product
        of {legalInfo.parentBrand}.
      </p>
      <p>
        The entity named above is the controller of the personal information
        described in this policy. We operate from{" "}
        <Fact value={legalInfo.jurisdiction} label="operating jurisdiction" /> and handle personal information in
        accordance with the data protection laws that apply to us, including,
        where relevant to you, the UK and EU GDPR.
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
        Where the UK or EU GDPR applies, we rely on our legitimate interest in
        responding to business enquiries and operating our website, and on your
        consent for optional analytics. Under India&rsquo;s Digital Personal
        Data Protection framework, we process information you choose to send
        us for the purpose you sent it, and we rely on your consent for
        optional analytics.
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
        Web3Forms handles submissions under its own{" "}
        <a href="https://web3forms.com/privacy" target="_blank" rel="noopener noreferrer">
          privacy policy
        </a>
        , which governs how long it keeps them and where they are stored. We
        use Web3Forms only to deliver your enquiry to us.
      </p>

      <h2 id="hosting">Hosting and service providers</h2>
      <p>This website relies on the following third parties:</p>
      <ul>
        {verifiedProcessors.map((processor) => (
          <li key={processor.name}>
            <strong>{processor.name}</strong> &mdash; {processor.role}.{" "}
            {processor.detail}
            {processor.when && ` (${processor.when.toLowerCase()}).`}
          </li>
        ))}
        <li>
          <strong>Website hosting</strong> &mdash; provided by{" "}
          <Fact value={legalInfo.hostingProvider} label="hosting provider and region" />.
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
        This website sets no cookies unless you accept optional analytics
        cookies. It stores one item in your
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
        {legalInfo.parentBrand} is headquartered in{" "}
        <Fact value={legalInfo.jurisdiction} label="operating jurisdiction" />. We and our
        service providers may store or process your information in India, the
        United States, the European Economic Area or other jurisdictions. Where
        required, we rely on{" "}
        <Fact
          value={legalInfo.transferSafeguards}
          label="transfer destinations and safeguards for each provider"
        />{" "}
        to protect cross-border transfers.
      </p>

      <h2 id="retention">How long we keep information</h2>
      <p>
        We keep contact form enquiries for up to{" "}
        <Fact value={legalInfo.contactFormRetention} label="contact enquiry retention period" /> to manage the
        enquiry history, after which they are deleted.
      </p>
      <p>
        We may keep information for longer where we need to comply with a legal
        obligation, resolve a dispute or enforce our agreements. Information
        held by Web3Forms is retained according to their schedule, not ours.
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
        apply in all circumstances. We may need to verify your identity before
        acting on a request, and we will respond within the time the applicable
        law requires. If you are unhappy with how we have handled your
        information, you can also complain to the data protection authority
        where you live.
      </p>

      <h2 id="contact">Contacting us about privacy</h2>
      <p>
        For any privacy question or request, contact us at{" "}
        <Fact value={legalInfo.privacyEmail} label="privacy contact email address" />, or write to us at{" "}
        <Fact value={legalInfo.registeredAddress} label="registered business address" />. You can also reach us through
        our <Link href="/contact">contact form</Link>.
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
