import { CustomerColumns } from "./customer-columns";

import { getCustomers } from "@/actions/server-only";
import { DataTable } from "./customers-data-table";

const CustomersClient = async () => {
  const data = await getCustomers();
  return (
    <div className="   ">
      <DataTable data={data} columns={CustomerColumns} />
    </div>
  );
};

export default CustomersClient;
