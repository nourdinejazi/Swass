import Header from "@/components/header";
import TableFallBack from "@/components/table-fallback";
import { Suspense } from "react";
import CustomersClient from "./_components/customers-client";

const CustomersPage = () => {
  return (
    <div className="  w-full h-full overflow-y-auto  p-10 pb-16  ">
      <Header
        name="Gestion Customerss"
        description="La page des paramètres vous permet de personnaliser les Customerss."
      />

      <Suspense fallback={<TableFallBack />}>
        <CustomersClient />
      </Suspense>
    </div>
  );
};

export default CustomersPage;
