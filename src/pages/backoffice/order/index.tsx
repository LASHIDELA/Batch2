import OrderDialog from "@/component/dialog/OrderDialog";
import { Box, Button, Typography } from "@mui/material";
import { useState } from "react";

const Order = () => {
  const [open, setOpen] = useState<boolean>(false);
  return (
    <Box sx={{ width: "100%" }}>
      <OrderDialog open={open} setOpen={setOpen}></OrderDialog>
      <Box>
        <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
          <Button
            sx={{ mt: 2, mr: 2 }}
            variant="contained"
            onClick={() => setOpen(true)}
          >
            Create
          </Button>
        </Box>
        <Box>
          <Typography>Order</Typography>
        </Box>
      </Box>
    </Box>
  );
};
export default Order;
