import { PreviewShell, PreviewTabs } from "../ui/PreviewShell";
import { PreviewOrderRow } from "../ui/PreviewParts";
import { orderTabs, statusOrders } from "@/data/preview-orders";

/**
 * Screen E - Order status.
 * Profile / Order status / Order history tabs over the customer's order list,
 * each row showing the order id, date, time, current state and a view
 * affordance. Simple states only - no live tracking.
 */
export function OrderStatusPreview() {
  return (
    <PreviewShell
      title="My Orders"
      tabs={<PreviewTabs tabs={orderTabs} activeIndex={1} />}
    >
      <ul className="flex min-h-0 flex-1 flex-col gap-[calc(var(--ui-gap)*0.55)]">
        {statusOrders.map((order) => (
          <PreviewOrderRow
            key={order.id}
            id={order.id}
            date={order.date}
            time={order.time}
            status={order.status}
          />
        ))}
      </ul>
    </PreviewShell>
  );
}
