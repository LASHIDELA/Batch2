import { CartItem } from "@/type/cart";
import { OrderAddons, OrderItem } from "@/type/order";
import { Addon, Menu, Order, Table } from "@prisma/client";

export const getTotalPrice = (cartItems: CartItem[]) => {
  const totalPrice = cartItems.reduce((prePrice, curPrice) => {
    const menuPrice = curPrice.menu.price;
    const addonPrices = curPrice.addon.reduce(
      (preAddon, curAddon) => (preAddon += curAddon.price),
      0
    );
    prePrice += (menuPrice + addonPrices) * curPrice.quantity;
    return prePrice;
  }, 0);
  return totalPrice;
};

export const formatOrder = (
  orders: Order[],
  addons: Addon[],
  menus: Menu[],
  table: Table[]
): OrderItem[] => {
  const orderItemIds: string[] = [];
  orders.forEach((order) => {
    const itemId = order.itemId;
    const exit = orderItemIds.find((item) => item === itemId);
    if (!exit) {
      orderItemIds.push(itemId);
    }
  });

  let orderItems: OrderItem[] = orderItemIds.map((orderItemId) => {
    const currentOrders = orders.filter((item) => item.itemId === orderItemId);
    const addonIds = currentOrders.map((item) => item.addonId);
    let orderAddons: OrderAddons[] = [];
    addonIds.forEach((addonId) => {
      const addon = addons.find((item) => item.id === addonId) as Addon;
      if (!addon) return;
      const exit = orderAddons.find(
        (item) => item.addonCategoryId === addon.addonCategoryId
      );
      if (exit) {
        orderAddons = orderAddons.map((item) => {
          const hasAddon = item.addonCategoryId === addon.addonCategoryId;
          if (hasAddon) {
            return {
              addonCategoryId: addon.addonCategoryId,
              addons: [...item.addons, addon].sort((a, b) =>
                a.name.localeCompare(b.name)
              ),
            };
          } else {
            return item;
          }
        });
      } else {
        orderAddons = [
          ...orderAddons,
          {
            addonCategoryId: addon.addonCategoryId,
            addons: [addon].sort((a, b) => a.name.localeCompare(b.name)),
          },
        ];
      }
    });
    return {
      itemId: orderItemId,
      orderStatus: currentOrders[0].status,
      orderAddons: addonIds.length
        ? orderAddons.sort((a, b) => b.addonCategoryId - a.addonCategoryId)
        : [],
      menus: menus.find((item) => item.id === currentOrders[0].menuId),
      table: table.find((item) => item.id === currentOrders[0].tableId),
    };
  });
  return orderItems.sort((a, b) => a.itemId.localeCompare(b.itemId));
};
