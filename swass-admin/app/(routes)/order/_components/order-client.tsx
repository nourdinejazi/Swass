import { getOrders } from "@/actions/server-only";
import { OrderColumns } from "./order-columns";
import { DataTable } from "./order-data-table";
export const dynamic = "force-dynamic";

const OrderClient = async () => {
  const data = await getOrders();

  return (
    <div>
      <DataTable data={data} columns={OrderColumns} />
    </div>
  );
};

export default OrderClient;
