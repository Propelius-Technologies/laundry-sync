/**
 * Content and presets for section 05 - Make It Yours.
 *
 * The four colour presets are illustrative options for the customer/admin
 * PREVIEW only. They are declared as scoped custom properties in globals.css
 * (`.ls-brand-preview[data-brand="..."]`) and never touch the site theme.
 */

export const brandPresetIds = ["ocean", "indigo", "forest", "coral"] as const;
export type BrandPresetId = (typeof brandPresetIds)[number];

export type BrandPreset = {
  id: BrandPresetId;
  /** Accessible name for the swatch control. */
  name: string;
  /** Swatch fill. Matches --preview-<id> in tokens.css. */
  swatch: string;
};

export const brandPresets: BrandPreset[] = [
  { id: "ocean", name: "Ocean", swatch: "var(--preview-ocean)" },
  { id: "indigo", name: "Indigo", swatch: "var(--preview-indigo)" },
  { id: "forest", name: "Forest", swatch: "var(--preview-forest)" },
  { id: "coral", name: "Coral", swatch: "var(--preview-coral)" },
];

export const defaultBrandPreset: BrandPresetId = "ocean";

export const previewViews = ["customer", "admin"] as const;
export type PreviewView = (typeof previewViews)[number];

export const previewViewLabels: Record<PreviewView, string> = {
  customer: "Customer view",
  admin: "Business admin view",
};

/** Business-name input rules. */
export const businessNameDefault = "Aqua & Fold";
export const businessNameFallback = "Your Laundry";
export const businessNameMaxLength = 40;

/**
 * Initials for the illustrative monogram. Deliberately a text monogram - the
 * preview never fabricates a logo for someone else's business.
 */
export function brandInitials(name: string) {
  const words = name.trim().split(/\s+/).filter((word) => /[a-z0-9]/i.test(word));
  if (words.length === 0) return "LS";
  const letters = words
    .slice(0, 2)
    .map((word) => word.replace(/[^a-z0-9]/gi, "").charAt(0))
    .filter(Boolean)
    .join("");
  return (letters || name.trim().charAt(0) || "LS").toUpperCase();
}

/** Copy shown inside the customer preview. */
export const customerPreviewCopy = {
  tagline: "Your everyday care, made simple.",
  welcomeLabel: "Welcome back",
  welcomeHeading: ["Care that fits", "your day."],
  primaryAction: "Book a pickup",
  servicesLabel: "Popular services",
  scheduleHeading: "Choose a pickup window",
  scheduleAction: "Confirm pickup",
  backAction: "Back to home",
};

export const disclaimer =
  "This is an illustrative brand preview. Available customization and deployment options are confirmed during your product discussion.";
