# LaundrySync Design System

How the site's visual language is defined, where to change it, and the rules
that keep it from drifting.

---

## 1. Where things live

| Concern | File |
| --- | --- |
| **All design tokens** | `src/styles/tokens.css` |
| Global base styles + typography classes | `src/app/globals.css` |
| Reusable UI components | `src/components/ui/` |
| Motion choreography (JS) | `src/components/motion/motion-tokens.ts` |
| Navigation targets | `src/data/navigation.ts` |
| Capabilities strip content | `src/data/capabilities.ts` |
| Hero demo sample data | `src/data/hero-demo.ts` |

### tokens.css vs globals.css

They have separate jobs and the split matters:

- **`tokens.css` declares values.** Colours, type scale, spacing, radii,
  shadows, motion. It contains no selectors that style elements — only `@theme`
  and `:root`. This is the file you edit to change the brand.
- **`globals.css` applies values.** It imports Tailwind, imports `tokens.css`,
  then defines base element styles (`body`, focus rings, selection) and the
  reusable typography classes (`.ls-display`, `.ls-body-lg`, …).

`globals.css` imports `tokens.css` exactly once:

```css
@import "tailwindcss";
@import "../styles/tokens.css";
```

**Never import `tokens.css` anywhere else.** A second import would duplicate
every declaration and there is no circular-import guard.

---

## 2. The two token tiers

`tokens.css` is deliberately two-layered.

### Tier 1 — primitives (`@theme`)

The raw approved brand values. Tailwind turns each into a utility class:

| Token | Utility | Value |
| --- | --- | --- |
| `--color-ls-navy` | `bg-ls-navy`, `text-ls-navy` | `#0B3D91` |
| `--color-ls-blue` | `text-ls-blue` | `#2563EB` |
| `--color-ls-aqua` | `text-ls-aqua` | `#22D3EE` |
| `--color-ls-cyan` | `text-ls-cyan` | `#00B4FF` |
| `--text-h2` | `text-h2` | fluid `clamp()` |
| `--radius-ls-lg` | `rounded-ls-lg` | `1rem` |
| `--shadow-ls-card` | `shadow-ls-card` | layered card shadow |

Because this is a plain `@theme` block (not `@theme inline`), every primitive is
**also** emitted as a CSS custom property on `:root`, so `var(--color-ls-navy)`
works in hand-written CSS too.

### Tier 2 — semantics (`:root`)

Role-based aliases that point at a primitive. They add no new values:

```css
--color-brand-primary:  var(--color-ls-navy);
--color-text-secondary: var(--color-ls-muted);
--color-focus-ring:     var(--color-ls-navy-500);
--radius-button:        var(--radius-ls-md);
--motion-normal:        var(--duration-ls-normal);
```

### Which do I use?

- **In JSX** → the Tailwind utility: `className="text-ls-muted"`.
- **In CSS** (modules, `globals.css`) → the semantic token:
  `color: var(--color-text-secondary);`
- **Never** a raw hex value in a component. There are currently **zero** raw hex
  values outside `tokens.css`; keep it that way.

When no semantic role fits (e.g. the `--color-ls-sky-200` selection highlight),
using a primitive directly is fine.

---

## 3. Brand colours

| Role | Token | Value |
| --- | --- | --- |
| Primary navy | `--color-brand-primary` | `#0B3D91` |
| Primary hover | `--color-brand-primary-hover` | `#1D4ED8` |
| Primary blue | `--color-brand-blue` | `#2563EB` |
| Accent aqua | `--color-brand-accent` | `#22D3EE` |
| Brand mark cyan | `--color-brand-mark` | `#00B4FF` |
| Heading ink | `--color-text-heading` | `#0B2447` |
| Body text | `--color-text-primary` | `#0F172A` |
| Secondary text | `--color-text-secondary` | `#64748B` |
| Tertiary text | `--color-text-tertiary` | `#94A3B8` |
| Background | `--color-background` | `#FFFFFF` |
| Surface | `--color-surface` | `#F8FAFC` |
| Border | `--color-border` | `#E2E8F0` |
| Success | `--color-success` | `#16A34A` |
| Focus ring | `--color-focus-ring` | `#2563EB` |

> **Cyan vs blue.** `--color-brand-mark` (`#00B4FF`) exists because the hanger
> logo's wave is cyan, not the `#2563EB` primary blue. Use it only for the
> "Sync" in the wordmark and small mark-adjacent accents. Everything else uses
> the primary blue.

---

## 4. Typography

Inter, loaded via `next/font/google` in `src/app/layout.tsx` and exposed as
`--font-sans` → `--font-family-base`. No external font CDN.

