import { pageMetadata } from "@/lib/seo";
import Link from "next/link";
import { Section } from "@/components/ui/Section";
import { Button } from "@/components/ui/Button";
import { ArrowRight, ArrowUpRight } from "@/components/ui/Icons";
import { SuccessMark } from "@/components/illustrations/SuccessMark";
import { PageIllustration } from "@/components/illustrations/PageIllustration";

export const metadata = pageMetadata({
  title: "Message Received",
  description: "Your message has been sent to the LaundrySync team.",
  path: "/thank-you",
  /*
   * A confirmation page has no search value and must never be an organic
   * landing page. noindex keeps it out of results; pageMetadata still sets
   * follow:true so it is not a crawl dead end. It is intentionally absent
   * from sitemap.ts and intentionally NOT blocked in robots.txt, because a
   * crawler must be able to fetch the page to read this directive.
   */
  noindex: true,
});

/**
 * Reached only after Web3Forms confirms a submission.
 *
 * Deliberately short: no submitted details echoed back, no response-time
 * promise, and no "what happens next" timeline, which would commit the team
 * to steps nobody has agreed to.
 */
export default function ThankYouPage() {
  return (
    <Section space="page">
      <div className="mx-auto max-w-[44rem] text-center">
        <div className="flex flex-col items-center gap-3">
          <SuccessMark className="size-12" />
          <p className="ls-label text-ls-muted">Message received</p>
        </div>

        <h1 className="ls-statement mt-6">
          <span className="block">Thank you.</span>
          <span className="block">
            Your message is <span className="text-ls-blue">in good hands.</span>
          </span>
        </h1>

        <p className="ls-body mx-auto mt-5 max-w-[36rem]">
          We&rsquo;ve received your inquiry. Our team will review it and get
          back to you.
        </p>

        <PageIllustration
          src="/images/thank-you-illustration.svg"
          delay={0.18}
          priority
          className="mx-auto mt-10 max-w-[24rem]"
        />

        <div className="mt-10 flex flex-wrap items-center justify-center gap-x-6 gap-y-4">
          <Button href="/" size="lg">
            Back to homepage
            <ArrowRight className="size-4" />
          </Button>

          <Link
            href="/#how-it-works"
            className="group inline-flex items-center gap-2 border-b-2 border-ls-sky-200 pb-1 text-button font-semibold text-ls-navy transition-colors duration-(--motion-normal) hover:border-ls-blue hover:text-ls-blue focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-(--color-focus-ring)"
          >
            Explore LaundrySync
            <ArrowUpRight className="size-4 transition-transform duration-(--motion-normal) group-hover:translate-x-0.5 motion-reduce:transition-none motion-reduce:group-hover:translate-x-0" />
          </Link>
        </div>
      </div>
    </Section>
  );
}
