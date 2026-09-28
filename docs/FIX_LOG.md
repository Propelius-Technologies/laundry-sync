# Fix log: audit batch 1

- **Branch:** `fix/audit-batch-1`, cut from `main` at `e56d947`. It is not merged.
- **Commits:** 17, one per item.
- **Source:** item IDs refer to `docs/AUDIT_REPORT.md`.
- **Scope:** this batch has no business dependencies. No marketing copy, FAQ text, navigation, CTAs or visual design changed. The only legal wording change is N4.

**How the checks were run**
- Default runs used a local production build (`next build` + `next start -p 3100`) with no analytics environment variables, which is what local and preview builds get.
- N7, N6 and B19d also needed an **override build** made with `NEXT_PUBLIC_ANALYTICS_ENABLED=true NEXT_PUBLIC_CLARITY_PROJECT_ID=ymplhrn7yv`, so Clarity could actually load.
- Web3Forms was always intercepted in tests. Clarity's `collect` upload calls were blocked in tests.
- Scripts and raw results are in `.audit-scratch/`.

## Results

| ID | What changed | Files | Verification | Anything left open |
|---|---|---|---|---|
| N1 | Added `relative` to the admin table's scroll wrapper. The screen-reader-only "Row details" label now stays inside the scroller. | `src/components/home/business-experience/AdminTable.tsx` | `probe.mjs`: page `scrollX` = **0** at 320, 375, 768, 900, 1024 and 1440 (before: 107 at 768). `responsive.mjs`: no page-level overflow at any width. | – |
| N2 | Lenis `anchors: { offset: -96 }` → `anchors: true`. Lenis already subtracts `scroll-margin-top` (6rem), so the offset was applied twice. | `src/components/motion/SmoothScroll.tsx` | `probe.mjs` + `mobilemenu.mjs`: see "N2 anchor landing" below. Every path lands the section top at **96 px** (before: 192 px for header links). | On mobile, long glides (to For businesses and FAQ) take more than 2.5 s to settle. They measure 116 and 155 px at 2.5 s and 96 px at 5.5 s. Expected with Lenis easing. |
| N3 | Submit is guarded by a `useRef` flag that is set synchronously when submit starts. It clears when the attempt ends, and stays set through the `/thank-you` redirect. | `src/components/contact/ContactForm.tsx` | `form.mjs`: `requestsAfterSameTickDoubleSubmit` = **1** (before: 2). A real double-click still sends 1. The 500 and network-error paths re-enable the form. | – |
| A1 | **Name:** trimmed; pattern `/^(?=.*\p{L})[\p{L}\p{M}\s'’.-]+$/u`; max 100 (`maxLength` plus a validation message). **Phone** (optional): `+` only first, then digits, spaces, `(`, `)` and `-`; 7–15 digits; `inputMode="tel"`; `maxLength={20}`. **Email:** existing check, plus rejection of a trailing dot, consecutive dots, and a leading or trailing dot in the local part or the domain. Free-mail stays accepted. `Field` now forwards `maxLength` and `inputMode` on inputs. | `src/components/contact/ContactForm.tsx`, `src/components/ui/Field.tsx` | `form.mjs`: every case in the table under "A1 form cases" passes. | See the three A1 notes below the table. |
| N8 | Focus moves to the first invalid field in a `useEffect`, after the errors render. A `role="alert"` error summary sits above the fields. Each entry is a link that focuses its field. `aria-describedby` and `aria-invalid` are unchanged. | `src/components/contact/ContactForm.tsx` | `form.mjs`: when focus lands on `#name`, it already has `aria-describedby="name-error"`, `aria-invalid="true"`, and the error text in the DOM. The summary lists all 6 errors as `#field` links. Clicking "Please enter your work email." focuses `#email` without changing the URL hash. | The summary sits inside the `<form>`, so the Clarity mask covers it. A real screen-reader check (NVDA and VoiceOver) is still recommended; see report §5 item 1. |
| N12 | "Place order" on the phone's review screen is now a `PreviewPrimaryButton` span, like "Order now" and "Continue" on the other screens. | `src/components/home/customer-experience/screens/OrderReviewPreview.tsx` | No focusable element remains inside that `role="img"` (the only `<button>` in the phone was this one). | Side effect: the click-to-confirm "Order placed" panel could no longer be reached, so it was removed with its state. |
| N4 | One sentence: "This website currently sets no cookies." → "This website sets no cookies unless you accept optional analytics cookies." | `src/app/privacy-policy/page.tsx` | Rendered-text diff of the three legal pages, before and after (`legaltext.mjs`, production build): this is the **only** difference. | Listed under "For management review". |
| N5 | New `<Fact value={…} label="…">` helper, which renders the `legalInfo` value or the existing `[To confirm: …]` marker while the value is empty or null. All 16 markers now read from `legalInfo`. Added fields, all `null`: `web3formsTerms`, `transferSafeguards`, `dpoRequirement`, `governingLaw`, `hostingLogRetention`, `clarityCookieDurations.{clck,clsk,microsoft}`. The cookie table's Clarity durations read from `legalInfo` too. | `src/data/legal.ts`, `src/components/legal/LegalPage.tsx`, `src/app/{privacy-policy,terms-of-use,cookie-policy}/page.tsx` | Rendered-text diff: identical apart from the N4 sentence. | Filling a value swaps the marker for plain text, but the drafting sentences around several markers ("…requires legal confirmation", "They must be obtained directly from Web3Forms before publication:") still need editing by legal. |
| N6 | `CONSENT_MAX_AGE_MONTHS = 6`. A stored choice older than that, or one with no readable `decidedAt`, counts as absent. | `src/lib/consent/consent-config.ts`, `src/lib/consent/consent-storage.ts` | `consent-n6.mjs`: see "N6 consent expiry" below. | See "For management review". A tab left open across the 6-month boundary re-asks on the next page load, not live. |
| N7 | The hardcoded Clarity ID fallback is removed. IDs come only from the environment. New `analyticsEnabled` = `NEXT_PUBLIC_VERCEL_ENV === "production"` or `NEXT_PUBLIC_ANALYTICS_ENABLED === "true"`. The same gate applies to Clarity and GA4, in both `analyticsConfig` and `AnalyticsLoader`. | `src/lib/consent/consent-config.ts`, `src/components/consent/AnalyticsLoader.tsx` | See "N7 consent scenarios" below. | **Production Clarity stops on the next deploy unless the environment variables below are set.** On builds with analytics disabled, the cookie dialog shows its existing "No analytics provider is currently configured…" note. |
| B13 | Added `{" "}` between the block spans of the 10 headings, and in the brand-preview welcome line (as a leading space from the second line on). | `Hero.tsx`, `OpportunitySection.tsx`, `CustomerExperienceSection.tsx`, `ProductCapabilitiesSection.tsx`, `BusinessExperienceSection.tsx`, `MakeItYoursSection.tsx`, `WhoItsForSection.tsx`, `FAQSection.tsx`, `ContactIntro.tsx`, `app/thank-you/page.tsx`, `CustomerBrandPreview.tsx` | `textContent` now reads for example "Your laundry business. Beautifully online" and "Your service is personal. Your ordering should be, too." (all 10 checked). **Visual:** a pixel comparison of every heading on `/` and `/contact` at 375 and 1440, before and after, shows **0 changed pixels**, and page heights are identical (`headingdiff.mjs`). | – |
| B16 | Logo `width/height` 1254 → **48**, and `sizes` removed. | `src/components/layout/Logo.tsx` | Rendered `<img>`: `src=…&w=96`, `srcset="…w=48 1x, …w=96 2x"`. No w=3840 anywhere. | The source PNGs are unchanged (1254 px), as instructed. |
| B8 | New `useToday()` hook (`useSyncExternalStore`, with a null server snapshot) and `sample-dates.ts` helpers. **Capability calendar:** current month, this week and next, today selected. **Pickup strips:** 5 days from tomorrow, the third selected, month and summary derived from it. **Order lists:** relative labels ("Today", "Yesterday", "3 days ago" … "16 days ago"). The calendar's alt text is now date-neutral. | `src/lib/use-today.ts`, `src/lib/sample-dates.ts`, `src/data/{product-capabilities,preview-services,preview-orders}.ts`, `CalendarIllustration.tsx`, `PickupSchedulingPreview.tsx`, `OrderReviewPreview.tsx`, `CustomerBrandPreview.tsx` | With the clock mocked to 1 Oct 2026, the calendar shows "October 2026" with 1 selected, and the brand strip shows "Fri 2 … Tue 6". With 28 Sep 2026 it shows "September 2026" with 28 selected. The server HTML contains no month-year and no "2025". No hydration warnings in dev or production (`hydration.mjs`). | The prerendered HTML shows blank (non-breaking-space) cells until hydration, which is date-neutral by design. The second calendar week can show next month's day numbers, not greyed. `src/data/admin-preview.ts:251-255` still has "13–15 May" admin order times; that file was not in this item's list. |
| B19a | `not-found.tsx` is a server component exporting `metadata.title = "Page not found"`. The animated body moved unchanged to `NotFoundContent`. | `src/app/not-found.tsx`, `src/components/not-found/NotFoundContent.tsx` | Production build: `/nope` returns **404**, with `<title>Page not found \| LaundrySync</title>`, and the same H1 and design. | – |
| N9 | Deleted `public/{file,globe,next,vercel,window}.svg`. | `public/` | `grep` found no references in `src`, `public`, `next.config.ts` or `package.json` before deleting. The build passes. | – |
| Cursor | Base-layer rule gives `cursor: pointer` to `button:not(:disabled)`, `[role="tab"]`, `summary`, `label[for]`, `select` and `a[href]`. | `src/app/globals.css` | `cursor.mjs`: header link, admin tab, journey button, FAQ button, select, label and submit show `pointer`. The inert mockup spans show `auto`. | It sits in the base layer, so `disabled:cursor-not-allowed` on form controls still wins. |
| B19d | `headers()` for `/:path*`. **Enforced:** `X-Content-Type-Options: nosniff`, `Referrer-Policy: strict-origin-when-cross-origin`, `X-Frame-Options: DENY`, `Permissions-Policy: camera=(), microphone=(), geolocation=()`. **Report-only:** `Content-Security-Policy-Report-Only` exactly as specified. | `next.config.ts` | `curl -I` on the production build: all five headers present on `/`, `/contact`, `/privacy-policy` and the 404. See "B19d CSP report-only results" below. | No `report-to` endpoint, so violations only show in each visitor's console. Add one before relying on field data. Enforcing the CSP later only needs the header key renamed. |