| Class | Token | Notes |
| --- | --- | --- |
| `.ls-display` | `--text-display` | Hero H1. `clamp(2.125rem, 0.75rem + 2.85vw, 3.5rem)`, weight 700 |
| `.ls-statement` | `--text-statement` | Editorial statement headings. Larger than `h2`, lighter than the hero (600 vs 700), more open leading |
| `.ls-h2` | `--text-h2` | Section headings |
| `.ls-h3` | `--text-h3` | Sub-headings |
| `.ls-body-lg` | `--text-body-lg` | Hero paragraph |
| `.ls-body` | `--text-body` | Default body |
| `.ls-body-sm` | `--text-body-sm` | Supporting text |
| `.ls-label` | `--text-label` | Uppercase eyebrow, `0.14em` tracking |
| `.ls-caption` | `--text-caption` | Captions |

Emphasis inside body copy uses plain `<strong>`, styled once in `globals.css`
(semibold + heading ink). Do not introduce per-section strong treatments.

Label text is authored in **sentence case** and uppercased by CSS, so screen
readers do not read it letter by letter.

### The display size is coupled to the hero grid

`--text-display` is tuned so the longest heading line fits on **one line** in
the hero's left column at every two-column width (1024 → 1920). It is a pair
with the grid fractions in `Hero.tsx`
(`lg:grid-cols-[1fr_1.1fr]`, `xl:grid-cols-[1fr_1.3fr]`).

**If you change the hero heading copy, re-check the fit.** A longer line needs
either a smaller `--text-display` cap or a wider text column. Below `lg` the
heading uses its own `max-lg:text-[clamp(2rem,5vw,3.25rem)]` because the
stacked layout has the full container width.

---

## 5. Layout & spacing

Spacing is Tailwind's default 4px scale. Layout constants are tokens:

| Token | Value |
| --- | --- |
| `--layout-max-width` | `90rem` (1440px) |
| `--layout-gutter` | `1.25rem` → `2rem` (≥40rem) → `3rem` (≥64rem) |
| `--layout-header-height` | `5rem` → `5.5rem` (≥40rem) |
| `--layout-header-pill-height` | `4rem` → `4.5rem` (≥40rem) |
| `--layout-header-pill-width` | `64rem` |

The gutter and header height step up via media queries **inside `tokens.css`**,
so `Container` and `Header` carry a single class each
(`px-(--layout-gutter)`, `h-(--layout-header-height)`) instead of a responsive
class list.

`Section` presets: `xs` (slim strips) · `sm` · `md` (default) · `lg`.

### The pebble header

At rest the header is flush with the page — transparent, no border, no
separation. Past 16px of scroll the inner bar collapses into a floating
pebble: it pulls in from all four edges at once to
`--layout-header-pill-width`, shrinks to `--layout-header-pill-height`, and
gains a full `--radius-pill` radius, a border, a shadow and a blurred
translucent background.

The `<header>` box itself stays `--layout-header-height` tall in **every**
state, so the collapse never resizes the sticky element and never shifts the
page. Only the bar inside morphs. The header is `pointer-events-none` so
clicks pass through the empty space beside the floating pebble; the bar, the
mobile panel and its overlay opt back in with `pointer-events-auto`.

It is a CSS transition (500ms, `--motion-ease`) rather than Motion, because
the morph is driven by layout properties a single class swap already animates.
`motion-reduce:transition-none` makes the change instant for reduced motion.

---

## 6. Shape, elevation, motion

```css
--radius-button: 0.75rem;   --radius-card: 1rem;   --radius-pill: 9999px;
--shadow-subtle: …;         --shadow-medium: …;
--motion-fast: 150ms;       --motion-normal: 250ms;   --motion-slow: 500ms;
--motion-ease: cubic-bezier(0.22, 1, 0.36, 1);
```

### Two motion systems, on purpose

- **CSS tokens** (`--motion-fast/normal/slow`) — hover, focus and colour
  micro-transitions. Short and snappy.
- **`motion-tokens.ts`** — Motion for React entrance choreography (hero reveal
  order, step crossfades). Deliberately slower. `scrollReveal({ delay,
  distance, amount })` is the shared scroll-triggered reveal: spread it onto a
  motion component for a fade-and-lift that plays once on scroll-in. Keep
  `amount` low (0.2-0.25) for blocks taller than the viewport, which would
  otherwise never reach the threshold.

They are not duplicates; they cover different interactions. Animate transform
and opacity only, and respect `prefers-reduced-motion` everywhere.

---

## 7. Components

All in `src/components/ui/`. Do not create a second version of any of these.

