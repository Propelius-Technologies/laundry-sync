import { ImageResponse } from "next/og";
import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { siteConfig } from "@/lib/site-config";

/**
 * Default social-sharing card, served at /opengraph-image.
 *
 * Applies to every route that does not define its own, so one asset covers the
 * homepage, contact page and all three legal pages. Next emits og:image plus
 * its type/width/height, and - because the root layout declares a
 * summary_large_image card - the twitter:image tags as well.
 *
 * Generated with next/og, which ships inside Next. No screenshot tool or
 * image-generation package was added.
 *
 * Rendered as PNG because Open Graph consumers do not reliably rasterise SVG,
 * even though the site itself uses SVG illustrations elsewhere.
 */

export const alt = siteConfig.ogImageAlt;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

/*
 * Assets are read once at module scope - they never depend on request data, so
 * they must not be re-read per render.
 *
 * ImageResponse has a 500KB bundle budget covering JSX, fonts and images. The
 * source mark is 1254x1254 (200KB, ~267KB once base64-encoded), which blows
 * that budget on its own, so _og-assets holds a 216px copy of the same
 * approved artwork - 3x the 72px it renders at. The mark is unmodified apart
 * from scaling.
 */
const markData = await readFile(
  join(process.cwd(), "src/app/_og-assets/mark-white.png"),
);
const mark = `data:image/png;base64,${markData.toString("base64")}`;

/*
 * Inter, the site's brand typeface. next/font serves it as woff2, which satori
 * cannot parse, so a TTF build of the same family is committed alongside.
 * Only SemiBold is loaded: every string on this card is weight 600, and a
 * second weight would push the bundle over the limit.
 */
const interSemiBold = await readFile(
  join(process.cwd(), "src/app/_og-assets/Inter-SemiBold.ttf"),
);

/* Brand tokens, mirrored from src/styles/tokens.css. */
const INK = "#0b2447";
const CYAN = "#00b4ff";
const AQUA = "#22d3ee";

export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          background: INK,
          padding: "72px 80px",
          position: "relative",
          fontFamily: "Inter",
        }}
      >
        {/* Restrained brand-accent detail: a soft aqua glow, bottom right. */}
        <div
          style={{
            position: "absolute",
            right: -220,
            bottom: -260,
            width: 620,
            height: 620,
            borderRadius: 620,
            background: `radial-gradient(circle, ${CYAN}40 0%, ${INK}00 70%)`,
          }}
        />

        {/* Lockup */}
        <div style={{ display: "flex", alignItems: "center", gap: 20 }}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={mark} alt="" width={72} height={72} />
          <div
            style={{
              fontSize: 42,
              fontWeight: 600,
              color: "#ffffff",
              letterSpacing: "-0.02em",
            }}
          >
            LaundrySync
          </div>
        </div>

        {/*
          One concise message, anchored to the bottom with the accent rule
          above it. There is deliberately no "by Propelius" attribution - the
          card carries the LaundrySync brand only.
        */}
        <div style={{ display: "flex", flexDirection: "column" }}>
          <div
            style={{
              width: 72,
              height: 4,
              background: CYAN,
              marginBottom: 32,
            }}
          />
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              fontSize: 68,
              fontWeight: 600,
              lineHeight: 1.15,
              letterSpacing: "-0.03em",
              color: "#ffffff",
            }}
          >
            <div style={{ display: "flex" }}>Branded online ordering</div>
            <div style={{ display: "flex", color: AQUA }}>
              for laundry businesses.
            </div>
          </div>
        </div>
      </div>
    ),
    {
      ...size,
      fonts: [
        {
          name: "Inter",
          data: interSemiBold,
          weight: 600,
          style: "normal",
        },
      ],
    },
  );
}