**A1 notes**
- **101+ character names.** Typing or pasting is cut to 100 by `maxLength`, so the 101- and 210-character cases sent 100 characters. A 101-character value set by script (bypassing `maxLength`) is rejected with "Please keep your name to 100 characters or fewer." That message is new; the brief gave none for length.
- **Curly apostrophe.** `’` is allowed as well as `'`, because iOS keyboards insert `’` in "O’Brien".
- **Label.** "Work email" is unchanged, as instructed.

### A1 form cases (`form.mjs`)

| Field | Result |
|---|---|
| Name | **Accepted:** `O'Brien`, `O’Brien`, `Anne-Marie`, `José`, `राहुल`, 100 characters. **Rejected:** `John123` and `@@@` ("Please enter a name using letters only."), spaces only. |
| Phone | **Accepted:** `+91 98765 43210`, `98765-43210`, `+44 20 7946 0958`, blank. **Rejected:** `abcd`, `123` and 20 digits ("Please enter a valid phone number, 7–15 digits."). |
| Email | **Accepted:** `" USER@Domain.com "`, `user@gmail.com`. **Rejected:** `a@b`, `test@`, `user@domain`, `user@domain.com.`, `a..b@domain.com`, `.a@domain.com`, `a.@domain.com`. |
| Message | Unchanged: whitespace-only is rejected; exactly 1000 characters is accepted; 1001 pasted characters are truncated to 1000. |

