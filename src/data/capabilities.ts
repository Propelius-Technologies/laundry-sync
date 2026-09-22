import type { ComponentType, SVGProps } from "react";
import { Basket, Clock, Gauge, Grid } from "@/components/ui/Icons";

export type Capability = {
  id: string;
  label: string;
  icon: ComponentType<SVGProps<SVGSVGElement>>;
};

/**
 * The single source of truth for the capabilities strip.
 *
 * The marquee repeats this one array to create a seamless loop - it is never
 * copied by hand. To add a capability, add an entry here and nothing else
 * needs to change; see docs/DESIGN_SYSTEM.md for the note about marquee speed.
 */
export const capabilities: Capability[] = [
  { id: "online-ordering", label: "Online ordering", icon: Basket },
  { id: "pickup-scheduling", label: "Pickup scheduling", icon: Clock },
  { id: "order-updates", label: "Order updates", icon: Gauge },
  { id: "business-administration", label: "Business administration", icon: Grid },
];

/** Small uppercase label that sits to the left of the moving items. */
export const capabilitiesLabel = "One connected experience";
