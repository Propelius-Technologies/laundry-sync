import { PreviewShell, PreviewTabs } from "../ui/PreviewShell";
import { PreviewOrderRow } from "../ui/PreviewParts";
import { historyOrders, orderTabs } from "@/data/preview-orders";

/**
 * Screen G - Order history.
 * Same tab navigation as Order status, over previous orders with their date,
 * total, payment method and state, plus view and re-order affordances.
 * Fictional sample data only.
 */
export function OrderHistoryPreview() {
  return (
    <PreviewShell
      title="My Orders"
      tabs={<PreviewTabs tabs={orderTabs} activeIndex={2} />}
    >
      <ul className="flex min-h-0 flex-1 flex-col gap-[calc(var(--ui-gap)*0.55)]">
        {historyOrders.map((order) => (
          <PreviewOrderRow
            key={order.id}
            id={order.id}
            date={order.date}
            time={order.time}
            total={order.total}
            payment={order.payment}
            status={order.status}
            showReorder
          />
        ))}
      </ul>

      <span className="mt-auto block shrink-0 text-center text-[length:var(--ui-2xs)] text-ls-muted">
        Sample orders shown for illustration.
      </span>
    </PreviewShell>
  );
}
