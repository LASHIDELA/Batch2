import MenuCategoryDialog from "@/component/dialog/MenuCategoryDialog";
import { useAppSelector } from "@/store/hooks";
import { Box, Button, Typography } from "@mui/material";
import { useState } from "react";

const MenuCategory = () => {
  const [open, setOpen] = useState<boolean>(false);
  const menuCategories = useAppSelector((store) => store.menuCategory.items);
  console.log(menuCategories);
  return (
    <Box sx={{ width: "100%" }}>
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
          {menuCategories.map((item) => (
            <Typography key={item.id}>{item.name}</Typography>
          ))}
        </Box>
        <MenuCategoryDialog open={open} setOpen={setOpen} />
      </Box>
    </Box>
  );
};

export default MenuCategory;
