import AddonCategoryDialog from "@/component/dialog/AddonCategoryDialog";
import { Box, Button, Typography } from "@mui/material";
import { useState } from "react";

const AddonCategory = () => {
  const [open, setOpen] = useState<boolean>(false);
  return (
    <Box sx={{ width: "100%" }}>
      <AddonCategoryDialog open={open} setOpen={setOpen} />
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
          <Typography>Addon Category</Typography>
        </Box>
      </Box>
    </Box>
  );
};

export default AddonCategory;
