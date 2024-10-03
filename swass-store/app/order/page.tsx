import OrderClient from "./_components/order-client";
import { db } from "@/lib/db";
import { currentUser } from "@/lib/auth";

const OrdePage = async () => {
  const user = await currentUser();
  let address = null;
  if (user) {
    address = await db.address.findUnique({
      where: {
        userId: user?.id,
      },
    });
  }

  return (
    <main className="lg:px-[5%]  pb-[200px] bg-secondary flex-justify-center    ">
      <OrderClient initialAddress={address} />
    </main>
  );
};

export default OrdePage;
