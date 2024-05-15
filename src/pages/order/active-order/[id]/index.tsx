import OrderCardItem from "@/component/OrderCardItem";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { refreshOrders } from "@/store/slices/orderSlice";
import { formatOrder } from "@/utils/general";
import { Box, Typography } from "@mui/material";
import { useRouter } from "next/router";
import { useEffect } from "react";

const ActiveOrder = () => {
  const router = useRouter();
  const { id: orderSeq, tableId } = router.query;
  const orders = useAppSelector((store) => store.order.items);
  // const totalPrices = orders
  //   .filter((item) => item.orderSeq === orderSeq)
  //   .map((calculateTotal) => calculateTotal.totalPrice)
  //   .reduce((beforePrice, afterPrice) => (beforePrice += afterPrice), 0);

  const addons = useAppSelector((store) => store.addon.items);
  const table = useAppSelector((store) => store.table.items);
  const menus = useAppSelector((store) => store.menu.items);
  const orderItems = formatOrder(orders, addons, menus, table);
  const cartItem = useAppSelector((store) => store.cart.items);
  const orderItem = orderItems.filter(
    (item) => item.table.id === Number(tableId)
  );
  const dispatch = useAppDispatch();
  let invalid: number;
  useEffect(() => {
    if (orderSeq) {
      invalid = window.setInterval(handleRefreshPage, 3000);
    }
    return () => {
      window.clearInterval(invalid);
    };
  }, [orderSeq]);
  const handleRefreshPage = () => {
    dispatch(refreshOrders({ orderSeq: String(orderSeq) }));
  };
  if (!orders.length) return;
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        zIndex: 5,
        top: 100,
        position: "relative",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          m: "0 auto",
          alignItems: "center",
        }}
      >
        <Box>Order Sequence: {orderSeq}</Box>
        <Typography variant="h5" sx={{ fontWeight: "bold", mt: 1 }}>
          Total Price:{orders && orders[0].totalPrice}
        </Typography>
      </Box>
      <Box
        sx={{
          display: "flex",
          mt: 2,
          flexWrap: "wrap",
          justifyContent: { xs: "center", sm: "space-between" },
        }}
      >
        {orderItem.map((item) => (
          <Box key={item.itemId}>
            <OrderCardItem orderItems={item} isAdmin={false} />
          </Box>
        ))}
      </Box>
    </Box>
  );
};

export default ActiveOrder;