### N2 anchor landing (section top, in px)

| Path | Viewport | Section top |
|---|---|---|
| Header links | 1440 | 96 |
| Mobile-menu links | 375 | 96 |
| Footer links, including "Make it yours" | 1440 and 375 | 96 |
| Footer `/#faq` link clicked from `/contact` | 1440 and 375 | 96 |
| Direct load of `/#faq` | 1440 and 375 | 96 |

### N6 consent expiry (`consent-n6.mjs`)

| Stored choice | Default build | Override build (analytics enabled) |
|---|---|---|
| Accepted 7 months ago | Banner shows; 0 Clarity requests | Banner shows; 0 Clarity requests |
| Accepted 5 months ago | No banner | No banner; **Clarity loads** (choice respected) |
| Rejected 5 months ago | No banner; 0 requests | No banner; 0 requests |

### N7 consent scenarios (`consent.mjs`)

| Build | Result |
|---|---|
| Default (no environment variables) | Scenario 3 (Accept) makes **0** Clarity requests; no `script#ls-clarity`; no `_clck`. `ymplhrn7yv` appears nowhere in `.next/static` or `.next/server`. Scenarios 1, 2, 4 and 5 pass. |
| Override | Accept loads `clarity.ms/tag/ymplhrn7yv`, `clarity.js`, `c.clarity.ms`, `c.bing.com` and `collect`, and sets `_clck`. Scenarios 1, 2, 4 and 5 pass: 0 requests before consent and after reject; withdrawal reloads and clears `_clck`; the banner returns when `ls-consent` is cleared. |

### B19d CSP report-only results (`csp.mjs`, override build)

The session tested was: accept consent on `/` (Clarity loaded), scroll the whole page, then go to `/contact` and submit a mocked form through to `/thank-you`.

