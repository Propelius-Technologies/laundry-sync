import type { Metadata } from "next";
import { NotFoundContent } from "@/components/not-found/NotFoundContent";

/*
 * Only the title. Nested metadata replaces rather than merges, but a 404 has
 * no canonical or share card worth restating.
 */
export const metadata: Metadata = {
  title: "Page not found",
};

/**
 * App Router not-found page.
 *
 * Renders inside the root layout, so it inherits the global header and footer
 * and returns a real 404 status - no separate /404 marketing route, and no
 * extra navigation cards or search box competing with the two recovery links.
 */
export default function NotFound() {
  return <NotFoundContent />;
}