### `Button`
Variants `primary` · `secondary` · `text`. Sizes `sm` · `md` · `lg`.
Renders a `next/link` when `href` is set, a real `<button>` otherwise.

```tsx
<Button href="/contact" size="lg">Talk to our team</Button>
<Button variant="text" size="lg" href="/#how-it-works">See how it works</Button>
<Button variant="secondary" onClick={close}>Cancel</Button>
```

### `Container`
Max width + responsive gutter. Use for any contained content.

### `Section`
Vertical rhythm, background tone, optional container.

```tsx
<Section space="xs" tone="default" className="border-y border-ls-border">…</Section>
```

### `Badge` / `Eyebrow`
`Badge` is the status pill (tones `navy` · `blue` · `aqua` · `success` ·
`neutral`); `orderStatusTone` maps an order status to a tone.
`Eyebrow` is the small uppercase section label, shared by the hero and the
capabilities strip.

```tsx
<Eyebrow withDot>The digital face of your laundry business</Eyebrow>
```

Also available: `Card`, `NavLink`, `StatusNotification`, `Icons`.

---

## 8. Capabilities strip

`src/components/home/CapabilitiesStrip.tsx` +
`CapabilitiesStrip.module.css`.

A client component **only** for its Motion entrance. The marquee, the hover
highlight, the hover pause and the reduced-motion fallback are all CSS.

### How the seamless loop works

The track renders `COPIES` identical copies of one capability group and
translates left by exactly one group width:

```css
transform: translate3d(calc(-100% / var(--ls-marquee-copies)), 0, 0);
```

With `width: max-content`, `-100% / N` is precisely one group, so the final
frame is pixel-identical to the first — no jump, no gap.

Item spacing uses a **trailing `margin-inline-end`**, not `gap`, so the space
across the seam between two groups matches the space between items.

### Rest state and hover

Items rest in **greyscale** - text `--color-text-secondary`, icon the lighter
`--color-text-tertiary`, transparent background. On hover the item under the
pointer takes brand colour: text `--color-brand-blue`, icon
`--color-brand-mark`, plus a soft `--color-ls-sky-50` pill behind it. Other
items stay in their rest state.

The padding and radius are always applied (with a transparent background), so
the highlight can never change an item width and nudge the loop.

### Entrance animation

The label and the moving row fade up with the same language as the hero
(`duration.base`, `easeOut`, 16px lift), staggered 0.12s apart. It uses
`whileInView` with `once: true`, so it plays immediately when the strip is
already visible on load and waits for the scroll when it is not. Both elements
carry `.ls-animate` so the `<noscript>` rule in `layout.tsx` reveals them if
JavaScript never runs.

### Adding a capability

Edit `src/data/capabilities.ts` — that is the only place the content lives:

```ts
{ id: "route-planning", label: "Route planning", icon: MapPin }
```

Add the icon to `src/components/ui/Icons.tsx` if it does not exist. Nothing
else needs to change; the marquee repeats whatever the array contains.

### Changing the marquee speed

One token in `tokens.css`:

```css
--motion-marquee-duration: 34s;   /* larger = slower */
```

It is the time to traverse **one capability group**. Adding capabilities makes
the group wider, so the strip speeds up — raise the duration proportionally to
keep the same perceived pace.

### Why `COPIES = 4`

The loop stays gap-free only while the remaining copies can still cover the
visible width: `(COPIES - 1) × groupWidth ≥ viewportWidth`. One group is
roughly 800px and the strip is capped by the 1440px container, so four copies
leaves a wide margin at every breakpoint. Raise `COPIES` in the component if
you ever shorten the group substantially or go full-bleed.

### Accessibility

- Only the first group is real content; copies 2–N are `aria-hidden` so screen
  readers read each capability once.
- Items are informational text, **not** links or buttons, so they add no tab
  stops. Hover pauses the strip via `:has(.item:hover)`; `:focus-within` is
  wired up for the day they become links.
- `prefers-reduced-motion` stops the animation and shows a single static
  wrapping row — every capability stays visible.
- Touch devices get no hover dependency and no gesture capture; the viewport
  uses `overflow: hidden`, never a scroller.

---

## 9. Ground rules

1. One source of truth for tokens: `src/styles/tokens.css`.
2. One source of truth for content: the files in `src/data/`.
3. No raw hex, shadow or radius values in components.
4. Reuse `Button` / `Container` / `Section` / `Badge`; do not fork them.
5. `"use client"` only where it earns its place (Motion, state) — prefer CSS
   for movement, hover and reduced-motion behaviour.
6. Transform and opacity animations only; always honour reduced motion.
7. `npm run lint` and `npm run build` must both pass before commit.