- **CSP violations: none.** No `securitypolicyviolation` events and no CSP console messages.
- **Third-party hosts contacted:** `www`, `scripts`, `c`, `y` and `t` on `clarity.ms`; `c.bing.com`; `api.web3forms.com`. All are covered by the policy.
- **Detection check:** a deliberate `fetch("https://example.com")` raised a `connect-src` violation with disposition "report", which proves the listener works and nothing is blocked.
- **Dev and production console:** no CSP messages on any route.

### Commands and quality gates (after all items)

| Command | Result |
|---|---|
| `npx tsc --noEmit` | exit 0, no output |
| `npm run lint` | exit 0, **0 errors, 0 warnings** |
| `npm run build` | exit 0, no warnings, 14 static routes (same as before) |
| `hydration.mjs` (7 routes, dev and production) | No errors or hydration warnings. Production shows only the existing benign "preloaded CSS not used" notice and the expected 404 resource error. |

**Lint note.** ESLint also scans `.audit-scratch/` because it is not in the ESLint ignores. My one-off `.cjs` edit helpers were deleted and one unused variable in `responsive.mjs` was fixed. The ESLint config was not changed.

### Lighthouse: local production build, same machine, before vs after

| Page | Mobile before → after | Desktop before → after | A11y / Best Practices / SEO |
|---|---|---|---|
| `/` | 89 → **91** | 99 → **100** | 97 / 100 / 100, unchanged |
| `/contact` | 93 → **92** | 100 → **100** | 97 / 100 / 100, unchanged |

Differences of 1–2 points are within normal run-to-run variance. Mobile TBT on `/` went from 140 to 90 ms. Raw JSON: `.audit-scratch/lh/local-*.json` (before) and `lh/after-*.json` (after).

---

## Environment variables to set in Vercel

**Production scope only:**

| Variable | Value | Why |
|---|---|---|
| `NEXT_PUBLIC_CLARITY_PROJECT_ID` | `ymplhrn7yv` | **Required.** The ID is no longer in source. Without it, Clarity stops loading on the next production deploy. |
| `NEXT_PUBLIC_ANALYTICS_ENABLED` | `true` | Recommended. It makes production analytics independent of `NEXT_PUBLIC_VERCEL_ENV`. |
| `NEXT_PUBLIC_WEB3FORMS_ACCESS_KEY` | (existing value) | Unchanged; listed for completeness. |

**About `NEXT_PUBLIC_VERCEL_ENV`.** Vercel exposes it to Next.js builds when "Automatically expose System Environment Variables" is on. **Needs manual check** in Project → Settings → Environment Variables. If `NEXT_PUBLIC_ANALYTICS_ENABLED=true` is set as above, this setting no longer matters.

**Do not set** these outside Production:
- `NEXT_PUBLIC_ANALYTICS_ENABLED` in Preview or Development. Leaving it unset there is what keeps test sessions out of Clarity.
- `NEXT_PUBLIC_GA4_MEASUREMENT_ID`, anywhere, until GA4 is actually wanted.

**After deploying**, open the live site, accept cookies, and confirm that a request to `clarity.ms/tag/ymplhrn7yv` appears.

---

## For management review

These changes affect legal text, or the accuracy of legal text.

1. **N4: privacy policy wording changed.**
   - `src/app/privacy-policy/page.tsx`, "Cookies and similar storage" section.
   - **Before:** "This website currently sets no cookies."
   - **After:** "This website sets no cookies unless you accept optional analytics cookies."
   - **Why:** the old sentence was false once a visitor accepts Clarity, which sets `_clck` and `_clsk`.
2. **N6: the Cookie Policy's `ls-consent` duration is now incomplete.** The wording was not changed.
   - The storage table (`src/data/legal.ts`, `ls-consent` → `duration`) says "Until you clear your browser storage, or we materially change the purposes and ask again".
   - The site now also asks again after **6 months**.
   - Suggested wording, not applied: "6 months, or until you clear your browser storage or we materially change the purposes and ask again."
3. **N5: no wording change.** The placeholders now come from one place, `legalInfo` in `src/data/legal.ts`.
   - When legal fills in a value, every page that states it updates.
   - The drafting sentences around several placeholders still need legal editing before publication.
4. **N7: no wording change.** Behaviour now matches the existing text more strictly: Clarity loads only after consent **and** only on the production site.

---

# Fix log: audit batch 2

- **Branch:** `fix/audit-batch-2`, cut from `main` at `5c66a98` (batch 1 merged). It is not merged.
- **Commits:** 16 item commits, one per item letter, plus follow-up commits on F, G and I that are labeled with the same letter. This log is committed separately.
- **Scope:** PM decisions are final. The site targets multiple regions, so it uses US English and region-neutral sample data. Demo requests go through the contact form. Any email address is accepted. Glossary terms and admin mock IDs stay as they are.

