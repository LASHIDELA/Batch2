import OrderCardItem from "@/component/OrderCardItem";
import OrderDialog from "@/component/dialog/OrderDialog";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { updateOrderStatus } from "@/store/slices/orderSlice";
import { OrderItem } from "@/type/order";
import { formatOrder } from "@/utils/general";
import {
  Box,
  Button,
  ToggleButton,
  ToggleButtonGroup,
  Typography,
} from "@mui/material";
import { OrderStatus } from "@prisma/client";
import { useEffect, useState } from "react";

const Orders = () => {
  const [open, setOpen] = useState<boolean>(false);
  const orders = useAppSelector((store) => store.order.items);
  const addons = useAppSelector((store) => store.addon.items);
  const table = useAppSelector((store) => store.table.items);
  const menus = useAppSelector((store) => store.menu.items);

  const dispatch = useAppDispatch();
  const [statusValue, setStatusValue] = useState<OrderStatus>(
    OrderStatus.PENDING
  );
  const [filterOrder, setFilterOrder] = useState<OrderItem[]>([]);

  useEffect(() => {
    if (orders.length) {
      const filterOrderItem = formatOrder(orders, addons, menus, table).filter(
        (item) => item.orderStatus === statusValue
      );
      setFilterOrder(filterOrderItem);
    }
  }, [orders, statusValue]);
  const handleUpdatStatus = (itemId: string, orderStatus: OrderStatus) => {
    dispatch(updateOrderStatus({ itemId, orderStatus }));
  };
  if (!orders) return null;
  return (
    <Box>
      <Box sx={{ width: "100%" }}>
        <OrderDialog open={open} setOpen={setOpen}></OrderDialog>
        <Box>
          <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
            <Button
              sx={{ my: 2, mr: 2 }}
              variant="contained"
              onClick={() => setOpen(true)}
            >
              Create
            </Button>
          </Box>
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <Box>
              <Typography>Order</Typography>
            </Box>
            <Box>
              <ToggleButtonGroup
                value={statusValue}
                exclusive
                onChange={(evt, value) => setStatusValue(value)}
              >
                <ToggleButton value={OrderStatus.PENDING}>
                  {OrderStatus.PENDING}
                </ToggleButton>
                <ToggleButton value={OrderStatus.COOKING}>
                  {OrderStatus.COOKING}
                </ToggleButton>
                <ToggleButton value={OrderStatus.COMPALATED}>
                  {OrderStatus.COMPALATED}
                </ToggleButton>
              </ToggleButtonGroup>
            </Box>
          </Box>
          <hr></hr>
          <Box
            sx={{
              display: "flex",
              mt: 4,
              flexWrap: "wrap",
              mr: 2,
            }}
          >
            {filterOrder.map((item) => (
              <Box key={item.itemId} sx={{ mr: 1 }}>
                <OrderCardItem
                  orderItems={item}
                  isAdmin={true}
                  handleUpdatStatus={handleUpdatStatus}
                />
              </Box>
            ))}
          </Box>
        </Box>
      </Box>
    </Box>
  );
};
export default Orders;
