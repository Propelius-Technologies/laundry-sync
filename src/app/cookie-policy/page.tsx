import { pageMetadata } from "@/lib/seo";
import { legalPagesApproved } from "@/lib/site-config";
import Link from "next/link";
import { LegalPage, Tbc, type LegalSection } from "@/components/legal/LegalPage";
import { CookiePreferencesButton } from "@/components/consent/CookiePreferencesButton";
import { legalInfo, storageInventory } from "@/data/legal";

export const metadata = pageMetadata({
  title: "Cookie Policy",
  description:
    "Cookies and similar technologies used on the LaundrySync website, and how to manage your preferences.",
  path: "/cookie-policy",
  /*
   * Draft pending Propelius legal approval, so noindex for now. Flips to
   * indexable automatically once legalLastUpdated is set in src/data/legal.ts.
   */
  noindex: !legalPagesApproved,
});

const sections: LegalSection[] = [
  { id: "what", title: "What these technologies are" },
  { id: "why", title: "Why this website uses them" },
  { id: "essential", title: "Strictly necessary storage" },
  { id: "analytics", title: "Optional analytics" },
  { id: "no-advertising", title: "No advertising technologies" },
  { id: "inventory", title: "Storage inventory" },
  { id: "controls", title: "Your choices" },
  { id: "withdraw", title: "Withdrawing consent" },
  { id: "browser", title: "Browser controls" },
  { id: "changes", title: "Changes to this policy" },
  { id: "contact", title: "Contact" },
];