**How the checks were run**
- Checks ran on a local production build (`next build` + `next start -p 3100`) with no analytics variables, plus `next dev` for hydration.
- Web3Forms was always intercepted. The hCaptcha API was replaced in `form.mjs` and `combobox-lib.mjs` by a stub that honours the `onload` callback and exposes `__solveCaptcha()`. The real widget was loaded unmocked in `captchareal.mjs`, `captchadomain.mjs` and `csp.mjs`.
- Scripts and raw results are in `.audit-scratch/`, which ESLint now ignores (item A).

## Results

| Item | What changed | Files | Verification | Anything left open |
|---|---|---|---|---|
| A | `.audit-scratch/**` added to ESLint's global ignores. | `eslint.config.mjs` | With a `require()` script in `.audit-scratch/`, `npm run lint` exits 0. | – |
| B | Header and mobile-menu CTA "Contact us" → primary **"Book a demo"**. Hero primary "Talk to our team" → **"Book a demo"**. All three link to `/contact?intent=demo`, through one `demoHref` constant. "Discuss branding options" and "Ask us directly" keep their text and point there too. The footer Explore column gains "Who it's for" (`/#who-its-for`); footer Company "Contact us" still goes to `/contact`. | `src/data/navigation.ts`, `src/data/faq.ts` (href only), `MakeItYoursSection.tsx` | Built homepage: 14 links to `/contact?intent=demo`; `/#who-its-for` in the footer; a single `/contact` (footer). "Talk to our team" appears 0 times. | "Talk to our team" no longer appears anywhere. It was the hero primary label, which this item replaced. |
| C | `DemoIntent` reads `?intent` with `useSearchParams` inside its own `<Suspense fallback={null}>`, so the rest of `/contact` stays prerendered (`○ /contact`). The form starts as a general inquiry and switches after mount, so there's no hydration mismatch. A hidden `inquiry_type` field sits inside the Clarity-masked form. | `src/components/contact/DemoIntent.tsx`, `ContactForm.tsx` | See "C: demo intent" below. The prerendered HTML contains the whole form, with `inquiry_type="General inquiry"`. No hydration warnings in dev or production on `/contact?intent=demo`. | – |
| D | Label "Work email" → **"Email (work email preferred)"**. The hint sits in brackets inside the label, in normal weight and muted color, after a real space. A hint on its own line (the first version) pushed the email input below the phone input beside it. `Field` gained a `hint` prop. The hint is part of the label, so `aria-describedby` lists only an error. The empty-field error now reads "Please enter your email address." to match the label. | `src/components/ui/Field.tsx`, `ContactForm.tsx`, `CountryCombobox.tsx` | `uishots.mjs`: the label reads "Email (work email preferred)" on one 22 px line, and the email and phone inputs line up (both at 418 px at 1440). Screenshot: `.audit-scratch/screenshots/ui-form-1440.png`. `user@gmail.com` passes, and every batch-1 email case still passes. | – |
| E | Free-text country → **searchable combobox**. It follows the WAI-ARIA 1.2 editable combobox pattern (list autocomplete, manual selection) and covers all **249 ISO 3166-1** entries. | `src/components/contact/CountryCombobox.tsx`, `src/data/countries.ts` (new), `ContactForm.tsx` | See "E: country combobox" below. | Names come from CLDR English via `Intl.DisplayNames`, written out to a static file. CLDR shorthand is spelled out ("Saint", "and"), and some names use their most common form ("Democratic Republic of the Congo", "Hong Kong"). The typed value must match a list entry to submit. |
| F | A `MockupLink` puts one link to `/contact?intent=demo` ("Book a demo to see this screen") over each static mockup, **as an empty overlay sibling of the `role="img"`**, never inside it. The first version wrapped the mockup; Lighthouse flagged that as `label-content-name-mismatch`. Previews with real buttons have their button lookalike made into a link instead, with "(book a demo)" for screen readers. | `src/components/ui/MockupLink.tsx` (new), `HeroProductVisual.tsx`, `CustomerPhonePreview.tsx`, `CapabilityCard.tsx`, `AudiencePanel.tsx`, `CustomerBrandPreview.tsx`, `BusinessAdminPreview.tsx` | See "F: mockup links" below. | On touch devices, capability and "Who it's for" illustrations keep their replay buttons, as required, so they don't link there. |
| G | **hCaptcha via Web3Forms' free integration.** Loads `js.hcaptcha.com/1/api.js` with Web3Forms' shared free site key (the same one their `client/script.js` injects). The widget is rendered from hCaptcha's `onload` callback, so it also renders after client-side navigation, and it switches to compact size below 303 px. Web3Forms verifies the `h-captcha-response` token. The script loads **only on `/contact`, on the first focus, input or pointer press inside the form**; a submit that arrives first loads it too. The honeypot is kept. The CSP is updated, and the privacy policy gets one provider bullet (data file). | `ContactForm.tsx`, `next.config.ts`, `src/data/legal.ts`, `src/app/privacy-policy/page.tsx` (makes `when` optional) | See "G: hCaptcha" below. | Web3Forms dashboard setting and Preview-domain check: see "For management review". |
| H | Hero: `lg:pt-20` → `lg:pt-12`, with the columns top-aligned at lg. Homepage sections (`space="lg"`): `lg:py-32` → `lg:py-24`. The three steps **replace the hero's three bullet points**, in the same place and with the same spacing and entrance. It's one vertical list; each row has the step's icon tile, the number and title on one line, and the description below: "01 Set up your brand" / "02 Customers book online" / "03 Manage it in your admin". The old bullets ("Built for laundry and dry-cleaning businesses." and the other two) are removed. The first version added a separate row of three columns above them. | `Hero.tsx`, `src/components/ui/Section.tsx` | See "H: gap under the header" below. `responsive.mjs`: no horizontal overflow at any width. All 18 anchor paths still land at 96 px. Screenshots: `.audit-scratch/screenshots/ui-hero-steps-1440.png` and `ui-hero-steps-375.png`. | Inner pages (`space="page"`) keep `lg:pt-20` and `lg:pb-32`, which this item did not ask to change. |
| I | All sample currency → `$`. London areas → Downtown, Riverside, Old Town, North Park, Harbor District ("Shoreditch, E1" → "Downtown"). Service-area postcodes → a **"Zone" column, "Zone 1" to "Zone 5"**; the description and search placeholder now say "zones". "COD" → "Cash on delivery". Service names, statuses, voucher/coupon terms and IDs are unchanged. | `src/data/admin-preview.ts`, `src/data/hero-demo.ts`, `src/data/preview-orders.ts` | `zone.mjs`: headers are ID / Area / Zone / Pickup windows / Status; rows read "Downtown Zone 1" … "Harbor District Zone 5". See "I: remaining grep hits" below. | The order-history line (date · time · total · payment) was already cut off with an ellipsis in the phone mockup, even for "Card", so "Cash on delivery" is never fully visible. The layout was left as is. |
| J | catalogue → catalog (3 strings), "Catalogue artwork" → "Catalog artwork", aria-label "Preview brand colour" → "color". `<html lang="en">` → `en-US`. `og:locale` was already `en_US`. The legal pages and `legal.ts` are untouched. | `AdminTable.tsx`, `BrandColorSelector.tsx`, `admin-preview.ts`, `product-capabilities.ts`, `src/app/layout.tsx` | A grep of `src/` outside the legal files finds UK spellings only in code comments. The built HTML has `lang="en-US"` and `og:locale` `en_US`. | JSON-LD `inLanguage` is still `"en"` (not in scope). |
| K | Admin "13–15 May" pickup times → "Yesterday", "Today", "Tomorrow", following batch-1 B8's order lists. These are static labels, so they can't cause a hydration mismatch. | `src/data/admin-preview.ts` | `datesk.mjs`, clock mocked to 1 Oct 2026: admin rows read "Today, 11:30 AM" … "Yesterday, 4:00 PM"; the calendar shows "October 2026". The server HTML has no month-year and no "13–15 May". No console warnings. | – |
| L | Anchor scrolling now depends on the device. **Touch (`pointer: coarse`)** uses a fixed 0.6 s eased scroll instead of Lenis's lerp glide, whose long tail was the slow part. **Reduced motion** jumps instantly. **Desktop** is unchanged. The mode comes from `useSyncExternalStore`, so Lenis is re-created at most once, after hydration. Two mockups that grew while animating also moved every anchor below them, so each now reserves its expanded height. | `SmoothScroll.tsx`, `BusinessAdminIllustration.tsx`, `DryCleaningPreview.tsx` | `anchortiming.mjs` (time until the section stays within 2 px of its final position), before on a `main` build and after: see "L: anchor settle time" below. `faqrepeat.mjs`: FAQ lands at 96 px in 4 of 4 runs (before: 1 of 4 landed at 155). `shiftscan.mjs`: no section changes height while scrolling at 375 or 1440. | See "L: reserved space" below. |
| M | Step 04 ("Place the order") had **no end state** after batch-1 N12. The review now plays through to the "Order placed" confirmation 1.5 s after the screen opens (immediately with reduced motion). There's no button, so nothing is focusable inside the `role="img"`. The screen description mentions the confirmation. | `OrderReviewPreview.tsx`, `src/data/customer-journey.ts` | `step4t.mjs`: the review screen shows at 485 ms, the footer switches at 1951 ms and "Order placed" is visible at 2294 ms. `step4.mjs`: shown immediately under reduced motion; 0 focusables inside the `role="img"` in both states. | – |

