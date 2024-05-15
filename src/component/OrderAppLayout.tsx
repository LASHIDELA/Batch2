import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { fetchAppData } from "@/store/slices/appSlice";
import { Box, Typography } from "@mui/material";
import { useRouter } from "next/router";
import { ReactNode, useEffect } from "react";
import OrderAppHeader from "./OrderAppHeader";

interface Props {
  children: ReactNode;
}
const OrderLayout = ({ children }: Props) => {
  const router = useRouter();
  const { tableId } = router.query;
  const dispatch = useAppDispatch();
  const isHome = router.pathname === "/order";
  const isActiveOrder = router.pathname.includes("active-order");

  const orders = useAppSelector((store) => store.order.items).filter(
    (item) => item.tableId === Number(tableId)
  );
  const isFooterBar =
    !isActiveOrder &&
    orders.some(
      (item) => item.status === "COOKING" || item.status === "PENDING"
    );

  const itemCount = useAppSelector((store) => store.cart.items);
  useEffect(() => {
    if (tableId) {
      dispatch(fetchAppData({ tableId: Number(tableId) }));
    }
  }, [tableId]);
  if (!itemCount) return null;
  return (
    <Box sx={{ position: "relative" }}>
      <OrderAppHeader counter={itemCount.length} />
      <Box
        sx={{
          position: "relative",
          top: { xs: isHome ? 50 : 0, sm: isHome ? 240 : 0 },
          width: { xs: "100%", md: "80%", lg: "55%" },
          m: "0 auto",
        }}
      >
        <Box sx={{ width: { xs: "100%", md: "80%", lg: "65%" }, m: "0 auto" }}>
          <Box
            sx={{
              width: { xs: "100%", md: "100%", lg: "100%" },
              m: "0 auto",
              display: { xs: "flex", justifyContent: "center" },
              px: { xs: 10, sm: "0px" },
            }}
          >
            {children}
          </Box>
        </Box>
      </Box>
      {isFooterBar && !isActiveOrder && (
        <Box
          sx={{
            height: 50,
            bgcolor: "primary.main",
            position: "fixed",
            width: "100%",
            zIndex: 5,
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            bottom: 0,
          }}
        >
          <Typography sx={{ color: "info.main", userSelect: "none" }}>
            You are ordered!{" "}
            <span
              style={{
                marginRight: "10px",
                cursor: "pointer",
                textDecoration: "underline",
              }}
              onClick={() =>
                router.push({
                  pathname: `/order/active-order/${orders[0].orderSeq}`,
                  query: router.query,
                })
              }
            >
              CLICK
            </span>
            here.
          </Typography>
        </Box>
      )}
    </Box>
  );
};

export default OrderLayout;
