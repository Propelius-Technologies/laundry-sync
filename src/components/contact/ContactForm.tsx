"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import Script from "next/script";
import { useRouter } from "next/navigation";
import { motion, useReducedMotion } from "motion/react";
import { Field } from "@/components/ui/Field";
import { Button } from "@/components/ui/Button";
import { ArrowRight, Lock } from "@/components/ui/Icons";
import { easeOut } from "@/components/motion/motion-tokens";
import { DemoIntent, type ContactIntent } from "./DemoIntent";
import { CountryCombobox, findCountry } from "./CountryCombobox";

const WEB3FORMS_ENDPOINT = "https://api.web3forms.com/submit";
const MESSAGE_MAX = 1000;

/**
 * hCaptcha, through Web3Forms' free integration: Web3Forms verifies the
 * `h-captcha-response` token the widget adds to the form. This is Web3Forms'
 * shared public site key for the free plan, the one their own client script
 * uses. The widget is rendered explicitly rather than through that script so
 * it also renders when /contact is reached by client-side navigation.
 */
const HCAPTCHA_SITEKEY = "50b2fe65-b00b-4b9e-ad62-3ba471098be2";
/*
 * hCaptcha calls the global named in `onload` once its API is fully ready -
 * later than the script element's own load event, which is too early to
 * render. The flag covers forms that mount after that has happened.
 */
const HCAPTCHA_ONLOAD = "lsHCaptchaReady";
const HCAPTCHA_READY_EVENT = "ls-hcaptcha-ready";
const HCAPTCHA_SRC = `https://js.hcaptcha.com/1/api.js?render=explicit&recaptchacompat=off&onload=${HCAPTCHA_ONLOAD}`;
/** Below this container width the normal widget (303px) would overflow. */
const HCAPTCHA_NORMAL_WIDTH = 303;

type HCaptcha = {
  render: (container: HTMLElement, options: Record<string, unknown>) => string;
  reset: (widgetId?: string) => void;
  remove: (widgetId?: string) => void;
};

type HCaptchaWindow = Window & {
  hcaptcha?: HCaptcha;
  lsHCaptchaReady?: () => void;
  lsHCaptchaIsReady?: boolean;
};

function getHCaptcha(): HCaptcha | undefined {
  return (window as HCaptchaWindow).hcaptcha;
}

if (typeof window !== "undefined") {
  (window as HCaptchaWindow)[HCAPTCHA_ONLOAD] = () => {
    (window as HCaptchaWindow).lsHCaptchaIsReady = true;
    window.dispatchEvent(new Event(HCAPTCHA_READY_EVENT));
  };
}

const NAME_MAX = 100;
const PHONE_MAX = 20;

/*
 * Letters from any script, plus the combining marks many scripts need
 * (Devanagari vowel signs, for one), spaces, apostrophes (straight and the
 * curly one phone keyboards insert), hyphens and periods. At least one letter.
 */
const NAME_PATTERN = /^(?=.*\p{L})[\p{L}\p{M}\s'’.-]+$/u;

/* Optional "+" first, then digits, spaces, brackets and hyphens only. */
const PHONE_PATTERN = /^\+?[\d\s()-]+$/;

/** E.164 allows at most 15 digits; below 7 is not a reachable number. */
function isValidPhone(phone: string) {
  if (!PHONE_PATTERN.test(phone)) return false;
  const digits = phone.replace(/\D/g, "").length;
  return digits >= 7 && digits <= 15;
}

function isValidEmail(email: string) {
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email)) return false;
  const at = email.lastIndexOf("@");
  const local = email.slice(0, at);
  const domain = email.slice(at + 1);
  return !(
    email.includes("..") ||
    local.startsWith(".") ||
    local.endsWith(".") ||
    domain.startsWith(".") ||
    domain.endsWith(".")
  );
}

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

  const name = value("name");
  if (!name) {
    errors.name = "Please enter your name.";
  } else if (name.length > NAME_MAX) {
    errors.name = `Please keep your name to ${NAME_MAX} characters or fewer.`;
  } else if (!NAME_PATTERN.test(name)) {
    errors.name = "Please enter a name using letters only.";
  }

  if (!value("business_name"))
    errors.business_name = "Please enter your business name.";

  const email = value("email");
  if (!email) {
    errors.email = "Please enter your email address.";
  } else if (!isValidEmail(email)) {
    errors.email = "Please enter a valid email address.";
  }

  // Optional: only checked when something was entered.
  const phone = value("phone");
  if (phone && !isValidPhone(phone)) {
    errors.phone = "Please enter a valid phone number, 7–15 digits.";
  }

  // Must be a list entry; the combobox submits the name as shown.
  if (!findCountry(value("country")))
    errors.country = "Please choose a country from the list.";
  if (!value("business_type"))
    errors.business_type = "Please choose a business type.";

  const message = value("message");
  if (!message) {
    errors.message = "Please tell us a little about your business.";
  } else if (message.length > MESSAGE_MAX) {
    errors.message = `Please keep your message under ${MESSAGE_MAX} characters.`;
  }

  // The widget writes its token into this field once it is solved.
  if (!value("h-captcha-response"))
    errors.captcha = "Please complete the verification.";

  return errors;
}