**L: reserved space**
- **Card 04:** its existing reservation was 20 px short (6.5rem → 7.75rem), so it is 20 px taller at rest.
- **Dry-cleaning preview, below lg:** it reserves 238 px for a panel that is 178 px at rest. With the panel kept at the foot, that shows as **60 px of extra space above it**. Screenshot: `.audit-scratch/screenshots/b2-dry-cleaning-375.png` (92 px from the description to the panel: 32 px of existing padding plus the 60 px reservation). The desktop row is unchanged.

### C: demo intent (`form.mjs`)

| Page | Heading | `inquiry_type` | Subject |
|---|---|---|---|
| `/contact?intent=demo` | "Request a demo" | "Demo request" | "LaundrySync demo request from Bright Suds" |
| `/contact` | "Send us a message" (unchanged) | "General inquiry" | "New LaundrySync website inquiry" (unchanged) |

Client-side navigation between `/contact` and `/contact?intent=demo` also switches the form, without a remount.

### E: country combobox (`combobox-lib.mjs`, run from `form.mjs`)

- **Role and name:** found by role `combobox` with the name "Country or region". It has `aria-autocomplete="list"`, controls a `listbox`, is required, and keeps `autocomplete="country-name"`.
- **Filtering:** "king" finds United Kingdom. "ind" finds India, Indonesia and British Indian Ocean Territory. "cote", typed without accents, finds Côte d'Ivoire.
- **Selecting by typing and clicking:** gives "United Kingdom"; the list closes and focus stays in the field.
- **Keyboard:** ArrowDown ×2 then Enter selects Indonesia. Escape closes the list; a second Escape clears the text. Tab after an arrow key selects the highlighted entry (Japan) and moves on.
- **Aliases:** "usa" becomes "United States" on blur.
- **Touch:** tap, type, tap an option gives Brazil.
- **Validation:** "Narnia" and an empty value are rejected with "Please choose a country from the list." and `aria-invalid`. "uk" is sent as "United Kingdom".
- **Other:** the list scrolls within 256 px. The phone placeholder becomes "+44 …" while the phone value stays empty.

