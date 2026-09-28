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
