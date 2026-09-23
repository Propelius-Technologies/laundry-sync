"use client";

import { useRef, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { motion, useReducedMotion } from "motion/react";
import { Field } from "@/components/ui/Field";
import { Button } from "@/components/ui/Button";
import { ArrowRight, Lock } from "@/components/ui/Icons";
import { easeOut } from "@/components/motion/motion-tokens";

const WEB3FORMS_ENDPOINT = "https://api.web3forms.com/submit";
const MESSAGE_MAX = 1000;

const businessTypes = [
  "Independent laundry",
  "Dry-cleaning business",
  "Pickup & delivery service",
  "Other",
];

type Errors = Partial<Record<string, string>>;

/** Client-side validation. Mirrors the `required` attributes, not a substitute. */
function validate(data: FormData): Errors {
  const errors: Errors = {};
  const value = (key: string) => String(data.get(key) ?? "").trim();

  if (!value("name")) errors.name = "Please enter your name.";
  if (!value("business_name"))
    errors.business_name = "Please enter your business name.";

  const email = value("email");
  if (!email) {
    errors.email = "Please enter your work email.";
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email)) {
    errors.email = "Please enter a valid email address.";
  }

  if (!value("country")) errors.country = "Please enter your country or region.";
  if (!value("business_type"))
    errors.business_type = "Please choose a business type.";

  const message = value("message");
  if (!message) {
    errors.message = "Please tell us a little about your business.";
  } else if (message.length > MESSAGE_MAX) {
    errors.message = `Please keep your message under ${MESSAGE_MAX} characters.`;
  }

  return errors;
}

/**
 * Contact form, submitted straight from the browser to Web3Forms.
 *
 * Fields are uncontrolled, so a failed submission never costs the visitor
 * their input - the DOM keeps every value. Nothing typed here is logged to the
 * console or sent to analytics.
 *
 * SPAM: the hidden "botcheck" honeypot is the only measure in place, and
 * Web3Forms' own documentation now marks it DEPRECATED in favour of a real
 * captcha. It is kept because it is harmless and costs nothing, but it should
 * not be relied on. Web3Forms also runs a server-side spam check.
 *
 * When spam starts arriving, add hCaptcha - it is on the free tier and is the
 * privacy-friendly option. Render Web3Forms' widget inside this form and let
 * it submit the "h-captcha-response" field. (Cloudflare Turnstile and
 * reCaptcha are Pro-plan only.)
 *
 * NOTE: Web3Forms rejects non-browser origins on the free plan, so this must
 * stay a client-side fetch - a Next.js route handler proxying it would be
 * refused with HTTP 403.
 */