### F: mockup links (`mockuplinks.mjs`)

| Check | 1440 px | 375 px touch |
|---|---|---|
| Focusable elements inside any `role="img"` | 0 | 0 |
| Demo links | 14 (9 overlays) | 7 (2 overlays) |
| Focus outline on every demo link | 2 px solid | 2 px solid |

- **Clicking the middle of a capability mockup** leads to `/contact?intent=demo`.
- **The interactive previews still work:** admin tabs, admin search (7 → 0 rows), row chevron, color selector, view switcher, "Book a pickup", journey step buttons.
- **Tab order follows the page.**

### G: hCaptcha

| Check | Result |
|---|---|
| Captcha not completed | Nothing sent; "Please complete the verification."; the error-summary link focuses the widget. |
| Captcha completed | Sent, with the token. |
| Failed send | The single-use token is reset. |
| Fields set with no events at all, then submit | The widget loads and renders on submit. Nothing is sent, values are kept, and focus moves to the widget. After completing it, the form sends. |
| **Your case:** autofill-like `input` events with no focus, then click Send | The widget loads; nothing is sent; values are kept; focus moves to the widget. After completing it, the form sends. |
| Real widget (`captchareal.mjs`) | Not loaded before interaction. Renders at 302×76 (1280 px) and 158×138 compact (320 px) without overflow. Re-renders after client-side navigation. Never loads on `/`. |
| Unregistered test hostname `preview-abc.laundry-sync.test` (`captchadomain.mjs`) | The widget renders ("I am human"). |
| CSP report-only (`csp.mjs`) | **No violations**, and nothing in the console. |

The "no events" case uses the other fields for "values kept". The controlled country field drops a value set with no events when it re-renders; real autofill fires `input` events, so the test types it again before sending.

### H: gap under the header (bottom of header → eyebrow)

| Width | Before | After |
|---|---|---|
| 320 | 40 px | 40 px |
| 375 | 40 px | 40 px |
| 768 | 56 px | 56 px |
| 1024 | 80 px | **48 px** |
| 1440 | 129 px | **48 px** |

### I: remaining grep hits

