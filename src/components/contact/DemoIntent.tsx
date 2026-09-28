"use client";

import { Suspense, useEffect } from "react";
import { useSearchParams } from "next/navigation";

export type ContactIntent = "demo" | "general";

function IntentReader({
  onChange,
}: {
  onChange: (intent: ContactIntent) => void;
}) {
  const intent: ContactIntent =
    useSearchParams().get("intent") === "demo" ? "demo" : "general";

  useEffect(() => {
    onChange(intent);
  }, [intent, onChange]);

  return null;
}

/**
 * Reports `?intent=` from the URL to the contact form.
 *
 * /contact is prerendered, so the query is unknown at build time. Reading it
 * with useSearchParams makes everything up to the nearest Suspense boundary
 * client-rendered - so this reader sits in its own boundary and renders
 * nothing. The form above it stays in the static HTML, starts as a general
 * inquiry, and switches after mount, which also avoids a hydration mismatch.
 * It keeps listening, so navigating between /contact and
 * /contact?intent=demo updates the form without a remount.
 */
export function DemoIntent({
  onChange,
}: {
  onChange: (intent: ContactIntent) => void;
}) {
  return (
    <Suspense fallback={null}>
      <IntentReader onChange={onChange} />
    </Suspense>
  );
}
