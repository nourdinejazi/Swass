import { getOrders } from "@/actions/server-only";
import { OrderColumns } from "./store-order-columns";
import { DataTable } from "./store-order-data-table";
export const dynamic = "force-dynamic";

const OrderClient = async () => {
  const data = await getOrders(false);

  return (
    <div>
      <DataTable data={data} columns={OrderColumns} />
    </div>
  );
};

export default OrderClient;
