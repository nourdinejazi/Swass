import "server-only";

import { db } from "@/lib/db";

export const getOrders = async () => {
  const data = await db.order.findMany({
    include: {
      items: {
        include: {
          product: {
            select: {
              nom: true,
              prix: true,
            },
          },
        },
      },
    },
  });

  return data;
};

export type GetListOrdersType = Awaited<ReturnType<typeof getOrders>>;
export type GetOrderType = GetListOrdersType[number];

export const getCustomers = async () => {
  const data = await db.user.findMany({
    where: {
      role: "USER",
    },
    include: {
      orders: {
        include: {
          items: true,
        },
      },
    },
  });
  return data;
};

export type GetListCustomerType = Awaited<ReturnType<typeof getCustomers>>;
export type GetCustomerType = GetListCustomerType[number];
