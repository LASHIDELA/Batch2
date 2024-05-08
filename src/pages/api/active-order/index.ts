// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { CartItem } from "@/type/cart";
import { prisma } from "@/utils/db";
import { getTotalPrice } from "@/utils/general";
import { OrderStatus } from "@prisma/client";
import { nanoid } from "nanoid";
import type { NextApiRequest, NextApiResponse } from "next";
const activeOrder = async (req: NextApiRequest, res: NextApiResponse) => {
  const method = req.method;
  if (method === "GET") {
    const orderSeq = String(req.query.orderSeq);
    const isValid = orderSeq;
    if (!isValid) return res.status(405).send("Bad Req");
    const orders = await prisma.order.findMany({ where: { orderSeq } });
    if (!orders) return res.status(400).send("Invalid Req");

    return res.status(200).json({ orders });
  } else if (method === "POST") {
    const { tableId, cartItem } = req.body;
    const order = await prisma.order.findFirst({
      where: {
        tableId,
        status: { in: [OrderStatus.PENDING, OrderStatus.COOKING] },
      },
    });

    const orderSeq = order ? order.orderSeq : nanoid();
    const totalPrice = getTotalPrice(cartItem);

    for (const item of cartItem) {
      const items = item as CartItem;
      const hasAddon = items.addon.length > 0;

      if (hasAddon) {
        for (const addon of items.addon) {
          await prisma.order.createMany({
            data: {
              tableId,
              menuId: items.menu.id,
              addonId: addon.id,
              orderSeq,
              itemId: items.id,
              totalPrice,
              quantity: items.quantity,
              status: OrderStatus.PENDING,
            },
          });
        }
      } else {
        await prisma.order.create({
          data: {
            tableId,
            menuId: items.menu.id,
            orderSeq,
            itemId: items.id,
            totalPrice,
            status: OrderStatus.PENDING,
            quantity: items.quantity,
          },
        });
      }
    }
    const orders = await prisma.order.findMany({ where: { orderSeq } });

    return res.status(200).json({ orders });
  } else if ("PUT") {
    const { itemId, orderStatus } = req.body;
    const isValid = itemId && orderStatus;
    if (!isValid) return res.status(405).send("Invalid Data");
    const exit = await prisma.order.findFirst({ where: { itemId } });
    if (!exit) return res.status(400).send("Bad Request");
    const orderSeq = exit.orderSeq;
    const ordes = await prisma.order.updateMany({
      data: { status: orderStatus, isArchived: false },
      where: { itemId },
    });
    const orders = await prisma.order.findMany({
      where: { tableId: exit.tableId, isArchived: false },
    });
    return res.status(200).json({ orders });
  }
};

export default activeOrder;
