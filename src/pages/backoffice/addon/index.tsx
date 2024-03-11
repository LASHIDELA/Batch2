import AddonDialog from "@/component/dialog/AddonDialog";
import { Box, Button, Typography } from "@mui/material";
import { useState } from "react";

const Addon = () => {
  const [open, setOpen] = useState<boolean>(false);
  return (
    <Box sx={{ width: "100%" }}>
      <AddonDialog open={open} setOpen={setOpen} />
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
          <Typography>Addon</Typography>
        </Box>
      </Box>
    </Box>
  );
};
export default Addon;