export default function CookiePolicyPage() {
  return (
    <LegalPage
      eyebrow="Cookies"
      title="Cookie Policy"
      summary="What this website stores in your browser, why, and how you can change it at any time."
      sections={sections}
    >
      <h2 id="what">What these technologies are</h2>
      <p>
        Cookies are small text files a website asks your browser to store. Local
        storage is a related browser feature that holds information on your
        device without sending it with every request. Both are ways of
        remembering something between page views.
      </p>

      <h2 id="why">Why this website uses them</h2>
      <p>
        We keep this to a minimum. Until you make a cookie choice this website
        uses <strong>one</strong> item of browser storage, and it exists solely
        to remember that choice.
      </p>
      <p>
        <strong>
          No cookies are set unless you opt in to optional analytics.
        </strong>{" "}
        If you do, Microsoft Clarity is loaded and sets the cookies listed in
        the{" "}
        <Link href="#inventory">storage inventory</Link> below. If you decline,
        or have not answered yet, no analytics script is requested at all.
        There is no tag manager and no advertising script on any page.
      </p>

      <h2 id="essential">Strictly necessary storage</h2>
      <p>
        Strictly necessary storage supports functions you have asked for and
        cannot be switched off. On this site that means one local storage entry,{" "}
        <code>ls-consent</code>, which records your cookie choice and the
        version of the purposes it applied to, so you are not asked on every
        page.
      </p>
      <p>
        It contains only that choice, a version number and a timestamp. It never
        contains your name, email address, phone number or anything you typed
        into the contact form.
      </p>

      <h2 id="analytics">Optional analytics</h2>
      <p>
        This website uses <strong>Microsoft Clarity</strong>, a website
        analytics and behaviour-analysis tool provided by Microsoft. We use it
        to understand how visitors interact with the site &mdash; which parts
        people read, where they get stuck &mdash; so we can find and fix
        usability problems.
      </p>
      <p>
        Clarity records aggregated interaction data such as page views, clicks,
        scrolling and mouse movement, and can replay these as a session
        recording. It sets the cookies listed in the{" "}
        <Link href="#inventory">storage inventory</Link>, including third-party
        cookies on Microsoft&rsquo;s own domains.
      </p>
      <p>
        <strong>
          Clarity loads only after you opt in to optional analytics.
        </strong>{" "}
        Until you accept, the script is never requested &mdash; not on your
        first visit, and not if you decline. It is not loaded and then
        suppressed; it is simply not there.
      </p>
      <p>
        <strong>The contact form is masked.</strong> What you type into it
        &mdash; your name, email address, phone number and message &mdash; is
        excluded from session recordings and is never uploaded to Clarity. We
        also send no custom analytics events containing anything you have
        entered.
      </p>
      <p>
        You can change your mind at any time through{" "}
        <CookiePreferencesButton /> or the link in the footer. Turning optional
        analytics off tells Clarity to end the session and clear its cookies,
        clears the analytics cookies we can reach, and reloads the page so
        nothing further is collected. We cannot delete data Microsoft has
        already received, and we cannot directly delete cookies set on
        Microsoft&rsquo;s own domains &mdash; your browser settings control
        those.
      </p>

      <h2 id="no-advertising">No advertising technologies</h2>
      <p>
        We do not use advertising, remarketing, personalisation or social media
        tracking technologies on this website, so no such category appears in
        the preferences panel. We have not listed empty categories to look more
        thorough than we are.
      </p>

      <h2 id="inventory">Storage inventory</h2>
      <p>
        This table lists everything this website stores in your browser,
        verified against the site&rsquo;s code.
      </p>

      {/* Scrolls inside its own container on narrow screens */}
      <div className="mt-4 -mx-4 overflow-x-auto overscroll-x-contain px-4 sm:mx-0 sm:px-0">
        <table className="w-full min-w-[40rem] border-collapse text-left text-body-sm">
          <thead>
            <tr className="border-b border-ls-border">
              {[
                "Name",
                "Provider",
                "Type",
                "Purpose",
                "Category",
                "Duration",
                "Consent needed",
              ].map((heading) => (
                <th
                  key={heading}
                  scope="col"
                  className="py-2.5 pr-4 text-caption font-semibold tracking-[0.06em] text-ls-muted uppercase"
                >
                  {heading}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {storageInventory.map((item) => (
              <tr key={item.name} className="border-b border-ls-border/70">
                <td className="py-3 pr-4 font-medium text-ls-ink">
                  <code>{item.name}</code>
                </td>
                <td className="py-3 pr-4">{item.provider}</td>
                <td className="py-3 pr-4">{item.type}</td>
                <td className="py-3 pr-4">{item.purpose}</td>
                <td className="py-3 pr-4">{item.category}</td>
                <td className="py-3 pr-4">{item.duration}</td>
                <td className="py-3 pr-4">{item.consentRequired}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <p>
        Our hosting provider may also process server logs in order to serve and
        protect the website. These are not set through your browser by this
        site; the details are{" "}
        <Tbc>hosting provider log retention</Tbc>.
      </p>

      <h2 id="controls">Your choices</h2>
      <p>
        When you first visit, a banner lets you accept optional cookies, reject
        them, or open the preferences panel. Optional categories are{" "}
        <strong>off until you turn them on</strong> &mdash; nothing is
        pre-selected, and we do not treat scrolling, closing the banner or
        continuing to browse as consent.
      </p>
      <p>You can change your choice at any time:</p>
      <ul>
        <li>
          Use the <strong>Cookie preferences</strong> link in the footer of any
          page.
        </li>
        <li>Or open the panel here:</li>
      </ul>
      <p>
        <CookiePreferencesButton />
      </p>

      <h2 id="withdraw">Withdrawing consent</h2>
      <p>
        Turning a category off stops us using it from that point on. When you
        withdraw consent for analytics, we update your stored choice, clear the
        analytics cookies those providers are documented to set on this domain,
        and reload the page if a script had already started so it stops
        collecting.
      </p>
      <p>
        We cannot delete information a third-party provider has already
        received. If that matters to you, please contact us and we will tell you
        what we are able to do.
      </p>
      <p>
        Withdrawing consent does not affect the{" "}
        <Link href="/contact">contact form</Link>, which works regardless of
        your cookie choice.
      </p>

      <h2 id="browser">Browser controls</h2>
      <p>
        Your browser can block or delete cookies and clear site storage,
        normally under its privacy or site-data settings. Clearing this
        site&rsquo;s storage also removes the record of your cookie choice, so
        you will be asked again on your next visit.
      </p>

      <h2 id="changes">Changes to this policy</h2>
      <p>
        If we add or change the technologies we use, we will update this policy
        and the date at the top of the page. Where the change materially alters
        the purposes, we will ask for your consent again rather than relying on
        a choice you made earlier.
      </p>

      <h2 id="contact">Contact</h2>
      <p>
        Questions about this policy can be sent to{" "}
        <Tbc>privacy contact email address</Tbc>, or through our{" "}
        <Link href="/contact">contact form</Link>. {legalInfo.brand} is a
        product of {legalInfo.parentBrand}. See also our{" "}
        <Link href="/privacy-policy">Privacy Policy</Link>.
      </p>
    </LegalPage>
  );
}
