"use client";
import useOrderForm from "@/hooks/use-order";
import { useStore } from "zustand";
import OrderForm from "./order-form";
import { Address } from "@prisma/client";
import Loading from "@/app/_components/loading";

const OrderClient = ({
  initialAddress,
}: {
  initialAddress: Address | null;
}) => {
  const hasHydrated = useOrderForm((state) => state._hasHydrated);
  const initialData = useStore(useOrderForm, (state) => state.orderForm);
  const selectedGroup = useOrderForm((state) => state.selectedGroup);
  if (initialAddress) {
    initialData.address.nom = initialAddress.lastName;
    initialData.address.prenom = initialAddress.firstName;
    initialData.address.city = initialAddress.city;
    initialData.address.location = initialAddress.location;
    initialData.address.postalCode = initialAddress.postalCode;
    initialData.address.phone = initialAddress.phone;
    initialData.address.phone2 = initialAddress.phone2 || "";
    initialData.address.country = initialAddress.country;
  }

  if (!hasHydrated) {
    return <Loading />;
  } else {
    return (
      <OrderForm
        selectedGroup={selectedGroup}
        initialData={initialData}
        addressInitialized={!!initialAddress}
      />
    );
  }
};

export default OrderClient;
