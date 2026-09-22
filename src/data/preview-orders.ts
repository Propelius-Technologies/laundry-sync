import type { BadgeTone } from "@/components/ui/Badge";

/**
 * Fictional sample orders for the Order Status and Order History previews.
 * No real customer data, and no tracking beyond the simple states the product
 * actually reports.
 */

export type PreviewOrderStatus =
  | "Order placed"
  | "Pickup scheduled"
  | "In progress"
  | "Ready"
  | "Completed";

export const previewStatusTone: Record<PreviewOrderStatus, BadgeTone> = {
  "Order placed": "navy",
  "Pickup scheduled": "blue",
  "In progress": "aqua",
  Ready: "success",
  Completed: "neutral",
};

export const orderTabs = ["Profile", "Order status", "Order history"] as const;

export type PreviewOrder = {
  id: string;
  date: string;
  time: string;
  status: PreviewOrderStatus;
};

export const statusOrders: PreviewOrder[] = [
  { id: "LS-100482", date: "14 May 2025", time: "09:00 AM", status: "In progress" },
  { id: "LS-100476", date: "13 May 2025", time: "02:00 PM", status: "Ready" },
  {
    id: "LS-100470",
    date: "13 May 2025",
    time: "11:30 AM",
    status: "Pickup scheduled",
  },
  { id: "LS-100465", date: "12 May 2025", time: "10:00 AM", status: "Order placed" },
  { id: "LS-100458", date: "11 May 2025", time: "04:00 PM", status: "Completed" },
];

export type PreviewHistoryOrder = PreviewOrder & {
  total: string;
  payment: string;
};

export const historyOrders: PreviewHistoryOrder[] = [
  {
    id: "LS-100458",
    date: "11 May 2025",
    time: "04:00 PM",
    total: "$36.85",
    payment: "Card",
    status: "Completed",
  },
  {
    id: "LS-100441",
    date: "06 May 2025",
    time: "09:30 AM",
    total: "$18.40",
    payment: "COD",
    status: "Completed",
  },
  {
    id: "LS-100430",
    date: "02 May 2025",
    time: "01:00 PM",
    total: "$52.10",
    payment: "Card",
    status: "Completed",
  },
  {
    id: "LS-100422",
    date: "28 Apr 2025",
    time: "10:15 AM",
    total: "$24.00",
    payment: "COD",
    status: "Completed",
  },
];
