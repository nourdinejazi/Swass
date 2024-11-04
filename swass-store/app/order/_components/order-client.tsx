"use client";
import useOrderForm from "@/hooks/use-order";
import { useStore } from "zustand";
import OrderForm from "./order-form";
import Loading from "@/app/_components/loading";

const OrderClient = () => {
  const hasHydrated = useOrderForm((state) => state._hasHydrated);
  const initialData = useStore(useOrderForm, (state) => state.orderForm);
  const selectedGroup = useOrderForm((state) => state.selectedGroup);

  if (!hasHydrated) {
    return <Loading />;
  } else {
    return (
      <OrderForm selectedGroup={selectedGroup} initialData={initialData} />
    );
  }
};

export default OrderClient;
