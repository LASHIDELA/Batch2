import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { emptyCartItem, removeCartItem } from "@/store/slices/cartSlice";
import { createOrder } from "@/store/slices/orderSlice";
import { getTotalPrice } from "@/utils/general";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import { Avatar, Box, Button, Typography } from "@mui/material";
import { Addon, Order } from "@prisma/client";
import { useRouter } from "next/router";

const CartDetail = () => {
  const cartItems = useAppSelector((store) => store.cart.items);
  const router = useRouter();
  const { tableId } = router.query;
  const dispatch = useAppDispatch();

  const renderAddon = (addon: Addon[]) => {
    return (
      <Box>
        {addon.map((item) => (
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              width: "100%",
            }}
            key={item.id}
          >
            <Typography>{item.name}</Typography>
            <Typography>{item.price}</Typography>
          </Box>
        ))}
      </Box>
    );
  };

  return (
    <Box
      sx={{
        position: "relative",
        zIndex: 5,
        top: 150,
        width: "500px",
        display: "flex",
        alignItems: "center",
        flexDirection: "column",
      }}
    >
      {!cartItems.length ? (
        <Typography>Empty Cart</Typography>
      ) : (
        <Box>
          {cartItems.map((cartItem) => {
            const { addon, menu, quantity } = cartItem;

            return (
              <Box
                sx={{ display: "flex", flexDirection: "column" }}
                key={cartItem.id}
              >
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    width: "500px",
                  }}
                >
                  <Box sx={{ display: "flex" }}>
                    <Avatar
                      sx={{
                        bgcolor: "green",
                        width: 18,
                        height: 18,
                        mr: 2,
                        display: "flex",
                        alignItems: "center",
                      }}
                    >
                      {quantity}
                    </Avatar>
                    <Typography>{menu.name}</Typography>
                  </Box>

                  <Typography>{menu.price}</Typography>
                </Box>
                <Box sx={{ pl: 4 }}>{renderAddon(addon)}</Box>
                <Box
                  sx={{ display: "flex", justifyContent: "flex-end", mt: 2 }}
                >
                  <DeleteIcon
                    sx={{ mr: 2, cursor: "pointer" }}
                    onClick={() => {
                      dispatch(removeCartItem({ id: cartItem.id }));
                    }}
                  />
                  <EditIcon
                    sx={{ cursor: "pointer" }}
                    onClick={() => {
                      const pathname = `menus/${menu.id}`;
                      router.push({
                        pathname,
                        query: { ...router.query, cartItemId: cartItem.id },
                      });
                    }}
                  />
                </Box>
              </Box>
            );
          })}
          <Box>
            <hr
              style={{
                height: 2,
                border: "none",
                color: "black",
                backgroundColor: "black",
                opacity: 0.5,
              }}
            />
          </Box>
          <Typography
            variant="h5"
            sx={{ display: "flex", justifyContent: "flex-end" }}
          >
            Total Price : {getTotalPrice(cartItems)}
          </Typography>
          <Box sx={{ display: "flex", justifyContent: "center", mt: 3 }}>
            <Button
              variant="contained"
              onClick={() => {
                dispatch(
                  createOrder({
                    tableId: Number(tableId),
                    cartItem: cartItems,
                    onSuccess: (order: Order[]) => {
                      router.push({
                        pathname: `active-order/${order[0].orderSeq}`,
                        query: { tableId },
                      });
                      dispatch(emptyCartItem([]));
                    },
                  })
                );
              }}
            >
              CONFIRM ORDER
            </Button>
          </Box>
        </Box>
      )}
    </Box>
  );
};
export default CartDetail;