The grep covered the whole repo except `node_modules`, `.next`, `.git` and `.audit-scratch`, for `£`, `Shoreditch`, `Islington`, `Hackney`, `Camden`, `Walthamstow`, `Postcode` and `COD`.
- **Source code:** 0 hits.
- `docs/AUDIT_REPORT.md`: 9 lines, describing the old data.
- `docs/FIX_LOG.md`: 2 lines (this section).
- Three PNGs (`brand-icon-primary.png`, `brand-icon-white.png`, `src/app/icon.png`): false positives on binary data.

### L: anchor settle time (ms until settled, via the mobile menu at 375 px)

| Case | Link | Before | After |
|---|---|---|---|
| Touch | For businesses | 2724 | **673** |
| Touch | FAQ | 2700 | **610** |
| Touch + reduced motion | For businesses | 69 | 96 |
| Touch + reduced motion | FAQ | 51 | 102 |
| Desktop, header link | For businesses | 1302 | 1316 (unchanged by design) |
| Desktop, header link | FAQ | 1350 | 1433 (unchanged by design) |

All paths land at **96 px**: 18 paths in `probe.mjs` plus 4 through the mobile menu.

### Quality gates (final build)

| Command | Result |
|---|---|
| `npx tsc --noEmit` | exit 0 |
| `npm run lint` | exit 0, **0 errors, 0 warnings** |
| `npm run build` | exit 0, no warnings, same 14 static routes. `/contact` is still `○` (prerendered). |
| `hydration.mjs` (7 routes, dev and production) and `/contact?intent=demo` | No errors or hydration warnings. |
| `form.mjs` | All 29 cases pass, plus every C, D, E and G check above. The 101- and 210-character name rows still show as "accepted" because `maxLength` cuts them to 100, as in batch 1. |

### Lighthouse: median of 3 runs each, local production builds, same session

| Page | Form factor | `main` (batch 1) | Batch 2 | A11y / Best Practices / SEO (batch 2) |
|---|---|---|---|---|
| `/` | Mobile | 80 (51/80/89) | **85** (88/85/78) | 97 / 100 / 100 |
| `/` | Desktop | 99 | **99** | 97 / 100 / 100 |
| `/contact` | Mobile | 89 (89/92/75) | **88** (93/88/84) | 97 / **100** / 100 |
| `/contact` | Desktop | 100 | **100** | 97 / **100** / 100 |

- **Mobile scores vary widely between runs on this machine** (TBT 60–1080 ms for the same build), so compare medians. Batch 1's log reported single runs.
- **Best Practices on `/contact` is 100 in all 6 runs.** Before the G follow-up it was 58, because hCaptcha loaded with the page (third-party cookie, deprecation warning). Mobile LCP was also 6.3 s then; it is 3.3–3.4 s now.
- **The only accessibility failure is color contrast**, the same as batch 1 (the logo's cyan and small mockup text). The mockup link's label mismatch is fixed.
- Raw JSON: `.audit-scratch/lh/main*-*.json` and `lh/final*-*.json`.

## Environment variables

None new. hCaptcha uses Web3Forms' public free site key, which is in source; there's no secret. Batch 1's Vercel Production variables are unchanged.

## For management review

1. **Privacy policy wording (G).** One provider bullet was added under "Hosting and service providers". It comes from `verifiedProcessors` in `src/data/legal.ts`: "**hCaptcha** — Protects the contact form from spam and automated abuse. Loads only on the contact page and processes technical information about your browser and interaction to tell people from bots." The rendered-text diff of all three legal pages shows only this line.
2. **Legal text now slightly out of date. None of these were changed.**
   - The privacy policy's list of form fields still says "Work email address (required)". It doesn't mention the hidden `inquiry_type` value or the hCaptcha token sent with the form.
   - The Cookie Policy doesn't mention hCaptcha. Lighthouse reports that hCaptcha sets a third-party cookie once the widget loads.
3. **Web3Forms dashboard, manual step.** Per Web3Forms' docs, turn on hCaptcha as the form's captcha and enable "hcaptcha" under Block Spam, or the token may not be enforced server-side.
4. **Vercel Preview domains.** The widget renders on any hostname, so the shared site key is not domain-restricted. Whether Web3Forms accepts a token solved on a `*.vercel.app` Preview domain still needs **one real submission** there.
5. **Copy and visual changes to sign off.**
   - "Talk to our team" is gone (B).
   - The hero's three bullet points are replaced by the three business steps, and the gap under the header is tighter (H).
   - On phones and tablets, the dry-cleaning preview has 60 px of reserved space above it, and card 04 is 20 px taller (L).
   - Service areas now show "Zone 1" to "Zone 5" (I).
6. **Legal pages still use UK spelling** (enquiry, organisation, colour and so on), because J excluded them. Align them with US English during the legal rewrite.