export function ContactForm() {
  const router = useRouter();
  const reduceMotion = useReducedMotion();
  const formRef = useRef<HTMLFormElement>(null);
  const [errors, setErrors] = useState<Errors>({});
  const [status, setStatus] = useState<"idle" | "sending" | "error">("idle");
  const [formError, setFormError] = useState<string | null>(null);
  const [messageCount, setMessageCount] = useState(0);

  const sending = status === "sending";

  async function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    // Guards against a double-click firing a second request.
    if (sending) return;

    const form = event.currentTarget;
    const data = new FormData(form);

    // Web3Forms honeypot: a real visitor never fills this.
    if (String(data.get("botcheck") ?? "")) return;

    const nextErrors = validate(data);
    setErrors(nextErrors);

    if (Object.keys(nextErrors).length > 0) {
      setFormError(null);
      const firstInvalid = Object.keys(nextErrors)[0];
      form.querySelector<HTMLElement>(`[name="${firstInvalid}"]`)?.focus();
      return;
    }

    const accessKey = process.env.NEXT_PUBLIC_WEB3FORMS_ACCESS_KEY;
    if (!accessKey) {
      setFormError(
        "The contact form isn't available right now. Please try again shortly.",
      );
      setStatus("error");
      return;
    }

    setStatus("sending");
    setFormError(null);

    data.append("access_key", accessKey);
    data.append("subject", "New LaundrySync website inquiry");
    data.append("from_name", "LaundrySync Website");

    try {
      const response = await fetch(WEB3FORMS_ENDPOINT, {
        method: "POST",
        body: data,
      });
      const result = await response.json().catch(() => null);

      // Both must hold - an HTTP 200 alone does not mean it was accepted.
      if (response.ok && result?.success === true) {
        router.push("/thank-you");
        return; // stay disabled through the navigation
      }

      throw new Error("Submission rejected");
    } catch {
      setFormError(
        "Something went wrong sending your message. Please check your connection and try again.",
      );
      setStatus("error");
    }
  }

  return (
    <motion.div
      initial={reduceMotion ? false : { opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: easeOut, delay: 0.1 }}
      className="rounded-ls-xl border border-ls-border bg-white p-6 shadow-ls-card sm:p-8 lg:p-9"
    >
      <h2 className="ls-h3">Send us a message</h2>
      <p className="ls-body-sm mt-2">
        Share a few details and we&rsquo;ll get back to you.
      </p>

      {/*
        data-clarity-mask masks this node and every child in Microsoft Clarity
        session recordings, so no value a visitor types here is uploaded.

        Clarity already masks input and dropdown contents in all masking modes,
        and that cannot be switched off from the dashboard - but this attribute
        overrides any dashboard setting, covers the textarea and the validation
        messages beside each field, and keeps the guarantee in the markup where
        it is visible rather than in a console someone may later change.

        No Clarity custom event or tag anywhere in this component carries form
        data; the values go only to Web3Forms on submit.
      */}
      <form
        ref={formRef}
        onSubmit={onSubmit}
        noValidate
        className="mt-7"
        data-clarity-mask="True"
      >
        {/* Honeypot - hidden from view and from keyboard navigation */}
        <div aria-hidden="true" className="sr-only">
          <label htmlFor="botcheck">Leave this field empty</label>
          <input
            id="botcheck"
            type="checkbox"
            name="botcheck"
            tabIndex={-1}
            autoComplete="off"
          />
        </div>

        <div className="grid gap-5 sm:grid-cols-2">
          <Field
            name="name"
            label="Full name"
            autoComplete="name"
            required
            disabled={sending}
            error={errors.name}
          />
          <Field
            name="business_name"
            label="Business name"
            autoComplete="organization"
            required
            disabled={sending}
            error={errors.business_name}
          />
          <Field
            name="email"
            label="Work email"
            type="email"
            autoComplete="email"
            required
            disabled={sending}
            error={errors.email}
          />
          <Field
            name="phone"
            label="Phone number"
            type="tel"
            autoComplete="tel"
            disabled={sending}
            error={errors.phone}
          />
          <Field
            name="country"
            label="Country or region"
            autoComplete="country-name"
            required
            disabled={sending}
            error={errors.country}
          />
          <Field
            name="business_type"
            label="Business type"
            as="select"
            options={businessTypes}
            required
            disabled={sending}
            error={errors.business_type}
          />
        </div>

        <div className="mt-5">
          <Field
            name="message"
            label="Message"
            as="textarea"
            rows={5}
            maxLength={MESSAGE_MAX}
            placeholder="How do you handle orders today, and what would you like to improve?"
            required
            disabled={sending}
            error={errors.message}
            onChange={(event) => setMessageCount(event.target.value.length)}
          />
          <p className="mt-1.5 text-right text-caption text-ls-muted">
            {messageCount} / {MESSAGE_MAX}
          </p>
        </div>

        {/* Submission failures are announced, not just shown */}
        <div aria-live="polite">
          {formError && (
            <p className="mt-5 rounded-ls-md border border-ls-error/30 bg-ls-error/5 px-4 py-3 text-body-sm text-ls-error">
              {formError}
            </p>
          )}
        </div>

        <div className="mt-7">
          <Button
            type="submit"
            size="lg"
            disabled={sending}
            className="w-full sm:w-auto"
          >
            {sending ? "Sending..." : "Send message"}
            {!sending && <ArrowRight className="size-4" />}
          </Button>
        </div>

        <p className="mt-6 flex items-start gap-2 text-caption text-ls-muted">
          <Lock aria-hidden="true" className="mt-0.5 size-3.5 shrink-0" />
          <span>
          We&rsquo;ll use the information you provide to respond to your
          inquiry. Read our{" "}
          <Link
            href="/privacy-policy"
            className="font-medium text-ls-navy underline underline-offset-2 transition-colors hover:text-ls-blue focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-(--color-focus-ring)"
          >
            Privacy Policy
          </Link>
          .
          </span>
        </p>
      </form>
    </motion.div>
  );
}
