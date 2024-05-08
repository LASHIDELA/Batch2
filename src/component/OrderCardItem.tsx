import { useAppSelector } from "@/store/hooks";
import { OrderItem } from "@/type/order";
import { Box, Card, MenuItem, Select, Typography } from "@mui/material";
import { OrderStatus } from "@prisma/client";

interface Props {
  orderItems: OrderItem;
  isAdmin: boolean;
  handleUpdatStatus?: (itemId: string, orderStatus: OrderStatus) => void;
}
const OrderCardItem = ({ orderItems, isAdmin, handleUpdatStatus }: Props) => {
  const addonCategories = useAppSelector((item) => item.addonCategory.items);

  return (
    <Box>
      <Card sx={{ width: 250, height: 300, mt: 2 }}>
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            bgcolor: "primary.main",
            color: "white",
            px: 1,
            height: 300 * 0.1,
          }}
        >
          <Typography sx={{ fontSize: 14 }}>{orderItems.menus.name}</Typography>
          <Typography sx={{ fontSize: 14 }}>{orderItems.table.name}</Typography>
        </Box>
        <Box
          sx={{
            height: 300 * 0.1,
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            px: 1,
            borderBottom: "1px solid lightgray",
          }}
        >
          <Typography>Item Id:</Typography>
          <Typography sx={{ fontWeight: "bold" }}>
            {orderItems.itemId}
          </Typography>
        </Box>
        <Box
          sx={{
            height: 300 * 0.6,
            px: 1,
            overflowY: "scroll",
          }}
        >
          <Typography>
            {orderItems.orderAddons.map((orderAddon) => {
              const addonCategory = addonCategories.find(
                (item) => item.id === orderAddon.addonCategoryId
              );
              return (
                <Box key={orderAddon.addonCategoryId}>
                  {" "}
                  <Typography>{addonCategory.name}</Typography>
                  {orderAddon.addons.map((item) => {
                    return (
                      <Typography
                        sx={{
                          pl: 2,
                          fontSize: 14,
                          fontStyle: "italic",
                          fontWeight: "bold",
                        }}
                        key={item.id}
                      >
                        {item.name}
                      </Typography>
                    );
                  })}
                </Box>
              );
            })}
          </Typography>
        </Box>
        <Box
          sx={{
            height: 300 * 0.2,
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            px: 1,
            borderTop: "1px solid lightgray",
          }}
        >
          <Typography>Order Status:</Typography>
          {isAdmin ? (
            <>
              <Select
                value={orderItems.orderStatus}
                onChange={(evt) =>
                  handleUpdatStatus &&
                  handleUpdatStatus(
                    orderItems.itemId,
                    evt.target.value as OrderStatus
                  )
                }
                sx={{
                  maxHeight: 30,
                  fontSize: 14,
                }}
              >
                <MenuItem value={OrderStatus.PENDING}>
                  {OrderStatus.PENDING}
                </MenuItem>
                <MenuItem value={OrderStatus.COOKING}>
                  {OrderStatus.COOKING}
                </MenuItem>
                <MenuItem value={OrderStatus.COMPALATED}>
                  {OrderStatus.COMPALATED}
                </MenuItem>
              </Select>
            </>
          ) : (
            <Typography sx={{ fontWeight: "bold" }}>
              {orderItems.orderStatus}
            </Typography>
          )}
        </Box>
      </Card>
    </Box>
  );
};

export default OrderCardItem;