/** Every error key is the id of the element to focus for it. */
function focusField(form: HTMLFormElement | null, name: string) {
  form?.querySelector<HTMLElement>(`#${name}`)?.focus();
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
  /* From ?intent=demo, read after mount; see DemoIntent. */
  const [intent, setIntent] = useState<ContactIntent>("general");
  const isDemo = intent === "demo";
  /* Dialing code of the chosen country, shown only as the phone placeholder. */
  const [dialCode, setDialCode] = useState<string | undefined>();

  /*
   * Set synchronously, so a second submit in the same tick - before React has
   * re-rendered with `sending` - is still refused. State alone can't do that.
   */
  const submittingRef = useRef(false);

  /*
   * The field to focus after a failed validation. Focusing in the same tick as
   * setErrors would land before aria-describedby and the message render, so a
   * screen reader could announce the field without its error.
   */
  const pendingFocusRef = useRef<string | null>(null);

  const captchaRef = useRef<HTMLDivElement>(null);
  const captchaIdRef = useRef<string | null>(null);

  useEffect(() => {
    const name = pendingFocusRef.current;
    if (!name) return;
    pendingFocusRef.current = null;
    focusField(formRef.current, name);
  }, [errors]);

  const errorEntries = Object.entries(errors).filter(
    (entry): entry is [string, string] => Boolean(entry[1]),
  );

  const sending = status === "sending";

  async function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    // Guards against a double-click firing a second request.
    if (submittingRef.current) return;
    submittingRef.current = true;
    let navigating = false;

    try {
      navigating = await submit(event.currentTarget);
    } finally {
      // Stays set through the redirect so nothing can resubmit meanwhile.
      if (!navigating) submittingRef.current = false;
    }
  }

  /** Returns true once the redirect to /thank-you has started. */
  async function submit(form: HTMLFormElement): Promise<boolean> {
    const data = new FormData(form);

    // Web3Forms honeypot: a real visitor never fills this.
    if (String(data.get("botcheck") ?? "")) return false;

    const nextErrors = validate(data);
    setErrors(nextErrors);

    if (Object.keys(nextErrors).length > 0) {
      setFormError(null);
      // Focused by the effect below, once the error text is in the DOM.
      pendingFocusRef.current = Object.keys(nextErrors)[0];
      return false;
    }

    const accessKey = process.env.NEXT_PUBLIC_WEB3FORMS_ACCESS_KEY;
    if (!accessKey) {
      setFormError(
        "The contact form isn't available right now. Please try again shortly.",
      );
      setStatus("error");
      return false;
    }

    setStatus("sending");
    setFormError(null);

    // An exact alias ("UK") is accepted; always send the list's name.
    const country = findCountry(String(data.get("country") ?? ""));
    if (country) data.set("country", country.name);

    data.append("access_key", accessKey);
    data.append(
      "subject",
      isDemo
        ? `LaundrySync demo request from ${String(data.get("business_name") ?? "").trim()}`
        : "New LaundrySync website inquiry",
    );
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
        return true; // stay disabled through the navigation
      }

      throw new Error("Submission rejected");
    } catch {
      setFormError(
        "Something went wrong sending your message. Please check your connection and try again.",
      );
      setStatus("error");
      // A token is single-use; the visitor needs a fresh one to retry.
      if (captchaIdRef.current) getHCaptcha()?.reset(captchaIdRef.current);
      return false;
    }
  }

  /*
   * Render the widget once hCaptcha is ready - now, if an earlier visit
   * already loaded it, or when its onload fires. Removed on unmount, so a
   * client-side return to /contact renders a fresh one.
   */
  useEffect(() => {
    const render = () => {
      const hcaptcha = getHCaptcha();
      const container = captchaRef.current;
      if (!hcaptcha || !container || captchaIdRef.current) return;
      captchaIdRef.current = hcaptcha.render(container, {
        sitekey: HCAPTCHA_SITEKEY,
        size:
          container.offsetWidth < HCAPTCHA_NORMAL_WIDTH ? "compact" : "normal",
      });
    };

    if ((window as HCaptchaWindow).lsHCaptchaIsReady) render();
    window.addEventListener(HCAPTCHA_READY_EVENT, render);
    return () => {
      window.removeEventListener(HCAPTCHA_READY_EVENT, render);
      if (captchaIdRef.current) getHCaptcha()?.remove(captchaIdRef.current);
      captchaIdRef.current = null;
    };
  }, []);

  return (
    <motion.div
      initial={reduceMotion ? false : { opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: easeOut, delay: 0.1 }}
      className="rounded-ls-xl border border-ls-border bg-white p-6 shadow-ls-card sm:p-8 lg:p-9"
    >
      <DemoIntent onChange={setIntent} />

      <h2 className="ls-h3">{isDemo ? "Request a demo" : "Send us a message"}</h2>
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
        {/*
          Error summary: announced as a whole, and each entry jumps to its
          field. Inside the form so the Clarity mask covers it too.
        */}
        {errorEntries.length > 0 && (
          <div
            role="alert"
            className="mb-6 rounded-ls-md border border-ls-error/30 bg-ls-error/5 px-4 py-3 text-body-sm text-ls-error"
          >
            <p className="font-semibold">
              Please fix the following before sending:
            </p>
            <ul className="mt-2 list-disc space-y-1 pl-5">
              {errorEntries.map(([name, message]) => (
                <li key={name}>
                  <a
                    href={`#${name}`}
                    onClick={(event) => {
                      event.preventDefault();
                      focusField(formRef.current, name);
                    }}
                    className="underline underline-offset-2 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-(--color-focus-ring)"
                  >
                    {message}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* Tells the team whether to schedule a demo; sent with the form. */}
        <input
          type="hidden"
          name="inquiry_type"
          value={isDemo ? "Demo request" : "General inquiry"}
        />

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
            maxLength={NAME_MAX}
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
            label="Email"
            hint="Work email preferred"
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
            inputMode="tel"
            autoComplete="tel"
            maxLength={PHONE_MAX}
            placeholder={dialCode ? `${dialCode} …` : undefined}
            disabled={sending}
            error={errors.phone}
          />
          <CountryCombobox
            name="country"
            label="Country or region"
            required
            disabled={sending}
            error={errors.country}
            onCountryChange={(country) => setDialCode(country?.dial)}
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

        {/* Spam check. Loaded on this page only, via this component. */}
        <Script src={HCAPTCHA_SRC} strategy="afterInteractive" />
        <div className="mt-5">
          {/* tabIndex -1: the error summary link focuses here. */}
          <div
            id="captcha"
            ref={captchaRef}
            tabIndex={-1}
            aria-describedby={errors.captcha ? "captcha-error" : undefined}
            className="min-h-[78px] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-(--color-focus-ring)"
          />
          {errors.captcha && (
            <p id="captcha-error" className="mt-1.5 text-caption text-ls-error">
              {errors.captcha}
            </p>
          )}
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
